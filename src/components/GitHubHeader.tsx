import confetti from 'canvas-confetti';
import { Eye, GitFork, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useMessageHandler } from '@/hooks/message-handler';

export function GitHubHeader() {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(48);
  const [isForking, setIsForking] = useState(false);
  const { showMessage } = useMessageHandler();

  useEffect(() => {
    const starred = localStorage.getItem('ohmyfork-starred') === 'true';
    setIsStarred(starred);
  }, []);

  const handleStar = () => {
    const newStarred = !isStarred;
    setIsStarred(newStarred);
    setStarCount(prev => newStarred ? prev + 1 : prev - 1);
    localStorage.setItem('ohmyfork-starred', newStarred.toString());
    
    if (newStarred) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleFork = () => {
    setIsForking(true);
    setTimeout(() => {
      setIsForking(false);
      showMessage({
        title: "Forked! Now go make something awesome.",
        description: "Repository has been forked to your account",
      });
    }, 2000);
  };

  const handleWatch = () => {
    showMessage({
      title: "You're officially watching my journey. Buckle up!",
      description: "You'll be notified of all updates to this repository",
    });
  };

  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SKB</span>
              </div>
              <span className="text-lg font-semibold text-foreground">zhravan</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-lg font-semibold text-foreground">ohmyfork</span>
            </div>
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
              Public
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-sm" onClick={handleWatch}>
              <Eye className="w-4 h-4 mr-1" />
              Watch
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">12</span>
            </Button>
            <Button 
              variant={isStarred ? "default" : "outline"} 
              size="sm" 
              className={`text-sm transition-all duration-200 ${isStarred ? 'animate-pulse' : ''}`}
              onClick={handleStar}
            >
              <Star className={`w-4 h-4 mr-1 ${isStarred ? 'fill-current' : ''}`} />
              {isStarred ? 'Starred' : 'Star'}
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">{starCount}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm" 
              onClick={handleFork}
              disabled={isForking}
            >
              <GitFork className={`w-4 h-4 mr-1 ${isForking ? 'animate-spin' : ''}`} />
              {isForking ? 'Forking...' : 'Fork'}
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">7</span>
            </Button>
          </div>
        </div>
        {/* Secondary nav removed for a minimal top bar */}
      </div>
    </div>
  );
}