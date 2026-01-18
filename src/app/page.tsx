'use client';

import { useState } from 'react';
import { extractCodes } from '@/lib/code-utils';
import { CodeCard } from '@/components/code-card';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Loader2, Search, Copy, Trash2, Settings, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  notFound?: boolean;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ICD10Result[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Copy Settings State
  const [showCopySettings, setShowCopySettings] = useState(false);
  const [copyFormat, setCopyFormat] = useState<'full' | 'codes'>('full');
  const [delimiter, setDelimiter] = useState<'newline' | 'comma' | 'pipe' | 'semicolon'>('newline');

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
      const foundResults = data.results || [];
      const foundCodesMap = new Map(foundResults.map((r: ICD10Result) => [r.code, r]));

      // Map extracted codes to results, filling in "Not Found" placeholders where needed
      const finalResults = extracted.map((code: string) => {
        if (foundCodesMap.has(code)) {
          return foundCodesMap.get(code)!;
        }
        // Return a placeholder for not found items
        return {
          code,
          description: 'Not Found',
          validForBilling: false,
          validPrimary: false,
          isAsterisk: false,
          isDagger: false,
          isSequelae: false,
          isPMB: false,
          basketOfCare: null,
          notFound: true,
          pmbLinks: [] // Add empty array to satisfy type
        } as ICD10Result;
      });

      setResults(finalResults);
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

  const handleSelectAll = () => {
    // Only select codes that are found AND valid for billing
    const validResults = results.filter(r => !r.notFound && r.validForBilling);
    if (validResults.length === 0) return;

    const allValidSelected = validResults.every(r => selectedCodes.has(r.code));

    if (allValidSelected) {
      setSelectedCodes(new Set());
    } else {
      const newSet = new Set(validResults.map(r => r.code));
      setSelectedCodes(newSet);
    }
  };

  const handleCopy = async () => {
    if (selectedCodes.size === 0) return;

    // Sort results by code order in results array
    const sortedResults = results.filter(r => selectedCodes.has(r.code));
    let textToCopy = '';

    if (copyFormat === 'full') {
      textToCopy = sortedResults.map(r => {
        let line = `${r.code} - ${r.description}`;
        if (r.basketOfCare) line += ` [Basket: ${r.basketOfCare}]`;
        if (r.isPMB) line += ` [PMB]`;
        return line;
      }).join('\n');
    } else {
      const sep = delimiter === 'newline' ? '\n' :
        delimiter === 'comma' ? ', ' :
          delimiter === 'pipe' ? ' | ' :
            delimiter === 'semicolon' ? '; ' : '\n';
      textToCopy = sortedResults.map(r => r.code).join(sep);
    }

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

  // Derive all selected state for button icon
  // Only consider selectable codes (found AND validForBilling)
  const selectableResults = results.filter(r => !r.notFound && r.validForBilling);
  const allSelected = selectableResults.length > 0 && selectableResults.every(r => selectedCodes.has(r.code));

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

          <a
            href="https://www.hadadahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            About
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 lg:px-6 py-4 lg:py-8">
        <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1fr,1.5fr]">

          {/* Left Column: Input */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label htmlFor="input" className="mb-2 block text-sm font-semibold text-foreground">
                Paste ICD-10 Codes
              </label>
              <AutoResizeTextarea
                id="input"
                className="w-full font-mono text-sm leading-relaxed"
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
                <div className="flex items-center gap-2">
                  {/* Select All Button */}
                  <button
                    onClick={handleSelectAll}
                    className={cn(
                      "flex items-center gap-2 h-9 px-3 rounded-lg border transition-colors text-sm font-medium",
                      allSelected ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20" : "border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                    title={allSelected ? "Deselect All" : "Select All"}
                  >
                    {allSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                    <span className="hidden sm:inline">{allSelected ? "Deselect All" : "Select All"}</span>
                  </button>

                  {/* Settings Button */}
                  <button
                    onClick={() => setShowCopySettings(!showCopySettings)}
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-lg border transition-colors",
                      showCopySettings ? "bg-muted border-border text-foreground" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title="Copy Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    disabled={selectedCodes.size === 0}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Selected ({selectedCodes.size})
                  </button>
                </div>
              )}
            </div>

            {/* Copy Settings Panel */}
            {showCopySettings && results.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Format
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          checked={copyFormat === 'full'}
                          onChange={() => setCopyFormat('full')}
                          className="accent-primary"
                        />
                        <span>Code + Description + Details</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          checked={copyFormat === 'codes'}
                          onChange={() => setCopyFormat('codes')}
                          className="accent-primary"
                        />
                        <span>List of Codes Only</span>
                      </label>
                    </div>
                  </div>

                  {copyFormat === 'codes' && (
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                        Delimiter
                      </label>
                      <select
                        value={delimiter}
                        onChange={(e) => setDelimiter(e.target.value as any)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="newline">New Line</option>
                        <option value="comma">Comma (, )</option>
                        <option value="pipe">Pipe ( | )</option>
                        <option value="semicolon">Semicolon (; )</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

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
              {results.map((code, index) => (
                <CodeCard
                  key={`${code.code}-${index}`}
                  codeData={code}
                  isSelected={selectedCodes.has(code.code)}
                  onSelect={
                    // Disable selection for notfound items OR non-billing items
                    (code.notFound || !code.validForBilling) ? undefined : (sel) => toggleSelection(code.code, sel)
                  }
                  isNotFound={code.notFound}
                />
              ))}
            </div>

            {!loading && results.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold mb-2">Original Input vs Cleaned:</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-muted p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap">{input}</div>
                  <div className="bg-muted p-2 rounded overflow-auto max-h-32">
                    {results.map(r => r.code).join(' | ')}
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
