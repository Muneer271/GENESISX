'use client';

import AppSidebarContent from './app-sidebar-content';

export default function DesktopSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-card md:block">
      <AppSidebarContent />
    </aside>
  );
}
