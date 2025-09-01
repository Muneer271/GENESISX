'use server';
/**
 * @fileOverview Analyzes content for political/ideological bias and sentiment.
 *
 * - analyzeContentBiasAndSentiment - A function that analyzes content for bias and sentiment.
 * - AnalyzeContentBiasAndSentimentInput - The input type for the analyzeContentBiasAndSentiment function.
 * - AnalyzeContentBiasAndSentimentOutput - The return type for the analyzeContentBiasAndSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentBiasAndSentimentInputSchema = z.object({
  content: z.string().describe('The text content to analyze.'),
});
export type AnalyzeContentBiasAndSentimentInput = z.infer<typeof AnalyzeContentBiasAndSentimentInputSchema>;

const AnalyzeContentBiasAndSentimentOutputSchema = z.object({
  bias: z.string().describe('The detected political/ideological bias (e.g., left, right, center).'),
  sentiment: z.string().describe('The sentiment of the content (positive, negative, neutral, extreme).'),
  explanation: z.string().describe('An explanation of why the content is biased and the overall sentiment.'),
});
export type AnalyzeContentBiasAndSentimentOutput = z.infer<typeof AnalyzeContentBiasAndSentimentOutputSchema>;

export async function analyzeContentBiasAndSentiment(input: AnalyzeContentBiasAndSentimentInput): Promise<AnalyzeContentBiasAndSentimentOutput> {
  return analyzeContentBiasAndSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentBiasAndSentimentPrompt',
  input: {schema: AnalyzeContentBiasAndSentimentInputSchema},
  output: {schema: AnalyzeContentBiasAndSentimentOutputSchema},
  prompt: `Analyze the following text content for political/ideological bias and sentiment. Provide an explanation for your assessment.\n\nContent: {{{content}}}\n\nBias: (left, right, center, or neutral)\nSentiment: (positive, negative, neutral, or extreme)\nExplanation:`, // Provide a detailed explanation.
});

const analyzeContentBiasAndSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeContentBiasAndSentimentFlow',
    inputSchema: AnalyzeContentBiasAndSentimentInputSchema,
    outputSchema: AnalyzeContentBiasAndSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
