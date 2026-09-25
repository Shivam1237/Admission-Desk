"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, ClipboardList, LayoutDashboard, LogOut, Menu, Plus, UserRound, UsersRound } from "lucide-react";
import { clearSessionUser } from "@/lib/auth";
import { useSession } from "@/app/providers";
import { cn } from "@/lib/ui";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: UsersRound },
  { href: "/follow-ups", label: "Follow-ups", icon: ClipboardList },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

function isActive(pathname: string, href: string) {
  return href === "/leads" ? pathname.startsWith("/leads") : pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useSession();
  if (pathname === "/login") return <>{children}</>;
  if (!ready || !user) return null;

  const title = links.find((link) => isActive(pathname, link.href))?.label || "Admission Desk";
  const logout = () => { clearSessionUser(); router.replace("/login"); };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">AD</span><div><strong>Admission Desk</strong><div className="small" style={{ color: "#8fa3bb", marginTop: 3 }}>Lead operations</div></div></div>
      <div className="nav-group"><p className="nav-label">Workspace</p>{links.map(({ href, label, icon: Icon }) => <Link key={href} className={cn("nav-link", isActive(pathname, href) && "active")} href={href}><Icon size={17} />{label}</Link>)}</div>
      <div className="nav-group"><p className="nav-label">Quick action</p><Link className="nav-link" href="/leads/new"><Plus size={17} />Add a lead</Link></div>
      <div className="user-chip"><span className="avatar">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div style={{ minWidth: 0, flex: 1 }}><strong style={{ display: "block", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</strong><span className="small" style={{ color: "#9db0c5" }}>{user.role === "manager" ? "Manager" : "Counsellor"}</span></div><button className="button ghost icon" title="Log out" onClick={logout}><LogOut size={15} /></button></div>
    </aside>
    <main className="main-shell">
      <header className="topbar"><div className="topbar-title"><Menu className="mobile-menu" size={19} />{title}</div><div className="topbar-meta"><span className="role-label muted small">{user.role === "manager" ? "Manager view" : "Counsellor view"}</span><span className="avatar small"><UserRound size={15} /></span></div></header>
      <nav className="mobile-nav">{links.map(({ href, label, icon: Icon }) => <Link key={href} className={cn("nav-link", isActive(pathname, href) && "active")} href={href}><Icon size={15} />{label}</Link>)}</nav>
      <div className="content">{children}</div>
    </main>
  </div>;
}
