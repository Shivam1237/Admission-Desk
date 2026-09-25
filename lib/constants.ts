export const LEAD_SOURCES = [
  "Website",
  "Walk-in",
  "Phone",
  "WhatsApp",
  "Education Fair",
  "Campaign",
  "Referral",
  "Other",
] as const;

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Follow-up",
  "Interested",
  "Application Started",
  "Converted",
  "Lost",
] as const;

export const COURSES = ["MCA", "B.Tech", "MBA", "BCA", "M.Tech", "Other"] as const;
export const ACTIVITY_TYPES = ["Call", "WhatsApp", "Email", "Meeting", "Note"] as const;
export const COUNSELLORS = ["Rahul Sharma", "Priya Singh", "Aman Verma"] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type Course = (typeof COURSES)[number];
export type ActivityType = (typeof ACTIVITY_TYPES)[number];
export type Counsellor = (typeof COUNSELLORS)[number];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "blue",
  Contacted: "slate",
  "Follow-up": "amber",
  Interested: "violet",
  "Application Started": "cyan",
  Converted: "green",
  Lost: "red",
};

export function getAgeCategory(ageDays: number) {
  if (ageDays <= 2) return { label: "New", tone: "green" };
  if (ageDays <= 7) return { label: "Normal", tone: "blue" };
  if (ageDays <= 14) return { label: "Ageing", tone: "amber" };
  return { label: "Old", tone: "red" };
}

export function getAgeDays(value: Date | string | number) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(value?: Date | string | null) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

export function toInputDate(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
