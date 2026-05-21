/**
 * Contact Form Validation Rules
 * Phase 1.2 — Daribati Contact Form Upgrade
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
  honeypot?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const VALID_SUBJECTS = [
  "general",
  "pricing",
  "support",
  "partnership",
] as const;

export type Subject = (typeof VALID_SUBJECTS)[number];

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true;
  return /^\+971\d{9}$/.test(phone.replace(/\s/g, ""));
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = sanitizeInput(data.name || "");
  const email = sanitizeInput(data.email || "");
  const phone = sanitizeInput(data.phone || "");
  const message = sanitizeInput(data.message || "");
  const subject = sanitizeInput(data.subject || "general");

  if (!name || name.length < 2 || name.length > 100) {
    errors.name = "الاسم مطلوب (2-100 حرف)";
  }

  if (!email || !validateEmail(email)) {
    errors.email = "البريد الإلكتروني غير صالح";
  }

  if (phone && !validatePhone(phone)) {
    errors.phone = "رقم الهاتف غير صالح (صيغة +971)";
  }

  if (!message || message.length < 10 || message.length > 2000) {
    errors.message = "الرسالة مطلوبة (10-2000 حرف)";
  }

  if (subject && !VALID_SUBJECTS.includes(subject as Subject)) {
    errors.subject = "نوع الاستفسار غير صالح";
  }

  return errors;
}
