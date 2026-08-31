import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { contacts } from "@wix/crm";

export const WIX_API_KEY = import.meta.env.VITE_WIX_API_KEY || "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjk1ZGRjMzkyLTBhOGMtNDI3Zi05N2JkLTMxYTA4MTAwYTJhMFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjZlNWNjNGVjLTMyODktNDAzOC05M2I2LTllYTJjYWMzZDliOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJkYjMzOGNmOS0yMGYyLTRkZjAtYWNmNS0wNDZjNjE5ZWY1OTZcIn19IiwiaWF0IjoxNzg4MTM5MjA5fQ.mEMU8wV7e12HEUOICPzQv1p2xBCGFS9svMa9JcuM-jnAIQQA30qbP7vV2cVqRZO60rXkPuBOB4J8TetCyfRQ-Nj23gvqxHl78IGCVbgIEhq1iU5LcFFm_1JuO_XhQDF8H52MU02LmalC5svLlwnb4tk92UttJmbJI2ZdcPHPdkigfqXePW1L6NeFghkjSq0BDnWn11DoW1LPNtYMVkd6z-1Nwl_PhW6OoV7EOIBNmK4gR1ovjci95fSLq8z3tVAsJtooGV642ndCGKAoJBKOEMZcNql1AvS0NxIPOe3z4_8q7bbiA5xiUIHxKnc3Xar2QFKd9AVL96eXprByINDCMA";
export const WIX_SITE_ID = import.meta.env.VITE_WIX_SITE_ID || "bcc24467-7d67-4dc3-a70c-75cc5c6467fb";

export const wixClient = createClient({
  modules: {
    items,
    contacts,
  },
  auth: ApiKeyStrategy({
    apiKey: WIX_API_KEY,
    siteId: WIX_SITE_ID,
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
      name: {
        first: firstName || "Website",
        last: lastName || "Lead",
      },
      primaryInfo: {
        email: email || undefined,
        phone: phone || undefined,
      }
    };

    console.log("Submitting lead to Wix CRM...", contactPayload);
    const response = await wixClient.contacts.createContact(contactPayload);
    console.log("✅ Wix CRM Lead Created Successfully:", response);
    return response;
  } catch (error) {
    console.error("⚠️ Wix CRM Lead Capture Notice:", error?.message || error);
    return null;
  }
}

// Alias export
export const createWixContact = createWixLeadContact;
