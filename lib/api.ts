import { NextRequest, NextResponse } from "next/server";
import { getAgeCategory, getAgeDays } from "./constants";
import type { LeadRecord } from "./types";

export function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function isValidObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

export function currentUserName(request: NextRequest) {
  return request.headers.get("x-demo-user") || "Demo user";
}

export function serializeLead(input: any): LeadRecord {
  const value = typeof input?.toObject === "function" ? input.toObject() : input;
  const id = String(value._id ?? value.id);
  const ageDays = getAgeDays(value.createdAt);
  const age = getAgeCategory(ageDays);
  return {
    ...value,
    id,
    _id: id,
    activities: (value.activities ?? []).map((activity: any) => ({
      ...activity,
      id: String(activity._id ?? activity.id),
      _id: String(activity._id ?? activity.id),
      date: new Date(activity.date).toISOString(),
    })),
    ageDays,
    ageCategory: age.label,
    ageTone: age.tone,
  } as LeadRecord;
}

export function serializeLeads(inputs: any[]) {
  return inputs.map(serializeLead);
}
