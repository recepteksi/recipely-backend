import { z } from 'zod';

export const ListRecipesQuerySchema = z.object({
  search: z.string().trim().min(1).max(200).optional(),
  categoryId: z.string().uuid().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListRecipesQuery = z.infer<typeof ListRecipesQuerySchema>;

export const RecipeIdParamSchema = z.object({
  id: z.string().uuid('Recipe id must be a UUID'),
});
