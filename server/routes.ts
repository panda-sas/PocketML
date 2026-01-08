import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingCards = await storage.getCards();
  if (existingCards.length === 0) {
    const seedData = [
      {
        term: "Supervised Learning",
        definition: "A type of machine learning where the model is trained on labeled data, meaning the input data is paired with the correct output.",
        category: "Basics"
      },
      {
        term: "Unsupervised Learning",
        definition: "A type of machine learning where the model is given data without explicit instructions on what to do with it, used to find hidden patterns or grouping in data.",
        category: "Basics"
      },
      {
        term: "Overfitting",
        definition: "A modeling error that occurs when a function is too closely fit to a limited set of data points, performing well on training data but poorly on new, unseen data.",
        category: "Model Evaluation"
      },
      {
        term: "Neural Network",
        definition: "A series of algorithms that endeavor to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.",
        category: "Deep Learning"
      },
      {
        term: "Gradient Descent",
        definition: "An optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient.",
        category: "Optimization"
      },
      {
        term: "Bias-Variance Tradeoff",
        definition: "The property of a model that the variance of the parameter estimated across samples can be reduced by increasing the bias in the estimated parameters.",
        category: "Model Evaluation"
      }
    ];

    for (const card of seedData) {
      await storage.createCard(card);
    }
    console.log("Database seeded with ML terms");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedDatabase();

  app.get(api.cards.list.path, async (req, res) => {
    const cards = await storage.getCards();
    res.json(cards);
  });

  app.post(api.cards.create.path, async (req, res) => {
    try {
      const input = api.cards.create.input.parse(req.body);
      const card = await storage.createCard(input);
      res.status(201).json(card);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.cards.delete.path, async (req, res) => {
    await storage.deleteCard(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}
