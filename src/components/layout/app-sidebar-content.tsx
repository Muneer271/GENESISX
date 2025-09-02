'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Puzzle,
  ShieldCheck,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Analyze', icon: FlaskConical },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/quizzes', label: 'Quizzes', icon: Puzzle },
];

export default function AppSidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-8 flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Verity Vista</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <Separator className="my-4" />
      <Button variant="ghost" className="h-auto w-full justify-start p-2" asChild>
        <Link href="/profile">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/100" alt="User Avatar" data-ai-hint="profile picture" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">GenesisX</span>
              <span className="text-xs text-muted-foreground">
                alex.doe@example.com
              </span>
            </div>
          </div>
        </Link>
      </Button>
    </div>
  );
}
