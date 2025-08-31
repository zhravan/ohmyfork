import { FileExplorer } from '@/components/FileExplorer';
import { GitHubHeader } from '@/components/GitHubHeader';
import { ReadmeSection } from '@/components/ReadmeSection';
import { ContributionsGrid } from '@/components/ContributionsGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* File Explorer - Left side */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <FileExplorer />
          </div>
          {/* Quick Actions - Right side */}
          <div className="lg:col-span-1 order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="border border-border rounded-md bg-background shadow-sm w-full max-w-full lg:sticky lg:top-8">
              <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
                <span className="font-mono text-sm text-foreground">Quick Actions</span>
              </div>
              <div className="p-3 sm:p-4 space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-foreground mb-2">Repository Stats</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm gap-x-2">
                      <span>Commits:</span>
                      <span className="font-mono">1,247</span>
                    </div>
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm gap-x-2">
                      <span>Branches:</span>
                      <span className="font-mono">12</span>
                    </div>
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm gap-x-2">
                      <span>Contributors:</span>
                      <span className="font-mono">1</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="font-medium text-foreground mb-2 text-xs sm:text-sm">Languages</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm">TypeScript 68.3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm">JavaScript 21.7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm">CSS 8.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm">HTML 1.6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* README Section */}
        <div className="mt-8">
          <ReadmeSection />
        </div>
        {/* Contributions Section */}
        <div className="mt-8">
          <ContributionsGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
