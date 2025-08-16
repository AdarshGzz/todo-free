// src/app/api/genkit/[...slug]/route.ts
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import {NextRequest} from 'next/server';
import {createApp} from '@genkit-ai/next';
import {ai} from '@/ai/genkit';
import '@/ai/flows/summarize-daily-plan';
import '@/ai/flows/auto-categorize-tasks';
import '@/ai/flows/generate-tasks';

export const maxDuration = 120; // 2 minutes

const app = createApp({
  ai,
  // Other Genkit Next.js app config options can be passed in here.
});

export const GET = async (req: NextRequest, {params}: {params: {slug: string[]}}) => {
  return app(req, {params});
};
export const POST = async (req: NextRequest, {params}: {params: {slug: string[]}}) => {
  return app(req, {params});
};
export const PUT = async (req: NextRequest, {params}: {params: {slug: string[]}}) => {
  return app(req, {params});
};
export const PATCH = async (req: NextRequest, {params}: {params: {slug: string[]}}) => {
  return app(req, {params});
};
export const DELETE = async (req: NextRequest, {params}: {params: {slug: string[]}}) => {
  return app(req, {params});
};
