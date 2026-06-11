import { API_BASE } from "@/config/api";

export default async function POST_FETCH_MESSAGE(message: string) {
//   const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
    }),
  });
  if (response.status === 401) {
    window.location.replace("/dashboard");
    throw new Error("Error");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const result = await response.json();

  return result;
}
