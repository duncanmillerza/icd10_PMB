'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Info, AlertTriangle, Star, Shield, ArrowRight } from 'lucide-react';

interface ICD10Code {
    code: string;
    description: string;
    validForBilling: boolean;
    validPrimary: boolean;
    isAsterisk: boolean;
    isDagger: boolean;
    isSequelae: boolean;
    isPMB: boolean;
    basketOfCare: string | null;
    pmbLinks?: PMBLink[];
}

interface PMBLink {
    id: number;
    daggerCode: string;
    asteriskCode: string;
    description: string;
    basketOfCare: string;
}

interface CodeCardProps {
    codeData: ICD10Code;
    isSelected?: boolean;
    onSelect?: (selected: boolean) => void;
}

export function CodeCard({ codeData, isSelected, onSelect }: CodeCardProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200",
                "bg-card hover:shadow-md",
                isSelected ? "ring-2 ring-primary border-primary" : "border-border hover:border-primary/50",
                !codeData.validForBilling && "bg-destructive/5 border-destructive/20"
            )}
            onClick={() => onSelect?.(!isSelected)}
        >
            {/* Header with Code and Selection */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                    {onSelect && (
                        <div className={cn(
                            "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                            isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background group-hover:border-primary"
                        )}>
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                        </div>
                    )}
                    <h3 className="font-mono text-xl font-bold tracking-tight text-foreground">
                        {codeData.code}
                    </h3>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 justify-end">
                    {codeData.isPMB && (
                        <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            PMB
                        </span>
                    )}
                    {codeData.isDagger && (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" title="Dagger Code">
                            †
                        </span>
                    )}
                    {codeData.isAsterisk && (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" title="Asterisk Code">
                            *
                        </span>
                    )}
                    {!codeData.validForBilling && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                            <AlertTriangle className="h-3 w-3" />
                            Not Billing Specific
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="text-sm leading-relaxed text-muted-foreground">
                {codeData.description}
            </div>

            {/* Additional Details */}
            {(codeData.basketOfCare || (codeData.pmbLinks && codeData.pmbLinks.length > 0)) && (
                <div className="mt-2 space-y-2 rounded-lg bg-muted/50 p-3 text-xs">
                    {codeData.basketOfCare && (
                        <div className="flex gap-2">
                            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <div>
                                <span className="font-semibold text-foreground">Basket: </span>
                                <span className="text-muted-foreground">{codeData.basketOfCare}</span>
                            </div>
                        </div>
                    )}

                    {codeData.pmbLinks?.map((link) => (
                        <div key={link.id} className="flex gap-2 border-t border-border/50 pt-2 first:border-0 first:pt-0">
                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <div>
                                <span className="font-semibold text-foreground">
                                    Link ({link.daggerCode} + {link.asteriskCode}):
                                </span>
                                <span className="ml-1 text-muted-foreground">
                                    {link.description}
                                </span>
                                {link.basketOfCare && (
                                    <div className="mt-1 font-mono text-[10px] text-primary">
                                        {'->'} Basket: {link.basketOfCare}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
