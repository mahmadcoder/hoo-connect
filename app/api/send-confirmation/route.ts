import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, handle } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields: email or fullName" },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpUser || !smtpPassword) {
      console.warn("SMTP credentials not configured in environment variables.");
      return NextResponse.json(
        { error: "Email configuration missing on server." },
        { status: 500 }
      );
    }

    // Set up Nodemailer transport using Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // 1. User Welcome Email Template (HTML)
    const userMailOptions = {
      from: `"loop." <${smtpUser}>`,
      to: email,
      subject: "You're in the loop. Handle reserved! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to loop.</title>
          <style>
            body {
              background-color: #040C0A;
              color: #f3f4f6;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              table-layout: fixed;
              background-color: #040C0A;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #071512;
              border: 1px solid #143e35;
              border-radius: 24px;
              overflow: hidden;
            }
            .header {
              padding: 40px 40px 20px 40px;
              text-align: center;
            }
            .logo {
              font-size: 28px;
              font-weight: 800;
              color: #9DFFC4;
              text-decoration: none;
              letter-spacing: -0.03em;
            }
            .content {
              padding: 20px 40px;
              text-align: left;
              line-height: 1.6;
            }
            h1 {
              font-size: 24px;
              font-weight: 800;
              color: #ffffff;
              margin-top: 0;
              margin-bottom: 16px;
            }
            p {
              font-size: 15px;
              color: #a3a3a3;
              margin: 0 0 20px 0;
            }
            .card {
              background-color: rgba(157, 255, 196, 0.04);
              border: 1px solid rgba(157, 255, 196, 0.15);
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 24px;
            }
            .card-title {
              font-size: 13px;
              font-weight: 700;
              color: #9DFFC4;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin-bottom: 12px;
            }
            .detail-row {
              margin-bottom: 8px;
              font-size: 14px;
            }
            .detail-row:last-child {
              margin-bottom: 0;
            }
            .label {
              color: #6b7280;
              font-weight: 500;
            }
            .value {
              color: #ffffff;
              font-weight: 600;
            }
            .handle-badge {
              font-family: monospace;
              background-color: #9DFFC4;
              color: #040C0A;
              padding: 4px 8px;
              border-radius: 6px;
              font-weight: bold;
            }
            .footer {
              padding: 20px 40px 40px 40px;
              text-align: center;
              border-top: 1px solid #143e35;
              font-size: 12px;
              color: #4b5563;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <span class="logo">loop.</span>
              </div>
              <div class="content">
                <h1>You're on the list, ${fullName}!</h1>
                <p>Thanks for claiming early access. We've securely reserved your spot and your custom handle on the loop network.</p>
                
                <div class="card">
                  <div class="card-title">Reservation Details</div>
                  <div class="detail-row">
                    <span class="label">Name:</span>
                    <span class="value">${fullName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Reserved URL:</span>
                    <span class="value handle-badge">loop.me/${handle}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Status:</span>
                    <span class="value" style="color: #9DFFC4;">Early Access Guaranteed</span>
                  </div>
                </div>
                
                <p>We are rolling out dashboard profiles to creators and builders in staggered waves. When your wave opens, we will send an invite link to this email address so you can complete your profile setup.</p>
                <p>Keep building,</p>
                <p style="color: #ffffff; font-weight: 700; margin-bottom: 0;">The loop. Team</p>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} loop. All rights reserved.<br>
                This email was sent to ${email} regarding your early access reservation.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Admin Alert Email Template (HTML)
    const adminMailOptions = {
      from: `"loop. Waitlist Alerts" <${smtpUser}>`,
      to: smtpUser, // Send alert to the site owner
      subject: `New Waitlist Signup: @${handle} by ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New waitlist signup</title>
          <style>
            body { font-family: sans-serif; background-color: #f4f4f5; padding: 20px; color: #1f2937; }
            .container { max-width: 500px; background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; }
            h2 { margin-top: 0; color: #10b981; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            td { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
            .label { font-weight: bold; color: #4b5563; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New loop. waitlist signup! 🎉</h2>
            <p>Someone just reserved their URL handle on the landing page.</p>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${fullName}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Handle URL:</td>
                <td><strong>loop.me/${handle}</strong></td>
              </tr>
              <tr>
                <td class="label">Timestamp:</td>
                <td>${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMTP send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
