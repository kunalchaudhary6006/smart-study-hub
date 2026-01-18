import { 
  Brain, 
  Zap, 
  Heart, 
  Users, 
  Target, 
  Sparkles,
  BookOpen,
  MessageCircle,
  Wrench
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

const values = [
  {
    icon: Brain,
    title: "Smart Learning",
    description: "We believe education should be accessible, engaging, and personalized for everyone.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting, no frustration. Get the answers and tools you need in seconds.",
  },
  {
    icon: Heart,
    title: "User-Centered",
    description: "Every feature is designed with you in mind. Simple, beautiful, and effective.",
  },
];

const howItWorks = [
  {
    icon: MessageCircle,
    step: "1",
    title: "Ask a Question",
    description: "Type any question and our AI provides instant, accurate explanations.",
  },
  {
    icon: BookOpen,
    step: "2",
    title: "Learn & Practice",
    description: "Take notes, create quizzes, and get AI-powered summaries to reinforce learning.",
  },
  {
    icon: Wrench,
    step: "3",
    title: "Use Daily Tools",
    description: "Calculator, reminders, and motivation to support your productivity.",
  },
];

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            About SmartHub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Minds,{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              One Question at a Time
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SmartHub is your all-in-one platform for learning, discovery, and daily productivity. 
            We combine the power of AI with intuitive tools to help you learn faster, 
            work smarter, and stay motivated.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
          <CardHeader className="text-center">
            <Target className="h-10 w-10 mx-auto text-primary mb-4" />
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To make knowledge accessible to everyone, everywhere. We believe that curiosity 
              should be rewarded with instant, accurate, and helpful answers. Whether you're 
              a student, professional, or lifelong learner, SmartHub is here to help you grow.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="space-y-6">
            {howItWorks.map((item) => (
              <Card key={item.step} className="overflow-hidden">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-primary/10 p-6 md:p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <Card className="text-center p-8">
            <Users className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Built with ❤️</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              SmartHub is built by a passionate team dedicated to making learning 
              and productivity tools accessible to everyone. We're constantly 
              improving and adding new features based on your feedback.
            </p>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
