import { randomUUID } from "node:crypto";

type StoredRecord = Record<string, unknown>;
type MemoryStore = Map<string, unknown>;

const globalStore = globalThis as typeof globalThis & { __nehemiahMemoryStore?: MemoryStore };
const memoryStore = globalStore.__nehemiahMemoryStore ?? (globalStore.__nehemiahMemoryStore = new Map());

function hasKvCredentials() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function assertProductionKv() {
  if (process.env.NODE_ENV === "production" && !hasKvCredentials()) {
    throw new Error("Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
  }
}

export async function saveRecord(collection: string, record: StoredRecord) {
  const id = randomUUID();
  const key = `${collection}:${id}`;
  const value = { id, createdAt: new Date().toISOString(), ...record };

  if (hasKvCredentials()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, value);
  } else {
    assertProductionKv();
    memoryStore.set(key, value);
  }

  return { id, createdAt: value.createdAt };
}

export async function getRecord<T>(key: string): Promise<T | null> {
  if (hasKvCredentials()) {
    const { kv } = await import("@vercel/kv");
    return (await kv.get<T>(key)) ?? null;
  }
  assertProductionKv();
  return (memoryStore.get(key) as T | undefined) ?? null;
}

export async function saveSubscriber(email: string) {
  const normalized = email.trim().toLowerCase();
  if (hasKvCredentials()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(`newsletter:${normalized}`, { email: normalized, consent: true, subscribedAt: new Date().toISOString() });
  } else {
    assertProductionKv();
    memoryStore.set(`newsletter:${normalized}`, { email: normalized, consent: true, subscribedAt: new Date().toISOString() });
  }
}

export async function getOpenTenderRecords<T>(): Promise<T[] | null> {
  const value = await getRecord<T[]>("tenders:open");
  return Array.isArray(value) ? value : null;
}
