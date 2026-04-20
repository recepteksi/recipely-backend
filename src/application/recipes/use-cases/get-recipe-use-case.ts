import { fail, isFail, ok, type Result } from '@core/result/result';
import { ValidationFailure, type Failure } from '@core/failure';
import type { IRecipeRepository } from '@domain/recipes/i-recipe-repository';
import { RecipeMapper } from '@application/recipes/mappers/recipe.mapper';
import type { RecipeDto } from '@application/recipes/dtos/recipe.dto';

export class GetRecipeUseCase {
  constructor(private readonly repo: IRecipeRepository) {}

  async execute(id: string): Promise<Result<RecipeDto, Failure>> {
    if (!id || id.trim().length === 0) {
      return fail(new ValidationFailure('Recipe id is required', 'id'));
    }

    const result = await this.repo.getById(id);
    if (isFail(result)) return result;
    return ok(RecipeMapper.toDto(result.value));
  }
}
