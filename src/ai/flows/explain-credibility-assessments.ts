// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides human-readable explanations for credibility assessments.
 *
 * - explainCredibilityAssessment - A function that explains the credibility of a given content.
 * - ExplainCredibilityAssessmentInput - The input type for the explainCredibilityAssessment function.
 * - ExplainCredibilityAssessmentOutput - The return type for the explainCredibilityAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCredibilityAssessmentInputSchema = z.object({
  content: z.string().describe('The content to assess for credibility.'),
  assessmentScore: z.number().describe('The credibility score of the content.'),
  flaggedPatterns: z.array(z.string()).describe('The flagged patterns in the content.'),
});
export type ExplainCredibilityAssessmentInput = z.infer<
  typeof ExplainCredibilityAssessmentInputSchema
>;

const ExplainCredibilityAssessmentOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A human-readable explanation of the credibility assessment.'),
  mediaLiteracyTips: z
    .array(z.string())
    .describe('Bite-sized media literacy lessons related to the assessment.'),
});
export type ExplainCredibilityAssessmentOutput = z.infer<
  typeof ExplainCredibilityAssessmentOutputSchema
>;

export async function explainCredibilityAssessment(
  input: ExplainCredibilityAssessmentInput
): Promise<ExplainCredibilityAssessmentOutput> {
  return explainCredibilityAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCredibilityAssessmentPrompt',
  input: {schema: ExplainCredibilityAssessmentInputSchema},
  output: {schema: ExplainCredibilityAssessmentOutputSchema},
  prompt: `You are an AI assistant designed to explain credibility assessments of online content to users.

You will receive the content, an assessment score, and any flagged patterns. Based on this information, provide a human-readable explanation of why the content received that assessment.

Also, provide 2-3 bite-sized media literacy tips that are relevant to the assessment.

Content: {{{content}}}
Assessment Score: {{{assessmentScore}}}
Flagged Patterns: {{#each flaggedPatterns}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Explanation:`,
});

const explainCredibilityAssessmentFlow = ai.defineFlow(
  {
    name: 'explainCredibilityAssessmentFlow',
    inputSchema: ExplainCredibilityAssessmentInputSchema,
    outputSchema: ExplainCredibilityAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
