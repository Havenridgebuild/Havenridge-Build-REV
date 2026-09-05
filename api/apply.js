const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const APPLICATIONS_EMAIL = process.env.APPLICATIONS_EMAIL || process.env.NOTIFICATION_EMAIL || "careers@havenridgebuild.com";

export default async function handler(req, res) {
  // Enable CORS for client-side frontend submissions
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
      applicantName = "Job Applicant",
      applicantEmail = "",
      applicantPhone = "",
      roleType = "Trade Partner / Subcontractor",
      experienceYears = "",
      message = "",
      resumeData = null
    } = body;

    const cleanName = (applicantName || "Job Applicant").trim();
    const cleanEmail = applicantEmail ? applicantEmail.trim() : "";
    const cleanPhone = applicantPhone ? applicantPhone.trim() : "";

    console.log("📩 New Careers Application Received:", { cleanName, cleanEmail, roleType });

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
            from: process.env.RESEND_FROM_EMAIL || "Havenridge Careers <careers@havenridgebuild.com>",
            to: [APPLICATIONS_EMAIL],
            subject: `💼 New Work With Us Application: ${cleanName} (${roleType})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; background-color: #ffffff;">
                <h2 style="color: #0B2638; margin-top: 0;">🔨 New Subcontractor / Career Application</h2>
                <p style="color: #4b5563; font-size: 14px;">An application to work with Havenridge Build was submitted on the website.</p>
                <div style="background-color: #f8fafc; border-left: 4px solid #CDAE72; padding: 16px; margin: 20px 0;">
                  <p style="margin: 4px 0;"><strong>Full Name:</strong> ${cleanName}</p>
                  <p style="margin: 4px 0;"><strong>Email Address:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
                  <p style="margin: 4px 0;"><strong>Phone Number:</strong> <a href="tel:${cleanPhone}">${cleanPhone}</a></p>
                  <p style="margin: 4px 0;"><strong>Role / Specialty:</strong> ${roleType}</p>
                  <p style="margin: 4px 0;"><strong>Years of Experience:</strong> ${experienceYears || "N/A"}</p>
                  <p style="margin: 4px 0;"><strong>Brief Introduction / Message:</strong> ${message || "N/A"}</p>
                </div>
              </div>
            `,
            attachments: resumeData ? [
              {
                filename: resumeData.filename,
                content: resumeData.content
              }
            ] : []
          })
        });
        if (resendRes.ok) emailStatus = "sent_via_resend";
      } catch (emailErr) {
        console.warn("⚠️ Resend Application Email Warning:", emailErr?.message || emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Application received successfully",
      emailStatus
    });
  } catch (error) {
    console.error("⚠️ Application Processing Error:", error?.message || error);
    return res.status(500).json({
      error: "Failed to process application",
      details: error?.message || String(error)
    });
  }
}
