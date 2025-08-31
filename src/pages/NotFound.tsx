import { ArrowLeft, Bug, Code, FileText, Home, Mail, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const quickLinks = [
    { to: "/", icon: Home, label: "Home", description: "Back to the main page" },
    { to: "/blogs", icon: FileText, label: "Blogs", description: "Read my latest posts" },
    { to: "/projects", icon: Code, label: "Projects", description: "Check out my work" },
    { to: "/bug-tales", icon: Bug, label: "Bug Tales", description: "Development stories" },
    { to: "/contact", icon: Mail, label: "Contact", description: "Get in touch" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl md:text-3xl font-semibold text-foreground animate-pulse">
                Page Not Found
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="border-dashed border-2 border-muted-foreground/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Oops! This page doesn't exist</h2>
              <p className="text-muted-foreground mb-4">
                The page <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{location.pathname}</code> could not be found.
              </p>
              <p className="text-sm text-muted-foreground">
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg font-semibold mb-4">Where would you like to go?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="transition-all duration-300"
                >
                  <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group border hover:border-primary/50">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium group-hover:text-primary transition-colors">
                          {link.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {link.description}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} flex flex-col sm:flex-row gap-4 justify-center`}>
          <Button asChild size="lg" className="group">
            <Link to="/">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Take Me Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </Button>
        </div>

        <div className={`transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-sm text-muted-foreground`}>
          <p>💡 Fun fact: HTTP 404 gets its name from CERN’s room 404.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
