// API endpoints för autentisering
// Ansluter till .NET backend på localhost:5001

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name?: string };
}

export type AuthUser = AuthResponse["user"];

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

const API_BASE = window.location.protocol === "https:" ? "https://localhost:5001/api" : "http://localhost:5000/api"; // choose backend URL depending on frontend protocol

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    
    let msg = "Inloggningen misslyckades";
    try {
      const data = await response.json();
      msg = data?.message || (data?.errors ? data.errors.join("; ") : msg);
    } catch (_) {
      try {
        msg = await response.text();
      } catch (_) {}
    }
    throw new Error(msg);
  }

  return response.json();
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let msg = "Registreringen misslyckades";
    try {
      const data = await response.json();
      msg = data?.message || (data?.errors ? data.errors.join("; ") : msg);
    } catch (_) {
      try {
        msg = await response.text();
      } catch (_) {}
    }
    throw new Error(msg);
  }

  return response.json();
}

export function logout(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export function getStoredToken(): string | null {
  return localStorage.getItem("authToken");
}

export function saveToken(token: string, user: { id: string; email: string; name?: string }): void {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  const response = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
