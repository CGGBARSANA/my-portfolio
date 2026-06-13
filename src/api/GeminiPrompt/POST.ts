import { API_BASE } from "@/config/api";
import { GetVisitorPayload } from "@/lib/visitor-payload";
export default async function POST_FETCH_MESSAGE(message: string) {
//   const token = localStorage.getItem("token");
  const visitor = GetVisitorPayload()
  const response = await fetch(`${API_BASE}/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      user_id: visitor.visitor_id,
      role: "user"
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
