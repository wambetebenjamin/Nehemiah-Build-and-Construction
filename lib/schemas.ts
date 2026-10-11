import { z } from "zod";

const phoneSchema = z.string().trim().min(8).max(24);
const captchaFields = {
  captchaToken: z.string().optional(),
  captchaAction: z.string().optional(),
  captchaV2Token: z.string().optional(),
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.email().max(254),
  phone: phoneSchema,
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(120),
  brief: z.string().trim().min(10).max(5000),
  ...captchaFields,
});

export const newsletterSchema = z.object({ email: z.email().max(254), consent: z.literal(true), ...captchaFields });

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(24).optional().default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
  ...captchaFields,
});

export const tenderApplicationSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  registrationNumber: z.string().trim().min(2).max(100),
  contactName: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: phoneSchema,
  tenderReference: z.string().trim().min(2).max(100),
  ...captchaFields,
});

export const careerApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: phoneSchema,
  linkedin: z.url().max(500).or(z.literal("")).optional().default(""),
  role: z.string().trim().min(2).max(100),
  coverLetter: z.string().trim().max(5000).optional().default(""),
  ...captchaFields,
});
