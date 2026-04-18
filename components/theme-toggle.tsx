"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl bg-surface/60 opacity-50" aria-hidden />
    );
  }
  const isDark = resolvedTheme === "dark";
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-olive-gray shadow-[0px_0px_0px_1px_var(--ring-color)] transition-colors hover:bg-ivory/10 hover:text-ink dark:text-warm-silver dark:hover:text-ivory"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </motion.button>
  );
}
