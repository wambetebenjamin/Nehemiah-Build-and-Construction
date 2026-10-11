import { contactSchema } from "@/lib/schemas";
import { parseJson, captchaFailure, validationFailure } from "@/lib/api-utils";
import { verifyCaptcha } from "@/lib/captcha";
import { saveRecord } from "@/lib/storage";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await parseJson<unknown>(request);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return validationFailure("Please complete the required contact fields.");
  const captcha = await verifyCaptcha(parsed.data, "contact_form");
  const captchaResponse = captchaFailure(captcha);
  if (captchaResponse) return captchaResponse;

  try {
    const { captchaToken, captchaAction, captchaV2Token, ...message } = parsed.data;
    const stored = await saveRecord("contact", message);
    if (!process.env.CONTACT_EMAIL) {
      return Response.json({ ok: false, code: "contact_email_not_configured", message: "Your message was saved, but email delivery is not configured. Please contact us on WhatsApp." }, { status: 503 });
    }
    const sent = await sendMail({
      to: process.env.CONTACT_EMAIL,
      replyTo: message.email,
      subject: `Website contact · ${message.subject}`,
      text: `Name: ${message.name}\nEmail: ${message.email}\nPhone: ${message.phone || "Not provided"}\nSubject: ${message.subject}\n\n${message.message}\n\nRecord: ${stored.id}`,
    });
    if (!sent) return Response.json({ ok: false, code: "email_not_configured", message: "Your message was saved, but email delivery is not configured. Please contact us on WhatsApp." }, { status: 503 });
    return Response.json({ ok: true, id: stored.id, message: "Your message has been sent." }, { status: 201 });
  } catch (error) {
    console.error("Contact message could not be handled", error);
    return Response.json({ ok: false, code: "contact_unavailable", message: "We could not deliver your message. Please try again later." }, { status: 503 });
  }
}
