"use client";

import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo: ReactNode;
  links?: NavLink[];
  actions?: ReactNode;
  className?: string;
}

export function Navbar({
  logo,
  links = [],
  actions,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-ink-800 bg-ink-950/80 backdrop-blur-md",
        className
      )}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center text-ink-50">{logo}</div>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-300 transition-colors hover:text-emerald-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {actions}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink-200 hover:bg-ink-800 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-ink-800 bg-ink-950 md:hidden"
        >
          <Container size="xl">
            <nav
              className="flex flex-col gap-1 py-4"
              aria-label="Mobile"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-200 hover:bg-ink-800 hover:text-emerald-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {actions && (
                <div className="mt-3 flex flex-col gap-2 px-3">
                  {actions}
                </div>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}