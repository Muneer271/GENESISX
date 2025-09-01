import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function LearnPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
      <p className="text-muted-foreground">Bite-sized media literacy lessons.</p>
      <Card className="mt-8">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
            <GraduationCap className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Coming Soon!</h2>
            <p className="text-muted-foreground mt-2">We're building a new learning hub to help you master media literacy. <br/> Stay tuned for interactive lessons and guides.</p>
        </CardContent>
      </Card>
    </div>
  );
}
