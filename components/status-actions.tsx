"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { COUNSELLORS, LEAD_STATUSES, STATUS_COLORS } from "@/lib/constants";
import { apiFetch, responseMessage } from "@/lib/client-api";
import type { LeadRecord } from "@/lib/types";
import { Badge, Button, SelectField } from "./ui";

export function StatusActions({ lead, onUpdated }: { lead: LeadRecord; onUpdated: (lead: LeadRecord) => void }) {
  const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const update = async (field: "status" | "assignedCounsellor", value: string) => { setSaving(true); setError(""); try { const body = await responseMessage(await apiFetch(`/api/leads/${lead.id}`, { method: "PUT", body: JSON.stringify({ [field]: value }) })); onUpdated(body.lead); } catch (err) { setError(err instanceof Error ? err.message : "Unable to update lead."); } finally { setSaving(false); } };
  return <div><div className="action-row" style={{ alignItems: "end" }}><div style={{ minWidth: 190 }}><SelectField label="Status" value={lead.status} disabled={saving} onChange={(event) => update("status", event.target.value)}>{LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}</SelectField></div><div style={{ minWidth: 190 }}><SelectField label="Counsellor" value={lead.assignedCounsellor} disabled={saving} onChange={(event) => update("assignedCounsellor", event.target.value)}><option>Unassigned</option>{COUNSELLORS.map((name) => <option key={name}>{name}</option>)}</SelectField></div><Badge tone={STATUS_COLORS[lead.status]}>{lead.status}</Badge></div>{error && <div className="alert" style={{ marginTop: 10 }}>{error}</div>}{saving && <div className="muted small" style={{ marginTop: 8 }}><Check size={12} style={{ verticalAlign: "-2px" }} /> Saving update...</div>}</div>;
}
