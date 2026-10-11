import nodemailer from "nodemailer";

type Message = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

function transporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) return null;
  const port = Number(SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

export async function sendMail(message: Message): Promise<boolean> {
  const from = process.env.EMAIL_FROM;
  const client = transporter();
  if (!client || !from) return false;
  const safeSubject = message.subject.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
  await client.sendMail({ ...message, subject: safeSubject, from });
  return true;
}
