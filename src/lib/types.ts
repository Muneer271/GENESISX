import type {
  AnalyzeContentCredibilityOutput,
  DetectMisinfornationCategoryOutput,
  AnalyzeContentBiasAndSentimentOutput,
  AnalyzeEmotionalToneOutput,
  AnalyzeContentClaimsOutput,
  ExplainCredibilityAssessmentOutput,
  SummarizeFactCheckOutput,
  AnalyzeMultimodalContentOutput,
  DetectFakeNewsSourceOutput,
} from '@/ai/flows';

export type TextAnalysisResult = {
  credibility: AnalyzeContentCredibilityOutput;
  categories: DetectMisinfornationCategoryOutput;
  biasSentiment: AnalyzeContentBiasAndSentimentOutput;
  emotionalTone: AnalyzeEmotionalToneOutput;
  claims: AnalyzeContentClaimsOutput;
  explanation: ExplainCredibilityAssessmentOutput;
  factCheckSummary: SummarizeFactCheckOutput;
};

export type ImageAnalysisResult = AnalyzeMultimodalContentOutput;

export type NewsSourceAnalysisResult = DetectFakeNewsSourceOutput;

export type AnalysisResult = 
    | { type: 'text', data: TextAnalysisResult }
    | { type: 'image', data: ImageAnalysisResult }
    | { type: 'news_source', data: NewsSourceAnalysisResult };
