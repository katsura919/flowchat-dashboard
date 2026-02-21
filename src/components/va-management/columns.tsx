"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldAlert, ShieldCheck } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { VA } from "@/hooks/va-management";

export const columns: ColumnDef<VA>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge variant={status === "active" ? "default" : status === "suspended" ? "destructive" : "secondary"}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            );
        }
    },
    {
        accessorKey: "trainingStatus",
        header: "Training",
        cell: ({ row }) => {
            const status = row.getValue("trainingStatus") as string;
            const displayMap: Record<string, string> = {
                not_started: "Not Started",
                in_progress: "In Progress",
                completed: "Completed"
            };
            return displayMap[status] || status;
        }
    },
    {
        accessorKey: "isCertified",
        header: "Certified",
        cell: ({ row }) => {
            const isCertified = row.getValue("isCertified") as boolean;
            return isCertified ? (
                <div className="flex items-center text-green-600 font-medium">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Yes
                </div>
            ) : (
                <div className="flex items-center text-muted-foreground">
                    <ShieldAlert className="mr-2 h-4 w-4" /> No
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const va = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(va.email)}>
                            Copy email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
