import { enquirySchema } from "@/lib/schemas";
import { parseJson, captchaFailure, validationFailure } from "@/lib/api-utils";
import { verifyCaptcha } from "@/lib/captcha";
import { saveRecord } from "@/lib/storage";
import { sendMail } from "@/lib/mail";
import { sendWhatsAppConfirmation } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await parseJson<unknown>(request);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return validationFailure("Please complete the required project enquiry fields.");

  const captcha = await verifyCaptcha(parsed.data, "project_enquiry");
  const captchaResponse = captchaFailure(captcha);
  if (captchaResponse) return captchaResponse;

  try {
    const { captchaToken, captchaAction, captchaV2Token, ...enquiry } = parsed.data;
    const stored = await saveRecord("enquiries", enquiry);
    const [customerEmail, teamEmail, whatsapp] = await Promise.allSettled([
      sendMail({ to: enquiry.email, subject: "We received your project enquiry — Nehemiah Build", text: `Hello ${enquiry.name},\n\nThank you for contacting Nehemiah Build. We have received your enquiry about ${enquiry.projectType.toLowerCase()} in ${enquiry.location}. Our team will review the brief and get back to you.\n\nReference: ${stored.id}\n\nNehemiah Build & Construction\n+254 112 272 061` }),
      process.env.CONTACT_EMAIL ? sendMail({ to: process.env.CONTACT_EMAIL, replyTo: enquiry.email, subject: `New project enquiry · ${enquiry.name}`, text: `Name: ${enquiry.name}\nCompany: ${enquiry.company || "Not provided"}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nProject: ${enquiry.projectType}\nBudget: ${enquiry.budget}\nLocation: ${enquiry.location}\n\nBrief:\n${enquiry.brief}\n\nRecord: ${stored.id}` }) : Promise.resolve(false),
      sendWhatsAppConfirmation({ phone: enquiry.phone, name: enquiry.name, reference: stored.id }),
    ]);
    return Response.json({ ok: true, id: stored.id, message: "Your project enquiry has been received.", notifications: { customerEmail: customerEmail.status === "fulfilled" && customerEmail.value, teamEmail: teamEmail.status === "fulfilled" && teamEmail.value, whatsapp: whatsapp.status === "fulfilled" && whatsapp.value } }, { status: 201 });
  } catch (error) {
    console.error("Project enquiry could not be saved", error);
    return Response.json({ ok: false, code: "enquiry_unavailable", message: "We could not safely save your enquiry. Please contact us on WhatsApp and try again later." }, { status: 503 });
  }
}
