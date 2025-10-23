// import type { NextRequest } from "next/server";
// import { verifyKey } from "~/server/key";
// import { db } from "~/server/db";
// import { recipes } from "~/server/db/schema";
// import { desc, asc, ilike } from "drizzle-orm";

// export async function GET(request: NextRequest) {
//   const apiKey = request.headers.get("x-api-key") ?? "";
//   const result = await verifyKey(apiKey);
//   if (!result.valid) {
//     return Response.json({ error: result.reason }, { status: 401 });
//   }

//   // Extract query parameters
//   const url = new URL(request.url);
//   const page = parseInt(url.searchParams.get("page") || "1");
//   const limit = parseInt(url.searchParams.get("limit") || "10");
//   const category = url.searchParams.get("category");
//   const sortBy = url.searchParams.get("sortBy") || "title";
//   const order = url.searchParams.get("order") || "asc";

//   // Build filters array
//   const filters = [];
//   if (category) {
//     filters.push(ilike(recipes.category, `%${category}%`));
//   }

//   // Determine sort order
//   const orderFn = order === "desc" ? desc : asc;
//   let sortColumn;
//   if (sortBy === "title") {
//     sortColumn = orderFn(recipes.title);
//   } else if (sortBy === "prepTime") {
//     sortColumn = orderFn(recipes.prepTime);
//   } else if (sortBy === "cookTime") {
//     sortColumn = orderFn(recipes.cookTime);
//   } else {
//     sortColumn = orderFn(recipes.title); // default
//   }

//   // Build and execute the query in one chain
//   const offset = (page - 1) * limit;

//   const data = await db
//     .select()
//     .from(recipes)
//     .where(filters.length > 0 ? filters[0] : undefined) // Apply filter if exists
//     .orderBy(sortColumn)
//     .limit(limit)
//     .offset(offset);

//   return Response.json(
//     {
//       ok: true,
//       message: "Items retrieved successfully",
//       keyId: result.keyid,
//       data,
//       pagination: {
//         page,
//         limit,
//         total: data.length,
//       },
//     },
//     { status: 200 },
//   );
// }
