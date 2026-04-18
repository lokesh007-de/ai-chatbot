"use client";

import { motion } from "framer-motion";

const dot = {
  rest: { y: 0, opacity: 0.4 },
  bounce: { y: -3, opacity: 1 },
};

export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 px-0.5 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-warm-silver"
          variants={dot}
          initial="rest"
          animate="bounce"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
