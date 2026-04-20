import type { PrismaClient, Prisma } from '@prisma/client';
import { fail, ok, type Result } from '@core/result/result';
import { NotFoundFailure, UnknownFailure, type Failure } from '@core/failure';
import type { Recipe } from '@domain/recipes/recipe';
import type { IRecipeRepository } from '@domain/recipes/i-recipe-repository';
import type { PageResult, RecipeQuery } from '@domain/recipes/recipe-query';
import { RecipeRowMapper } from '@infrastructure/prisma/mappers/recipe.row-mapper';

export class PrismaRecipeRepository implements IRecipeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(query: RecipeQuery): Promise<Result<PageResult<Recipe>, Failure>> {
    const where: Prisma.RecipeWhereInput = { isPublished: true };
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.search && query.search.length > 0) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { cuisine: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const skip = (query.page - 1) * query.pageSize;

    try {
      // WHY: one round-trip — findMany + count in a single implicit transaction.
      const [rows, total] = await this.prisma.$transaction([
        this.prisma.recipe.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: query.pageSize,
        }),
        this.prisma.recipe.count({ where }),
      ]);

      const items: Recipe[] = [];
      for (const row of rows) {
        const mapped = RecipeRowMapper.toDomain(row);
        if (!mapped.ok) return mapped;
        items.push(mapped.value);
      }

      return ok({ items, total, page: query.page, pageSize: query.pageSize });
    } catch (err) {
      return fail(new UnknownFailure(errorMessage(err)));
    }
  }

  async getById(id: string): Promise<Result<Recipe, Failure>> {
    try {
      const row = await this.prisma.recipe.findUnique({ where: { id } });
      if (!row) return fail(new NotFoundFailure(`Recipe ${id} not found`));
      return RecipeRowMapper.toDomain(row);
    } catch (err) {
      return fail(new UnknownFailure(errorMessage(err)));
    }
  }
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown repository error';
}
