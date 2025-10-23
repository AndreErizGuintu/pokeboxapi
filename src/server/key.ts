import { randomBytes, createHash } from "crypto"; //
import { apiKeys } from "./db/schema";
import { db } from "./db"; // Add this import for the db instance
import { desc, eq } from "drizzle-orm";

const KEY_PREFIX = process.env.KEY_PREFIX ?? "sk_live"; 

export function generatePlainKey(bytes: number = 24) {
  const raw = randomBytes(bytes).toString("base64url"); //dsgsdgusogisdgshdgsuoghud
  const key = `${KEY_PREFIX}${raw}`; // sk_livedsgsdgusogisdgshdgsuoghud
  const last4 = key.slice(-4); // ghud
  return { key, last4 };
}

export function sha256(data: string) { 
  return createHash("sha256").update(data).digest("hex"); //dsgsdgusogisdgshdgsuoghud  //asuh317ey01972rg9r17rg37
}

export async function insertKey(name: string, userId: string) {
  const { key, last4 } = generatePlainKey();
  const hashed = sha256(key);
  const id = crypto.randomUUID();

  await db
    .insert(apiKeys)
    .values({ userId, id, name, hashedKey: hashed, last4 });
  return { id, name, key, last4, userId } as const;
}

export async function listKeys(userId: string) {
  return await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.userId, userId))
    .orderBy(desc(apiKeys.createdAt));
}

export async function revokeKey(id: string){
  const res = await db
    .update(apiKeys)
    .set({ revoked: true })
    .where(eq(apiKeys.id, id)); // revoke key
  return (res.rowCount ?? 0) > 0;
}

export async function verifyKey(apiKey: string){
  const hashed = sha256(apiKey);
  const rows = await db
  .select({id: apiKeys.id, revoke: apiKeys.revoked})
  .from(apiKeys)
  .where(eq(apiKeys.hashedKey, hashed)) // select * from api_keys where
  const row = rows[0];
  if (!row) return { valid: false as const, reason: "not_found" as const };
  if (row.revoke) return { valid: false as const, reason: "revoked" as const };
  return { valid: true as const, keyid: row.id };
}