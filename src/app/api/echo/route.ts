// import { NextRequest } from "next/server";
// import { verifyKey } from "~/server/key";
// import { ilike, or } from "drizzle-orm"; // Import ilike for partial matching
// import { db } from "~/server/db";
// import { recipes } from "~/server/db/schema";

// export async function POST(req: NextRequest) {
//   const apiKey = req.headers.get("x-api-key") ?? "";
//   const result = await verifyKey(apiKey);

//   if (!result.valid) {
//     return Response.json({ error: result.reason }, { status: 401 });
//   }

//   const body = await req.json();

//   if (!body || !body.postBody) {
//     return Response.json(
//       { error: "Invalid request body. input is required." },
//       { status: 400 },
//     );
//   }

//   try {
//     const getDish = await db
//       .select({
//         id: recipes.id,
//         title: recipes.title,
//         description: recipes.description,
//         instructions: recipes.instructions,
//         prepTime: recipes.prepTime,
//         cookTime: recipes.cookTime,
//         servings: recipes.servings,
//         ingredients: recipes.ingredients,
//         category: recipes.category,
//         imageUrl: recipes.imageUrl,
//       })
//       .from(recipes)
//       .where(
//         or(
//           ilike(recipes.title, `%${body.postBody}%`),
//           ilike(recipes.ingredients, `%${body.postBody}%`),
//           ilike(recipes.category, `%${body.postBody}%`),
//         ),
//       );

//     if (getDish.length === 0) {
//       return Response.json(
//         { error: "No recipe found with the given title." },
//         { status: 404 },
//       );
//     }

//     return Response.json(
//       {
//         ok: true,
//         message: "Recipe(s) found successfully.",
//         recipes: getDish,
//         count: getDish.length,
//         keyId: result.keyid,
//       },
//       { status: 200 },
//     );
//   } catch (error: any) {
//     return Response.json(
//       { error: error.message ?? "Failed to fetch recipe." },
//       { status: 500 },
//     );
//   }
// }
