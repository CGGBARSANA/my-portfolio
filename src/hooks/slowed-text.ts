import { useEffect, useState } from "react";

export function useSlowedText(text: string, speed = 0) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    if (!text || text.length === 0) return;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return displayedText;
}