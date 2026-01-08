import { db } from "./db";
import {
  cards,
  type InsertCard,
  type Card
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCards(): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  deleteCard(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCards(): Promise<Card[]> {
    return await db.select().from(cards);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const [card] = await db.insert(cards).values(insertCard).returning();
    return card;
  }

  async deleteCard(id: number): Promise<void> {
    await db.delete(cards).where(eq(cards.id, id));
  }
}

export const storage = new DatabaseStorage();
