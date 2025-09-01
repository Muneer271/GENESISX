
'use client';

import { useState, useEffect } from 'react';

const getColor = (score: number) => {
  if (score < 0.4) return '#ef4444'; // red-500
  if (score < 0.7) return '#f59e0b'; // amber-500
  return '#22c55e'; // green-500
};

export function CredibilityGauge({ score }: { score: number }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayScore = isClient ? score : 0;
  const clampedScore = Math.min(Math.max(displayScore, 0), 1);
  const circumference = 2 * Math.PI * 40;
  const arcLength = (clampedScore * circumference) / 2;
  const color = getColor(clampedScore);

  return (
    <div className="relative flex h-32 w-64 items-end justify-center">
      <svg className="h-full w-full" viewBox="0 0 100 50">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference / 2}
          strokeDashoffset={(circumference / 2) - arcLength}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {Math.round(displayScore * 100)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">Credibility Score</span>
      </div>
    </div>
  );
}
