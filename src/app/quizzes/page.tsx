import { generateQuizQuestion } from "@/ai/flows";
import { QuizClient } from "@/components/quizzes/quiz-client";

export default async function QuizzesPage() {
  const initialQuestion = await generateQuizQuestion();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
      <p className="text-muted-foreground">Test your misinformation detection skills.</p>
      <div className="mt-8">
        <QuizClient initialQuestion={initialQuestion} getNextQuestion={generateQuizQuestion} />
      </div>
    </div>
  );
}
