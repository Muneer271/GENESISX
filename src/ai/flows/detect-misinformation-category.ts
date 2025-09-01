'use server';

/**
 * @fileOverview Detects and labels content with misinformation categories.
 *
 * - detectMisinformationCategory - A function that detects misinformation categories in content.
 * - DetectMisinformationCategoryInput - The input type for the detectMisinformationCategory function.
 * - DetectMisinformationCategoryOutput - The return type for the detectMisinformationCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectMisinformationCategoryInputSchema = z.object({
  content: z.string().describe('The content to analyze for misinformation categories.'),
});
export type DetectMisinformationCategoryInput = z.infer<
  typeof DetectMisinformationCategoryInputSchema
>;

const DetectMisinformationCategoryOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe(
      'An array of misinformation categories detected in the content (e.g., Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication).'
    ),
});
export type DetectMisinformationCategoryOutput = z.infer<
  typeof DetectMisinformationCategoryOutputSchema
>;

export async function detectMisinformationCategory(
  input: DetectMisinformationCategoryInput
): Promise<DetectMisinformationCategoryOutput> {
  return detectMisinformationCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectMisinformationCategoryPrompt',
  input: {schema: DetectMisinformationCategoryInputSchema},
  output: {schema: DetectMisinformationCategoryOutputSchema},
  prompt: `You are an expert in identifying misinformation categories in text content.

  Analyze the following content and identify any misinformation categories present. The possible categories are: Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication.

  Content: {{{content}}}

  Provide the categories that apply to the given content.
  `,
});

const detectMisinformationCategoryFlow = ai.defineFlow(
  {
    name: 'detectMisinformationCategoryFlow',
    inputSchema: DetectMisinformationCategoryInputSchema,
    outputSchema: DetectMisinformationCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
