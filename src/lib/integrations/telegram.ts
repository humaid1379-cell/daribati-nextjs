/**
 * Telegram Bot Integration Helper
 * Phase 1.2 — Daribati Contact Form
 *
 * Sends notification alerts to admin Telegram channel.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
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
}

export async function sendTelegramAlert(data: ContactData): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram bot credentials not configured");
    return false;
  }

  const message = [
    `📩 استفسار جديد - ${data.reference}`,
    "",
    `👤 ${data.name}`,
    `📧 ${data.email}`,
    `📱 ${data.phone || "غير محدد"}`,
    `🏢 ${data.company || "غير محدد"}`,
    `📋 ${data.subject}`,
    "",
    `💬 ${data.message}`,
    "",
    `🕐 ${data.timestamp}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        `Telegram API failed: ${response.status} ${response.statusText}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Telegram integration error:", error);
    return false;
  }
}
