'use client';

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

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
        <nav className="flex items-center gap-2">
          <Link
            href="/chat"
            className="rounded-xl px-3 py-2 text-body-ui text-olive-gray transition-colors hover:text-near-black dark:text-warm-silver dark:hover:text-ivory"
          >
            Open chat
          </Link>

          {session ? (
            <div className="flex items-center gap-2">
              <img
                src={session.user?.image || ''}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={() => signOut()}
                className="rounded-xl px-3 py-2 text-sm text-olive-gray hover:text-near-black dark:text-warm-silver dark:hover:text-ivory transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn()}
                className="rounded-xl px-3 py-2 text-sm text-olive-gray hover:text-near-black dark:text-warm-silver dark:hover:text-ivory transition-colors"
              >
                Sign in
              </button>
              <Link
                href="/auth/signin"
                className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}