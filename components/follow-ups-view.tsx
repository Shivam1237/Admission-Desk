"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarCheck2, Check, ExternalLink, MessageSquarePlus } from "lucide-react";
import { apiFetch, responseMessage } from "@/lib/client-api";
import { formatDate, STATUS_COLORS } from "@/lib/constants";
import type { FollowUpRecord } from "@/lib/types";
import { Badge, Button, EmptyState, LoadingState, PageHeader, Panel } from "./ui";

type Tab = "today" | "upcoming" | "overdue";

export function FollowUpsView() {
  const [items, setItems] = useState<FollowUpRecord[]>([]); const [summary, setSummary] = useState({ today: 0, upcoming: 0, overdue: 0 }); const [tab, setTab] = useState<Tab>("today"); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = async () => { setLoading(true); try { const body = await responseMessage(await apiFetch("/api/follow-ups")); setItems(body.followUps); setSummary(body.summary); } catch (err) { setError(err instanceof Error ? err.message : "Unable to load follow-ups."); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const visible = useMemo(() => items.filter((item) => item.followUpBucket === tab), [items, tab]);
  const complete = async (item: FollowUpRecord) => { const note = window.prompt("Optional completion note", ""); try { const body = await responseMessage(await apiFetch(`/api/follow-ups/${item.id}/complete`, { method: "POST", body: JSON.stringify({ note: note || "" }) })); setItems((current) => current.filter((lead) => lead.id !== body.lead.id)); setSummary((current) => ({ ...current, [item.followUpBucket]: Math.max(0, current[item.followUpBucket] - 1) })); } catch (err) { setError(err instanceof Error ? err.message : "Unable to complete follow-up."); } };
  return <><PageHeader eyebrow="Daily workflow" title="Follow-ups" subtitle="Keep every promised conversation visible and actionable." /><Panel>{<div className="followup-tabs"><button className={`tab ${tab === "today" ? "active" : ""}`} onClick={() => setTab("today")}>Today <Badge tone="blue">{summary.today}</Badge></button><button className={`tab ${tab === "upcoming" ? "active" : ""}`} onClick={() => setTab("upcoming")}>Upcoming <Badge tone="slate">{summary.upcoming}</Badge></button><button className={`tab ${tab === "overdue" ? "active" : ""}`} onClick={() => setTab("overdue")}>Overdue <Badge tone="red">{summary.overdue}</Badge></button></div>}{error && <div className="alert" style={{ margin: 18 }}>{error}</div>}{loading ? <LoadingState /> : !visible.length ? <EmptyState message={`No ${tab} follow-ups.`} icon={<CalendarCheck2 size={18} />} /> : <div className="followup-list">{visible.map((item) => <FollowUpRow key={item.id} item={item} onComplete={() => complete(item)} onUpdated={load} />)}</div>}</Panel></>;
}

function FollowUpRow({ item, onComplete, onUpdated }: { item: FollowUpRecord; onComplete: () => void; onUpdated: () => void }) {
  const [date, setDate] = useState(item.nextFollowUpDate ? new Date(item.nextFollowUpDate).toISOString().slice(0, 10) : ""); const [note, setNote] = useState(""); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  const save = async () => { setSaving(true); setMessage(""); try { await responseMessage(await apiFetch(`/api/leads/${item.id}`, { method: "PUT", body: JSON.stringify({ nextFollowUpDate: date }) })); if (note.trim()) await responseMessage(await apiFetch(`/api/leads/${item.id}/activities`, { method: "POST", body: JSON.stringify({ type: "Note", description: note }) })); setNote(""); setMessage("Saved"); onUpdated(); } catch (err) { setMessage(err instanceof Error ? err.message : "Unable to save."); } finally { setSaving(false); } };
  return <div className="followup-row"><div className="followup-main"><span className="avatar"><CalendarCheck2 size={15} /></span><div style={{ minWidth: 0 }}><Link href={`/leads/${item.id}`} className="lead-name">{item.name}</Link><div className="muted small">{item.phone} · {item.course} · {item.assignedCounsellor}</div><div style={{ marginTop: 7 }}><Badge tone={STATUS_COLORS[item.status]}>{item.status}</Badge><span className="small muted" style={{ marginLeft: 8 }}>Scheduled {formatDate(item.nextFollowUpDate)}</span></div></div></div><div className="followup-actions"><input className="input mini-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} title="Set next follow-up" /><input className="input" style={{ width: 190 }} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" title="Add a note" /><Button variant="secondary" onClick={save} disabled={saving}><MessageSquarePlus size={14} />Save</Button><Button onClick={onComplete}><Check size={14} />Complete</Button><Link href={`/leads/${item.id}`} className="button ghost icon" title="Open lead"><ExternalLink size={15} /></Link>{message && <span className="small muted">{message}</span>}</div></div>;
}
