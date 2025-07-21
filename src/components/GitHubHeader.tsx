import { Button } from "@/components/ui/button";
import { Star, GitFork, Eye } from "lucide-react";

export function GitHubHeader() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <span className="text-lg font-semibold text-foreground">johndoe</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-lg font-semibold text-foreground">portfolio</span>
            </div>
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">
              Public
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-sm">
              <Eye className="w-4 h-4 mr-1" />
              Watch
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">12</span>
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Star className="w-4 h-4 mr-1" />
              Star
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">48</span>
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <GitFork className="w-4 h-4 mr-1" />
              Fork
              <span className="ml-1 bg-muted rounded-full px-1.5 py-0.5 text-xs">7</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-muted-foreground">
            Personal developer portfolio showcasing projects, blogs, and debugging adventures
          </p>
        </div>
      </div>
    </div>
  );
}