const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN || "e19e3b9b7d2a0646e7752f4d41eb88f763bfeecf";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "info@havenridgebuild.com";

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
      uploadedFilesData = null,
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

    // --- PIPEDRIVE MAPPING LOGIC ---
    const mapInvestment = (val) => {
      if (!val) return null;
      if (val.includes('Under $20')) return 141;
      if (val.includes('$20,000')) return 142;
      if (val.includes('$50,000')) return 143;
      if (val.includes('$100,000')) return 144;
      if (val.includes('$250,000')) return 145;
      if (val.includes('$500,000')) return 146;
      if (val.includes('guidance')) return 147;
      return null;
    };

    const mapTiming = (val) => {
      if (!val) return null;
      if (val.includes('0') && val.includes('3')) return 133;
      if (val.includes('3') && val.includes('6')) return 134;
      if (val.includes('6') && val.includes('12')) return 135;
      if (val.includes('12') && val.includes('24')) return 136;
      if (val.includes('Flexible') || val.includes('not sure')) return 137;
      return null;
    };

    const mapSource = (val) => {
      if (!val) return null;
      if (val.includes('Referral')) return 116;
      if (val.includes('Google')) return 117;
      if (val.includes('Social media') || val.includes('Social Media')) return 118;
      if (val.includes('Sign') || val.includes('vehicle')) return 119;
      if (val.includes('Baeumler')) return 120;
      if (val.includes('RenoMark')) return 121;
      if (val.includes('Chamber')) return 122;
      if (val.includes('Returning')) return 123;
      if (val.includes('Other')) return 124;
      return null;
    };

    const mapDecisionMakers = (val) => {
      if (!val) return null;
      if (val.includes('Yes')) return 138;
      if (val.includes('Not yet')) return 139;
      if (val.includes('sole')) return 140;
      return null;
    };

    const mapHomeOccupied = (val) => {
      if (!val) return null;
      if (val.includes('Yes')) return 130;
      if (val.includes('No')) return 131;
      if (val.includes('Not sure')) return 132;
      return null;
    };

    const mapDesignStatus = (val) => {
      if (!val) return null;
      if (val.includes('coordinate design')) return 111;
      if (val.includes('preliminary plans')) return 112;
      if (val.includes('permit-ready')) return 113;
      if (val.includes('submitted')) return 114;
      if (val.includes('guidance')) return 115;
      return null;
    };

    const mapProjectTypes = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return null;
      const mapped = [];
      arr.forEach(t => {
        if (t.includes('Kitchen')) mapped.push(101);
        else if (t.includes('Bathroom')) mapped.push(102);
        else if (t.includes('Basement')) mapped.push(103);
        else if (t.includes('Whole-home')) mapped.push(104);
        else if (t.includes('Addition')) mapped.push(105);
        else if (t.includes('ADU')) mapped.push(106);
        else if (t.includes('Multi-Unit')) mapped.push(107);
        else if (t.includes('Accessible')) mapped.push(108);
        else if (t.includes('Design Only')) mapped.push(109);
        else mapped.push(110);
      });
      return mapped.join(',');
    };


    // 1. PIPEDRIVE INTEGRATION
    if (PIPEDRIVE_API_TOKEN) {
      try {
        const personRes = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${PIPEDRIVE_API_TOKEN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: cleanEmail ? [cleanEmail] : [],
            phone: cleanPhone ? [cleanPhone] : [],
            "cf64483c4670da016b7a07d30d7354308938d646": fullSiteAddress
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
            "942f85eeee6b601f3c44970b723e20244f3b42b6": mapInvestment(investment) || null,
            "23677f1698f93482be883591def4ad78f2c51559": mapProjectTypes(projectTypes) || null,
            "63a419dda9253a5f826bfc17bff142ff7519e401": mapDesignStatus(designStatus) || null,
            "19bc780543f09b515e9f7c2bbb1cab1f2343ba9b": mapTiming(timing) || null,
            "2e84281f410c132a062c9d6a364f3bcd8e57071f": mapDecisionMakers(decisionMakers) || null,
            "c6eabb8cfaaa266dcd72399f23e296c1ddd6a4c1": mapHomeOccupied(homeOccupied) || null,
            "cd213a1e958652bc211a30576e83205c318424d0": mapSource(source) || null,
            "61ebb6977bedc5f6f96aa599374aff5c52793705": description
          })
        });
        const dealData = await dealRes.json();
        if (!dealData?.success) {
          console.error("PIPEDRIVE DEAL ERROR:", dealData);
        }
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
            ${uploadedFilesData && uploadedFilesData.length > 0 ? `<p><b>Attachments:</b> ${uploadedFilesData.length} files attached securely to Pipedrive Deal.</p>` : ""}
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

          // Upload Files to Pipedrive Deal
          if (uploadedFilesData && uploadedFilesData.length > 0) {
            for (const fileData of uploadedFilesData) {
              try {
                const buffer = Buffer.from(fileData.content, "base64");
                const blob = new Blob([buffer], { type: fileData.type || "application/octet-stream" });
                const formData = new FormData();
                formData.append("file", blob, fileData.filename);
                formData.append("deal_id", pipedriveDealId);
                
                const fileRes = await fetch(`https://api.pipedrive.com/v1/files?api_token=${PIPEDRIVE_API_TOKEN}`, {
                  method: "POST",
                  body: formData
                });
                const fileDataResult = await fileRes.json();
                if(!fileDataResult.success) {
                  console.warn("Pipedrive File API returned false success flag", fileDataResult);
                }
              } catch (fileErr) {
                console.warn("Pipedrive File Upload Error:", fileErr?.message || fileErr);
              }
            }
          }
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
            from: "Havenridge Build <info@havenridgebuild.com>",
            to: ["info@havenridgebuild.com"],
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
                  ${uploadedFilesData && uploadedFilesData.length > 0 ? `<p style="margin: 8px 0; padding-top: 8px; border-top: 1px dashed #cbd5e1;"><strong>📎 Uploaded Attachments:</strong> ${uploadedFilesData.length} file(s) attached to this email.</p>` : ""}
                </div>

                ${description ? `
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="color: #0B2638; margin-top: 0; font-size: 16px;">📝 Project Description & Homeowner Notes</h3>
                  <p style="margin: 4px 0; white-space: pre-wrap; color: #334155;">${description}</p>
                </div>` : ""}
              </div>
            `,
            attachments: uploadedFilesData && uploadedFilesData.length > 0 ? uploadedFilesData.map(f => ({
              filename: f.filename,
              content: f.content
            })) : []
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
