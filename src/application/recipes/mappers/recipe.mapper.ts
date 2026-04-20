import type { Recipe } from '@domain/recipes/recipe';
import type { PageResult } from '@domain/recipes/recipe-query';
import type { PagedRecipesDto, RecipeDto } from '@application/recipes/dtos/recipe.dto';

export class RecipeMapper {
  static toDto(recipe: Recipe): RecipeDto {
    return {
      id: recipe.id,
      name: recipe.name,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      image: recipe.image,
      rating: recipe.rating,
      tags: recipe.tags,
      mealType: recipe.mealType,
      ownerId: recipe.ownerId,
      categoryId: recipe.categoryId,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
  }

  static toPagedDto(page: PageResult<Recipe>): PagedRecipesDto {
    return {
      items: page.items.map(RecipeMapper.toDto),
      total: page.total,
      page: page.page,
      pageSize: page.pageSize,
    };
  }
}
