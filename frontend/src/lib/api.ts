export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
}

export function saveAuthSession(
  token: string,
  user: { id?: string | null; role?: string; [key: string]: unknown }
) {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  if (user.id) localStorage.setItem("userId", user.id);
  if (user.role) localStorage.setItem("userRole", user.role);
  if (user.role === "patient" && user.id) localStorage.setItem("patientId", user.id);

  const cookieOptions = "path=/; max-age=604800; samesite=lax";
  document.cookie = `token=${encodeURIComponent(token)}; ${cookieOptions}`;
  document.cookie = `userRole=${encodeURIComponent(user.role || "")}; ${cookieOptions}`;
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; ${cookieOptions}`;
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  ["token", "user", "userId", "userRole", "patientId"].forEach((key) =>
    localStorage.removeItem(key)
  );
  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "user=; path=/; max-age=0";
  document.cookie = "userRole=; path=/; max-age=0";
}

export function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
