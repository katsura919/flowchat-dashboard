import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Module, SOP_LINKS } from "@/hooks/training";

interface ModuleRoadmapProps {
    modules: Module[];
    onToggleComplete: (slug: string) => void;
}

export function ModuleRoadmap({ modules, onToggleComplete }: ModuleRoadmapProps) {
    const groups = Array.from(new Set(modules.map((m) => m.group)));

    return (
        <div className="space-y-8">
            {groups.map((group) => (
                <div key={group} className="space-y-4">
                    <h3 className="text-lg font-semibold tracking-tight uppercase text-muted-foreground text-xs px-1">
                        {group}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {modules
                            .filter((m) => m.group === group)
                            .sort((a, b) => a.order - b.order)
                            .map((module) => (
                                <Card key={module.slug} className={module.completed ? "bg-accent/20" : ""}>
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <div className="pt-1">
                                            <Checkbox
                                                id={`module-${module.slug}`}
                                                checked={module.completed}
                                                onCheckedChange={() => onToggleComplete(module.slug)}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <label
                                                htmlFor={`module-${module.slug}`}
                                                className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {module.label}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                {SOP_LINKS[module.slug] ? (
                                                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground" asChild>
                                                        <Link href={SOP_LINKS[module.slug]} target="_blank">
                                                            <ExternalLink className="mr-1 h-3 w-3" />
                                                            View SOP
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <span className="text-[10px] text-muted-foreground italic">No SOP link</span>
                                                )}
                                            </div>
                                        </div>
                                        {module.completed && (
                                            <Badge variant="default" className="text-[10px] h-5 px-1.5">
                                                Done
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
