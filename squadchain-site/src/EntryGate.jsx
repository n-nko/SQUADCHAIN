import React, { useState, useEffect, useRef } from "react";
import App from "./App";
import "./index.css";

function EntryGate() {
  const [entered, setEntered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    const bgMusic = new Audio("/audio/main-theme.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {});
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;

      if (bookRef.current) {
        bookRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = () => {
    setAnimating(true);
    const bookSound = new Audio("/audio/book-open.mp3");
    bookSound.play().catch(() => {});
    setTimeout(() => {
      setEntered(true);
    }, 3000);
  };

  if (entered) return <App />;

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden custom-cursor">
      {/* Фон */}
      <img
        src="/background.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Затемнение */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 z-40 ${
          animating ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Книга */}
      <div
        onClick={handleEnter}
        className={`relative z-10 cursor-pointer transition-all duration-1000 ease-in-out ${
          animating ? "animate-book-open" : "hover:scale-105"
        }`}
        ref={bookRef}
      >
        <img
          src="/book.png"
          alt="Ancient Book"
          className="w-72 drop-shadow-xl animate-flicker transition-transform duration-200"
        />
      </div>

      {/* Подпись */}
      <div className="absolute bottom-10 text-zinc-400 text-sm text-center z-10 animate-fade-in">
        Click the book to begin your journey
      </div>
    </div>
  );
}

export default EntryGate;
