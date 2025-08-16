import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter, Space_Grotesk } from 'next/font/google';

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
})


export const metadata: Metadata = {
  title: 'FocusFlow',
  description: 'AI-Assisted To-Do by FocusFlow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        fontSans.variable,
        fontHeadline.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
