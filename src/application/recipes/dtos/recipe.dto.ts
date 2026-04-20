import type { Difficulty } from '@domain/recipes/difficulty';

export interface RecipeDto {
  readonly id: string;
  readonly name: string;
  readonly cuisine: string;
  readonly difficulty: Difficulty;
  readonly ingredients: string[];
  readonly instructions: string[];
  readonly prepTimeMinutes: number;
  readonly cookTimeMinutes: number;
  readonly image: string;
  readonly rating: number;
  readonly tags: string[];
  readonly mealType: string[];
  readonly ownerId: string;
  readonly categoryId: string | null;
  readonly createdAt: string; // ISO
  readonly updatedAt: string; // ISO
}

export interface PagedRecipesDto {
  readonly items: RecipeDto[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}
