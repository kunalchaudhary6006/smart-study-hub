import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  BookOpen, 
  Wrench, 
  Sparkles, 
  Brain, 
  Zap, 
  ArrowRight,
  Calculator,
  Clock,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

const features = [
  {
    icon: MessageCircle,
    title: "Ask Anything",
    description: "Get instant AI-powered answers to any question. From homework help to life advice.",
    href: "/ask",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: BookOpen,
    title: "Learn & Study",
    description: "Take notes, create quizzes, and get AI summaries to boost your learning.",
    href: "/learn",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Wrench,
    title: "Daily Tools",
    description: "Calculator, reminders, quick facts, and motivation quotes at your fingertips.",
    href: "/tools",
    color: "from-orange-500 to-red-500",
  },
];

const quickTools = [
  { icon: Calculator, label: "Calculator", href: "/tools" },
  { icon: Clock, label: "Reminders", href: "/tools" },
  { icon: Lightbulb, label: "Quick Facts", href: "/tools" },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Knowledge Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Smart Hub for{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Learning & Productivity
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant answers, take smart notes, ace your quizzes, and boost your daily productivity 
              — all powered by cutting-edge AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow">
                <Link to="/ask">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask a Question
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/learn">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed for students, professionals, and curious minds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title} 
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group/btn">
                    <Link to={feature.href}>
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access Tools</h2>
            <p className="text-muted-foreground">Jump straight into what you need</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.label}
                to={tool.href}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <tool.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{tool.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SmartHub?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI-Powered Intelligence</h3>
                  <p className="text-muted-foreground text-sm">
                    Get accurate, helpful answers powered by cutting-edge AI technology.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground text-sm">
                    No waiting. Get instant responses and real-time results.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Beautiful & Simple</h3>
                  <p className="text-muted-foreground text-sm">
                    Clean, modern interface that's a joy to use every day.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">All-in-One Platform</h3>
                  <p className="text-muted-foreground text-sm">
                    Everything you need for learning and productivity in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl gradient-hero border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground">
              Ask your first question and discover the power of AI-assisted learning.
            </p>
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow">
              <Link to="/ask">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Now — It's Free
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
