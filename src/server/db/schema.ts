// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ipt-apikey_${name}`);

export const apiKeys = createTable(
  "api_keys",
  (d) => ({
    id: d.text("id").primaryKey(),
    userId: d.text("userId").notNull(),
    name: d.varchar({ length: 256 }).notNull(),
    hashedKey: d.text("hashed_key").notNull(),
    last4: d.varchar("last4", { length: 4 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    revoked: d.boolean("revoked").default(false).notNull(),
  }),
);

export const pokemon = createTable("pokemon", (d) => ({
  id: d.serial("id").primaryKey(),
  name: d.varchar("name", { length: 100 }).notNull(),
  type: d.jsonb("type").notNull(),  // Example: ["Fire", "Flying"]
  stats: d.jsonb("stats").notNull(), // Example: { hp: 78, atk: 84, def: 78, spd: 100 }
  description: d.varchar("description", { length: 500 }),
  generation: d.integer("generation").notNull(),

  // foreign keys
  recommendedMoveId: d.integer("recommended_move_id"),
  signatureMoveId: d.integer("signature_move_id"),
  evolutionChainId: d.integer("evolution_chain_id"), 

  // media
  image2D: d.varchar("image_2d", { length: 255 }),
  image3D: d.varchar("image_3d", { length: 255 }),
}));

export const evolutionChains = createTable("evolution_chains", (d) => ({
  id: d.serial("id").primaryKey(),
  chain: d.jsonb("chain").notNull(), // Example: [1, 2, 3]
  name: d.varchar("name", { length: 100 }), // Optional: like "Charmander line"
}));

export const moves = createTable("moves", (d) => ({
  id: d.serial("id").primaryKey(),
  name: d.varchar("name", { length: 100 }).notNull(),
  type: d.varchar("type", { length: 50 }), // e.g. "Fire", "Water"
  category: d.varchar("category", { length: 50 }), // "Physical", "Special", "Status"
  power: d.integer("power"), 
  accuracy: d.integer("accuracy"), 
  description: d.text("description"), // e.g. "A powerful fire attack that may burn."
}));