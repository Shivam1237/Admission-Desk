"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/ui";

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return <button className={cn("button", variant, className)} {...props} />;
}

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: string }) {
  return <span className={cn("badge", tone)}>{children}</span>;
}

export function PageHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="page-header"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1 className="page-title">{title}</h1>{subtitle && <p className="page-subtitle">{subtitle}</p>}</div>{action}</div>;
}

export function Panel({ title, caption, action, children, className }: { title?: string; caption?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={cn("panel", className)}>{title && <div className="panel-header"><div><h2 className="panel-title">{title}</h2>{caption && <span className="panel-caption">{caption}</span>}</div>{action}</div>}{children}</section>;
}

export function StatCard({ label, value, icon, tone = "teal" }: { label: string; value: React.ReactNode; icon: React.ReactNode; tone?: string }) {
  return <div className="stat-card"><div className="stat-card-top"><span>{label}</span><span className={cn("stat-icon", tone)}>{icon}</span></div><strong className="stat-value">{value}</strong></div>;
}

export function EmptyState({ message = "Nothing to show yet.", icon = <Inbox size={18} /> }: { message?: string; icon?: React.ReactNode }) {
  return <div className="empty"><div className="empty-icon">{icon}</div><div>{message}</div></div>;
}

export function LoadingState() {
  return <div className="empty"><div className="muted">Loading...</div></div>;
}

export function InputField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label><span className="field-label">{label}</span><input className="input" {...props} /></label>;
}

export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return <label><span className="field-label">{label}</span><select className="select" {...props}>{children}</select></label>;
}

export function TextareaField({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label><span className="field-label">{label}</span><textarea className="textarea" {...props} /></label>;
}
