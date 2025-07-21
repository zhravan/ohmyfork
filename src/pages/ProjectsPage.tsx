import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  stars: number;
  language: string;
  lastUpdated: string;
  demoUrl?: string;
  githubUrl: string;
  status: 'Active' | 'Completed' | 'Archived';
}

const projects: Project[] = [
  {
    name: "e-commerce-platform",
    description: "Full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, payment processing, and inventory management.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    stars: 124,
    language: "TypeScript",
    lastUpdated: "2 days ago",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/johndoe/e-commerce-platform",
    status: "Active"
  },
  {
    name: "realtime-chat-app",
    description: "WebSocket-based real-time messaging application with React frontend and Socket.io backend. Supports group chats, file sharing, and emoji reactions.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Redis"],
    stars: 89,
    language: "JavaScript",
    lastUpdated: "1 week ago",
    demoUrl: "https://chat.example.com",
    githubUrl: "https://github.com/johndoe/realtime-chat-app",
    status: "Completed"
  },
  {
    name: "api-gateway-microservices",
    description: "Scalable microservices architecture with API gateway, service discovery, and container orchestration using Docker and Kubernetes.",
    technologies: ["Node.js", "Docker", "Kubernetes", "NGINX", "Consul"],
    stars: 156,
    language: "TypeScript",
    lastUpdated: "3 days ago",
    githubUrl: "https://github.com/johndoe/api-gateway-microservices",
    status: "Active"
  },
  {
    name: "machine-learning-dashboard",
    description: "Interactive dashboard for visualizing machine learning model performance with Python backend and React frontend.",
    technologies: ["Python", "React", "TensorFlow", "FastAPI", "PostgreSQL"],
    stars: 67,
    language: "Python", 
    lastUpdated: "2 weeks ago",
    demoUrl: "https://ml-dashboard.example.com",
    githubUrl: "https://github.com/johndoe/ml-dashboard",
    status: "Completed"
  },
  {
    name: "blockchain-voting-system",
    description: "Decentralized voting application built on Ethereum blockchain with Solidity smart contracts and Web3 integration.",
    technologies: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS"],
    stars: 203,
    language: "Solidity",
    lastUpdated: "1 month ago",
    githubUrl: "https://github.com/johndoe/blockchain-voting",
    status: "Archived"
  }
];

const PROJECTS_PER_PAGE = 3;

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
            <span className="text-2xl">🚀</span>
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
        </div>
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">projects/ directory</span>
              <span className="text-sm text-muted-foreground">{projects.length} repositories</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {currentProjects.map((project, index) => (
              <div key={index} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-primary hover:underline cursor-pointer">
                        {project.name}
                      </h2>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        {project.language}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </div>
                      <div>
                        Updated {project.lastUpdated}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                      {project.demoUrl && (
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in collaborating on a project?
          </p>
          <Button 
            className="github-button-primary" 
            onClick={() => navigate('/contact')}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}