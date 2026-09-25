import {
  ACTIVITY_TYPES,
  COUNSELLORS,
  COURSES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from "./constants";

const hasOwn = (payload: Record<string, unknown>, key: string) =>
  Object.prototype.hasOwnProperty.call(payload, key);

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  return /^[+]?\d[\d\s().-]{6,19}$/.test(value);
}

export function validateLeadPayload(payload: Record<string, unknown>, partial = false) {
  const data: Record<string, unknown> = {};
  const required = ["name", "phone", "course", "leadSource"];

  for (const key of required) {
    if (partial && !hasOwn(payload, key)) continue;
    const value = text(payload[key]);
    if (!value) return { error: `${key} is required` };
    data[key] = value;
  }

  if (hasOwn(payload, "name") && !text(payload.name)) return { error: "Name is required" };
  if (hasOwn(payload, "phone")) {
    const phone = text(payload.phone);
    if (!phone || !isValidPhone(phone)) return { error: "Enter a valid phone number" };
    data.phone = phone;
  }
  if (hasOwn(payload, "email")) {
    const email = text(payload.email);
    if (email && !isValidEmail(email)) return { error: "Enter a valid email address" };
    data.email = email;
  }
  if (hasOwn(payload, "course") && !COURSES.includes(text(payload.course) as (typeof COURSES)[number])) {
    return { error: "Select a valid course" };
  }
  if (
    hasOwn(payload, "leadSource") &&
    !LEAD_SOURCES.includes(text(payload.leadSource) as (typeof LEAD_SOURCES)[number])
  ) {
    return { error: "Select a valid lead source" };
  }
  if (hasOwn(payload, "status") && !LEAD_STATUSES.includes(text(payload.status) as (typeof LEAD_STATUSES)[number])) {
    return { error: "Select a valid status" };
  }
  if (hasOwn(payload, "assignedCounsellor")) {
    const counsellor = text(payload.assignedCounsellor) || "Unassigned";
    if (counsellor !== "Unassigned" && !COUNSELLORS.includes(counsellor as (typeof COUNSELLORS)[number])) {
      return { error: "Select a valid counsellor" };
    }
    data.assignedCounsellor = counsellor;
  } else if (!partial) {
    data.assignedCounsellor = "Unassigned";
  }
  if (hasOwn(payload, "status")) data.status = text(payload.status);
  else if (!partial) data.status = "New";

  if (hasOwn(payload, "nextFollowUpDate")) {
    const date = text(payload.nextFollowUpDate);
    if (date && Number.isNaN(new Date(date).getTime())) return { error: "Enter a valid follow-up date" };
    data.nextFollowUpDate = date ? new Date(date) : null;
  }
  if (hasOwn(payload, "notes")) data.notes = text(payload.notes);

  return { data };
}

export function validateActivityPayload(payload: Record<string, unknown>) {
  const type = text(payload.type);
  const description = text(payload.description);
  if (!ACTIVITY_TYPES.includes(type as (typeof ACTIVITY_TYPES)[number])) return { error: "Select a valid activity type" };
  if (!description) return { error: "Activity description is required" };
  const date = text(payload.date);
  if (date && Number.isNaN(new Date(date).getTime())) return { error: "Enter a valid activity date" };
  return { data: { type, description, date: date ? new Date(date) : new Date() } };
}
