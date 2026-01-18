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
    links: PMBLink[];
}

export function PMBDetailsDialog({
    isOpen,
    onClose,
    code,
    basketOfCare,
    pmbDescription,
    pmbComments,
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
                        {/* Basket of Care */}
                        {basketOfCare && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold flex items-center gap-1.5 text-foreground/80">
                                    <Shield className="h-4 w-4" /> Basket of Care
                                </h4>
                                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                                    <p className="font-medium text-foreground">{basketOfCare}</p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {pmbDescription && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold flex items-center gap-1.5 text-foreground/80">
                                    <FileText className="h-4 w-4" /> Description
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {pmbDescription}
                                </p>
                            </div>
                        )}

                        {/* Comments */}
                        {pmbComments && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold flex items-center gap-1.5 text-foreground/80">
                                    <Info className="h-4 w-4" /> Comments
                                </h4>
                                <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground italic">
                                    {pmbComments}
                                </div>
                            </div>
                        )}

                        {/* Linked Codes */}
                        {links && links.length > 0 && (
                            <div className="space-y-3 pt-2 border-t">
                                <h4 className="text-sm font-semibold text-foreground/80">
                                    Linked PMB Conditions ({links.length})
                                </h4>
                                <div className="grid gap-2">
                                    {links.map((link) => (
                                        <div key={link.id} className="text-sm border rounded-lg p-3 bg-card hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start gap-2">
                                                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                                                <div>
                                                    <div className="font-mono font-medium text-primary">
                                                        {link.daggerCode} + {link.asteriskCode}
                                                    </div>
                                                    <div className="text-muted-foreground mt-0.5">
                                                        {link.description}
                                                    </div>
                                                    {link.basketOfCare && link.basketOfCare !== basketOfCare && (
                                                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary-foreground px-1.5 py-0.5 rounded font-medium">
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
