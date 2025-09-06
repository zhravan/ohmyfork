import { ThemeProvider } from 'next-themes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';

import BlogPostPage from './pages/BlogPostPage';
import BlogsPage from './pages/BlogsPage';
import BugTalesPage from './pages/BugTalesPage';
import ContactPage from './pages/ContactPage';
import Index from './pages/Index';
import NewsletterPage from './pages/NewsletterPage';
import NotFound from './pages/NotFound';
import ProjectsPage from './pages/ProjectsPage';
import WikiShell from './pages/WikiShell';
import Footer from './components/Footer';

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <Toaster />
    <BrowserRouter>
      {/* Constrain main content to 80% viewport width, centered */}
      <div className="no-page-gutter w-[80vw] mx-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          { /* Project detail route removed */ }
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bug-tales" element={<BugTalesPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/wiki" element={<WikiShell />} />
          <Route path="/wiki/:slug" element={<WikiShell />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
