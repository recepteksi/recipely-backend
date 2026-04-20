import type { Recipe as RecipeRow } from '@prisma/client';
import { isFail, type Result } from '@core/result/result';
import { UnknownFailure, type Failure } from '@core/failure';
import { Recipe } from '@domain/recipes/recipe';
import { isDifficulty, type Difficulty } from '@domain/recipes/difficulty';

export class RecipeRowMapper {
  static toDomain(row: RecipeRow): Result<Recipe, Failure> {
    const difficulty: Difficulty = isDifficulty(row.difficulty) ? row.difficulty : 'EASY';

    const result = Recipe.create({
      id: row.id,
      name: row.name,
      cuisine: row.cuisine,
      difficulty,
      ingredients: row.ingredients,
      instructions: row.instructions,
      prepTimeMinutes: row.prepTimeMinutes,
      cookTimeMinutes: row.cookTimeMinutes,
      image: row.image,
      rating: row.rating,
      tags: row.tags,
      mealType: row.mealType,
      ownerId: row.ownerId,
      categoryId: row.categoryId,
      isPublished: row.isPublished,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });

    if (isFail(result)) {
      // WHY: invariants failing on DB rows means the row is corrupt — surface as 500.
      return { ok: false, failure: new UnknownFailure(`Corrupt recipe row ${row.id}`) };
    }
    return result;
  }
}
