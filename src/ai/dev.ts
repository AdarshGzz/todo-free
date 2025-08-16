import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-daily-plan.ts';
import '@/ai/flows/auto-categorize-tasks.ts';
import '@/ai/flows/generate-tasks.ts';
import '@/ai/flows/rephrase-task.ts';
