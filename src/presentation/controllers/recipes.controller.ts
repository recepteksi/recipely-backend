import type { Request, Response } from 'express';
import type { ListRecipesUseCase } from '@application/recipes/use-cases/list-recipes-use-case';
import type { GetRecipeUseCase } from '@application/recipes/use-cases/get-recipe-use-case';
import {
  ListRecipesQuerySchema,
  RecipeIdParamSchema,
} from '@presentation/validators/recipes.validators';
import { failureToHttp } from '@presentation/http/failure-to-http';

export class RecipesController {
  constructor(
    private readonly listRecipes: ListRecipesUseCase,
    private readonly getRecipe: GetRecipeUseCase,
  ) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const parsed = ListRecipesQuerySchema.parse(req.query);
    const input: Parameters<ListRecipesUseCase['execute']>[0] = {
      page: parsed.page,
      pageSize: parsed.pageSize,
      ...(parsed.search !== undefined ? { search: parsed.search } : {}),
      ...(parsed.categoryId !== undefined ? { categoryId: parsed.categoryId } : {}),
    };
    const result = await this.listRecipes.execute(input);
    if (!result.ok) {
      const { status, body } = failureToHttp(result.failure);
      res.status(status).json(body);
      return;
    }
    res.status(200).json(result.value);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = RecipeIdParamSchema.parse(req.params);
    const result = await this.getRecipe.execute(id);
    if (!result.ok) {
      const { status, body } = failureToHttp(result.failure);
      res.status(status).json(body);
      return;
    }
    res.status(200).json(result.value);
  };
}
