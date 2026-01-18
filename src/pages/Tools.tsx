import { useState, useEffect } from "react";
import { 
  Calculator, 
  Clock, 
  Lightbulb, 
  Heart, 
  Trash2, 
  Plus, 
  RefreshCw,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const quickFacts = [
  "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.",
  "Octopuses have three hearts and blue blood.",
  "The shortest war in history lasted 38-45 minutes between Britain and Zanzibar.",
  "A group of flamingos is called a 'flamboyance'.",
  "Bananas are berries, but strawberries aren't.",
  "The Eiffel Tower can grow by up to 6 inches in summer due to heat expansion.",
  "There are more possible iterations of a game of chess than atoms in the known universe.",
  "Wombat poop is cube-shaped.",
  "A day on Venus is longer than a year on Venus.",
  "Cows have best friends and get stressed when separated.",
];

const motivationalQuotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
];

export default function Tools() {
  const { toast } = useToast();

  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcExpression, setCalcExpression] = useState("");

  // Reminders state
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem("smarthub-reminders");
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState("");

  // Quick facts state
  const [currentFact, setCurrentFact] = useState(() => 
    quickFacts[Math.floor(Math.random() * quickFacts.length)]
  );

  // Motivation state
  const [currentQuote, setCurrentQuote] = useState(() => 
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem("smarthub-reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Calculator functions
  const handleCalcInput = (value: string) => {
    if (calcDisplay === "0" && !isNaN(Number(value))) {
      setCalcDisplay(value);
    } else if (calcDisplay === "Error") {
      setCalcDisplay(value);
    } else {
      setCalcDisplay(calcDisplay + value);
    }
  };

  const handleCalcClear = () => {
    setCalcDisplay("0");
    setCalcExpression("");
  };

  const handleCalcEquals = () => {
    try {
      // Replace × and ÷ with * and /
      const expression = calcDisplay.replace(/×/g, "*").replace(/÷/g, "/");
      // Using Function instead of eval for slightly better safety
      const result = new Function("return " + expression)();
      setCalcExpression(calcDisplay + " =");
      setCalcDisplay(String(result));
    } catch {
      setCalcDisplay("Error");
    }
  };

  // Reminder functions
  const addReminder = () => {
    if (!newReminder.trim()) return;
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      text: newReminder,
      completed: false,
      createdAt: new Date(),
    };
    
    setReminders([reminder, ...reminders]);
    setNewReminder("");
    toast({ title: "Reminder added!" });
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  // Get new fact
  const getNewFact = () => {
    const newFact = quickFacts[Math.floor(Math.random() * quickFacts.length)];
    setCurrentFact(newFact);
  };

  // Get new quote
  const getNewQuote = () => {
    const newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(newQuote);
  };

  const calcButtons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Daily{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="text-muted-foreground">
            Useful utilities for your everyday needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary rounded-lg p-4 mb-4">
                {calcExpression && (
                  <div className="text-xs text-muted-foreground text-right mb-1">
                    {calcExpression}
                  </div>
                )}
                <div className="text-3xl font-mono text-right overflow-x-auto">
                  {calcDisplay}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  className="col-span-2"
                  onClick={handleCalcClear}
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  className="col-span-2"
                  onClick={() => setCalcDisplay(calcDisplay.slice(0, -1) || "0")}
                >
                  ⌫
                </Button>
                {calcButtons.map((btn) => (
                  <Button
                    key={btn}
                    variant={btn === "=" ? "default" : "outline"}
                    className={btn === "=" ? "gradient-primary" : ""}
                    onClick={() =>
                      btn === "=" ? handleCalcEquals() : handleCalcInput(btn)
                    }
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Reminders
              </CardTitle>
              <CardDescription>Quick tasks and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a reminder..."
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addReminder()}
                />
                <Button onClick={addReminder} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {reminders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No reminders yet
                  </p>
                ) : (
                  reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg group"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleReminder(reminder.id)}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            reminder.completed
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {reminder.completed && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      </Button>
                      <span
                        className={`flex-1 ${
                          reminder.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {reminder.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive"
                        onClick={() => deleteReminder(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Quick Facts
              </CardTitle>
              <CardDescription>Learn something new every day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 rounded-lg p-4 mb-4 min-h-[100px] flex items-center">
                <p className="text-lg">{currentFact}</p>
              </div>
              <Button variant="outline" onClick={getNewFact} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                New Fact
              </Button>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Daily Motivation
              </CardTitle>
              <CardDescription>Inspiring quotes to keep you going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg p-4 mb-4 min-h-[100px]">
                <p className="text-lg italic mb-2">"{currentQuote.quote}"</p>
                <p className="text-sm text-muted-foreground text-right">
                  — {currentQuote.author}
                </p>
              </div>
              <Button variant="outline" onClick={getNewQuote} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
