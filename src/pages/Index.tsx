import { GitHubHeader } from "@/components/GitHubHeader";
import { FileExplorer } from "@/components/FileExplorer";
import { ReadmeSection } from "@/components/ReadmeSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* File Explorer - Left side */}
          <div className="lg:col-span-2">
            <FileExplorer />
          </div>
          
          {/* Quick Actions - Right side */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-md bg-background sticky top-8">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <span className="font-mono text-sm text-foreground">Quick Actions</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-foreground mb-2">Repository Stats</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Commits:</span>
                      <span className="font-mono">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Branches:</span>
                      <span className="font-mono">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contributors:</span>
                      <span className="font-mono">1</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-3">
                  <div className="font-medium text-foreground mb-2 text-sm">Languages</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">TypeScript 68.3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">JavaScript 21.7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">CSS 8.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">HTML 1.6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* README Section */}
        <ReadmeSection />
      </div>
    </div>
  );
};

export default Index;
