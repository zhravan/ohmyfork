import React from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiButton() {
  return (
    <button
      className="btn btn-accent mt-4"
      onClick={() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })}
    >
      Celebrate with Confetti!
    </button>
  );
}
