import { getStoredToken } from "./auth";

export interface ProfileResponse {
  id: string;
  email: string;
  name?: string;
  username: string;
  level: string;
  totalDives: number;
  countries: number;
  since: string;
}

const API_BASE = window.location.protocol === "https:" ? "https://localhost:5001/api" : "http://localhost:5000/api";

export async function getMyProfile(): Promise<ProfileResponse | null> {
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  const response = await fetch(`${API_BASE}/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
