import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bug, Clock, ThumbsUp, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BugTale {
  title: string;
  synopsis: string;
  problem: string;
  solution: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Nightmare';
  timeSpent: string;
  technologies: string[];
  date: string;
  likes: number;
  comments: number;
}

const bugTales: BugTale[] = [
  {
    title: "The Vanishing CSS: A Tale of Z-Index Hell",
    synopsis: "A perfectly styled modal suddenly disappears in production, leading to a deep dive into the mysterious world of stacking contexts.",
    problem: "Modal component worked flawlessly in development but was invisible in production. No console errors, no obvious differences.",
    solution: "Third-party library was injecting CSS with higher z-index values. Created a new stacking context by adding transform: translateZ(0) to modal container.",
    difficulty: "Medium",
    timeSpent: "4 hours",
    technologies: ["CSS", "React", "Z-Index", "Stacking Context"],
    date: "2024-01-10",
    likes: 23,
    comments: 8
  },
  {
    title: "The Case of the Schrödinger's Variable",
    synopsis: "A variable that existed and didn't exist at the same time, quantum mechanics in JavaScript, or just a really weird closure bug?",
    problem: "Variable was undefined in callback but defined everywhere else. Same exact scope, same exact timing, but somehow undefined.",
    solution: "Event loop timing issue. The variable was being set in a microtask queue while callback was in macrotask queue. Used Promise.resolve().then() to synchronize.",
    difficulty: "Hard",
    timeSpent: "6 hours",
    technologies: ["JavaScript", "Event Loop", "Promises", "Closure"],
    date: "2024-01-05",
    likes: 45,
    comments: 12
  },
  {
    title: "Memory Leak from the Future",
    synopsis: "A React component was causing memory leaks, but only when users traveled to the future. Time-based debugging at its finest.",
    problem: "Memory usage kept growing over time, but only after 24 hours of continuous usage. Component was holding references to setTimeout intervals.",
    solution: "Date.now() was being called in useEffect dependency array, causing re-renders every millisecond. Moved date calculation inside effect.",
    difficulty: "Medium",
    timeSpent: "8 hours",
    technologies: ["React", "Memory Leaks", "useEffect", "Performance"],
    date: "2023-12-28",
    likes: 67,
    comments: 19
  },
  {
    title: "The Docker Container That Worked Only on Tuesdays",
    synopsis: "Production container failed consistently except on Tuesdays. The solution involved timezones, cron jobs, and a very specific date format.",
    problem: "Container deployment succeeded on Tuesdays but failed every other day. No changes to code, no changes to infrastructure.",
    solution: "Cron job was clearing logs every Tuesday. On other days, logs filled up disk space causing deployment failure. Increased disk space and fixed log rotation.",
    difficulty: "Easy",
    timeSpent: "2 hours",
    technologies: ["Docker", "DevOps", "Cron", "Disk Management"],
    date: "2023-12-15",
    likes: 89,
    comments: 25
  },
  {
    title: "The Async/Await Paradox",
    synopsis: "Function that returned a promise wrapped in a promise wrapped in another promise. Inception level async/await confusion.",
    problem: "API calls were taking 30+ seconds. No network issues, no server problems. The mystery deepened when adding console.logs made it faster.",
    solution: "Triple-nested async/await was creating promise chains. Each await was waiting for the previous promise to resolve, creating artificial delays.",
    difficulty: "Nightmare",
    timeSpent: "12 hours",
    technologies: ["JavaScript", "Async/Await", "Promises", "Performance"],
    date: "2023-12-01",
    likes: 156,
    comments: 34
  }
];

export default function BugTalesPage() {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Nightmare': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐛</span>
            <h1 className="text-2xl font-bold">Bug Tales</h1>
          </div>
        </div>
        
        <div className="mb-6 p-4 border border-border rounded-md bg-muted/20">
          <p className="text-muted-foreground">
            <strong>Welcome to Bug Tales!</strong> A collection of real debugging adventures, mysterious issues, 
            and the sometimes surprising solutions that saved the day. Every developer has battle stories - these are mine.
          </p>
        </div>
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">bug_tales/ directory</span>
              <span className="text-sm text-muted-foreground">{bugTales.length} debugging stories</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {bugTales.map((tale, index) => (
              <article key={index} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Bug className="w-5 h-5 text-red-500" />
                      <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                        {tale.title}
                      </h2>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(tale.difficulty)}`}
                      >
                        {tale.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed font-medium">
                      {tale.synopsis}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">The Problem:</h4>
                        <p className="text-sm text-muted-foreground">{tale.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">The Solution:</h4>
                        <p className="text-sm text-muted-foreground">{tale.solution}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tale.timeSpent} debugging
                      </div>
                      <div>
                        {new Date(tale.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {tale.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {tale.comments}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {tale.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Have a debugging story to share? I'd love to hear it!
          </p>
          <Button 
            className="github-button-primary" 
            onClick={() => navigate('/contact')}
          >
            Share Your Bug Tale
          </Button>
        </div>
      </div>
    </div>
  );
}