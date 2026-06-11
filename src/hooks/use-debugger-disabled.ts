
import { useEffect, useState } from "react";


export function useDebuggerDisabled() {
  const [ready, setReady] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Run the debugger check first, then signal ready after a delay
    const timeout = setTimeout(() => {
      const start = performance.now();
      debugger;
      const end = performance.now();

      if (end - start > 100) {
        setDevToolsOpen(true);
        console.warn("DevTools likely open — fetch blocked");
      }

      setReady(true); // only marks ready AFTER the check completes
    }, 500); // 500ms delay gives the page time to settle before checking

    // Continuous polling after initial check
    const interval = setInterval(() => {
      const start = performance.now();
      debugger;
      const end = performance.now();

      if (end - start > 100) {
        setDevToolsOpen(true);
      } else {
        setDevToolsOpen(false); // re-enable fetch if devtools closed
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return { ready, devToolsOpen };
}