import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import DesktopSidebar from '@/components/layout/desktop-sidebar';
import { MobileHeader } from '@/components/layout/mobile-header';

export const metadata: Metadata = {
  title: 'GenesisX',
  description: 'AI-powered content credibility analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="md:hidden">
          <MobileHeader />
        </div>
        <div className="hidden md:block">
          <DesktopSidebar />
        </div>
        <div className="relative flex min-h-screen flex-col md:pl-64">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
