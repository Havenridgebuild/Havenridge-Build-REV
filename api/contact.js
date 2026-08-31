import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm";

const WIX_API_KEY = process.env.WIX_API_KEY || "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjk1ZGRjMzkyLTBhOGMtNDI3Zi05N2JkLTMxYTA4MTAwYTJhMFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjZlNWNjNGVjLTMyODktNDAzOC05M2I2LTllYTJjYWMzZDliOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJkYjMzOGNmOS0yMGYyLTRkZjAtYWNmNS0wNDZjNjE5ZWY1OTZcIn19IiwiaWF0IjoxNzg4MTM5MjA5fQ.mEMU8wV7e12HEUOICPzQv1p2xBCGFS9svMa9JcuM-jnAIQQA30qbP7vV2cVqRZO60rXkPuBOB4J8TetCyfRQ-Nj23gvqxHl78IGCVbgIEhq1iU5LcFFm_1JuO_XhQDF8H52MU02LmalC5svLlwnb4tk92UttJmbJI2ZdcPHPdkigfqXePW1L6NeFghkjSq0BDnWn11DoW1LPNtYMVkd6z-1Nwl_PhW6OoV7EOIBNmK4gR1ovjci95fSLq8z3tVAsJtooGV642ndCGKAoJBKOEMZcNql1AvS0NxIPOe3z4_8q7bbiA5xiUIHxKnc3Xar2QFKd9AVL96eXprByINDCMA";
const WIX_SITE_ID = process.env.WIX_SITE_ID || "bcc24467-7d67-4dc3-a70c-75cc5c6467fb";

const wixClient = createClient({
  modules: { contacts },
  auth: ApiKeyStrategy({
    apiKey: WIX_API_KEY,
    siteId: WIX_SITE_ID,
  }),
});

export default async function handler(req, res) {
  // Enable CORS for browser frontend submissions
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const {
      firstName = "Website",
      lastName = "Lead",
      email = "",
      phone = "",
      address = "",
      city = "",
      postalCode = "",
      investment = "",
      projectTypes = [],
      description = ""
    } = body;

    const formattedFirstName = (firstName || "Website").trim();
    const formattedLastName = (lastName || "Lead").trim();
    const cleanEmail = email ? email.trim() : "";
    const cleanPhone = phone ? phone.trim() : "";

    const contactPayload = {
      name: {
        first: formattedFirstName,
        last: formattedLastName,
      },
    };

    if (cleanEmail || cleanPhone) {
      contactPayload.primaryInfo = {};
      if (cleanEmail) contactPayload.primaryInfo.email = cleanEmail;
      if (cleanPhone) contactPayload.primaryInfo.phone = cleanPhone;
    }

    if (cleanEmail) {
      contactPayload.emails = {
        items: [{ email: cleanEmail, tag: "MAIN", primary: true }]
      };
    }

    if (cleanPhone) {
      contactPayload.phones = {
        items: [{ phone: cleanPhone, tag: "MOBILE", primary: true }]
      };
    }

    if (address || city || postalCode) {
      contactPayload.addresses = {
        items: [{
          tag: "HOME",
          address: {
            addressLine1: (address || "").trim(),
            city: (city || "").trim(),
            postalCode: (postalCode || "").trim(),
          }
        }]
      };
    }

    if (investment) {
      contactPayload.company = `Budget: ${investment}`;
    }

    const typesStr = projectTypes && projectTypes.length > 0
      ? (Array.isArray(projectTypes) ? projectTypes.join(", ") : String(projectTypes))
      : "";

    if (typesStr) {
      contactPayload.jobTitle = `Project: ${typesStr}`;
    } else if (description) {
      contactPayload.jobTitle = `Details: ${description.substring(0, 50)}`;
    }

    console.log("Submitting lead payload to Wix CRM...", contactPayload);
    const response = await wixClient.contacts.createContact(contactPayload);
    console.log("✅ Wix CRM Lead Created Successfully:", response?.contact?._id);

    return res.status(200).json({
      success: true,
      message: "Lead created successfully in Wix CRM",
      contactId: response?.contact?._id
    });
  } catch (error) {
    console.error("⚠️ Wix CRM Serverless Lead Error:", error?.message || error);
    return res.status(500).json({
      error: "Failed to create lead in Wix CRM",
      details: error?.message || String(error)
    });
  }
}
