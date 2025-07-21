import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react";

export function ReadmeSection() {
  return (
    <div id="readme" className="mt-8">
      <div className="border border-border rounded-md bg-background">
        <div className="flex items-center px-4 py-3 border-b border-border bg-muted/30">
          <svg className="w-4 h-4 mr-2 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2.92L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"/>
          </svg>
          <span className="font-mono text-sm font-medium">README.md</span>
        </div>
        
        <div className="p-6 prose prose-sm max-w-none dark:prose-invert">
          <h1 className="flex items-center gap-3 mb-6">
            👋 Hi there, I'm John Doe
            <Badge variant="secondary" className="ml-auto">Available for hire</Badge>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>5+ years experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">TypeScript</code>
                  <code className="text-xs bg-muted px-2 py-1 rounded">React</code>
                  <code className="text-xs bg-muted px-2 py-1 rounded">Node.js</code>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-1" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4 mr-1" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="w-4 h-4 mr-1" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </div>
          
          <h2>About Me</h2>
          <p>
            I'm a passionate full-stack developer with a love for building robust, scalable applications. 
            My journey spans from crafting pixel-perfect UIs to architecting complex backend systems.
          </p>
          
          <h3>🔧 Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git'].map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          
          <h3>📊 GitHub Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border border-border rounded-md">
              <div className="text-2xl font-bold text-foreground">127</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center p-4 border border-border rounded-md">
              <div className="text-2xl font-bold text-foreground">2.1k</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </div>
            <div className="text-center p-4 border border-border rounded-md">
              <div className="text-2xl font-bold text-foreground">48</div>
              <div className="text-sm text-muted-foreground">Stars Earned</div>
            </div>
          </div>
          
          <h3>🚀 Featured Projects</h3>
          <ul>
            <li><strong>E-commerce Platform</strong> - Full-stack React/Node.js application with payment integration</li>
            <li><strong>Real-time Chat App</strong> - WebSocket-based messaging platform with React and Socket.io</li>
            <li><strong>API Gateway</strong> - Microservices architecture with Docker and Kubernetes</li>
          </ul>
          
          <h3>📝 Latest Blog Posts</h3>
          <ul>
            <li><a href="#" className="text-primary hover:underline">Building Scalable React Applications with TypeScript</a></li>
            <li><a href="#" className="text-primary hover:underline">Mastering Async/Await in JavaScript</a></li>
            <li><a href="#" className="text-primary hover:underline">Docker Best Practices for Node.js Apps</a></li>
          </ul>
          
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            "Code is like humor. When you have to explain it, it's bad." - Cory House
          </blockquote>
        </div>
      </div>
    </div>
  );
}