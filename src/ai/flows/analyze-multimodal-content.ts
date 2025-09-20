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
  isManipulated: z.boolean().describe('Whether the image is likely manipulated or AI-generated.'),
  manipulationType: z.enum(["AI-Generated", "Edited", "Out-of-Context", "Authentic"]).describe('The type of manipulation detected. If not manipulated, this should be "Authentic".'),
  explanation: z
    .string()
    .describe('A detailed explanation of why the image is considered manipulated or authentic, citing specific visual evidence.'),
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
  prompt: `You are an expert digital image forensics analyst. Your task is to meticulously examine an image for any signs of manipulation, including being AI-generated, edited (e.g., photoshopped), or used out of context.

Image: {{media url=photoDataUri}}

Analyze the image for the following forensic artifacts:
- Inconsistent lighting, shadows, or reflections.
- Unnatural textures, patterns, or repetitions.
- Illogical or physically impossible details (e.g., incorrect number of fingers, distorted backgrounds).
- Signs of digital editing, such as blurring, pixelation, or mismatched resolutions.
- Contextual clues that suggest the image might be staged or misrepresented.
- Watermarks or artifacts from AI generation tools.

Based on your forensic analysis, determine if the image is manipulated.
- If it is, classify the manipulation type as "AI-Generated", "Edited", or "Out-of-Context".
- If it appears authentic, classify it as "Authentic".

Provide a detailed explanation for your assessment, pointing to specific visual evidence in the image to support your conclusion.
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
