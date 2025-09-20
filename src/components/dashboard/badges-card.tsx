import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Brain, Eye, Zap } from "lucide-react";

const badges = [
    { name: "Fact Finder", icon: <Eye />, color: "text-sky-500" },
    { name: "Truth Seeker", icon: <Award />, color: "text-amber-500" },
    { name: "Debunker", icon: <Zap />, color: "text-red-500" },
    { name: "Critical Thinker", icon: <Brain />, color: "text-indigo-500" },
];

export function BadgesCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Collect badges by completing challenges.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {badges.map((badge) => (
                    <div key={badge.name} className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-background ${badge.color}`}>
                            {badge.icon && React.cloneElement(badge.icon, { size: 28 })}
                        </div>
                        <p className="mt-2 text-sm font-medium">{badge.name}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
