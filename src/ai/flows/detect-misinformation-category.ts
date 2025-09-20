'use server';

/**
 * @fileOverview Detects and labels content with misinformation categories.
 *
 * - detectMisinformationCategory - A function that detects misinformation categories in content.
 * - DetectMisinfornationCategoryInput - The input type for the detectMisinformationCategory function.
 * - DetectMisinfornationCategoryOutput - The return type for the detectMisinformationCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectMisinfornationCategoryInputSchema = z.object({
  content: z.string().describe('The content to analyze for misinformation categories.'),
});
export type DetectMisinfornationCategoryInput = z.infer<
  typeof DetectMisinfornationCategoryInputSchema
>;

const DetectMisinfornationCategoryOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe(
      'An array of misinformation categories detected in the content (e.g., Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication).'
    ),
});
export type DetectMisinfornationCategoryOutput = z.infer<
  typeof DetectMisinfornationCategoryOutputSchema
>;

export async function detectMisinformationCategory(
  input: DetectMisinfornationCategoryInput
): Promise<DetectMisinfornationCategoryOutput> {
  return detectMisinformationCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectMisinformationCategoryPrompt',
  input: {schema: DetectMisinfornationCategoryInputSchema},
  output: {schema: DetectMisinfornationCategoryOutputSchema},
  prompt: `You are an expert in identifying misinformation categories in text content.

  Analyze the following content and identify any misinformation categories present. The possible categories are: Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication.

  Content: {{{content}}}

  Provide the categories that apply to the given content.
  `,
});

const detectMisinformationCategoryFlow = ai.defineFlow(
  {
    name: 'detectMisinformationCategoryFlow',
    inputSchema: DetectMisinfornationCategoryInputSchema,
    outputSchema: DetectMisinfornationCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
