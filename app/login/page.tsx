"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEMO_USERS, setSessionUser } from "@/lib/auth";
import { Button, InputField } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("manager@example.com");
  const [password, setPassword] = useState("manager123");
  const [error, setError] = useState("");
  const login = (event: FormEvent) => {
    event.preventDefault();
    const match = DEMO_USERS.find((user) => user.email === email.trim().toLowerCase() && user.password === password);
    if (!match) { setError("Use one of the demo accounts below."); return; }
    setSessionUser({ name: match.name, email: match.email, role: match.role });
    router.push("/dashboard");
  };
  const useDemo = (index: number) => { const user = DEMO_USERS[index]; setEmail(user.email); setPassword(user.password); setError(""); };
  return <div className="login-page"><div className="login-box"><div className="brand" style={{ padding: 0 }}><span className="brand-mark">AD</span><div><strong>Admission Desk</strong><div className="small muted" style={{ marginTop: 3 }}>Lead management MVP</div></div></div><h1 className="login-title">Welcome back</h1><p className="login-subtitle">Sign in to manage prospective students, follow-ups, and conversion progress.</p><form onSubmit={login} style={{ display: "grid", gap: 16 }}><InputField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /><InputField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />{error && <div className="alert">{error}</div>}<Button type="submit"><LockKeyhole size={15} />Sign in <ArrowRight size={15} /></Button></form><div className="demo-login"><div className="field-label" style={{ marginBottom: 0 }}><ShieldCheck size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />Demo access</div>{DEMO_USERS.map((user, index) => <button className="demo-button" key={user.email} onClick={() => useDemo(index)}><div><strong style={{ fontSize: 13 }}>{user.role === "manager" ? "Manager" : "Counsellor"}</strong><span>{user.email}</span></div><ArrowRight size={15} color="#7c8ca0" /></button>)}</div></div></div>;
}
