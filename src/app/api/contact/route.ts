import { NextRequest, NextResponse } from "next/server";

// Rate limiting store (in-memory for Edge Runtime)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour window
    return true;
  }
  if (limit.count >= 3) return false; // 3 requests per hour
  limit.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // optional
  return /^\+971\d{9}$/.test(phone.replace(/\s/g, ""));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, subject, honeypot } = body;

    // Honeypot check - silent reject
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "تم إرسال رسالتك بنجاح." },
        { status: 200 }
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً.",
        },
        { status: 429 }
      );
    }

    // Validation
    const errors: Record<string, string> = {};

    const cleanName = sanitizeInput(name || "");
    const cleanEmail = sanitizeInput(email || "");
    const cleanPhone = sanitizeInput(phone || "");
    const cleanCompany = sanitizeInput(company || "");
    const cleanMessage = sanitizeInput(message || "");
    const cleanSubject = sanitizeInput(subject || "general");

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      errors.name = "الاسم مطلوب (2-100 حرف)";
    }
    if (!cleanEmail || !validateEmail(cleanEmail)) {
      errors.email = "البريد الإلكتروني غير صالح";
    }
    if (cleanPhone && !validatePhone(cleanPhone)) {
      errors.phone = "رقم الهاتف غير صالح (صيغة +971)";
    }
    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 2000) {
      errors.message = "الرسالة مطلوبة (10-2000 حرف)";
    }
    if (
      cleanSubject &&
      !["general", "pricing", "support", "partnership"].includes(cleanSubject)
    ) {
      errors.subject = "نوع الاستفسار غير صالح";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Generate reference ID
    const reference = `DAR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const contactData = {
      reference,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
      message: cleanMessage,
      subject: cleanSubject,
      timestamp: new Date().toISOString(),
      ip,
      source: "daribati.ae/contact",
    };

    // Send to integrations (non-blocking, don't fail the request)
    const integrationPromises = [];

    // Google Sheets via webhook
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      integrationPromises.push(
        fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }).catch((err) => console.error("Google Sheets error:", err))
      );
    }

    // Telegram Alert
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMessage = `📩 استفسار جديد - ${reference}\n\n👤 ${cleanName}\n📧 ${cleanEmail}\n📱 ${cleanPhone || "غير محدد"}\n🏢 ${cleanCompany || "غير محدد"}\n📋 ${cleanSubject}\n\n💬 ${cleanMessage}`;
      integrationPromises.push(
        fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: telegramMessage,
            }),
          }
        ).catch((err) => console.error("Telegram error:", err))
      );
    }

    // n8n CRM Webhook
    if (process.env.N8N_CRM_WEBHOOK_URL) {
      integrationPromises.push(
        fetch(process.env.N8N_CRM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }).catch((err) => console.error("n8n CRM error:", err))
      );
    }

    // Wait for integrations (with timeout)
    await Promise.allSettled(integrationPromises);

    return NextResponse.json(
      {
        success: true,
        message: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
        reference,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ. يرجى المحاولة لاحقاً.",
      },
      { status: 500 }
    );
  }
}
