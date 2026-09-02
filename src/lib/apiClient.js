// Independent API Client for Havenridge Build Frontend
const PRODUCTION_API_URL = "https://havenridge-build.vercel.app/api/contact";
const PRODUCTION_APPLY_URL = "https://havenridge-build.vercel.app/api/apply";

export async function submitLeadForm(leadPayload) {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const endpoints = isLocal
    ? ["/api/contact", PRODUCTION_API_URL]
    : [PRODUCTION_API_URL, "/api/contact"];

  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Submitting lead qualification payload to ${endpoint}...`, leadPayload);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Lead successfully sent to Pipedrive CRM:", data);
        return data;
      } else {
        const errText = await res.text();
        console.warn(`⚠️ Endpoint ${endpoint} HTTP ${res.status}:`, errText);
        lastError = new Error(`HTTP ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.warn(`⚠️ Endpoint ${endpoint} network error:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to submit lead to API");
}

export async function submitJobApplication(appPayload) {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const endpoints = isLocal
    ? ["/api/apply", PRODUCTION_APPLY_URL]
    : [PRODUCTION_APPLY_URL, "/api/apply"];

  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Submitting application payload to ${endpoint}...`, appPayload);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appPayload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Application successfully received:", data);
        return data;
      } else {
        const errText = await res.text();
        console.warn(`⚠️ Endpoint ${endpoint} HTTP ${res.status}:`, errText);
        lastError = new Error(`HTTP ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.warn(`⚠️ Endpoint ${endpoint} network error:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to submit application");
}

// Retain backward compatibility exports for wixClient imports
export const createWixContact = submitLeadForm;
export const createWixLeadContact = submitLeadForm;
