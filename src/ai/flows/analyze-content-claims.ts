'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing the credibility of claims within a given text content.
 *
 * It exports:
 * - `analyzeContentClaims`: An async function that takes text content as input and returns an analysis of individual claims, indicating whether they are credible, misleading, or unsupported.
 * - `AnalyzeContentClaimsInput`: The input type for the analyzeContentClaims function, which is an object containing the content string.
 * - `AnalyzeContentClaimsOutput`: The output type for the analyzeContentClaims function, an array of claim analysis results.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentClaimsInputSchema = z.object({
  content: z.string().describe('The text content to analyze for claim credibility.'),
});
export type AnalyzeContentClaimsInput = z.infer<typeof AnalyzeContentClaimsInputSchema>;

const ClaimAnalysisResultSchema = z.object({
  claim: z.string().describe('The individual claim extracted from the content.'),
  credibility: z.enum(['credible', 'misleading', 'unsupported']).describe('The assessed credibility of the claim.'),
  reason: z.string().describe('The reasoning behind the credibility assessment.'),
});

export type ClaimAnalysisResult = z.infer<typeof ClaimAnalysisResultSchema>;

const AnalyzeContentClaimsOutputSchema = z.array(ClaimAnalysisResultSchema).describe('An array of claim analysis results.');
export type AnalyzeContentClaimsOutput = z.infer<typeof AnalyzeContentClaimsOutputSchema>;


export async function analyzeContentClaims(input: AnalyzeContentClaimsInput): Promise<AnalyzeContentClaimsOutput> {
  return analyzeContentClaimsFlow(input);
}

const analyzeContentClaimsPrompt = ai.definePrompt({
  name: 'analyzeContentClaimsPrompt',
  input: {schema: AnalyzeContentClaimsInputSchema},
  output: {schema: AnalyzeContentClaimsOutputSchema},
  prompt: `You are an expert fact-checker and claim analyst. Your task is to analyze the provided text content and break it down into individual, key claims. For each claim, you must assess its credibility, determining whether it is credible, misleading, or unsupported. Provide a brief reason for your assessment. Structure your output as a JSON array, where each object in the array represents a claim and its analysis.

Text Content: {{{content}}}

Example Output:
[
  {
    "claim": "Claim 1: [Specific claim from the text]",
    "credibility": "[credible/misleading/unsupported]",
    "reason": "[Brief explanation for the credibility assessment]"
  },
  {
    "claim": "Claim 2: [Specific claim from the text]",
    "credibility": "[credible/misleading/unsupported]",
    "reason": "[Brief explanation for the credibility assessment]"
  }
]

Ensure the output is a valid JSON array. Focus on identifying factual claims that can be assessed for truthfulness.
`,
});

const analyzeContentClaimsFlow = ai.defineFlow(
  {
    name: 'analyzeContentClaimsFlow',
    inputSchema: AnalyzeContentClaimsInputSchema,
    outputSchema: AnalyzeContentClaimsOutputSchema,
  },
  async input => {
    const {output} = await analyzeContentClaimsPrompt(input);
    return output!;
  }
);
