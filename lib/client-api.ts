import { getSessionUser } from "./auth";

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const user = getSessionUser();
  const headers = new Headers(init.headers);
  if (user) headers.set("x-demo-user", user.name);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  return fetch(input, { ...init, headers });
}

export async function responseMessage(response: Response | Promise<Response>) {
  const resolved = await response;
  const body = await resolved.json().catch(() => ({}));
  if (!resolved.ok) throw new Error(body.error || "Something went wrong");
  return body;
}
