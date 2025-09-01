'use client';

import Link from 'next/link';
import { PanelLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import AppSidebarContent from './app-sidebar-content';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="shrink-0">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <AppSidebarContent />
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-bold">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <span className="text-lg">Verity Vista</span>
      </Link>
    </header>
  );
}
