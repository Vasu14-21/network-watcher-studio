import { useEffect, useState } from "react";

interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
}

const TerminalText = ({ text, typingSpeed = 50, className = "" }: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className={`font-mono ${className}`}>
      {displayedText}
      <span className="animate-terminal-blink text-primary">▋</span>
    </span>
  );
};

export default TerminalText;
