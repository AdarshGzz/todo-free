
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FocusFlowLogo } from '@/components/icons';
import { ArrowRight, Sparkles, Edit, Bot } from 'lucide-react';
import { AppHeader } from './app-header';
import Image from 'next/image';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader className="sticky top-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FocusFlowLogo className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-foreground">
              FocusFlow
            </h1>
          </div>
          <Button asChild>
            <Link href="/app">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </AppHeader>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 lg:py-32">
          <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Achieve More with AI-Powered Focus
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            FocusFlow is the intelligent to-do list that helps you generate, refine, and organize your tasks, so you can focus on what truly matters.
          </p>
          <Button asChild size="lg">
            <Link href="/app">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-secondary/50 py-20 lg:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-headline text-3xl md:text-4xl font-bold">
                Powerful Features, Effortless Productivity
              </h3>
              <p className="text-muted-foreground mt-2">
                Everything you need to conquer your to-do list.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-primary" />}
                title="AI Task Generation"
                description="Describe a goal, and our AI will break it down into actionable tasks for you. From planning a trip to launching a project, get a head start in seconds."
              />
              <FeatureCard
                icon={<Bot className="h-8 w-8 text-primary" />}
                title="AI Task Rephraser"
                description="Turn quick notes into professional tasks. With a single click, our AI rephrases your tasks to be clearer, more specific, and more motivating."
              />
              <FeatureCard
                icon={<Edit className="h-8 w-8 text-primary" />}
                title="Rich Text Editing"
                description="Your tasks, your style. Format text with bold, italics, lists, and hyperlinks to add all the detail you need. Stay organized and clear."
              />
            </div>
             <div className="mt-12 text-center">
                 <Image 
                    src="https://placehold.co/1200x600.png"
                    data-ai-hint="app screenshot dashboard"
                    alt="FocusFlow App Screenshot"
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-2xl mx-auto border"
                />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center bg-background/80">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            {icon}
        </div>
        <CardTitle className="font-headline text-xl mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
