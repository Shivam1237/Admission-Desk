import type { FilterQuery } from "mongoose";

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function leadQuery(params: URLSearchParams) {
  const query: FilterQuery<any> = {};
  const search = params.get("search")?.trim();
  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [{ name: regex }, { phone: regex }, { email: regex }];
  }
  for (const key of ["status", "leadSource", "course", "assignedCounsellor"]) {
    const value = params.get(key);
    if (value) query[key] = value;
  }
  return query;
}
