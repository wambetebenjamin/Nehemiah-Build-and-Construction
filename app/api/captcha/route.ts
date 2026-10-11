import { parseJson } from "@/lib/api-utils";
import { verifyCaptcha, type CaptchaInput } from "@/lib/captcha";

export const runtime = "nodejs";
const allowedActions = new Set(["project_enquiry", "tender_application", "career_application", "newsletter_signup", "contact_form"]);

export async function POST(request: Request) {
  const body = await parseJson<CaptchaInput>(request);
  if (!body?.captchaAction || !allowedActions.has(body.captchaAction)) {
    return Response.json({ ok: false, code: "captcha_action_invalid", message: "Invalid security-check action." }, { status: 400 });
  }
  const result = await verifyCaptcha(body, body.captchaAction);
  if (!result.ok) {
    return Response.json({ ok: false, code: result.code, message: result.message, needsV2: result.needsV2, configured: result.configured }, { status: result.status });
  }
  return Response.json({ ok: true, score: result.score, fallback: result.fallback });
}
