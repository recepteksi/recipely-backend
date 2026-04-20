import { fail, isFail, ok, type Result } from '@core/result/result';
import { ValidationFailure, type Failure } from '@core/failure';
import type { IRecipeRepository } from '@domain/recipes/i-recipe-repository';
import { RecipeMapper } from '@application/recipes/mappers/recipe.mapper';
import type { PagedRecipesDto } from '@application/recipes/dtos/recipe.dto';

export interface ListRecipesInput {
  readonly search?: string;
  readonly categoryId?: string;
  readonly page?: number;
  readonly pageSize?: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export class ListRecipesUseCase {
  constructor(private readonly repo: IRecipeRepository) {}

  async execute(input: ListRecipesInput): Promise<Result<PagedRecipesDto, Failure>> {
    const page = input.page ?? DEFAULT_PAGE;
    const pageSize = input.pageSize ?? DEFAULT_PAGE_SIZE;

    if (!Number.isInteger(page) || page < 1) {
      return fail(new ValidationFailure('page must be a positive integer', 'page'));
    }
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
      return fail(
        new ValidationFailure(`pageSize must be between 1 and ${MAX_PAGE_SIZE}`, 'pageSize'),
      );
    }

    const result = await this.repo.list({
      search: input.search?.trim() || undefined,
      categoryId: input.categoryId?.trim() || undefined,
      page,
      pageSize,
    });

    if (isFail(result)) return result;
    return ok(RecipeMapper.toPagedDto(result.value));
  }
}
