'use server';

/**
 * @fileOverview Analyzes content for emotional tone and virality potential.
 *
 * - analyzeEmotionalTone - A function that analyzes content for emotional manipulation and virality.
 * - AnalyzeEmotionalToneInput - The input type for the analyzeEmotionalTone function.
 * - AnalyzeEmotionalToneOutput - The return type for the analyzeEmotionalTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEmotionalToneInputSchema = z.object({
  content: z.string().describe('The text content to analyze.'),
});
export type AnalyzeEmotionalToneInput = z.infer<typeof AnalyzeEmotionalToneInputSchema>;

const AnalyzeEmotionalToneOutputSchema = z.object({
  tone: z.string().describe('The primary emotional tone of the content (e.g., Fear, Outrage, Joy, Neutral).'),
  virality: z.enum(['Low', 'Medium', 'High']).describe('The potential for the content to go viral on social media.'),
  explanation: z.string().describe('An explanation of the detected tone and virality potential.'),
});
export type AnalyzeEmotionalToneOutput = z.infer<typeof AnalyzeEmotionalToneOutputSchema>;

export async function analyzeEmotionalTone(input: AnalyzeEmotionalToneInput): Promise<AnalyzeEmotionalToneOutput> {
  return analyzeEmotionalToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEmotionalTonePrompt',
  input: {schema: AnalyzeEmotionalToneInputSchema},
  output: {schema: AnalyzeEmotionalToneOutputSchema},
  prompt: `Analyze the following text content for its emotional tone and potential for virality on social media.

Content: {{{content}}}

Identify the primary emotional driver (e.g., Fear, Outrage, Joy, Inspiration, Sadness, Neutral).
Assess its virality potential as Low, Medium, or High based on how likely it is to be shared rapidly.
Provide a brief explanation for your assessment.`,
});

const analyzeEmotionalToneFlow = ai.defineFlow(
  {
    name: 'analyzeEmotionalToneFlow',
    inputSchema: AnalyzeEmotionalToneInputSchema,
    outputSchema: AnalyzeEmotionalToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
