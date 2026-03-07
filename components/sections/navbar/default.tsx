import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "absolute top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-5",
        className,
      )}
    >
      <a
        href={siteConfig.url}
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <div
          className="size-10 shrink-0"
          style={{
            backgroundImage: "url(/logo.png)",
            backgroundSize: "320%",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <span className="text-sm font-medium tracking-widest text-white/60 uppercase">
          Blundell Analytics
        </span>
      </a>
    </header>
  );
}
