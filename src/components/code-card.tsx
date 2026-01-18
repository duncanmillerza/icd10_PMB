'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, Shield, ArrowRight, BookOpen } from 'lucide-react';
import { LinkModal } from './link-modal';
import { PMBDetailsDialog } from './pmb-details-dialog';

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
    pmbDescription?: string | null;
    pmbComments?: string | null;
    pmbCode?: string | null;
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
    isNotFound?: boolean;
}

export function CodeCard({ codeData, isSelected, onSelect, isNotFound }: CodeCardProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [pmbDetailsOpen, setPmbDetailsOpen] = useState(false);

    const links = codeData.pmbLinks || [];
    const hasManyLinks = links.length > 3;
    const displayedLinks = hasManyLinks ? links.slice(0, 3) : links;

    const isSelectable = codeData.validForBilling && !isNotFound;

    if (isNotFound) {
        return (
            <div className="flex items-center gap-4 rounded-xl border border-destructive/50 bg-destructive/10 p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-mono text-xl font-bold text-destructive">{codeData.code}</h3>
                    <p className="text-sm font-medium text-destructive/80">Code not found in database</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                className={cn(
                    "group relative flex flex-col gap-2 rounded-xl border p-3 transition-all duration-200",
                    "bg-card shadow-sm",
                    isSelectable ? "hover:shadow-md cursor-pointer" : "opacity-80 cursor-not-allowed bg-muted/30",
                    isSelected ? "ring-2 ring-primary border-primary" : "border-border",
                    isSelectable && !isSelected && "hover:border-primary/50",
                    !codeData.validForBilling && "bg-destructive/5 border-destructive/20"
                )}
                onClick={(e) => {
                    if (!isSelectable) return;
                    // Prevent marking as selected if clicking interactive elements inside
                    if ((e.target as HTMLElement).closest('button')) return;
                    onSelect?.(!isSelected)
                }}
            >
                {/* Header with Code and Selection */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {onSelect && isSelectable && (
                            <div className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                                isSelected ? "bg-primary border-primary text-primary-foreground shadow-sm" : "border-muted-foreground/30 bg-background group-hover:border-primary"
                            )}>
                                {isSelected && <Check className="h-3.5 w-3.5" />}
                            </div>
                        )}
                        {onSelect && !isSelectable && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-muted-foreground/10 bg-muted/50 text-muted-foreground/20 cursor-not-allowed">
                                {/* Disabled empty box */}
                            </div>
                        )}
                        <h3 className="font-mono text-lg font-bold tracking-tight text-foreground bg-muted/30 px-1.5 py-0.5 rounded-md">
                            {codeData.code}
                        </h3>
                    </div>

                    {/* Badges - Compact */}
                    <div className="flex flex-wrap gap-1.5 justify-end">
                        {/* Primary vs Secondary Badge */}
                        {codeData.validPrimary ? (
                            <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-0.5 text-[10px] uppercase font-bold text-success ring-1 ring-inset ring-success/20">
                                Primary
                            </span>
                        ) : (
                            <span className="inline-flex items-center rounded-md bg-warning/10 px-2 py-0.5 text-[10px] uppercase font-bold text-warning ring-1 ring-inset ring-warning/20">
                                Secondary Only
                            </span>
                        )}

                        {codeData.isPMB && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPmbDetailsOpen(true);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-[10px] uppercase font-bold text-secondary-foreground shadow-sm ring-1 ring-inset ring-secondary-foreground/20 hover:bg-secondary/80 hover:ring-secondary-foreground/40 transition-all hover:scale-105"
                                title="View PMB Details & Linked Codes"
                            >
                                <Shield className="h-3 w-3" />
                                PMB
                                <span className="ml-0.5 border-l border-secondary-foreground/20 pl-1.5 opacity-70 normal-case tracking-normal font-semibold">
                                    View
                                </span>
                            </button>
                        )}
                        {codeData.isDagger && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground shadow-sm" title="Dagger Code">
                                †
                            </span>
                        )}
                        {codeData.isAsterisk && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-white shadow-sm" title="Asterisk Code">
                                *
                            </span>
                        )}
                        {!codeData.validForBilling && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-[10px] uppercase font-bold text-destructive ring-1 ring-inset ring-destructive/20">
                                <AlertTriangle className="h-3 w-3" />
                                No Billing
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="text-sm font-medium leading-normal text-muted-foreground pl-7">
                    {codeData.description}
                </div>

                {/* Additional Details */}

            </div>

            <LinkModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                code={codeData.code}
                links={links}
            />

            <PMBDetailsDialog
                isOpen={pmbDetailsOpen}
                onClose={() => setPmbDetailsOpen(false)}
                code={codeData.code}
                basketOfCare={codeData.basketOfCare}
                pmbDescription={codeData.pmbDescription}
                pmbComments={codeData.pmbComments}
                pmbCode={codeData.pmbCode}
                links={links}
            />
        </>
    );
}
