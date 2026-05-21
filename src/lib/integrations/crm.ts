/**
 * n8n CRM Webhook Integration Helper
 * Phase 1.2 — Daribati Contact Form
 *
 * Triggers the n8n CRM workflow with contact form data.
 * Requires N8N_CRM_WEBHOOK_URL env var.
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

export async function triggerCrmWebhook(data: ContactData): Promise<boolean> {
  const webhookUrl = process.env.N8N_CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("n8n CRM webhook URL not configured");
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
        `n8n CRM webhook failed: ${response.status} ${response.statusText}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("n8n CRM integration error:", error);
    return false;
  }
}
