'use client';

import React, { useState } from 'react';
import { X, Search, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { Button } from './ui/button'; 
// Actually, let's use standard HTML/Tailwind for speed unless specifically asked for shadcn components, 
// though the style guide mentions them. I'll stick to raw Tailwind to avoid "module not found" for components I haven't created.

interface PMBLink {
    id: number;
    daggerCode: string;
    asteriskCode: string;
    description: string;
    basketOfCare: string;
}

interface LinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    code: string;
    links: PMBLink[];
}

export function LinkModal({ isOpen, onClose, code, links }: LinkModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredLinks = links.filter(link =>
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.daggerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.asteriskCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-card rounded-xl shadow-2xl border border-border flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div>
                        <h2 className="text-lg font-bold">PMB Links for {code}</h2>
                        <p className="text-sm text-muted-foreground">{links.length} associated conditions found</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search links..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredLinks.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No links match your search.
                        </div>
                    ) : (
                        filteredLinks.map((link) => (
                            <div key={link.id} className="p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                                <div className="flex gap-3">
                                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                                    <div className="space-y-1">
                                        <div className="font-medium text-sm">
                                            <span className="font-mono text-primary font-bold">{link.daggerCode} + {link.asteriskCode}</span>:
                                            <span className="ml-2">{link.description}</span>
                                        </div>
                                        {link.basketOfCare && (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded w-fit">
                                                <Shield className="h-3 w-3" />
                                                <span>Basket: <span className="font-medium text-foreground">{link.basketOfCare}</span></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
}
