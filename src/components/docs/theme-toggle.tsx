"use client";

import { useTheme } from "next-themes";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ThemeOption {
  id: string;
  label: string;
  bg: string;
  primary: string;
}

const themes: ThemeOption[] = [
  { id: "light", label: "Light", bg: "#ffffff", primary: "#6272ea" },
  { id: "dark", label: "Dark", bg: "#1c1c1c", primary: "#818cf8" },
  {
    id: "northern-lights",
    label: "Northern Lights",
    bg: "#1e2533",
    primary: "#34d399",
  },
  { id: "sunset", label: "Sunset", bg: "#271a0e", primary: "#f59e0b" },
  { id: "ocean", label: "Ocean", bg: "#0c1628", primary: "#22d3ee" },
  { id: "rose", label: "Rose", bg: "#fff0f2", primary: "#f43f5e" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!mounted) return <div className="h-9 w-9" />;

  const active = themes.find((t) => t.id === theme);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose theme"
        className="relative"
      >
        {/* Small swatch dot showing current primary */}
        {active && (
          <span
            className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full border border-background"
            style={{ backgroundColor: active.primary }}
          />
        )}
        <Palette className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-52 rounded-xl border bg-popover p-2 shadow-lg">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Theme
          </p>
          <div className="grid grid-cols-2 gap-1">
            {themes.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted/60 ${
                    isActive ? "bg-muted ring-1 ring-ring" : ""
                  }`}
                >
                  {/* Swatch */}
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
                    style={{
                      background: `linear-gradient(135deg, ${t.bg} 50%, ${t.primary} 50%)`,
                      borderColor: isActive ? t.primary : "transparent",
                    }}
                  >
                    {isActive && (
                      <Check
                        className="h-3 w-3 drop-shadow-sm"
                        style={{
                          color: "#ffffff",
                          filter: "drop-shadow(0 0 1px rgba(0,0,0,0.8))",
                        }}
                      />
                    )}
                  </span>
                  <span className="text-xs font-medium text-popover-foreground leading-none">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
