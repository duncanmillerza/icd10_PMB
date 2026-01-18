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
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                    <Shield className="h-4 w-4" /> PMB Code
                                </h4>
                                <div className="text-2xl font-mono font-bold text-foreground">
                                    {pmbCode}
                                </div>
                            </div>
                        )}

                        {/* Basket of Care - Distinct Box */}
                        {basketOfCare && (
                            <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary-foreground/80 mb-2">
                                    <Shield className="h-4 w-4" /> Basket of Care
                                </h4>
                                <p className="font-medium text-lg leading-relaxed text-foreground">
                                    {basketOfCare}
                                </p>
                            </div>
                        )}

                        {/* Description - Canvas Card */}
                        {pmbDescription && (
                            <div className="rounded-xl border border-border bg-card shadow-sm p-4">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                                    <FileText className="h-4 w-4" /> Description
                                </h4>
                                <p className="text-base text-foreground/90 leading-7">
                                    {pmbDescription}
                                </p>
                            </div>
                        )}

                        {/* Comments - Note Style */}
                        {pmbComments && (
                            <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4 dark:bg-orange-950/20 dark:border-orange-900">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-2">
                                    <Info className="h-4 w-4" /> Comments
                                </h4>
                                <div className="text-sm text-foreground/80 italic leading-relaxed">
                                    {pmbComments}
                                </div>
                            </div>
                        )}

                        {/* Linked Codes - List Group */}
                        {links && links.length > 0 && (
                            <div className="space-y-3 pt-4 border-t-2 border-dashed">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                                    <span>Linked PMB Conditions</span>
                                    <Badge variant="outline" className="text-xs font-mono">{links.length}</Badge>
                                </h4>
                                <div className="grid gap-2.5">
                                    {links.map((link) => (
                                        <div key={link.id} className="group relative overflow-hidden rounded-lg border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-3">
                                                <div className="shrink-0 mt-0.5">
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-mono font-bold text-primary text-base">
                                                        {link.daggerCode} <span className="text-muted-foreground">+</span> {link.asteriskCode}
                                                    </div>
                                                    <div className="text-sm text-foreground/80 leading-snug">
                                                        {link.description}
                                                    </div>
                                                    {link.basketOfCare && link.basketOfCare !== basketOfCare && (
                                                        <div className="mt-2 inline-flex items-center gap-1.5 text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded font-medium border border-secondary/10">
                                                            <Shield className="h-3 w-3" />
                                                            Basket: {link.basketOfCare}
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
