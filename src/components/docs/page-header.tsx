import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  day?: number;
  tag?: string;
  title: string;
  description?: string;
}

export function PageHeader({ day, tag, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {(day != null || tag) && (
        <div className="mb-3">
          {day != null && (
            <Badge
              variant="outline"
              className="text-xs font-semibold tracking-widest uppercase"
            >
              Day {day}
            </Badge>
          )}
          {tag && !day && (
            <Badge
              variant="secondary"
              className="text-xs font-semibold tracking-widest uppercase"
            >
              {tag}
            </Badge>
          )}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <Separator className="mt-6" />
    </div>
  );
}
