import { captchaFailure } from "@/lib/api-utils";
import { verifyCaptcha, type CaptchaInput } from "@/lib/captcha";
import { tenderApplicationSchema } from "@/lib/schemas";
import { saveRecord } from "@/lib/storage";
import { sendMail } from "@/lib/mail";
import { hasPdfSignature, uploadPrivatePdf, validatePdf } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let form: FormData;
  try { form = await request.formData(); } catch { return Response.json({ ok: false, code: "invalid_form", message: "Please submit the form again." }, { status: 400 }); }

  const captchaInput: CaptchaInput = {
    captchaToken: String(form.get("captchaToken") || ""),
    captchaAction: String(form.get("captchaAction") || ""),
    captchaV2Token: String(form.get("captchaV2Token") || ""),
  };
  const captcha = await verifyCaptcha(captchaInput, "tender_application");
  const captchaResponse = captchaFailure(captcha);
  if (captchaResponse) return captchaResponse;

  const values = {
    companyName: String(form.get("companyName") || ""),
    registrationNumber: String(form.get("registrationNumber") || ""),
    contactName: String(form.get("contactName") || ""),
    email: String(form.get("email") || ""),
    phone: String(form.get("phone") || ""),
    tenderReference: String(form.get("tenderReference") || ""),
    ...captchaInput,
  };
  const parsed = tenderApplicationSchema.safeParse(values);
  if (!parsed.success) return Response.json({ ok: false, code: "invalid_input", message: "Please complete all tender application fields." }, { status: 400 });
  const file = form.get("tenderResponse");
  if (!validatePdf(file, "Tender response") || !(await hasPdfSignature(file))) return Response.json({ ok: false, code: "invalid_pdf", message: "Please attach a valid PDF tender response under 4 MB." }, { status: 400 });

  try {
    const uploaded = await uploadPrivatePdf(file, "tender-applications");
    const { captchaToken, captchaAction, captchaV2Token, ...application } = parsed.data;
    const stored = await saveRecord("tender-applications", { ...application, filePath: uploaded.pathname, fileUrl: uploaded.url });
    const notified = process.env.HR_EMAIL ? await sendMail({
      to: process.env.HR_EMAIL,
      replyTo: application.email,
      subject: `Tender response · ${application.tenderReference} · ${application.companyName}`,
      text: `A tender application has been received.\n\nTender: ${application.tenderReference}\nCompany: ${application.companyName}\nRegistration: ${application.registrationNumber}\nContact: ${application.contactName}\nEmail: ${application.email}\nPhone: ${application.phone}\nPrivate file path: ${uploaded.pathname}\nRecord: ${stored.id}\n\nThe PDF is private in Vercel Blob; open it through the authorised Blob dashboard workflow.`,
    }) : false;
    return Response.json({ ok: true, id: stored.id, message: "Your tender response has been received.", hrNotified: notified }, { status: 201 });
  } catch (error) {
    console.error("Tender application could not be stored", error);
    return Response.json({ ok: false, code: "tender_unavailable", message: "We could not securely receive your application. Please contact us on WhatsApp and try again later." }, { status: 503 });
  }
}
