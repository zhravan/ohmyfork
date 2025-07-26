import { ThemeProvider } from 'next-themes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BlogPostPage from './pages/BlogPostPage';
import BlogsPage from './pages/BlogsPage';
import BugTalesPage from './pages/BugTalesPage';
import ContactPage from './pages/ContactPage';
import Index from './pages/Index';
import NewsletterPage from './pages/NewsletterPage';
import NotFound from './pages/NotFound';
import ProjectPage from './pages/ProjectPage';
import ProjectsPage from './pages/ProjectsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/ohmyfork/">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/bug-tales" element={<BugTalesPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
