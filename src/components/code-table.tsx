'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, Shield, BookOpen } from 'lucide-react';
import { LinkModal } from './link-modal';

interface ICD10Result {
    code: string;
    description: string;
    validForBilling: boolean;
    validPrimary: boolean;
    isAsterisk: boolean;
    isDagger: boolean;
    isSequelae: boolean;
    isPMB: boolean;
    basketOfCare: string | null;
    pmbLinks?: any[]; // Using any to match page.tsx loose typing, or could be stricter
    notFound?: boolean;
}

interface CodeTableProps {
    results: ICD10Result[];
    selectedCodes: Set<string>;
    onToggleSelection: (code: string, selected: boolean) => void;
}

export function CodeTable({ results, selectedCodes, onToggleSelection }: CodeTableProps) {
    // Helper to calculate badges, similar to CodeCard
    const renderBadges = (code: ICD10Result) => {
        if (code.notFound) return null;

        return (
            <div className="flex flex-wrap gap-1.5">
                {/* Billing Status */}
                {!code.validForBilling && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        No Billing
                    </span>
                )}

                {/* Primary/Secondary */}
                {code.validPrimary ? (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        Primary
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                        Sec Only
                    </span>
                )}

                {/* PMB Status */}
                {code.isPMB && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        <Shield className="h-3 w-3" />
                        PMB
                    </span>
                )}

                {/* Dagger/Asterisk */}
                {code.isDagger && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        † Dagger
                    </span>
                )}
                {code.isAsterisk && (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        * Asterisk
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="w-[50px] px-4 py-3 font-medium">Select</th>
                            <th className="w-[100px] px-4 py-3 font-medium">Code</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="w-[200px] px-4 py-3 font-medium">Status</th>
                            <th className="w-[150px] px-4 py-3 font-medium">Basket</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {results.map((code) => {
                            const isSelected = selectedCodes.has(code.code);
                            const isSelectable = code.validForBilling && !code.notFound;

                            return (
                                <tr
                                    key={code.code}
                                    className={cn(
                                        "transition-colors",
                                        isSelected ? "bg-primary/5" : "hover:bg-muted/50",
                                        code.notFound && "bg-destructive/5"
                                    )}
                                    onClick={(e) => {
                                        if (!isSelectable) return;
                                        // Prevent toggling if clicking interactive elements (like modal triggers if added)
                                        if ((e.target as HTMLElement).closest('button')) return;
                                        onToggleSelection(code.code, !isSelected);
                                    }}
                                >
                                    {/* Selection Checkbox */}
                                    <td className="px-4 py-3">
                                        <div className={cn(
                                            "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                                            isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background",
                                            !isSelectable && "opacity-50 cursor-not-allowed bg-muted"
                                        )}>
                                            {isSelected && <Check className="h-3.5 w-3.5" />}
                                        </div>
                                    </td>

                                    {/* Code */}
                                    <td className="px-4 py-3 font-mono font-medium text-foreground">
                                        {code.code}
                                    </td>

                                    {/* Description */}
                                    <td className="px-4 py-3">
                                        <div className={cn("text-foreground", code.notFound && "text-destructive font-medium")}>
                                            {code.notFound ? "Code not found in database" : code.description}
                                        </div>
                                        {/* Mobile-only badges could go here if hiding columns on small screens, 
                                            but strictly tabular view usually implies scrolling. */}
                                    </td>

                                    {/* Status Badges */}
                                    <td className="px-4 py-3">
                                        {renderBadges(code)}
                                    </td>

                                    {/* Basket of Care */}
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {code.basketOfCare || '-'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
