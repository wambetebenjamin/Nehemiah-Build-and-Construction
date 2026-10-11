import { newsletterSchema } from "@/lib/schemas";
import { parseJson, captchaFailure, validationFailure } from "@/lib/api-utils";
import { verifyCaptcha } from "@/lib/captcha";
import { saveSubscriber } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await parseJson<unknown>(request);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return validationFailure("Please enter a valid email address and agree to receive updates.");
  const captcha = await verifyCaptcha(parsed.data, "newsletter_signup");
  const captchaResponse = captchaFailure(captcha);
  if (captchaResponse) return captchaResponse;

  try {
    await saveSubscriber(parsed.data.email);
    return Response.json({ ok: true, message: "You're subscribed to monthly construction insights and tender alerts." }, { status: 201 });
  } catch (error) {
    console.error("Newsletter subscription could not be saved", error);
    return Response.json({ ok: false, code: "newsletter_unavailable", message: "We could not save your subscription. Please try again later." }, { status: 503 });
  }
}
