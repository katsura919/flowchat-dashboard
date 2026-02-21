import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Lightbulb, XCircle } from "lucide-react";

type CalloutType = "warning" | "danger" | "info" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<
  CalloutType,
  {
    icon: React.ReactNode;
    border: string;
    bg: string;
    iconColor: string;
    defaultTitle: string;
  }
> = {
  warning: {
    icon: <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />,
    border: "border-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    defaultTitle: "Warning",
  },
  danger: {
    icon: <XCircle className="h-4 w-4 shrink-0 mt-0.5" />,
    border: "border-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-600 dark:text-red-400",
    defaultTitle: "Important",
  },
  info: {
    icon: <Info className="h-4 w-4 shrink-0 mt-0.5" />,
    border: "border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    defaultTitle: "Note",
  },
  tip: {
    icon: <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />,
    border: "border-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    defaultTitle: "Key Principle",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon, border, bg, iconColor, defaultTitle } = config[type];
  const label = title ?? defaultTitle;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border-l-4 px-4 py-3",
        border,
        bg,
      )}
    >
      <span className={cn(iconColor)}>{icon}</span>
      <div className="flex-1 text-sm leading-relaxed">
        <p className={cn("mb-1 font-semibold", iconColor)}>{label}</p>
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}
