type WhatsAppConfirmation = { phone: string; name: string; reference?: string };

/** Sends an approved Meta Cloud API template. Returns false when intentionally unconfigured. */
export async function sendWhatsAppConfirmation({ phone, name, reference }: WhatsAppConfirmation): Promise<boolean> {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID } = process.env;
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) return false;

  const version = process.env.WHATSAPP_GRAPH_API_VERSION || "v22.0";
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "project_enquiry_confirmation";
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";
  const response = await fetch(`https://graph.facebook.com/${version}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone.replace(/[^+\d]/g, ""),
      type: "template",
      template: {
        name: templateName,
        language: { code: languageCode },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name.slice(0, 80) },
              { type: "text", text: (reference || "your project enquiry").slice(0, 80) },
            ],
          },
        ],
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  return response.ok;
}
