"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Percent, TrendingDown, UsersRound } from "lucide-react";
import { apiFetch, responseMessage } from "@/lib/client-api";
import type { DashboardMetrics } from "@/lib/types";
import { BreakdownChart } from "./chart-card";
import { EmptyState, LoadingState, PageHeader, Panel, StatCard } from "./ui";

export function ReportsView() {
  const [data, setData] = useState<DashboardMetrics | null>(null); const [error, setError] = useState("");
  useEffect(() => { responseMessage(apiFetch("/api/reports")).then(setData).catch((err) => setError(err.message)); }, []);
  if (error) return <><PageHeader eyebrow="Insights" title="Reports" /><div className="alert">{error}</div></>;
  if (!data) return <LoadingState />;
  return <><PageHeader eyebrow="Insights" title="Reports" subtitle="Simple management signals for source, pipeline, and counsellor performance." /><div className="report-kpis"><StatCard label="Total leads" value={data.summary.totalLeads} icon={<UsersRound size={16} />} /><StatCard label="Conversion rate" value={`${data.summary.conversionRate}%`} icon={<Percent size={16} />} /><StatCard label="Converted" value={data.summary.convertedLeads} icon={<CheckCircle2 size={16} />} /><StatCard label="Lost" value={data.summary.lostLeads} icon={<TrendingDown size={16} />} /></div><div className="dashboard-grid"><BreakdownChart title="Leads by source" data={data.bySource} kind="pie" /><BreakdownChart title="Leads by status" data={data.byStatus} /></div><div className="dashboard-grid"><BreakdownChart title="Leads by course" data={data.byCourse} /><Panel title="Counsellor-wise leads"><div className="table-wrap"><table><thead><tr><th>Counsellor</th><th>Lead count</th><th>Share</th></tr></thead><tbody>{data.byCounsellor.map((row) => <tr key={row.name}><td className="lead-name">{row.name}</td><td>{row.value}</td><td>{data.summary.totalLeads ? Math.round((row.value / data.summary.totalLeads) * 100) : 0}%</td></tr>)}</tbody></table></div>{!data.byCounsellor.length && <EmptyState message="No counsellor data." />}</Panel></div><Panel title="Conversion and loss view" caption="The same simple calculation is available in the dashboard"><div className="panel-body"><div className="profile-grid"><div><div className="profile-label">Converted leads</div><div className="profile-value">{data.summary.convertedLeads}</div></div><div><div className="profile-label">Lost leads</div><div className="profile-value">{data.summary.lostLeads}</div></div><div><div className="profile-label">Conversion rate</div><div className="profile-value">{data.summary.conversionRate}%</div></div></div></div></Panel></>;
}
