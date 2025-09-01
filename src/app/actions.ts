'use server';

import { z } from 'zod';
import {
  analyzeContentBiasAndSentiment,
  analyzeContentClaims,
  analyzeContentCredibility,
  detectMisinformationCategory,
  explainCredibilityAssessment,
  analyzeMultimodalContent,
} from '@/ai/flows';
import type { TextAnalysisResult, ImageAnalysisResult } from '@/lib/types';

const contentSchema = z.object({
  content: z.string().min(20, { message: 'Content must be at least 20 characters long.' }),
});

const imageSchema = z.object({
  imageDataUri: z.string().startsWith('data:image/', { message: 'Invalid image format.' }),
});

type FormState = {
  result: { type: 'text', data: TextAnalysisResult } | { type: 'image', data: ImageAnalysisResult } | null;
  error: string | null;
  timestamp: number;
}

export async function analyzeContent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contentSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.content?.join(', ') || 'Invalid input.',
      timestamp: Date.now(),
    };
  }

  try {
    const content = validatedFields.data.content;

    const [credibility, categories, biasSentiment, claims] = await Promise.all([
      analyzeContentCredibility({ content }),
      detectMisinformationCategory({ content }),
      analyzeContentBiasAndSentiment({ content }),
      analyzeContentClaims({ content }),
    ]);

    const explanation = await explainCredibilityAssessment({
      content,
      assessmentScore: credibility.credibilityScore,
      flaggedPatterns: credibility.flaggedPatterns,
    });

    const resultData: TextAnalysisResult = { credibility, categories, biasSentiment, claims, explanation };

    return {
      result: { type: 'text', data: resultData },
      error: null,
      timestamp: Date.now(),
    };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'An unexpected error occurred during analysis. Please try again.', timestamp: Date.now() };
  }
}

export async function analyzeImage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = imageSchema.safeParse({
    imageDataUri: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.imageDataUri?.join(', ') || 'Invalid image data.',
      timestamp: Date.now(),
    };
  }

  try {
    const resultData = await analyzeMultimodalContent({ photoDataUri: validatedFields.data.imageDataUri });
    return {
      result: { type: 'image', data: resultData },
      error: null,
      timestamp: Date.now(),
    };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'An unexpected error occurred during image analysis. Please try again.', timestamp: Date.now() };
  }
}
