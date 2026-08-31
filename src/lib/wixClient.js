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
    const contactInfo = {
      name: {
        first: firstName,
        last: lastName,
      },
      emails: email ? { items: [{ email, tag: "MAIN" }] } : undefined,
      phones: phone ? { items: [{ phone, tag: "MOBILE" }] } : undefined,
      extendedFields: {
        items: {
          "custom.project-type": projectType,
          "custom.lead-source": source,
          "custom.notes": notes,
        }
      }
    };

    const response = await wixClient.contacts.createContact({ info: contactInfo });
    console.log("✅ Wix CRM Lead Created Successfully:", response);
    return response;
  } catch (error) {
    console.warn("⚠️ Wix CRM Lead Capture Notice:", error?.message || error);
    return null;
  }
}

// Alias export
export const createWixContact = createWixLeadContact;
