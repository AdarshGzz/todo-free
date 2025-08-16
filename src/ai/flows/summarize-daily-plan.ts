// Summarize-daily-plan.ts
'use server';
/**
 * @fileOverview A daily plan summarization AI agent.
 *
 * - summarizeDailyPlan - A function that handles the summarization of the daily plan.
 * - SummarizeDailyPlanInput - The input type for the summarizeDailyPlan function.
 * - SummarizeDailyPlanOutput - The return type for the summarizeDailyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDailyPlanInputSchema = z.object({
  tasks: z
    .string()
    .describe("A list of tasks for the day."),
});
export type SummarizeDailyPlanInput = z.infer<typeof SummarizeDailyPlanInputSchema>;

const SummarizeDailyPlanOutputSchema = z.object({
  summary: z.string().describe('A summary of the tasks for the day.'),
  progress: z.string().describe('A short, one-sentence summary of what you have generated.')
});
export type SummarizeDailyPlanOutput = z.infer<typeof SummarizeDailyPlanOutputSchema>;

export async function summarizeDailyPlan(input: SummarizeDailyPlanInput): Promise<SummarizeDailyPlanOutput> {
  return summarizeDailyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDailyPlanPrompt',
  input: {schema: SummarizeDailyPlanInputSchema},
  output: {schema: SummarizeDailyPlanOutputSchema},
  prompt: `You are an AI assistant helping users summarize their daily tasks.

  Summarize the following tasks for the day:
  {{tasks}}
  `,
});

const summarizeDailyPlanFlow = ai.defineFlow(
  {
    name: 'summarizeDailyPlanFlow',
    inputSchema: SummarizeDailyPlanInputSchema,
    outputSchema: SummarizeDailyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a flow that summarizes a list of daily tasks.'
    };
  }
);
