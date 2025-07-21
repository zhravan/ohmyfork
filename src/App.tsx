import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import ThemeSwitcher from './components/ThemeSwitcher';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">ohmyfork</h1>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/demo">Demo</Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
    </div>
  );
}
