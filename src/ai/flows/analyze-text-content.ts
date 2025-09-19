'use server';
/**
 * @fileOverview A comprehensive text analysis flow.
 *
 * - analyzeTextContent - A function that handles the text analysis process.
 * - AnalyzeTextContentInput - The input type for the analyzeTextContent function.
 * - AnalyzeTextContentOutput - The return type for the analyzeTextContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTextContentInputSchema = z.object({
  content: z.string().describe('The text content to analyze.'),
});
export type AnalyzeTextContentInput = z.infer<typeof AnalyzeTextContentInputSchema>;

const AnalyzeTextContentOutputSchema = z.object({
  credibilityScore: z.number().describe('A score from 0 to 1 indicating the credibility of the content.'),
  misinformationRiskLevel: z.enum(['low', 'medium', 'high']).describe('The risk level of the content containing misinformation.'),
  flaggedPatterns: z.array(z.string()).describe('An array of patterns flagged in the content that may indicate misinformation.'),
  bias: z.string().describe('The detected political/ideological bias (e.g., left, right, center).'),
  sentiment: z.string().describe('The sentiment of the content (positive, negative, neutral, extreme).'),
  emotionalTone: z.string().describe('The primary emotional tone of the content (e.g., Fear, Outrage, Joy, Neutral).'),
  virality: z.enum(['Low', 'Medium', 'High']).describe('The potential for the content to go viral on social media.'),
  misinformationCategories: z.array(z.string()).describe('An array of misinformation categories detected (e.g., Clickbait, Conspiracy, Satire).'),
});
export type AnalyzeTextContentOutput = z.infer<typeof AnalyzeTextContentOutputSchema>;

export async function analyzeTextContent(input: AnalyzeTextContentInput): Promise<AnalyzeTextContentOutput> {
  return analyzeTextContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTextContentPrompt',
  input: {schema: AnalyzeTextContentInputSchema},
  output: {schema: AnalyzeTextContentOutputSchema},
  prompt: `Analyze the following text content for a comprehensive credibility assessment.

Content: {{{content}}}

Based on the content, provide the following analysis:
- Credibility Score (0-1): A score from 0 to 1 indicating the credibility of the content.
- Misinformation Risk Level (low, medium, high): The risk level of the content containing misinformation.
- Flagged Patterns: An array of patterns flagged in the content that may indicate misinformation.
- Bias: The detected political/ideological bias (e.g., left, right, center).
- Sentiment: The sentiment of the content (positive, negative, neutral, extreme).
- Emotional Tone: The primary emotional tone of the content (e.g., Fear, Outrage, Joy, Neutral).
- Virality: The potential for the content to go viral on social media (Low, Medium, High).
- Misinformation Categories: An array of misinformation categories detected (e.g., Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication).
`,
});

const analyzeTextContentFlow = ai.defineFlow(
  {
    name: 'analyzeTextContentFlow',
    inputSchema: AnalyzeTextContentInputSchema,
    outputSchema: AnalyzeTextContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
