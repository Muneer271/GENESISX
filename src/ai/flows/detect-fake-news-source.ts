'use server';

/**
 * @fileOverview Detects fake news sources from a URL.
 *
 * - detectFakeNewsSource - A function that analyzes a URL to determine if it's a fake news source.
 * - DetectFakeNewsSourceInput - The input type for the detectFakeNewsSource function.
 * - DetectFakeNewsSourceOutput - The return type for the detectFakeNewsSource function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFakeNewsSourceInputSchema = z.object({
  url: z.string().url().describe('The URL of the news source to analyze.'),
});
export type DetectFakeNewsSourceInput = z.infer<typeof DetectFakeNewsSourceInputSchema>;

const DetectFakeNewsSourceOutputSchema = z.object({
  isFakeNews: z.boolean().describe('Whether the source is considered to be fake news or unreliable.'),
  reason: z.string().describe('An explanation for why the source is or is not considered fake news.'),
});
export type DetectFakeNewsSourceOutput = z.infer<typeof DetectFakeNewsSourceOutputSchema>;

export async function detectFakeNewsSource(
  input: DetectFakeNewsSourceInput
): Promise<DetectFakeNewsSourceOutput> {
  return detectFakeNewsSourceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectFakeNewsSourcePrompt',
  input: {schema: DetectFakeNewsSourceInputSchema},
  output: {schema: DetectFakeNewsSourceOutputSchema},
  prompt: `You are an expert in identifying unreliable and fake news websites. Analyze the given URL and the content at that URL to determine if it is a known source of misinformation, propaganda, or fake news.

URL: {{{url}}}

Consider the following factors:
- Website's reputation and history.
- Presence of factually inaccurate or biased content.
- Use of sensationalist headlines or clickbait.
- Lack of clear authorship or editorial standards.
- Domain squatting or imitation of legitimate news sources.

Based on your analysis, determine if the website is a fake news source and provide a concise reason for your assessment.`,
});

const detectFakeNewsSourceFlow = ai.defineFlow(
  {
    name: 'detectFakeNewsSourceFlow',
    inputSchema: DetectFakeNewsSourceInputSchema,
    outputSchema: DetectFakeNewsSourceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
