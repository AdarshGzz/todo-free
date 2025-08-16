'use server';

/**
 * @fileOverview Rephrases a task to be clearer and more actionable using AI.
 *
 * - rephraseTask - A function that rephrases a single task.
 * - RephraseTaskInput - The input type for the rephraseTask function.
 * - RephraseTaskOutput - The return type for the rephraseTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseTaskInputSchema = z.object({
  task: z.string().describe('The task content to rephrase.'),
});
export type RephraseTaskInput = z.infer<typeof RephraseTaskInputSchema>;

const RephraseTaskOutputSchema = z.object({
    rephrasedTask: z.string().describe('The rephrased, clearer version of the task.'),
});
export type RephraseTaskOutput = z.infer<typeof RephraseTaskOutputSchema>;

export async function rephraseTask(input: RephraseTaskInput): Promise<RephraseTaskOutput> {
  return rephraseTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rephraseTaskPrompt',
  input: {schema: RephraseTaskInputSchema},
  output: {schema: RephraseTaskOutputSchema},
  prompt: `You are an expert in productivity and clarity. Your goal is to rephrase a given task to be more specific, actionable, and professional. Keep the core meaning the same.

  Original Task: "{{task}}"
  
  Rephrase it to be clearer and more professional. For example, 'do report' could become 'Complete and finalize the monthly report'.
  `,
});

const rephraseTaskFlow = ai.defineFlow(
  {
    name: 'rephraseTaskFlow',
    inputSchema: RephraseTaskInputSchema,
    outputSchema: RephraseTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
