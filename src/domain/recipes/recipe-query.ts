export interface RecipeQuery {
  readonly search?: string;
  readonly categoryId?: string;
  readonly page: number;   // 1-based
  readonly pageSize: number;
}

export interface PageResult<T> {
  readonly items: T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}
