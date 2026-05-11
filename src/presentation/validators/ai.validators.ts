import { z } from 'zod';

export const GenerateRecipeBodySchema = z.object({
  prompt: z.string().trim().min(3, 'errors.validation.prompt_required').max(1000),
});

export type GenerateRecipeBody = z.infer<typeof GenerateRecipeBodySchema>;
