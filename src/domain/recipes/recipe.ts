import { Entity } from '@core/entity/entity';
import { fail, ok, type Result } from '@core/result/result';
import { ValidationFailure } from '@core/failure';
import { Difficulty } from '@domain/recipes/difficulty';

export interface RecipeProps {
  id: string;
  name: string;
  cuisine: string;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
  rating: number;
  tags: string[];
  mealType: string[];
  ownerId: string;
  categoryId: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Recipe extends Entity<RecipeProps> {
  private constructor(props: RecipeProps) {
    super(props);
  }

  static create(props: RecipeProps): Result<Recipe, ValidationFailure> {
    if (props.id.trim().length === 0) {
      return fail(new ValidationFailure('Recipe id must be non-empty', 'id'));
    }
    if (props.name.trim().length === 0) {
      return fail(new ValidationFailure('Recipe name must be non-empty', 'name'));
    }
    if (props.ownerId.trim().length === 0) {
      return fail(new ValidationFailure('Recipe ownerId must be non-empty', 'ownerId'));
    }
    if (props.prepTimeMinutes < 0 || props.cookTimeMinutes < 0) {
      return fail(new ValidationFailure('Recipe times must be non-negative', 'timing'));
    }
    if (props.rating < 0 || props.rating > 5) {
      return fail(new ValidationFailure('Recipe rating must be between 0 and 5', 'rating'));
    }
    return ok(new Recipe(props));
  }

  get name(): string { return this.props.name; }
  get cuisine(): string { return this.props.cuisine; }
  get difficulty(): Difficulty { return this.props.difficulty; }
  get ingredients(): string[] { return this.props.ingredients; }
  get instructions(): string[] { return this.props.instructions; }
  get prepTimeMinutes(): number { return this.props.prepTimeMinutes; }
  get cookTimeMinutes(): number { return this.props.cookTimeMinutes; }
  get image(): string { return this.props.image; }
  get rating(): number { return this.props.rating; }
  get tags(): string[] { return this.props.tags; }
  get mealType(): string[] { return this.props.mealType; }
  get ownerId(): string { return this.props.ownerId; }
  get categoryId(): string | null { return this.props.categoryId; }
  get isPublished(): boolean { return this.props.isPublished; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}
