"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, Zap } from "lucide-react";

const cards = [
  {
    title: "Fast",
    blurb: "Streamed token-by-token replies keep the rhythm of thinking alive — no awkward pauses, just flow.",
    icon: Zap,
  },
  {
    title: "Smart",
    blurb: "Claude reasons across your full thread, holding context the way a careful editor tracks every chapter.",
    icon: Sparkles,
  },
  {
    title: "Secure",
    blurb: "API keys stay on the server. Your app shell is a calm, minimal surface for serious conversation.",
    icon: Lock,
  },
] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section
      className="px-4 py-section sm:px-5"
      style={{
        background: "var(--page)",
        boxShadow: "inset 0 1px 0 0 var(--ring-color)",
      }}
    >
      <div className="mx-auto max-w-container">
        <h2
          className="font-serif text-3xl font-medium text-near-black dark:text-ivory sm:text-section-heading"
          style={{ lineHeight: "1.2" }}
        >
          Why Salon
        </h2>
        <p className="mt-3 max-w-2xl text-body-lg text-olive-gray">
          Three values that keep the product feeling premium and composed — no
          chrome, no clutter.
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                variants={item}
                className="rounded-2xl bg-ivory p-7 dark:bg-surface-elevated"
                style={{
                  boxShadow: "0px 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "#e8e6dc",
                    color: "#c96442",
                    boxShadow: "0px 0px 0px 1px #d1cfc5",
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3
                  className="font-serif text-2xl font-medium text-near-black dark:text-ivory"
                  style={{ lineHeight: "1.1" }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-body-ui text-olive-gray">
                  {c.blurb}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
