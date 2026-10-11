import type { CaptchaResult } from "@/lib/captcha";

export function captchaFailure(result: CaptchaResult): Response | null {
  if (result.ok) return null;
  return Response.json({ ok: false, code: result.code, message: result.message, needsV2: result.needsV2, configured: result.configured }, { status: result.status });
}

export function validationFailure(message = "Please check the form and try again.") {
  return Response.json({ ok: false, code: "invalid_input", message }, { status: 400 });
}

export async function parseJson<T>(request: Request): Promise<T | null> {
  try { return (await request.json()) as T; } catch { return null; }
}
