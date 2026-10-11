export type CaptchaInput = {
  captchaToken?: string;
  captchaAction?: string;
  captchaV2Token?: string;
};

export type CaptchaResult =
  | { ok: true; score: number; fallback: boolean }
  | { ok: false; status: number; code: string; message: string; needsV2?: boolean; configured?: boolean };

type SiteVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/** Verify every submitted form token server-side. V3 scores below 0.5 require a v2 token. */
export async function verifyCaptcha(input: CaptchaInput, expectedAction: string): Promise<CaptchaResult> {
  const fallbackToken = input.captchaV2Token?.trim();
  const v3Token = input.captchaToken?.trim();
  const token = fallbackToken || v3Token;

  if (!token) {
    return { ok: false, status: 400, code: "captcha_token_missing", message: "Please complete the security check." };
  }

  const fallback = Boolean(fallbackToken);
  const secret = fallback ? process.env.RECAPTCHA_V2_SECRET_KEY : process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      status: 503,
      code: "captcha_not_configured",
      message: "The security check is not configured yet. Please contact us directly.",
      configured: false,
    };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) {
      return { ok: false, status: 502, code: "captcha_provider_error", message: "The security check could not be completed. Please try again." };
    }

    const result = (await response.json()) as SiteVerifyResponse;
    if (!result.success) {
      return { ok: false, status: 403, code: "captcha_rejected", message: "The security check did not pass. Please try again." };
    }

    if (!fallback && result.action !== expectedAction) {
      return { ok: false, status: 403, code: "captcha_action_mismatch", message: "The security check did not match this form. Please try again." };
    }

    const score = fallback ? 1 : Number(result.score ?? 0);
    if (!fallback && score < 0.5) {
      return {
        ok: false,
        status: 428,
        code: "captcha_fallback_required",
        message: "Please complete the additional security check to continue.",
        needsV2: true,
      };
    }

    return { ok: true, score, fallback };
  } catch {
    return { ok: false, status: 502, code: "captcha_unavailable", message: "The security check is temporarily unavailable. Please try again." };
  }
}
