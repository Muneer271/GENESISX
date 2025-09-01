'use server';
/**
 * @fileOverview Generates a quiz question to test misinformation detection skills.
 *
 * - generateQuizQuestion - A function that returns a single quiz question.
 * - QuizQuestion - The return type for the generateQuizQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question text.'),
  content: z
    .string()
    .describe(
      'The content to be evaluated (e.g., a news headline, a short paragraph).'
    ),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswerIndex: z
    .number()
    .describe('The index of the correct answer in the options array.'),
  explanation: z
    .string()
    .describe('A brief explanation of why the answer is correct.'),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function generateQuizQuestion(): Promise<QuizQuestion> {
  return generateQuizQuestionFlow();
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionPrompt',
  output: {schema: QuizQuestionSchema},
  prompt: `You are an AI that creates educational quiz questions about identifying misinformation. Generate a single, unique, multiple-choice question.

The question should present a piece of content (like a headline or short text) and ask the user to identify a specific type of misinformation, bias, or logical fallacy.

Make the options plausible but with one clear correct answer.

The content should be a realistic example of what someone might see online.
Provide a clear explanation for the correct answer.`,
});

const generateQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionFlow',
    outputSchema: QuizQuestionSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
