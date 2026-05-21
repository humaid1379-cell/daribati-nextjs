/**
 * Google Sheets Integration Helper
 * Phase 1.2 — Daribati Contact Form
 *
 * Sends contact form data to Google Sheets via n8n webhook.
 * The webhook URL is stored in GOOGLE_SHEETS_WEBHOOK_URL env var.
 */

export interface ContactData {
  reference: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  subject: string;
  timestamp: string;
  ip: string;
  source: string;
}

export async function writeToGoogleSheets(
  data: ContactData
): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Google Sheets webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(
        `Google Sheets webhook failed: ${response.status} ${response.statusText}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Google Sheets integration error:", error);
    return false;
  }
}
