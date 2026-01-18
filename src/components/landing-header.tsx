'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="px-6 h-16 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
                <img src="/Logo Long Green.svg" alt="Hadeda Health" className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="#clinicians" className="text-muted-foreground hover:text-primary transition-colors">Philosophy</Link>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
                <Link href="/icd10" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">ICD-10 Tool</Link>
            </nav>

            <div className="flex items-center gap-3">
                {/* Auth buttons removed per request */}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg md:hidden flex flex-col p-6 gap-4 animate-in slide-in-from-top-2">
                    <Link
                        href="#clinicians"
                        className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Philosophy
                    </Link>
                    <Link
                        href="#features"
                        className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="/icd10"
                        className="text-lg font-semibold text-primary py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ICD-10 Look-up Tool
                    </Link>
                    <Link
                        href="#contact"
                        className="text-lg font-medium text-muted-foreground py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            )}
        </header>
    );
}
