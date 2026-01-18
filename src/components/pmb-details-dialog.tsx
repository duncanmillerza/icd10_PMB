'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, Info, ArrowRight } from "lucide-react";

interface PMBLink {
    id: number;
    daggerCode: string;
    asteriskCode: string;
    description: string;
    basketOfCare: string;
}

interface PMBDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    code: string;
    basketOfCare: string | null;
    pmbDescription?: string | null;
    pmbComments?: string | null;
    pmbCode?: string | null;
    links: PMBLink[];
}

export function PMBDetailsDialog({
    isOpen,
    onClose,
    code,
    basketOfCare,
    pmbDescription,
    pmbComments,
    pmbCode,
    links,
}: PMBDetailsDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-secondary-foreground" />
                        PMB Details for <span className="font-mono text-primary">{code}</span>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6 py-4">

                        {/* PMB Code - High Visibility */}
                        {pmbCode && (
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                                    PMB Code
                                </h4>
                                <div className="text-3xl font-mono font-bold text-foreground tracking-tight">
                                    {pmbCode}
                                </div>
                            </div>
                        )}

                        {/* Basket of Care */}
                        {basketOfCare && (
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                                    Basket of Care
                                </h4>
                                <p className="font-medium text-lg leading-relaxed text-foreground/90">
                                    {basketOfCare}
                                </p>
                            </div>
                        )}

                        {/* Description */}
                        {pmbDescription && (
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                                    Description
                                </h4>
                                <p className="text-base text-muted-foreground leading-7">
                                    {pmbDescription}
                                </p>
                            </div>
                        )}

                        {/* Comments */}
                        {pmbComments && (
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                                    Comments
                                </h4>
                                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {pmbComments}
                                </div>
                            </div>
                        )}

                        {/* Linked Codes */}
                        {links && links.length > 0 && (
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-semibold text-foreground">
                                        Linked PMB Conditions
                                    </h4>
                                    <Badge variant="secondary" className="font-mono">{links.length}</Badge>
                                </div>
                                <div className="grid gap-3">
                                    {links.map((link) => (
                                        <div key={link.id} className="group relative rounded-lg border border-border hover:border-primary/50 bg-background p-4 transition-all hover:shadow-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                                <div className="shrink-0 pt-1">
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="space-y-1.5 flex-1">
                                                    <div className="font-mono font-bold text-foreground text-base">
                                                        {link.daggerCode} <span className="text-muted-foreground mx-1">+</span> {link.asteriskCode}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground leading-snug">
                                                        {link.description}
                                                    </div>
                                                    {link.basketOfCare && link.basketOfCare !== basketOfCare && (
                                                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs bg-secondary/10 text-secondary-foreground px-2.5 py-1 rounded-md font-medium">
                                                            <span>Basket:</span> {link.basketOfCare}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
