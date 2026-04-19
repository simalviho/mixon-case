"use client";

import { useEffect, useRef, useState } from "react";

type UseTypewriterTextParams = {
  text: string;
  startTyping: boolean;
  speed?: number;
};

export function useTypewriterText({
  text,
  startTyping,
  speed = 16,
}: UseTypewriterTextParams): string {
  const [visibleText, setVisibleText] = useState("");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!startTyping) {
      return;
    }

    let currentIndex = 0;

    intervalRef.current = window.setInterval(() => {
      currentIndex += 1;
      setVisibleText(text.slice(0, currentIndex));

      if (currentIndex >= text.length && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, speed);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, startTyping, speed]);

  return startTyping ? visibleText : "";
}
