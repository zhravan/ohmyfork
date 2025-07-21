import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BugReportModal } from "@/components/BugReportModal";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowLeft, Bug, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface BugTale {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'solved' | 'investigating' | 'wontfix';
  description: string;
  reproduction: string;
  solution: string;
  tags: string[];
  timeToSolve: string;
  assignee: string;
  dateReported: string;
}

const bugTales: BugTale[] = [
  {
    title: "The Vanishing CSS: A Tale of Disappearing Styles",
    severity: 'high',
    status: 'solved',
    description: "Users reported that the entire navigation bar would randomly disappear, but only on Tuesdays, and only for users with names starting with 'M'.",
    reproduction: `1. Log in as a user with name starting with 'M'
2. Wait for Tuesday
3. Navigate to any page
4. Observe disappearing navigation bar
5. Refresh page - navigation returns
6. Wait 5 minutes - navigation disappears again`,
    solution: `The issue was caused by a CSS animation that was triggered by a specific combination of:
    - CSS class naming collision with a third-party library
    - Browser timezone calculations for Tuesday detection
    - Username-based cache keys that conflicted with CSS selectors
    
Fixed by:
- Renaming CSS classes with proper BEM methodology
- Removing date-based conditional styling
- Implementing proper CSS scoping`,
    tags: ['CSS', 'Frontend', 'Browser Bug'],
    timeToSolve: '3 days',
    assignee: 'Sarah Chen',
    dateReported: '2024-01-10'
  },
  {
    title: "The Infinite Loop of API Calls",
    severity: 'critical', 
    status: 'solved',
    description: "A simple data fetch turned into a DDoS attack on our own servers when useEffect decided to party like it's 1999.",
    reproduction: `1. Open the user dashboard
2. useEffect triggers API call
3. API response updates state
4. State update triggers useEffect again
5. Infinite loop of API calls begins
6. Server performance degrades rapidly`,
    solution: `The useEffect was missing a proper dependency array:

// Before (WRONG):
useEffect(() => {
  fetchUserData(user.id);
}); // No dependency array = runs on every render

// After (CORRECT):
useEffect(() => {
  fetchUserData(user.id);
}, [user.id]); // Only runs when user.id changes

Also implemented:
- Request debouncing
- Circuit breaker pattern
- Request cancellation with AbortController`,
    tags: ['React', 'API', 'Performance'],
    timeToSolve: '6 hours',
    assignee: 'Mike Johnson',
    dateReported: '2024-01-08'
  },
  {
    title: "The Case of the Missing Database Connection",
    severity: 'critical',
    status: 'solved', 
    description: "Production database connections were mysteriously dropping every hour. Turned out the janitor was unplugging the server to charge his phone.",
    reproduction: `1. Deploy application to production
2. Wait approximately 1 hour
3. Observe database connection timeout errors
4. Check server room at exactly 2:00 PM
5. Find janitor unplugging ethernet cable
6. Connection restored automatically after 5 minutes`,
    solution: `This was a physical infrastructure issue:

Root cause:
- Janitor unplugged ethernet cable daily at 2 PM
- Cable was near a power outlet used for phone charging
- No proper cable management in server room

Solutions implemented:
- Proper cable management and labeling
- Restricted access to server room
- Added redundant network connections
- Implemented connection pooling with retry logic
- Added monitoring alerts for connection drops`,
    tags: ['Database', 'Infrastructure', 'Human Error'],
    timeToSolve: '2 weeks',
    assignee: 'Alex Rodriguez',
    dateReported: '2023-12-15'
  },
  {
    title: "The Ghost in the Machine: Phantom Form Submissions",
    severity: 'medium',
    status: 'investigating',
    description: "Forms were submitting themselves at 3:33 AM every night. Spoiler alert: it wasn't ghosts, but it was equally terrifying.",
    reproduction: `1. Deploy contact form to production
2. Wait until 3:33 AM (any timezone)
3. Check form submission logs
4. Find entries with no user interaction
5. Forms contain preset data: name="Test", email="test@example.com"
6. No IP address or user agent in logs`,
    solution: `Investigation ongoing. Current findings:

Suspected causes:
- Automated testing scripts running in production
- Bot submissions with spoofed timestamps
- Scheduled task misconfiguration
- Possible XSS vulnerability

Steps taken:
- Added CAPTCHA verification
- Implemented rate limiting
- Added request origin validation
- Deployed honeypot fields
- Enhanced logging and monitoring

Still investigating the exact trigger mechanism.`,
    tags: ['Forms', 'JavaScript', 'Mystery'],
    timeToSolve: 'ongoing',
    assignee: 'Emma Davis',
    dateReported: '2024-01-05'
  }
];

const TALES_PER_PAGE = 6;

export default function BugTalesPage() {
  const navigate = useNavigate();
  const [selectedBug, setSelectedBug] = useState<BugTale | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(bugTales.length / TALES_PER_PAGE);
  const startIndex = (currentPage - 1) * TALES_PER_PAGE;
  const currentTales = bugTales.slice(startIndex, startIndex + TALES_PER_PAGE);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'default';
      case 'investigating': return 'secondary';
      case 'wontfix': return 'outline';
      default: return 'outline';
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
        
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">bug_tales/ directory</span>
              <span className="text-sm text-muted-foreground">{bugTales.length} debugging stories</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {currentTales.map((tale, index) => (
              <div 
                key={index} 
                className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setSelectedBug(tale)}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                        {tale.title}
                      </h2>
                      <Badge variant={getSeverityColor(tale.severity)}>
                        {tale.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={getStatusColor(tale.status)}>
                        {tale.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {tale.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tale.timeToSolve}
                      </div>
                      <div>
                        Reported: {new Date(tale.dateReported).toLocaleDateString()}
                      </div>
                      <div>
                        Assignee: {tale.assignee}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {tale.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Got a debugging story to share? We'd love to hear it!
          </p>
          <Button className="github-button-primary">
            Submit Your Bug Tale
          </Button>
        </div>
      </div>
      
      <BugReportModal 
        bug={selectedBug}
        isOpen={!!selectedBug}
        onClose={() => setSelectedBug(null)}
      />
    </div>
  );
}