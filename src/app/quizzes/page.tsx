import { Card, CardContent } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
      <p className="text-muted-foreground">Test your misinformation detection skills.</p>
      <Card className="mt-8">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
            <Puzzle className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Coming Soon!</h2>
            <p className="text-muted-foreground mt-2">Get ready for fun, daily quizzes to sharpen your skills. <br/> Leaderboards and rewards are on the way!</p>
        </CardContent>
      </Card>
    </div>
  );
}
