'use server';

/**
 * @fileOverview Automatically categorizes tasks based on their description using AI.
 *
 * - autoCategorizeTasks - A function that categorizes a list of tasks.
 * - AutoCategorizeTasksInput - The input type for the autoCategorizeTasks function.
 * - AutoCategorizeTasksOutput - The return type for the autoCategorizeTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoCategorizeTasksInputSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the task.'),
      description: z.string().describe('The description of the task.'),
    })
  ).describe('A list of tasks to categorize.'),
});
export type AutoCategorizeTasksInput = z.infer<typeof AutoCategorizeTasksInputSchema>;

const AutoCategorizeTasksOutputSchema = z.array(
  z.object({
    id: z.string().describe('The unique identifier of the task.'),
    category: z.string().describe('The predicted category for the task.'),
  })
);
export type AutoCategorizeTasksOutput = z.infer<typeof AutoCategorizeTasksOutputSchema>;

export async function autoCategorizeTasks(input: AutoCategorizeTasksInput): Promise<AutoCategorizeTasksOutput> {
  return autoCategorizeTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoCategorizeTasksPrompt',
  input: {schema: AutoCategorizeTasksInputSchema},
  output: {schema: AutoCategorizeTasksOutputSchema},
  prompt: `You are a task categorization expert. Given a list of tasks with their descriptions, you will predict a category for each task.

Tasks:
{{#each tasks}}
- ID: {{this.id}}, Description: {{this.description}}
{{/each}}

Respond with a JSON array where each object has the task id and predicted category.

Example:
[
  {
    "id": "task1",
    "category": "Work"
  },
  {
    "id": "task2",
    "category": "Personal"
  }
]
`,
});

const autoCategorizeTasksFlow = ai.defineFlow(
  {
    name: 'autoCategorizeTasksFlow',
    inputSchema: AutoCategorizeTasksInputSchema,
    outputSchema: AutoCategorizeTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
