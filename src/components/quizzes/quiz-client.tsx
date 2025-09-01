'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { QuizQuestion } from '@/ai/flows';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle, HelpCircle, Loader2, RefreshCw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type QuizStatus = 'idle' | 'answered' | 'loading' | 'finished';

export function QuizClient({ initialQuestion, getNextQuestion }: { initialQuestion: QuizQuestion, getNextQuestion: () => Promise<QuizQuestion> }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([initialQuestion]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<QuizStatus>('idle');

  const question = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correctAnswerIndex;

  const handleAnswerSelect = (index: number) => {
    if (status !== 'idle') return;
    setSelectedAnswer(index);
    setStatus('answered');
    if (index === question.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = async () => {
    setStatus('loading');
    setSelectedAnswer(null);
    
    if (currentQuestionIndex === 4) { // 5 questions total
        setStatus('finished');
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        const nextQuestion = await getNextQuestion();
        setQuestions([...questions, nextQuestion]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setStatus('idle');
  };

  const handleRestart = async () => {
    setStatus('loading');
    const newQuestion = await getNextQuestion();
    setQuestions([newQuestion]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStatus('idle');
  }

  if (status === 'finished') {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="items-center">
                <Trophy className="w-16 h-16 text-amber-400" />
                <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-xl">Your final score is:</p>
                <p className="text-6xl font-bold my-4">{score} / 5</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={handleRestart}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Play Again
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span>Question {currentQuestionIndex + 1} / 5</span>
                <Badge variant="secondary">Score: {score}</Badge>
            </CardTitle>
            <CardDescription>{question.question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-md bg-muted border text-sm">
                <p>"{question.content}"</p>
            </div>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={status === 'answered' && index === selectedAnswer ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                  className={cn(
                      "w-full justify-start text-left h-auto py-3",
                      status === 'answered' && index === question.correctAnswerIndex && "bg-green-500 hover:bg-green-600 text-white",
                      status === 'answered' && index === selectedAnswer && !isCorrect && "bg-red-500 hover:bg-red-600 text-white"
                  )}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={status !== 'idle'}
                >
                  <div className="flex items-center">
                    {status === 'answered' && index === selectedAnswer ? (isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />) : <HelpCircle className="mr-2 text-muted-foreground" />}
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
            {status === 'answered' && (
              <Alert variant={isCorrect ? 'default' : 'destructive'} className={cn(isCorrect && "border-green-500")}>
                <AlertTitle className="flex items-center">{isCorrect ? 'Correct!' : 'Not Quite'}</AlertTitle>
                <AlertDescription>{question.explanation}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            {status === 'answered' && (
              <Button onClick={handleNextQuestion} disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 className="animate-spin" /> : currentQuestionIndex === 4 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            )}
          </CardFooter>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
