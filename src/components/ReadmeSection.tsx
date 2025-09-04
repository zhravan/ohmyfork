import {
  Calendar, Coffee, Github, Linkedin, ListTodo, Mail, MapPin, PanelsTopLeft, Twitter
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ContributionsGrid } from './ContributionsGrid';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Animated badge color cycling hook
const badgeColors = [
  "bg-green-500 text-white",
  "bg-blue-500 text-white",
  "bg-yellow-500 text-black",
  "bg-pink-500 text-white",
  "bg-purple-500 text-white",
  "bg-red-500 text-white",
];

function useAnimatedBadgeColor(intervalMs = 900) {
  const [colorIdx, setColorIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((idx) => (idx + 1) % badgeColors.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);
  return badgeColors[colorIdx];
}

function useCountUp(target: number, duration = 1200, start = 0, ref: React.RefObject<HTMLElement>) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (target - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [hasAnimated, target, duration, start]);

  return count;
}

export function ReadmeSection() {
  const animatedClass = useAnimatedBadgeColor();
  const coffeeRef = useRef<HTMLSpanElement>(null);
  const coffeeCount = useCountUp(112, 1200, 0, coffeeRef);

  const todosRef = useRef<HTMLSpanElement>(null);
  const todosCount = useCountUp(3773, 1200, 0, todosRef);

  const tabsRef = useRef<HTMLSpanElement>(null);
  const tabsCount = useCountUp(73, 1200, 0, tabsRef);
  return (
    <div id="readme" className="mt-8 w-full">
      <div className="border border-border rounded-md bg-background w-full">
        <div className="flex items-center px-3 sm:px-4 py-3 border-b border-border bg-muted/30">
          <svg className="w-4 h-4 mr-2 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2.92L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z" />
          </svg>
          <span className="font-mono text-xs sm:text-sm font-medium">README.md</span>
        </div>
        <div className="p-3 sm:p-8 prose prose-slate dark:prose-invert max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h1 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-bold">
              👋 ‎ ‎ Hi there, I'm{" "}
              <a
                href="https://github.com/zhravan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary no-underline"
              >
                Shravan K B
              </a>
            </h1>

            <Badge variant="secondary" className={`px-2 py-1 sm:px-3 transition-colors duration-500 ${animatedClass}`}>
              Available for hire
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">📍 In a Nutshell</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-base">Karnataka, India</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-base">Professionally tinkering since {new Date().getFullYear() - 2019} years</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Connect</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="justify-start w-full">
                  <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer" className="text-primary no-underline w-full flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start w-full">
                  <a href="https://www.linkedin.com/in/zhravan/" target="_blank" rel="noopener noreferrer" className="text-primary no-underline w-full flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="https://x.com/zhravan" target="_blank" rel="noopener noreferrer" className="text-primary no-underline">
                    <span className="w-4 h-4 mr-2 flex items-center justify-center" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>𝕏</span>
                    X
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <a href="mailto:mrshravankumarb@gmail.com" className="text-primary no-underline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-foreground"> 🧘‍♂️ About Me</h2>
          <p className="text-foreground leading-relaxed mb-6">
            I am a Computer Science Engineer and Data Science aficionado who's been building, breaking, and innovating professionally since 2019. At heart, I'm a curious tinkerer and FOSS enthusiast.
          </p>

          <div className="mb-8">
            {/* <div className="border border-border rounded-md overflow-hidden bg-background"> */}
            <img
              className="w-full h-auto object-cover"
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/41a4xhwhc67u9k643a5u.png"
              alt="zhravan / Shravan K B cover"
              loading="lazy"
              decoding="async"
            />
            {/* </div> */}
          </div>

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

          <h3 className="text-lg font-semibold mb-4 text-foreground">📊 Stats beyond GitHub</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20 flex flex-col items-center">
              <Coffee className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-bold text-foreground mb-1">
                ≅<span ref={coffeeRef}>{coffeeCount.toLocaleString()}</span> cups / week
              </div>
              <div className="text-sm text-muted-foreground">Coffee Consumption</div>
            </div>
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20 flex flex-col items-center">
              <ListTodo className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-bold text-foreground mb-1">
                <span ref={todosRef}>{todosCount.toLocaleString()}</span>
              </div>
              <div className="text-sm text-muted-foreground">TODOs left to fate</div>
            </div>
            <div className="text-center p-6 border border-border rounded-lg bg-muted/20 flex flex-col items-center">
              <PanelsTopLeft className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-bold text-foreground mb-1">
                <span ref={tabsRef}>{tabsCount}</span>
              </div>
              <div className="text-sm text-muted-foreground">Tabs opened to fix one bug</div>
            </div>
          </div>

          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
            <p className="italic text-muted-foreground text-lg leading-relaxed">
              Be brave enough to suck at something enough.
            </p>
            <cite className="text-sm text-muted-foreground font-medium block mt-2">- Shravan Kumar B</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
