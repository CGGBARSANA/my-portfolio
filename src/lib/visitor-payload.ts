export function GetVisitorPayload() {
  const visitorId =
    localStorage.getItem("visitor_id") || crypto.randomUUID();

  localStorage.setItem("visitor_id", visitorId);

  return {
    visitor_id: visitorId,

    page_url: window.location.href,
    referrer: document.referrer || null,

    user_agent: navigator.userAgent,

    browser: GetBrowser(),
    device_type: GetDeviceType(),

    session_id: GetSessionID(),
  };
}

function GetBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";

  return "Unknown";
}

function GetDeviceType() {
  const ua = navigator.userAgent;

  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";

  return "desktop";
}

function GetSessionID() {
  let sessionId = sessionStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("session_id", sessionId);
  }

  return sessionId;
}