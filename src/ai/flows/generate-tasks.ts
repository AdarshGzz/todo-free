// Use server directive is required for Genkit flows.
'use server';

/**
 * @fileOverview Implements the AI-powered to-do generation feature.
 *
 * - generateTasks - A function that takes a topic and generates a list of tasks.
 * - GenerateTasksInput - The input type for the generateTasks function.
 * - GenerateTasksOutput - The return type for the generateTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTasksInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate tasks (e.g., "Plan a trip to Japan").'),
});
export type GenerateTasksInput = z.infer<typeof GenerateTasksInputSchema>;

const GenerateTasksOutputSchema = z.object({
  tasks: z.array(
    z.string().describe('A task related to the topic.')
  ).describe('The list of generated tasks.')
});
export type GenerateTasksOutput = z.infer<typeof GenerateTasksOutputSchema>;

export async function generateTasks(input: GenerateTasksInput): Promise<GenerateTasksOutput> {
  return generateTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTasksPrompt',
  input: {schema: GenerateTasksInputSchema},
  output: {schema: GenerateTasksOutputSchema},
  prompt: `You are a helpful AI assistant designed to generate to-do lists.

  Given a topic, you will generate a list of structured, related tasks.
  The tasks should be specific and actionable.

  Topic: {{{topic}}}
  Tasks:`,
});

const generateTasksFlow = ai.defineFlow(
  {
    name: 'generateTasksFlow',
    inputSchema: GenerateTasksInputSchema,
    outputSchema: GenerateTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
