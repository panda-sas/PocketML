import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  category: text("category").notNull(),
});

export const insertCardSchema = createInsertSchema(cards).omit({ id: true });

export type Card = typeof cards.$inferSelect;
export type InsertCard = z.infer<typeof insertCardSchema>;
export type UpdateCardRequest = Partial<InsertCard>;
