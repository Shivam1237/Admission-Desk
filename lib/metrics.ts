import { getAgeCategory, getAgeDays } from "./constants";
import { serializeLeads } from "./api";
import type { DashboardMetrics } from "./types";

function countBy(leads: any[], key: string) {
  const counts = new Map<string, number>();
  for (const lead of leads) counts.set(String(lead[key] || "Unassigned"), (counts.get(String(lead[key] || "Unassigned")) || 0) + 1);
  return Array.from(counts.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

function dateValue(value: unknown) {
  const date = value ? new Date(value as string) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

export function buildMetrics(rawLeads: any[]): DashboardMetrics {
  const leads = [...rawLeads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const active = leads.filter((lead) => !["Converted", "Lost"].includes(lead.status));
  const due = active.filter((lead) => {
    const date = dateValue(lead.nextFollowUpDate);
    return Boolean(date && date < end);
  });
  const overdue = due.filter((lead) => (dateValue(lead.nextFollowUpDate)?.getTime() ?? 0) < start.getTime());
  const ageing = active.filter((lead) => getAgeDays(lead.createdAt) >= 8);
  const converted = leads.filter((lead) => lead.status === "Converted").length;
  const serialized = serializeLeads(leads);

  return {
    summary: {
      totalLeads: leads.length,
      newLeads: leads.filter((lead) => lead.status === "New").length,
      followUpsDue: due.length,
      convertedLeads: converted,
      lostLeads: leads.filter((lead) => lead.status === "Lost").length,
      overdueFollowUps: overdue.length,
      ageingLeads: ageing.length,
      conversionRate: leads.length ? Math.round((converted / leads.length) * 100) : 0,
    },
    bySource: countBy(leads, "leadSource"),
    byStatus: countBy(leads, "status"),
    byCourse: countBy(leads, "course"),
    byCounsellor: countBy(leads, "assignedCounsellor"),
    recentLeads: serialized.slice(0, 6),
    upcomingFollowUps: serialized
      .filter((lead) => lead.nextFollowUpDate && !["Converted", "Lost"].includes(lead.status))
      .sort((a, b) => +new Date(a.nextFollowUpDate!) - +new Date(b.nextFollowUpDate!))
      .slice(0, 6),
    ageingLeads: serialized
      .filter((lead) => lead.ageDays >= 8 && !["Converted", "Lost"].includes(lead.status))
      .sort((a, b) => b.ageDays - a.ageDays)
      .slice(0, 6),
  };
}
