export type DemoRole = "manager" | "counsellor";

export interface SessionUser {
  name: string;
  email: string;
  role: DemoRole;
}

export const DEMO_USERS: Array<SessionUser & { password: string }> = [
  { name: "Demo Manager", email: "manager@example.com", password: "manager123", role: "manager" },
  { name: "Demo Counsellor", email: "counsellor@example.com", password: "counsellor123", role: "counsellor" },
];

const SESSION_KEY = "admission-crm-session";

export function getSessionUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(SESSION_KEY);
    return value ? (JSON.parse(value) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: SessionUser) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSessionUser() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function canManageAll(user: SessionUser | null) {
  return user?.role === "manager";
}
