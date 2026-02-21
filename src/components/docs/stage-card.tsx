import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StageCardProps {
  number: number;
  label: string;
  systemAction?: string;
  vaTask?: string;
  outcome?: string;
  children?: React.ReactNode;
}

export function StageCard({
  number,
  label,
  systemAction,
  vaTask,
  outcome,
  children,
}: StageCardProps) {
  return (
    <Card className="my-4 border-l-4 border-l-primary">
      <CardHeader className="pb-2 pt-4 px-5">
        <div className="flex items-center gap-3">
          <Badge className="rounded-full text-xs font-bold" variant="default">
            Stage {number}
          </Badge>
          <span className="font-semibold text-foreground">{label}</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-4 space-y-2.5 text-sm text-foreground/80">
        {systemAction && (
          <div>
            <span className="font-medium text-foreground">System Action: </span>
            {systemAction}
          </div>
        )}
        {vaTask && (
          <div>
            <span className="font-medium text-foreground">VA Task: </span>
            {vaTask}
          </div>
        )}
        {outcome && (
          <div>
            <span className="font-medium text-foreground">Outcome: </span>
            {outcome}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
