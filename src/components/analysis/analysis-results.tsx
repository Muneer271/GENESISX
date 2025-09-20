'use client';

import {
  AlertTriangle,
  CheckCircle2,
  FileEdit,
  FlaskConical,
  GitCommit,
  Globe,
  Lightbulb,
  MousePointerClick,
  Network,
  Scale,
  SmilePlus,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  XCircle,
  BarChart,
  Flame,
} from 'lucide-react';
import type { AnalysisResult, TextAnalysisResult, ImageAnalysisResult, NewsSourceAnalysisResult } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CredibilityGauge } from './credibility-gauge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';
import Image from 'next/image';

const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
  const variants = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  const icons = {
    low: <CheckCircle2 className="mr-1 h-4 w-4" />,
    medium: <AlertTriangle className="mr-1 h-4 w-4" />,
    high: <XCircle className="mr-1 h-4 w-4" />,
  };
  return (
    <Badge variant="outline" className={`border-0 text-sm capitalize ${variants[level]}`}>
      {icons[level]}
      {level} Risk
    </Badge>
  );
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  Clickbait: <MousePointerClick className="h-4 w-4" />,
  Conspiracy: <Network className="h-4 w-4" />,
  Deepfake: <FlaskConical className="h-4 w-4" />,
  Satire: <SmilePlus className="h-4 w-4" />,
  Bias: <Scale className="h-4 w-4" />,
  Fabrication: <FileEdit className="h-4 w-4" />,
};

const claimCredibilityIcons: { [key: string]: React.ReactNode } = {
  credible: <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" title="Supported" />,
  unsupported: <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0 text-amber-500" title="Unverified" />,
  misleading: <XCircle className="mr-2 h-5 w-5 flex-shrink-0 text-red-500" title="False" />,
};

function TextAnalysisView({ result }: { result: TextAnalysisResult }) {
  const [simpleMode, setSimpleMode] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <CredibilityGauge score={result.credibility.credibilityScore} />
          {getRiskBadge(result.credibility.misinformationRiskLevel)}
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2 justify-end">
          <Switch id="simple-mode" checked={simpleMode} onCheckedChange={setSimpleMode} />
          <Label htmlFor="simple-mode" className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-accent" /> Explain Like I'm 5</Label>
        </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary" />
            AI Explanation
          </CardTitle>
          <CardDescription>
            {simpleMode ? "Here's a super simple summary of what the AI found." : "A detailed breakdown of the credibility assessment."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base">{simpleMode ? "This story seems a bit fishy. It uses tricky words to make you feel a certain way and doesn't show where it got its info from. It's good to be careful with stories like this!" : result.explanation.explanation}</p>
          <Separator />
          <h4 className="font-semibold text-foreground">Media Literacy Tips</h4>
          <ul className="list-disc space-y-2 pl-5">
            {result.explanation.mediaLiteracyTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="text-primary" />
            Fact-Check Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-medium">{result.factCheckSummary.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Misinformation Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {result.categories.categories.length > 0 ? result.categories.categories.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-base py-1">
                {categoryIcons[cat] || <GitCommit className="h-4 w-4" />}
                <span className="ml-2">{cat}</span>
              </Badge>
            )) : <p className="text-muted-foreground">No specific misinformation categories detected.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bias & Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Bias:</strong> <span className="capitalize">{result.biasSentiment.bias}</span></p>
            <p><strong>Sentiment:</strong> <span className="capitalize">{result.biasSentiment.sentiment}</span></p>
            <p className="text-sm text-muted-foreground pt-2">{result.biasSentiment.explanation}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Virality & Emotional Tone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Tone:</strong> <span className="capitalize">{result.emotionalTone.tone}</span></p>
            <p><strong>Virality:</strong> <span className="capitalize">{result.emotionalTone.virality}</span></p>
            <p className="text-sm text-muted-foreground pt-2">{result.emotionalTone.explanation}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claim Breakdown</CardTitle>
          <CardDescription>Key claims detected in the text, with a credibility verdict for each.</CardDescription>
        </CardHeader>
        <CardContent>
          {result.claims.claims.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {result.claims.claims.map((claim, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger>
                    <div className="flex items-center text-left">
                      {claimCredibilityIcons[claim.credibility] || <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500" />}
                      <span className="font-medium">{claim.claim}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{claim.reason}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
           ) : (
            <p className="text-muted-foreground">No specific claims were identified for analysis.</p>
           )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Community Feedback</CardTitle>
          <CardDescription>Does this analysis seem right? Let the community know.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4"/> Accurate</Button>
          <Button variant="outline"><ThumbsDown className="mr-2 h-4 w-4"/> Inaccurate</Button>
          <p className="text-sm text-muted-foreground ml-auto">89% of users found this helpful.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ImageAnalysisView({ result }: { result: ImageAnalysisResult }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Image Manipulation Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {result.isManipulated ? 
                        <AlertTriangle className="w-16 h-16 text-destructive" /> : 
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    }
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                            {result.isManipulated ? "Manipulation Likely" : "Looks Authentic"}
                        </h3>
                        {result.isManipulated && (
                            <p className="text-lg text-muted-foreground">Type: {result.manipulationType}</p>
                        )}
                    </div>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold">Explanation:</h4>
                    <p className="text-muted-foreground">{result.explanation}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function NewsSourceAnalysisView({ result }: { result: NewsSourceAnalysisResult }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>News Source Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {result.isFakeNews ? 
                        <AlertTriangle className="w-16 h-16 text-destructive" /> : 
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    }
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                            {result.isFakeNews ? "Unreliable Source" : "Reputable Source"}
                        </h3>
                         <p className="text-lg text-muted-foreground">
                            {result.isFakeNews ? "This source may contain misinformation." : "This source is generally considered reliable."}
                        </p>
                    </div>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold">Reasoning:</h4>
                    <p className="text-muted-foreground">{result.reason}</p>
                </div>
            </CardContent>
        </Card>
    );
}


export function AnalysisResults({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-8 animate-fade-in">
        {result.type === 'text' && <TextAnalysisView result={result.data} />}
        {result.type === 'image' && <ImageAnalysisView result={result.data} />}
        {result.type === 'news_source' && <NewsSourceAnalysisView result={result.data} />}
    </div>
  );
}
