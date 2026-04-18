import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-0 border-0"
      style={{
        boxShadow: "0 -1px 0 0 var(--ring-color) inset, 0px 4px 32px rgba(0,0,0,0.2)",
        background: "#141413",
      }}
    >
      <div className="mx-auto flex max-w-container flex-col gap-2 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="font-sans text-caption text-warm-silver">
          © {new Date().getFullYear()} Salon. Crafted for thoughtful conversation.
        </p>
        <div className="flex gap-6 text-caption text-warm-silver">
          <Link
            href="/chat"
            className="transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
          >
            Chat
          </Link>
          <a
            href="https://www.anthropic.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ivory"
          >
            Anthropic
          </a>
        </div>
      </div>
    </footer>
  );
}
