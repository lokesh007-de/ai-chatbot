import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const GITHUB = "https://github.com/anthropics/anthropic-sdk-typescript";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-5"
        style={{
          background: "var(--nav-bg)",
          boxShadow: "0px 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-near-black dark:text-ivory"
        >
          Salon
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/chat"
            className="rounded-xl px-3 py-2 text-body-ui text-olive-gray transition-colors hover:text-near-black dark:text-warm-silver dark:hover:text-ivory"
          >
            Open chat
          </Link>
          <ThemeToggle />
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-body-ui text-dark-warm transition-opacity hover:opacity-90 dark:text-coral"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
