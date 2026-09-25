"use client";

import { FormEvent, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { ACTIVITY_TYPES } from "@/lib/constants";
import { apiFetch, responseMessage } from "@/lib/client-api";
import type { LeadRecord } from "@/lib/types";
import { Button, InputField, SelectField, TextareaField } from "./ui";

export function ActivityForm({ leadId, onAdded }: { leadId: string; onAdded: (lead: LeadRecord) => void }) {
  const [type, setType] = useState("Call"); const [description, setDescription] = useState(""); const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setSaving(true); setError(""); try { const body = await responseMessage(await apiFetch(`/api/leads/${leadId}/activities`, { method: "POST", body: JSON.stringify({ type, description, date }) })); setDescription(""); onAdded(body.lead); } catch (err) { setError(err instanceof Error ? err.message : "Unable to add activity."); } finally { setSaving(false); } };
  return <form onSubmit={submit} style={{ padding: 20, display: "grid", gap: 15 }}><div className="form-grid"><SelectField label="Activity type" value={type} onChange={(event) => setType(event.target.value)}>{ACTIVITY_TYPES.map((item) => <option key={item}>{item}</option>)}</SelectField><InputField label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /><div className="form-full"><TextareaField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Called the student and discussed admission details..." required /></div></div>{error && <div className="alert">{error}</div>}<div className="form-actions" style={{ paddingTop: 0 }}><Button type="submit" disabled={saving}><MessageSquarePlus size={15} />{saving ? "Adding..." : "Add activity"}</Button></div></form>;
}
