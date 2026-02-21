import { CheckCircle, XCircle } from "lucide-react";

interface ChecklistProps {
  do?: string[];
  dont?: string[];
}

export function Checklist({
  do: doItems = [],
  dont: dontItems = [],
}: ChecklistProps) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      {doItems.length > 0 && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Do
          </p>
          <ul className="space-y-2">
            {doItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {dontItems.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-700 dark:text-red-400">
            Do Not
          </p>
          <ul className="space-y-2">
            {dontItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
