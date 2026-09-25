"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { ACTIVITY_TYPES, COUNSELLORS, COURSES, LEAD_SOURCES, LEAD_STATUSES, toInputDate } from "@/lib/constants";
import { apiFetch, responseMessage } from "@/lib/client-api";
import type { LeadRecord } from "@/lib/types";
import { Button, InputField, Panel, SelectField, TextareaField } from "./ui";

export function LeadForm({ lead }: { lead?: LeadRecord }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: lead?.name || "", phone: lead?.phone || "", email: lead?.email || "", course: lead?.course || "MCA", leadSource: lead?.leadSource || "Website", status: lead?.status || "New", assignedCounsellor: lead?.assignedCounsellor || "Unassigned", nextFollowUpDate: toInputDate(lead?.nextFollowUpDate), notes: lead?.notes || "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(""); setSaving(true);
    try {
      const response = await apiFetch(lead ? `/api/leads/${lead.id}` : "/api/leads", { method: lead ? "PUT" : "POST", body: JSON.stringify(form) });
      const body = await responseMessage(response);
      router.push(`/leads/${body.lead.id}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save the lead."); } finally { setSaving(false); }
  };
  return <Panel title={lead ? "Edit lead details" : "Lead information"} caption="Required fields are marked by the form label"><form onSubmit={submit} style={{ padding: 20 }}><div className="form-grid"><InputField label="Full name *" value={form.name} onChange={(event) => update("name", event.target.value)} required placeholder="e.g. Ananya Mehta" /><InputField label="Phone *" value={form.phone} onChange={(event) => update("phone", event.target.value)} required placeholder="e.g. 9876501001" /><InputField label="Email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="student@example.com" /><SelectField label="Course *" value={form.course} onChange={(event) => update("course", event.target.value)}>{COURSES.map((course) => <option key={course}>{course}</option>)}</SelectField><SelectField label="Lead source *" value={form.leadSource} onChange={(event) => update("leadSource", event.target.value)}>{LEAD_SOURCES.map((source) => <option key={source}>{source}</option>)}</SelectField><SelectField label="Status" value={form.status} onChange={(event) => update("status", event.target.value)}>{LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}</SelectField><SelectField label="Assigned counsellor" value={form.assignedCounsellor} onChange={(event) => update("assignedCounsellor", event.target.value)}><option>Unassigned</option>{COUNSELLORS.map((counsellor) => <option key={counsellor}>{counsellor}</option>)}</SelectField><InputField label="Next follow-up" type="date" value={form.nextFollowUpDate} onChange={(event) => update("nextFollowUpDate", event.target.value)} /><div className="form-full"><TextareaField label="Notes" value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Add context for the next conversation..." /></div></div>{error && <div className="alert" style={{ marginTop: 18 }}>{error}</div>}<div className="form-actions"><Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button><Button type="submit" disabled={saving}><Save size={15} />{saving ? "Saving…" : lead ? "Save changes" : "Create lead"}</Button></div></form></Panel>;
}
