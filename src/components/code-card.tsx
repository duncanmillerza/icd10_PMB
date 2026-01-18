'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, Shield, ArrowRight, BookOpen } from 'lucide-react';
import { LinkModal } from './link-modal';

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
    const [modalOpen, setModalOpen] = useState(false);

    const links = codeData.pmbLinks || [];
    const hasManyLinks = links.length > 3;
    const displayedLinks = hasManyLinks ? links.slice(0, 3) : links;

    return (
        <>
            <div
                className={cn(
                    "group relative flex flex-col gap-3 rounded-xl border p-5 transition-all duration-200",
                    "bg-card shadow-sm hover:shadow-md",
                    isSelected ? "ring-2 ring-primary border-primary" : "border-border hover:border-primary/50",
                    !codeData.validForBilling && "bg-destructive/5 border-destructive/20"
                )}
                onClick={(e) => {
                    // Prevent marking as selected if clicking interactive elements inside
                    if ((e.target as HTMLElement).closest('button')) return;
                    onSelect?.(!isSelected)
                }}
            >
                {/* Header with Code and Selection */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {onSelect && (
                            <div className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-md border transition-colors cursor-pointer",
                                isSelected ? "bg-primary border-primary text-primary-foreground shadow-sm" : "border-muted-foreground/30 bg-background group-hover:border-primary"
                            )}>
                                {isSelected && <Check className="h-4 w-4" />}
                            </div>
                        )}
                        <h3 className="font-mono text-2xl font-bold tracking-tight text-foreground bg-muted/30 px-2 py-0.5 rounded-md">
                            {codeData.code}
                        </h3>
                    </div>

                    {/* Badges - Improved Contrast & Visibility */}
                    <div className="flex flex-wrap gap-2 justify-end">
                        {/* Primary vs Secondary Badge */}
                        {codeData.validPrimary ? (
                            <span className="inline-flex items-center rounded-md bg-success/10 px-2.5 py-1 text-xs font-bold text-success ring-1 ring-inset ring-success/20">
                                Primary
                            </span>
                        ) : (
                            <span className="inline-flex items-center rounded-md bg-warning/10 px-2.5 py-1 text-xs font-bold text-warning ring-1 ring-inset ring-warning/20">
                                Secondary Only
                            </span>
                        )}

                        {codeData.isPMB && (
                            <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                                PMB
                            </span>
                        )}
                        {codeData.isDagger && (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground shadow-sm" title="Dagger Code">
                                †
                            </span>
                        )}
                        {codeData.isAsterisk && (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-warning text-xs font-bold text-white shadow-sm" title="Asterisk Code">
                                *
                            </span>
                        )}
                        {!codeData.validForBilling && (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive ring-1 ring-inset ring-destructive/20">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                No Billing
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="text-base font-medium leading-relaxed text-muted-foreground pl-9">
                    {codeData.description}
                </div>

                {/* Additional Details */}
                {(codeData.basketOfCare || links.length > 0) && (
                    <div className="mt-3 ml-9 space-y-3">

                        {codeData.basketOfCare && (
                            <div className="flex items-start gap-2 text-sm bg-primary/5 p-3 rounded-lg border border-primary/10">
                                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <div>
                                    <span className="font-bold text-foreground">Basket of Care: </span>
                                    <span className="text-foreground/80">{codeData.basketOfCare}</span>
                                </div>
                            </div>
                        )}

                        {links.length > 0 && (
                            <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
                                <div className="bg-muted/50 px-3 py-2 border-b border-border flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    PMB Linked Conditions ({links.length})
                                </div>
                                <div className="divide-y divide-border/50">
                                    {displayedLinks.map((link) => (
                                        <div key={link.id} className="p-3 text-sm hover:bg-muted/50 transition-colors">
                                            <div className="flex gap-2">
                                                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium text-foreground">
                                                        <span className="font-mono text-primary">{link.daggerCode} + {link.asteriskCode}</span>:
                                                        <span className="ml-1 text-muted-foreground">{link.description}</span>
                                                    </div>
                                                    {link.basketOfCare && link.basketOfCare !== codeData.basketOfCare && (
                                                        <div className="mt-1 text-xs text-primary/80 font-mono">
                                                            {'->'} Basket: {link.basketOfCare}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {hasManyLinks && (
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="w-full py-2 bg-muted/50 hover:bg-muted text-xs font-medium text-primary transition-colors text-center border-t border-border/50"
                                    >
                                        View {links.length - 3} more links...
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <LinkModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                code={codeData.code}
                links={links}
            />
        </>
    );
}
