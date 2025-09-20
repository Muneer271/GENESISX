import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendsChart } from "@/components/dashboard/trends-chart";
import { BadgesCard } from "@/components/dashboard/badges-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
        <p className="text-muted-foreground">An overview of your analysis activity and progress.</p>
      </div>

      <StatsCards />
      
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Credibility Score Trends</CardTitle>
            <CardDescription>Average credibility score of content you've analyzed over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TrendsChart />
          </CardContent>
        </Card>
        
        <BadgesCard />
      </div>
    </div>
  );
}
