'use server';
/**
 * @fileOverview Analyzes content credibility by providing a score, risk level, and flagged patterns.
 *
 * - analyzeContentCredibility - A function that analyzes content and returns a credibility assessment.
 * - AnalyzeContentCredibilityInput - The input type for the analyzeContentCredibility function.
 * - AnalyzeContentCredibilityOutput - The return type for the analyzeContentCredibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentCredibilityInputSchema = z.object({
  content: z.string().describe('The content to analyze, which can be text, a URL, or a social media post.'),
});
export type AnalyzeContentCredibilityInput = z.infer<typeof AnalyzeContentCredibilityInputSchema>;

const AnalyzeContentCredibilityOutputSchema = z.object({
  credibilityScore: z.number().describe('A score from 0 to 1 indicating the credibility of the content.'),
  misinformationRiskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level of the content containing misinformation.'),
  flaggedPatterns: z.array(z.string()).describe('An array of patterns flagged in the content that may indicate misinformation.'),
});
export type AnalyzeContentCredibilityOutput = z.infer<typeof AnalyzeContentCredibilityOutputSchema>;

export async function analyzeContentCredibility(input: AnalyzeContentCredibilityInput): Promise<AnalyzeContentCredibilityOutput> {
  return analyzeContentCredibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentCredibilityPrompt',
  input: {schema: AnalyzeContentCredibilityInputSchema},
  output: {schema: AnalyzeContentCredibilityOutputSchema},
  prompt: `Analyze the following content and determine its credibility score, misinformation risk level, and any flagged patterns that may indicate misinformation.

Content: {{{content}}}

Credibility Score (0-1): 
Misinformation Risk Level (low, medium, high): 
Flagged Patterns:`, 
});

const analyzeContentCredibilityFlow = ai.defineFlow(
  {
    name: 'analyzeContentCredibilityFlow',
    inputSchema: AnalyzeContentCredibilityInputSchema,
    outputSchema: AnalyzeContentCredibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
