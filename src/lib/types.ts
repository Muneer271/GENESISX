import type {
  AnalyzeContentCredibilityOutput,
  DetectMisinformationCategoryOutput,
  AnalyzeContentBiasAndSentimentOutput,
  AnalyzeContentClaimsOutput,
  ExplainCredibilityAssessmentOutput,
  AnalyzeMultimodalContentOutput,
  DetectFakeNewsSourceOutput,
} from '@/ai/flows';

export type TextAnalysisResult = {
  credibility: AnalyzeContentCredibilityOutput;
  categories: DetectMisinformationCategoryOutput;
  biasSentiment: AnalyzeContentBiasAndSentimentOutput;
  claims: AnalyzeContentClaimsOutput;
  explanation: ExplainCredibilityAssessmentOutput;
};

export type ImageAnalysisResult = AnalyzeMultimodalContentOutput;

export type NewsSourceAnalysisResult = DetectFakeNewsSourceOutput;

export type AnalysisResult =
  | { type: 'text'; data: TextAnalysisResult }
  | { type: 'image'; data: ImageAnalysisResult }
  | { type: 'news_source'; data: NewsSourceAnalysisResult };
