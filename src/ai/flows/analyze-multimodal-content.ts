'use server';
/**
 * @fileOverview AI flow to analyze multimodal content for manipulation.
 *
 * - analyzeMultimodalContent - Analyzes an image for potential manipulation.
 * - AnalyzeMultimodalContentInput - Input type for the analyzeMultimodalContent function.
 * - AnalyzeMultimodalContentOutput - Return type for the analyzeMultimodalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMultimodalContentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be analyzed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMultimodalContentInput = z.infer<typeof AnalyzeMultimodalContentInputSchema>;

const AnalyzeMultimodalContentOutputSchema = z.object({
  isManipulated: z.boolean().describe('Whether the image is likely manipulated or not.'),
  manipulationType: z.string().describe('The type of manipulation detected, if any.'),
  explanation: z
    .string()
    .describe('An explanation of why the image is considered manipulated.'),
});
export type AnalyzeMultimodalContentOutput = z.infer<typeof AnalyzeMultimodalContentOutputSchema>;

export async function analyzeMultimodalContent(
  input: AnalyzeMultimodalContentInput
): Promise<AnalyzeMultimodalContentOutput> {
  return analyzeMultimodalContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMultimodalContentPrompt',
  input: {schema: AnalyzeMultimodalContentInputSchema},
  output: {schema: AnalyzeMultimodalContentOutputSchema},
  prompt: `You are an expert in identifying manipulated images.

You will be provided with an image and your task is to determine if it has been manipulated. Consider factors such as reverse image search results, AI-generated content detection, and whether the image is being used out of context.

Image: {{media url=photoDataUri}}

Based on your analysis, determine if the image is manipulated and, if so, what type of manipulation has been applied. Provide a detailed explanation for your assessment.
`,
});

const analyzeMultimodalContentFlow = ai.defineFlow(
  {
    name: 'analyzeMultimodalContentFlow',
    inputSchema: AnalyzeMultimodalContentInputSchema,
    outputSchema: AnalyzeMultimodalContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
