import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { firstName, lastName, clubEmail, clubName, role, timeline, message } =
      await request.json();

    if (!firstName || !lastName || !clubEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Blundell Analytics <noreply@blundellanalytics.ca>",
      to: "info@blundellanalytics.ca",
      replyTo: clubEmail,
      subject: `Report Request — ${clubName || `${firstName} ${lastName}`}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #111;">
          <h2 style="margin-bottom: 4px;">New Report Request</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 500;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${clubEmail}" style="color: #004aad;">${clubEmail}</a></td></tr>
            ${clubName ? `<tr><td style="padding: 8px 0; color: #6b7280;">Club</td><td style="padding: 8px 0; font-weight: 500;">${clubName}</td></tr>` : ""}
            ${role ? `<tr><td style="padding: 8px 0; color: #6b7280;">Role</td><td style="padding: 8px 0;">${role}</td></tr>` : ""}
            ${timeline ? `<tr><td style="padding: 8px 0; color: #6b7280;">Timeline</td><td style="padding: 8px 0;">${timeline}</td></tr>` : ""}
          </table>

          ${message
          ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                 <p style="font-size: 14px; color: #6b7280; margin-bottom: 6px;">Message</p>
                 <p style="font-size: 14px; white-space: pre-wrap;">${message}</p>`
          : ""
        }
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
