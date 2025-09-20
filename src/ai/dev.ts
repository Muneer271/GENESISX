import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-content-credibility.ts';
import '@/ai/flows/analyze-content-bias-sentiment.ts';
import '@/ai/flows/analyze-emotional-tone.ts';
import '@/ai/flows/detect-misinformation-category.ts';
import '@/ai/flows/analyze-multimodal-content.ts';
import '@/ai/flows/explain-credibility-assessments.ts';
import '@/ai/flows/analyze-content-claims.ts';
import '@/ai/flows/detect-fake-news-source.ts';
import '@/ai/flows/summarize-fact-check.ts';
import '@/ai/flows/generate-quiz-question.ts';
