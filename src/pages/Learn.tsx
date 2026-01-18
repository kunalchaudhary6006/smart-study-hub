import { useState } from "react";
import { BookOpen, FileText, Brain, Sparkles, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export default function Learn() {
  const [activeTab, setActiveTab] = useState("notes");
  const { toast } = useToast();

  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Quiz state
  const [quizTopic, setQuizTopic] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  // Summary state
  const [textToSummarize, setTextToSummarize] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Notes functions
  const addNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast({
        variant: "destructive",
        title: "Missing content",
        description: "Please add both a title and content for your note.",
      });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setNoteTitle("");
    setNoteContent("");
    toast({ title: "Note saved!", description: "Your note has been added." });
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast({ title: "Note deleted" });
  };

  // Quiz functions
  const generateQuiz = async () => {
    if (!quizTopic.trim()) {
      toast({
        variant: "destructive",
        title: "Missing topic",
        description: "Please enter a topic for the quiz.",
      });
      return;
    }

    setIsGeneratingQuiz(true);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-quiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ topic: quizTopic }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      setQuizQuestions(data.questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
      });
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    if (index === quizQuestions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizTopic("");
  };

  // Summary function
  const generateSummary = async () => {
    if (!textToSummarize.trim()) {
      toast({
        variant: "destructive",
        title: "Missing text",
        description: "Please enter some text to summarize.",
      });
      return;
    }

    setIsSummarizing(true);
    setSummary("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: textToSummarize }),
        }
      );

      if (!response.ok) throw new Error("Failed to summarize");

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error summarizing:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate summary. Please try again.",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Learn &{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Study
            </span>
          </h1>
          <p className="text-muted-foreground">
            Take notes, create quizzes, and get AI summaries
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Summary
            </TabsTrigger>
          </TabsList>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  New Note
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Write your note..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="min-h-[150px]"
                />
                <Button onClick={addNote} className="gradient-primary">
                  Save Note
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Notes ({notes.length})</h3>
              {notes.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notes yet. Create your first note above!</p>
                </Card>
              ) : (
                notes.map((note) => (
                  <Card key={note.id} className="group">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription>
                            {note.createdAt.toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-muted-foreground">
                        {note.content}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            {quizQuestions.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Generate a Quiz
                  </CardTitle>
                  <CardDescription>
                    Enter a topic and AI will create quiz questions for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="e.g., World War II, Photosynthesis, JavaScript..."
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                  />
                  <Button
                    onClick={generateQuiz}
                    disabled={isGeneratingQuiz}
                    className="gradient-primary"
                  >
                    {isGeneratingQuiz ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : showResult ? (
              <Card className="text-center p-8">
                <div className="text-6xl mb-4">
                  {score === quizQuestions.length ? "🎉" : score >= quizQuestions.length / 2 ? "👍" : "📚"}
                </div>
                <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  You scored {score} out of {quizQuestions.length}
                </p>
                <Button onClick={resetQuiz}>Try Another Quiz</Button>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      Score: {score}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg font-medium">
                    {quizQuestions[currentQuestion].question}
                  </p>
                  <div className="grid gap-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          "h-auto py-4 px-6 text-left justify-start",
                          selectedAnswer !== null &&
                            index === quizQuestions[currentQuestion].correctIndex &&
                            "bg-green-500/20 border-green-500",
                          selectedAnswer === index &&
                            index !== quizQuestions[currentQuestion].correctIndex &&
                            "bg-red-500/20 border-red-500"
                        )}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Text Summarizer
                </CardTitle>
                <CardDescription>
                  Paste your text and get a concise summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your text here..."
                  value={textToSummarize}
                  onChange={(e) => setTextToSummarize(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button
                  onClick={generateSummary}
                  disabled={isSummarizing}
                  className="gradient-primary"
                >
                  {isSummarizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {summary && (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{summary}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
