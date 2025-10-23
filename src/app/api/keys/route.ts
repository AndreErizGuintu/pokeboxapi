import { NextRequest } from "next/server";
import z from "zod";
import { insertKey, listKeys, revokeKey } from "~/server/key";
import { createKeySchema, deleteKeySchema } from "~/server/validation";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, userId } = createKeySchema
      .extend({ userId: z.string() })
      .parse(body);
    const created = await insertKey(name, userId);
    return Response.json(created, { status: 201 });
  } catch (e: any) {
    return Response.json(
      { error: e.message ?? "Invalid request" },
      { status: 400 },
    );
  }
}

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await listKeys(user.id); // Pass user.id to filter keys
  const items = rows.map((row) => ({
    id: row.id,
    name: row.name,
    masked: `sk_live_...${row.last4}`,
    createdAt: row.createdAt,
    revoked: !!row.revoked,
  }));
  return Response.json({ items });
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    const { id: parsedId } = deleteKeySchema.parse({ id });
    const ok = await revokeKey(parsedId);
    if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json(+{ error: e.message ?? "Invalid request" }, {
      status: 400,
    });
  }
}
