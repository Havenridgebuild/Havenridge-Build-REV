const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN || "e19e3b9b7d2a0646e7752f4d41eb88f763bfeecf";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "Micheal@Havenridgebuild.com";

export default async function handler(req, res) {
  // Enable CORS headers for client-side frontend submissions
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
      city = "Cambridge",
      postalCode = "",
      investment = "",
      projectTypes = [],
      designStatus = "",
      timing = "",
      decisionMakers = "",
      homeOccupied = "",
      source = "",
      uploadedFile = "",
      description = ""
    } = body;

    const formattedFirstName = (firstName || "Website").trim();
    const formattedLastName = (lastName || "Lead").trim();
    const fullName = `${formattedFirstName} ${formattedLastName}`.trim();
    const cleanEmail = email ? email.trim() : "";
    const cleanPhone = phone ? phone.trim() : "";
    const typesStr = Array.isArray(projectTypes) ? projectTypes.join(", ") : String(projectTypes || "");
    const fullSiteAddress = [address, city, postalCode].filter(Boolean).join(", ");

    let pipedrivePersonId = null;
    let pipedriveDealId = null;

    // 1. PIPEDRIVE INTEGRATION
    if (PIPEDRIVE_API_TOKEN) {
      try {
        const personRes = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${PIPEDRIVE_API_TOKEN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: cleanEmail ? [cleanEmail] : [],
            phone: cleanPhone ? [cleanPhone] : []
          })
        });
        const personData = await personRes.json();
        if (personData?.success && personData?.data?.id) {
          pipedrivePersonId = personData.data.id;
        }

        const dealRes = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${PIPEDRIVE_API_TOKEN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `Havenridge Lead: ${fullName} - ${typesStr || "Renovation"}`,
            person_id: pipedrivePersonId,
            stage_id: 1,
            currency: "CAD",
            "2ce2a93e96753839a3d8251182f002231638404f": fullSiteAddress
          })
        });
        const dealData = await dealRes.json();
        if (dealData?.success && dealData?.data?.id) {
          pipedriveDealId = dealData.data.id;

          const htmlNote = `
            <h3>🏠 New Havenridge Website Lead Qualification</h3>
            <hr/>
            <p><b>Client Name:</b> ${fullName}</p>
            <p><b>Email:</b> ${cleanEmail || "N/A"}</p>
            <p><b>Phone:</b> ${cleanPhone || "N/A"}</p>
            <p><b>Site Address:</b> ${fullSiteAddress || "N/A"}</p>
            <p><b>Investment Budget:</b> ${investment || "Not specified"}</p>
            <p><b>Project Scope:</b> ${typesStr || "Not specified"}</p>
            <p><b>Design & Plans Status:</b> ${designStatus || "Not specified"}</p>
            <p><b>Target Start Timeline:</b> ${timing || "Not specified"}</p>
            <p><b>Decision Makers Aligned:</b> ${decisionMakers || "Not specified"}</p>
            <p><b>Home Occupied During Build:</b> ${homeOccupied || "Not specified"}</p>
            <p><b>How Found Us:</b> ${source || "Not specified"}</p>
            ${uploadedFile ? `<p><b>Uploaded Attachment:</b> <a href="${uploadedFile}" target="_blank">${uploadedFile}</a></p>` : ""}
            <p><b>Project Description:</b> ${description || "None provided"}</p>
            <p><i>Submitted via Havenridge Build Website</i></p>
          `;

          await fetch(`https://api.pipedrive.com/v1/notes?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deal_id: pipedriveDealId,
              content: htmlNote
            })
          });
        }
      } catch (pipeErr) {
        console.warn("⚠️ Pipedrive Sync Warning:", pipeErr?.message || pipeErr);
      }
    }

    // 2. RESEND EMAIL ENGINE
    let emailStatus = "logged_locally";
    if (RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "Havenridge Build <info@havenridgebuild.com>",
            to: [NOTIFICATION_EMAIL],
            subject: `🏠 Lead Confirmation: ${fullName} (${typesStr || "Renovation"})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; background-color: #ffffff;">
                <h2 style="color: #0B2638; margin-top: 0; border-bottom: 2px solid #CDAE72; padding-bottom: 10px;">🏠 New Havenridge Lead Qualification</h2>
                
                <div style="background-color: #f8fafc; border-left: 4px solid #CDAE72; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #0B2638; margin-top: 0; font-size: 16px;">👤 Homeowner Contact Information</h3>
                  <p style="margin: 4px 0;"><strong>Full Name:</strong> ${fullName}</p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
                  <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${cleanPhone}">${cleanPhone}</a></p>
                  <p style="margin: 4px 0;"><strong>Property Address:</strong> ${fullSiteAddress || "Waterloo Region"}</p>
                </div>

                <div style="background-color: #f8fafc; border-left: 4px solid #0B2638; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #0B2638; margin-top: 0; font-size: 16px;">📋 Project Scope & Qualification Details</h3>
                  <p style="margin: 4px 0;"><strong>Investment Budget:</strong> <span style="color: #CDAE72; font-weight: bold;">${investment || "Not specified"}</span></p>
                  <p style="margin: 4px 0;"><strong>Project Scope:</strong> ${typesStr || "Not specified"}</p>
                  <p style="margin: 4px 0;"><strong>Design & Architectural Plans Status:</strong> ${designStatus || "Not specified"}</p>
                  <p style="margin: 4px 0;"><strong>Target Start Timeline:</strong> ${timing || "Not specified"}</p>
                  <p style="margin: 4px 0;"><strong>All Decision Makers Aligned:</strong> ${decisionMakers || "Not specified"}</p>
                  <p style="margin: 4px 0;"><strong>Home Occupied During Build:</strong> ${homeOccupied || "Not specified"}</p>
                  <p style="margin: 4px 0;"><strong>How Found Us:</strong> ${source || "Not specified"}</p>
                  ${uploadedFile ? `<p style="margin: 8px 0; padding-top: 8px; border-top: 1px dashed #cbd5e1;"><strong>📎 Uploaded Attachment / Design File:</strong> <a href="${uploadedFile}" target="_blank" style="color: #0B2638; font-weight: bold; text-decoration: underline;">View Uploaded File</a></p>` : ""}
                </div>

                ${description ? `
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #0B2638; margin-top: 0; font-size: 16px;">📝 Project Description & Homeowner Notes</h3>
                  <p style="margin: 4px 0; white-space: pre-wrap; color: #334155;">${description}</p>
                </div>` : ""}
              </div>
            `
          })
        });
        if (resendRes.ok) emailStatus = "sent_via_resend";
      } catch (emailErr) {
        console.warn("⚠️ Resend Email Warning:", emailErr?.message || emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Lead processed successfully",
      pipedrivePersonId,
      pipedriveDealId,
      emailStatus
    });
  } catch (error) {
    console.error("⚠️ Lead Processing Error:", error?.message || error);
    return res.status(500).json({
      error: "Failed to process lead submission",
      details: error?.message || String(error)
    });
  }
}
