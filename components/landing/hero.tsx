"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#ebe9e1] px-4 pb-section pt-16 dark:from-near-black dark:to-dark-surface sm:px-5 sm:pb-section-lg sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(201,100,66,0.15), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-container text-center">
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0, duration: 0.5 }}
          className="text-overline uppercase tracking-[0.5px] text-stone-gray"
        >
          Anthropic-style experience
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.08, duration: 0.55 }}
          className="mt-3 font-serif text-4xl font-medium leading-tight text-near-black dark:text-ivory sm:text-5xl md:text-display"
        >
          Welcome to <span className="text-terracotta">Salon</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.16, duration: 0.5 }}
          className="mx-auto mt-5 max-w-2xl text-body-lg text-olive-gray"
        >
          A quiet, literary space for long-form ideas — with Claude as your
          unhurried conversation partner, rendered in a warm, editorial layout.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.24, duration: 0.5 }}
          className="mt-10"
        >
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 rounded-xl bg-terracotta px-6 py-3.5 font-sans text-body-ui font-medium text-ivory transition-opacity hover:opacity-95"
            style={{
              boxShadow:
                "0px 0px 0px 0px #c96442, 0px 0px 0px 1px #c96442, 0 12px 40px rgba(201,100,66,0.25)",
            }}
          >
            Start Chatting
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
