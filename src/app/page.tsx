import { AnalysisForm } from '@/components/analysis/analysis-form';
import { analyzeContent, analyzeImage } from '@/app/actions';

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Content Credibility Analysis
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground sm:mt-5">
          Paste text, a URL, or upload an image to get an instant credibility report powered by AI.
        </p>
      </div>
      <AnalysisForm analyzeContent={analyzeContent} analyzeImage={analyzeImage} />
    </div>
  );
}
