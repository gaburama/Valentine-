import { useState, useEffect } from "react";
import hamsterImage from "@/assets/hamster.jpeg";
import catImage from "@/assets/cat.jpeg";

type GameState = "asking" | "accepted" | "rejected";

const ValentinePage = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [gameState, setGameState] = useState<GameState>("asking");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);

  const moveNoButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    if (newCount >= 4) {
      setGameState("rejected");
    } else {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setGameState("accepted");
  };

  const handleReset = () => {
    setGameState("asking");
    setNoClickCount(0);
    setNoButtonPosition({ x: 0, y: 0 });
    setIsNoButtonVisible(true);
  };

  // Floating hearts decoration
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute heart-decoration animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            fontSize: `${20 + Math.random() * 30}px`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );

  if (gameState === "accepted") {
    return (
      <div className="min-h-screen rose-pattern flex flex-col items-center justify-center p-4">
        <FloatingHearts />
        <div className="animate-bounce-in text-center z-10">
          <h1 className="valentine-headline mb-8 animate-pulse-heart">
            Yay! You accepted! 🐹💖
          </h1>
          <div className="reaction-card max-w-md mx-auto p-6">
            <img
              src={hamsterImage}
              alt="Happy hamster with flowers"
              className="w-full rounded-2xl"
            />
            <p className="text-2xl md:text-3xl font-bold mt-6 text-primary">
              For you! 💝
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              You've made this hamster very happy! 🥰
            </p>
          </div>
          <button
            onClick={handleReset}
            className="mt-8 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:scale-105 transition-transform"
          >
            Play Again? 💕
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "rejected") {
    return (
      <div className="min-h-screen rose-pattern flex flex-col items-center justify-center p-4">
        <FloatingHearts />
        <div className="animate-bounce-in text-center z-10">
          <h1 className="valentine-headline mb-8 animate-shake">
            Stop messing with me! 😾
          </h1>
          <div className="reaction-card max-w-md mx-auto p-6">
            <img
              src={catImage}
              alt="Angry cat"
              className="w-full rounded-2xl animate-wiggle"
            />
            <p className="text-2xl md:text-3xl font-bold mt-6 text-primary">
              I warned you! 🙀
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              Now you owe me treats!
            </p>
          </div>
          <button
            onClick={handleReset}
            className="mt-8 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:scale-105 transition-transform"
          >
            Try Again? 😿
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rose-pattern flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      <div className="text-center z-10">
        <h1 className="valentine-headline mb-12 animate-pulse-heart">
          Will you be my Valentine? 💘
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <button
            onClick={handleYesClick}
            className="btn-valentine-yes animate-pulse-heart"
          >
            Yes 💕
          </button>

          {noClickCount === 0 ? (
            <button onClick={handleNoClick} className="btn-valentine-no">
              No 😾
            </button>
          ) : null}
        </div>

        {noClickCount > 0 && noClickCount < 4 && (
          <p className="mt-8 text-lg text-muted-foreground animate-bounce-in">
            {noClickCount === 1 && "Hmm... are you sure? 🥺"}
            {noClickCount === 2 && "Really?? Think again! 😢"}
            {noClickCount === 3 && "Last chance! 😿"}
          </p>
        )}
      </div>

      {/* Floating No button after first click */}
      {noClickCount > 0 && noClickCount < 4 && isNoButtonVisible && (
        <button
          onClick={handleNoClick}
          className="btn-valentine-no fixed z-50 animate-bounce-in"
          style={{
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
          }}
        >
          No 😾
        </button>
      )}
    </div>
  );
};

export default ValentinePage;
