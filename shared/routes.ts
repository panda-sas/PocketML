import { z } from 'zod';
import { insertCardSchema, cards } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  cards: {
    list: {
      method: 'GET' as const,
      path: '/api/cards',
      responses: {
        200: z.array(z.custom<typeof cards.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/cards',
      input: insertCardSchema,
      responses: {
        201: z.custom<typeof cards.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/cards/:id',
      input: insertCardSchema.partial(),
      responses: {
        200: z.custom<typeof cards.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/cards/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
