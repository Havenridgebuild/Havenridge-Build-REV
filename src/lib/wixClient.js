import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { contacts } from "@wix/crm";

export const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || "82200a09-e8d2-498d-9d20-f0acfae7b59c";

export const wixClient = createClient({
  modules: {
    items,
    contacts,
  },
  auth: OAuthStrategy({
    clientId: WIX_CLIENT_ID,
  }),
});

/**
 * Submit a lead inquiry directly to Wix CRM Contacts
 */
export async function createWixLeadContact({
  firstName = "Website",
  lastName = "Lead",
  email = "",
  phone = "",
  projectType = "General Renovation",
  notes = "",
  source = "Website Contact Form"
}) {
  try {
    const contactPayload = {
      info: {
        name: {
          first: firstName || "Website",
          last: lastName || "Lead",
        },
        emails: email ? { items: [{ email, tag: "MAIN" }] } : undefined,
        phones: phone ? { items: [{ phone, tag: "MOBILE" }] } : undefined,
      }
    };

    console.log("Submitting lead to Wix CRM...", contactPayload);
    const response = await wixClient.contacts.createContact(contactPayload);
    console.log("✅ Wix CRM Lead Created Successfully:", response);
    return response;
  } catch (error) {
    console.error("⚠️ Wix CRM Lead Error (HTTP 403 - Check Headless Permissions in Wix Dashboard):", error?.message || error);
    return null;
  }
}

// Alias export
export const createWixContact = createWixLeadContact;
