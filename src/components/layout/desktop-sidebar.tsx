'use client';

import AppSidebarContent from './app-sidebar-content';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DesktopSidebar() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-card md:block">
      <AppSidebarContent />
    </aside>
  );
}
