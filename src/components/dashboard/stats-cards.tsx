import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Target, Flame } from "lucide-react";

const stats = [
  {
    title: "Checks Performed",
    value: "142",
    icon: <Check className="h-6 w-6 text-primary" />,
    description: "Total pieces of content analyzed",
  },
  {
    title: "Avg. Accuracy",
    value: "92%",
    icon: <Target className="h-6 w-6 text-green-500" />,
    description: "Compared to community consensus",
  },
  {
    title: "Current Streak",
    value: "12 Days",
    icon: <Flame className="h-6 w-6 text-amber-500" />,
    description: "Daily analysis streak",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
