import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react";

export function ReadmeSection() {
  return (
    <div id="readme" className="mt-8">
      <div className="border border-border rounded-md bg-background">
        <div className="flex items-center px-4 py-3 border-b border-border bg-muted/30">
          <svg className="w-4 h-4 mr-2 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2.92L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z" />
          </svg>
          <span className="font-mono text-sm font-medium">README.md</span>
        </div>

        <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
          <div className="flex items-start justify-between mb-8">
            <h1 className="flex items-center gap-3 text-2xl font-bold">
              👋 Hi there, I'm <a href="https://github.com/shravan20" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shravan K B</a>
            </h1>
            <Badge variant="secondary" className="px-3 py-1">Available for hire</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">Karnataka, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">Professionally tinkering since {new Date().getFullYear() - 2019} years</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">Connect</h2>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="https://github.com/shravan20" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="https://www.linkedin.com/in/zhravan/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="https://x.com/zhravan" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="mailto:mrshravankumarb@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-foreground">About Me</h2>
          <p className="text-foreground leading-relaxed mb-6">
            I am a Computer Science Engineer and Data Science aficionado who's been building, breaking, and innovating professionally since 2019. At heart, I'm a curious tinkerer and FOSS enthusiast.
          </p>

          <h3 className="text-lg font-semibold mb-4 text-foreground">🔧 Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              'JavaScript', 'Nodejs', 'TypeScript', 'Java', 'PHP', 'Python', 'Go',
              'Expressjs', 'Nestjs', 'Spring', 'Spring Boot', 'React.js', 'Redux',
              'Shell Programming', 'Docker', 'Jenkins', 'Nginx', 'Caddy',
              'Mocha', 'JUnit5', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'SQLite',
              'AWS Cloud', 'Azure Cloud'
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 text-foreground">📊 GitHub Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20">
              <div className="text-3xl font-bold text-foreground mb-1">127</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20">
              <div className="text-3xl font-bold text-foreground mb-1">2.1k</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </div>
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20">
              <div className="text-3xl font-bold text-foreground mb-1">48</div>
              <div className="text-sm text-muted-foreground">Stars Earned</div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-foreground">🚀 Featured Projects</h3>
          <div className="space-y-3 mb-8">
            <div className="border-l-4 border-primary pl-4">
              <div className="font-semibold text-foreground">E-commerce Platform</div>
              <div className="text-muted-foreground text-sm">Full-stack React/Node.js application with payment integration</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="font-semibold text-foreground">Real-time Chat App</div>
              <div className="text-muted-foreground text-sm">WebSocket-based messaging platform with React and Socket.io</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="font-semibold text-foreground">API Gateway</div>
              <div className="text-muted-foreground text-sm">Microservices architecture with Docker and Kubernetes</div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-foreground">📝 Latest Blog Posts</h3>
          <div className="space-y-2 mb-8">
            <div className="border-l-4 border-accent pl-4">
              <a href="#" className="text-primary hover:underline font-medium">Building Scalable React Applications with TypeScript</a>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <a href="#" className="text-primary hover:underline font-medium">Mastering Async/Await in JavaScript</a>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <a href="#" className="text-primary hover:underline font-medium">Docker Best Practices for Node.js Apps</a>
            </div>
          </div>

          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
            <p className="italic text-muted-foreground text-lg leading-relaxed">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <cite className="text-sm text-muted-foreground font-medium block mt-2">- Cory House</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}