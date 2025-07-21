import React from 'react';
import { Rocket, Heart, Github } from 'lucide-react';

export default function IconDemo() {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <Rocket className="text-blue-500" />
      <Heart className="text-red-500" />
      <Github className="text-gray-800 dark:text-gray-200" />
      <span className="ml-2">Lucide React Icons Example</span>
    </div>
  );
}
