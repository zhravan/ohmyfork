import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPostView } from "@/components/BlogPostView";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture"],
    author: "John Doe",
    content: `# Building Scalable React Applications with TypeScript

## Introduction

TypeScript has revolutionized the way we build React applications. By adding static type checking to JavaScript, it helps catch errors early and improves the overall developer experience.

## Key Benefits

### 1. Type Safety
- Catch errors at compile time
- Better IntelliSense and autocomplete
- Refactoring becomes safer and easier

### 2. Better Developer Experience
- Enhanced IDE support
- Self-documenting code through types
- Improved collaboration in teams

## Architecture Patterns

### Component Structure
\`\`\`typescript
interface UserProps {
  id: string;
  name: string;
  email: string;
}

const User: React.FC<UserProps> = ({ id, name, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
\`\`\`

### Custom Hooks
\`\`\`typescript
function useUser(userId: string): { user: User | null; loading: boolean; error: string | null } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ... implementation
  
  return { user, loading, error };
}
\`\`\`

## Best Practices

1. **Strict TypeScript Configuration**: Enable strict mode for maximum type safety
2. **Interface Segregation**: Keep interfaces focused and minimal
3. **Generic Components**: Use generics for reusable components
4. **Proper Error Handling**: Type your error states appropriately

## Conclusion

TypeScript transforms React development from a runtime guessing game into a compile-time certainty. The investment in learning TypeScript pays dividends in code quality, maintainability, and developer confidence.`
  },
  {
    title: "Mastering Async/Await in JavaScript",
    excerpt: "Deep dive into asynchronous programming patterns and best practices for handling promises in modern JavaScript.",
    date: "2024-01-10", 
    readTime: "6 min read",
    tags: ["JavaScript", "Async", "Promises"],
    author: "John Doe",
    content: `# Mastering Async/Await in JavaScript

## The Evolution of Asynchronous JavaScript

JavaScript's asynchronous nature has evolved significantly:
- **Callbacks** → **Promises** → **Async/Await**

## Understanding Async/Await

Async/await is syntactic sugar over Promises, making asynchronous code look and behave more like synchronous code.

### Basic Syntax
\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
\`\`\`

## Common Patterns

### Sequential vs Parallel Execution
\`\`\`javascript
// Sequential (slower)
const user = await fetchUser(id);
const posts = await fetchUserPosts(id);

// Parallel (faster)
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchUserPosts(id)
]);
\`\`\`

### Error Handling
\`\`\`javascript
async function robustApiCall() {
  try {
    const result = await apiCall();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
\`\`\`

## Advanced Techniques

### Timeout with Promise.race
\`\`\`javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}
\`\`\`

## Best Practices

1. Always handle errors appropriately
2. Use Promise.all() for parallel operations
3. Be careful with async in loops
4. Consider using libraries like Axios for HTTP requests

## Conclusion

Mastering async/await is crucial for modern JavaScript development. It makes complex asynchronous operations readable and maintainable.`
  },
  {
    title: "Docker Best Practices for Node.js Applications",
    excerpt: "Optimize your Node.js containers with these proven strategies for security, performance, and maintainability.",
    date: "2024-01-05",
    readTime: "10 min read", 
    tags: ["Docker", "Node.js", "DevOps"],
    author: "John Doe",
    content: `# Docker Best Practices for Node.js Applications

## Introduction

Docker has become essential for Node.js deployment. Following best practices ensures secure, performant, and maintainable containers.

## Dockerfile Optimization

### Multi-stage Builds
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Layer Optimization
- Copy package.json before source code
- Use .dockerignore to exclude unnecessary files
- Minimize layer count

## Security Best Practices

### 1. Use Non-Root User
\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
\`\`\`

### 2. Scan for Vulnerabilities
\`\`\`bash
docker scan my-node-app:latest
\`\`\`

### 3. Use Official Base Images
- Always use official Node.js images
- Prefer Alpine variants for smaller size
- Keep base images updated

## Performance Optimization

### Resource Limits
\`\`\`yaml
# docker-compose.yml
services:
  app:
    build: .
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
\`\`\`

### Health Checks
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Environment Management

### Production Configuration
\`\`\`javascript
// Use environment variables
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL
};
\`\`\`

## Monitoring and Logging

### Structured Logging
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});
\`\`\`

## Conclusion

Following these Docker best practices ensures your Node.js applications are secure, performant, and ready for production deployment.`
  },
  {
    title: "State Management in React: Redux vs Zustand vs Context",
    excerpt: "Comprehensive comparison of popular state management solutions and when to use each approach.",
    date: "2023-12-28",
    readTime: "12 min read",
    tags: ["React", "State Management", "Redux", "Zustand"],
    author: "John Doe",
    content: `# State Management in React: Redux vs Zustand vs Context

## The State Management Landscape

Choosing the right state management solution is crucial for React applications. Let's compare the three most popular approaches.

## React Context API

### Pros
- Built into React
- No additional dependencies
- Great for theme, auth, and simple global state

### Cons
- Performance issues with frequent updates
- Provider hell with multiple contexts
- No built-in debugging tools

### Example
\`\`\`javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

## Redux Toolkit

### Pros
- Predictable state updates
- Excellent debugging with DevTools
- Large ecosystem and community
- Time-travel debugging

### Cons
- Steep learning curve
- Boilerplate code
- Overkill for simple applications

### Example
\`\`\`javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});
\`\`\`

## Zustand

### Pros
- Minimal boilerplate
- Great TypeScript support
- No providers needed
- Small bundle size

### Cons
- Smaller ecosystem
- Less debugging tools
- Newer library (less battle-tested)

### Example
\`\`\`javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));
\`\`\`

## When to Use Each

### Use Context When:
- Simple global state (theme, auth)
- Small to medium applications
- Infrequent state updates

### Use Redux When:
- Complex state logic
- Need for time-travel debugging
- Large team with established patterns
- Complex async operations

### Use Zustand When:
- Want simplicity with power
- TypeScript-heavy project
- Medium-sized applications
- Quick prototyping

## Performance Comparison

| Feature | Context | Redux | Zustand |
|---------|---------|--------|---------|
| Bundle Size | 0KB | ~10KB | ~2KB |
| Learning Curve | Low | High | Low |
| Performance | Poor | Good | Good |
| DevTools | No | Excellent | Basic |

## Conclusion

Choose based on your needs:
- **Context**: Simple state, small apps
- **Redux**: Complex apps, need debugging
- **Zustand**: Balance of simplicity and power

The best choice depends on your team, project size, and complexity requirements.`
  }
];

const POSTS_PER_PAGE = 2;

export default function BlogsPage() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (selectedPost) {
    return <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

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
            <span className="text-2xl">📝</span>
            <h1 className="text-2xl font-bold">Developer Blog</h1>
          </div>
        </div>
        
        <div className="border border-border rounded-md bg-background">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">blogs/ directory</span>
              <span className="text-sm text-muted-foreground">{blogPosts.length} articles</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {currentPosts.map((post, index) => (
              <article 
                key={index} 
                className="p-6 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
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
            Want to stay updated with my latest posts?
          </p>
          <Button className="github-button-primary">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}