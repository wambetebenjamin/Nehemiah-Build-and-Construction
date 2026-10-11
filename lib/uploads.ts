import { randomUUID } from "node:crypto";

const MAX_PDF_BYTES = 4 * 1024 * 1024;

export function validatePdf(file: FormDataEntryValue | null, label: string): file is File {
  return file instanceof File && file.type === "application/pdf" && file.size > 0 && file.size <= MAX_PDF_BYTES && Boolean(label);
}

export async function hasPdfSignature(file: File) {
  const header = await file.slice(0, 1024).text();
  return header.includes("%PDF-");
}

export async function uploadPrivatePdf(file: File, folder: "tender-applications" | "career-applications") {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob is not configured. Set BLOB_READ_WRITE_TOKEN.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-90) || "application.pdf";
  const { put } = await import("@vercel/blob");
  return put(`${folder}/${randomUUID()}-${safeName}`, file, {
    access: "private",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });
}
