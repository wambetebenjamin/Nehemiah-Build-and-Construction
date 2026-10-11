import { captchaFailure } from "@/lib/api-utils";
import { verifyCaptcha, type CaptchaInput } from "@/lib/captcha";
import { careerApplicationSchema } from "@/lib/schemas";
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
  const captcha = await verifyCaptcha(captchaInput, "career_application");
  const captchaResponse = captchaFailure(captcha);
  if (captchaResponse) return captchaResponse;

  const parsed = careerApplicationSchema.safeParse({
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    phone: String(form.get("phone") || ""),
    linkedin: String(form.get("linkedin") || ""),
    role: String(form.get("role") || ""),
    coverLetter: String(form.get("coverLetter") || ""),
    ...captchaInput,
  });
  if (!parsed.success) return Response.json({ ok: false, code: "invalid_input", message: "Please complete the required career application fields." }, { status: 400 });
  const file = form.get("cv");
  if (!validatePdf(file, "CV") || !(await hasPdfSignature(file))) return Response.json({ ok: false, code: "invalid_pdf", message: "Please attach a valid PDF CV under 4 MB." }, { status: 400 });

  try {
    const uploaded = await uploadPrivatePdf(file, "career-applications");
    const { captchaToken, captchaAction, captchaV2Token, ...application } = parsed.data;
    const stored = await saveRecord("career-applications", { ...application, filePath: uploaded.pathname, fileUrl: uploaded.url });
    const notified = process.env.HR_EMAIL ? await sendMail({
      to: process.env.HR_EMAIL,
      replyTo: application.email,
      subject: `Career application · ${application.role} · ${application.name}`,
      text: `A career application has been received.\n\nName: ${application.name}\nRole: ${application.role}\nEmail: ${application.email}\nPhone: ${application.phone}\nLinkedIn: ${application.linkedin || "Not provided"}\nCover letter:\n${application.coverLetter || "Not provided"}\n\nPrivate CV path: ${uploaded.pathname}\nRecord: ${stored.id}\n\nThe PDF is private in Vercel Blob; open it through the authorised Blob dashboard workflow.`,
    }) : false;
    return Response.json({ ok: true, id: stored.id, message: "Your application has been received.", hrNotified: notified }, { status: 201 });
  } catch (error) {
    console.error("Career application could not be stored", error);
    return Response.json({ ok: false, code: "career_unavailable", message: "We could not securely receive your application. Please try again or contact us on WhatsApp." }, { status: 503 });
  }
}
