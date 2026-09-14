import { cn } from "@/lib/utils";

/**
 * Bare "in" mark, no badge/container — matches the rest of the icon set
 * (Sun, Moon, Menu, ChevronDown) which are all boxless line marks. Filled
 * in light mode (ink on a pale page), outlined in dark mode (a hairline,
 * like every other rule on a dark section).
 */
export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={cn("dark:hidden", className)}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn("hidden dark:block", className)}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" rx="0.6" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </>
  );
}
