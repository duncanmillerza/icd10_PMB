'use client';

import { useState } from 'react';
import { extractCodes } from '@/lib/code-utils';
import { CodeCard } from '@/components/code-card';
import { Loader2, Search, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure utils exists

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
  pmbLinks?: any[];
}

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ICD10Result[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedCodes(new Set());

    try {
      const extracted = extractCodes(input);
      if (extracted.length === 0) {
        setLoading(false);
        return;
      }

      console.log('Searching for:', extracted);

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codes: extracted }),
      });

      if (!response.ok) {
        throw new Error('Failed to search');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (code: string, isSelected: boolean) => {
    const newSet = new Set(selectedCodes);
    if (isSelected) {
      newSet.add(code);
    } else {
      newSet.delete(code);
    }
    setSelectedCodes(newSet);
  };

  const handleCopy = async () => {
    if (selectedCodes.size === 0) return;

    // Sort results by code order in results array
    const textToCopy = results
      .filter(r => selectedCodes.has(r.code))
      .map(r => {
        let line = `${r.code} - ${r.description}`;
        if (r.basketOfCare) line += ` [Basket: ${r.basketOfCare}]`;
        if (r.isPMB) line += ` [PMB]`;
        return line;
      })
      .join('\n');

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const clearInput = () => {
    setInput('');
    setResults([]);
    setSelectedCodes(new Set());
    setError(null);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/20 bg-[#2D6356] px-6 py-4 shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="h-8">
              <img src="/Wordmark Mono.svg" alt="Hadeda Health" className="h-full w-auto" />
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-white/20"></div>
            {/* App Name */}
            <h1 className="text-lg font-medium text-white/90">
              ICD-10 Look-up
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.5fr]">

          {/* Left Column: Input */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label htmlFor="input" className="mb-2 block text-sm font-semibold text-foreground">
                Paste ICD-10 Codes
              </label>
              <textarea
                id="input"
                className="min-h-[300px] w-full resize-y rounded-lg border border-input bg-background p-4 font-mono text-sm leading-relaxed focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-all placeholder:text-muted-foreground"
                placeholder="Paste your codes here...
Examples:
G82.5; N31.8
K59.2
T24,2 (will be auto-corrected to T24.2)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSearch}
                  disabled={loading || !input.trim()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                  {loading ? 'Processing...' : 'Clean & Search'}
                </button>

                <button
                  onClick={clearInput}
                  disabled={!input}
                  className="flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  title="Clear"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Tips:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Separators like commas, semicolons, and newlines are auto-detected.</li>
                <li>Codes like "T24,2" are auto-corrected to "T24.2".</li>
                <li>Results show PMB status and billing validity.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Results
                {results.length > 0 && <span className="ml-2 text-sm font-normal text-muted-foreground">({results.length} found)</span>}
              </h2>

              {results.length > 0 && (
                <button
                  onClick={handleCopy}
                  disabled={selectedCodes.size === 0}
                  className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" />
                  Copy Selected ({selectedCodes.size})
                </button>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive font-medium border border-destructive/20">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Cleaning and searching database...</p>
              </div>
            )}

            {!loading && results.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                <Search className="h-10 w-10 opacity-20 mb-3" />
                <p>Enter codes and click Search to see results.</p>
              </div>
            )}

            <div className="space-y-4">
              {results.map((code) => (
                <CodeCard
                  key={code.code}
                  codeData={code}
                  isSelected={selectedCodes.has(code.code)}
                  onSelect={(sel) => toggleSelection(code.code, sel)}
                />
              ))}
            </div>

            {!loading && results.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold mb-2">Original Input vs Cleaned:</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-muted p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap">{input}</div>
                  <div className="bg-muted p-2 rounded overflow-auto max-h-32">
                    {results.map(r => r.code).join(', ')}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
