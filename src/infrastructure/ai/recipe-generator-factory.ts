import type { IRecipeGenerator } from '@application/ai/ports/i-recipe-generator';
import { GeminiRecipeGenerator } from '@infrastructure/ai/gemini-recipe-generator';
import { AnthropicRecipeGenerator } from '@infrastructure/ai/anthropic-recipe-generator';

export type AIProvider = 'gemini' | 'anthropic';

export interface AIGeneratorFactoryInput {
  readonly provider: AIProvider;
  readonly model: string;
  readonly geminiApiKey?: string | undefined;
  readonly anthropicApiKey?: string | undefined;
}

// Selects the AI adapter at composition root. Throws on misconfiguration so
// the server fails fast at boot — a missing API key is unrecoverable.
export function createRecipeGenerator(input: AIGeneratorFactoryInput): IRecipeGenerator {
  switch (input.provider) {
    case 'gemini': {
      if (!input.geminiApiKey || input.geminiApiKey.trim().length === 0) {
        throw new Error('AI_PROVIDER=gemini but GEMINI_API_KEY is empty');
      }
      return new GeminiRecipeGenerator({ apiKey: input.geminiApiKey, model: input.model });
    }
    case 'anthropic': {
      if (!input.anthropicApiKey || input.anthropicApiKey.trim().length === 0) {
        throw new Error('AI_PROVIDER=anthropic but ANTHROPIC_API_KEY is empty');
      }
      return new AnthropicRecipeGenerator({
        apiKey: input.anthropicApiKey,
        model: input.model,
      });
    }
  }
}
