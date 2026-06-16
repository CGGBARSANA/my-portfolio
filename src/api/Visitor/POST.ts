import { API_BASE } from "@/config/api";
import { GetVisitorPayload } from "@/lib/visitor-payload";

export default async function POST_VISITOR_PAYLOAD(url?: string) {
//   const token = localStorage.getItem("token");

    const payload = GetVisitorPayload();

    let urlAdd = {}
    if (!url){
    urlAdd = {
        ...payload,
        }
    }else{
    urlAdd = {
    ...payload,
    page_url: url,
    }
    }

    const response = await fetch(`${API_BASE}/visitor`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(urlAdd),
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
