'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing fact-check results.
 *
 * It exports:
 * - `summarizeFactCheck`: An async function that takes a list of claims and returns a summary.
 * - `SummarizeFactCheckInput`: The input type for the summarizeFactCheck function.
 * - `SummarizeFactCheckOutput`: The output type for the summarizeFactCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { ClaimAnalysis } from './analyze-content-claims';

// Define the schema inline instead of importing it to avoid 'use server' conflicts.
const ClaimAnalysisSchema = z.object({
  claim: z.string().describe('The individual claim extracted from the content.'),
  credibility: z.enum(['credible', 'misleading', 'unsupported']).describe('The assessed credibility of the claim.'),
  reason: z.string().describe('The reasoning behind the credibility assessment.'),
});


const SummarizeFactCheckInputSchema = z.object({
  claims: z.array(ClaimAnalysisSchema).describe('An array of claim analysis results.'),
});
export type SummarizeFactCheckInput = z.infer<typeof SummarizeFactCheckInputSchema>;

const SummarizeFactCheckOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the fact-check results.'),
});
export type SummarizeFactCheckOutput = z.infer<typeof SummarizeFactCheckOutputSchema>;

export async function summarizeFactCheck(input: SummarizeFactCheckInput): Promise<SummarizeFactCheckOutput> {
  return summarizeFactCheckFlow(input);
}

const summarizeFactCheckPrompt = ai.definePrompt({
  name: 'summarizeFactCheckPrompt',
  input: {schema: SummarizeFactCheckInputSchema},
  output: {schema: SummarizeFactCheckOutputSchema},
  prompt: `You are a fact-check summarizer. Given an array of claims and their credibility, provide a one-sentence summary.

Make the summary easy to understand and actionable.

Example: "Out of 5 claims, 2 are supported, 1 is misleading, and 2 are unsupported."

Claims:
{{#each claims}}
- Claim: "{{this.claim}}" | Credibility: {{this.credibility}}
{{/each}}
`,
});

const summarizeFactCheckFlow = ai.defineFlow(
  {
    name: 'summarizeFactCheckFlow',
    inputSchema: SummarizeFactCheckInputSchema,
    outputSchema: SummarizeFactCheckOutputSchema,
  },
  async input => {
    if (input.claims.length === 0) {
      return { summary: 'No specific claims were identified in the text to summarize.' };
    }
    const {output} = await summarizeFactCheckPrompt(input);
    return output!;
  }
);
