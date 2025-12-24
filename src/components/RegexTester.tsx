"use client";

import { useState, useMemo } from "react";

interface HighlightedTextProps {
    text: string;
    pattern: string;
}

function HighlightedText({ text, pattern }: HighlightedTextProps) {
    const parts = useMemo(() => {
        if (!pattern || !text) {
            return [{ text, isMatch: false }];
        }

        try {
            const regex = new RegExp(pattern, "g");
            const result: { text: string; isMatch: boolean }[] = [];
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {
                // Prevent infinite loops with zero-length matches
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // Add text before match
                if (match.index > lastIndex) {
                    result.push({
                        text: text.slice(lastIndex, match.index),
                        isMatch: false,
                    });
                }

                // Add matched text
                if (match[0]) {
                    result.push({
                        text: match[0],
                        isMatch: true,
                    });
                }

                lastIndex = match.index + match[0].length;
            }

            // Add remaining text
            if (lastIndex < text.length) {
                result.push({
                    text: text.slice(lastIndex),
                    isMatch: false,
                });
            }

            return result.length > 0 ? result : [{ text, isMatch: false }];
        } catch {
            return [{ text, isMatch: false }];
        }
    }, [text, pattern]);

    return (
        <div className="whitespace-pre-wrap break-words">
            {parts.map((part, index) => (
                <span
                    key={index}
                    className={
                        part.isMatch
                            ? "bg-gradient-to-r from-yellow-300 to-amber-300 dark:from-yellow-500 dark:to-amber-500 text-black px-0.5 rounded"
                            : ""
                    }
                >
                    {part.text}
                </span>
            ))}
        </div>
    );
}

export default function RegexTester() {
    const [regexInput, setRegexInput] = useState("");
    const [sampleText, setSampleText] = useState("");
    const [activePattern, setActivePattern] = useState("");
    const [activeText, setActiveText] = useState("");
    const [error, setError] = useState<string | null>(null);

    const matchCount = useMemo(() => {
        if (!activePattern || !activeText) return 0;
        try {
            const regex = new RegExp(activePattern, "g");
            const matches = activeText.match(regex);
            return matches ? matches.length : 0;
        } catch {
            return 0;
        }
    }, [activePattern, activeText]);

    const handleUpdate = () => {
        setError(null);

        // Validate regex
        if (regexInput) {
            try {
                new RegExp(regexInput);
            } catch (e) {
                setError(
                    `Invalid regex: ${e instanceof Error ? e.message : "Unknown error"}`
                );
                return;
            }
        }

        setActivePattern(regexInput);
        setActiveText(sampleText);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
            {/* Column 1: Inputs */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="regex-input"
                        className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                        Regular Expression Pattern
                    </label>
                    <input
                        id="regex-input"
                        type="text"
                        value={regexInput}
                        onChange={(e) => setRegexInput(e.target.value)}
                        placeholder="Enter regex pattern (e.g., \d+)"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-shadow font-mono"
                    />
                    {error && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="sample-text"
                        className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                        Sample Text
                    </label>
                    <textarea
                        id="sample-text"
                        value={sampleText}
                        onChange={(e) => setSampleText(e.target.value)}
                        placeholder="Enter or paste text to search within..."
                        rows={10}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-shadow resize-y"
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    Update
                </button>
            </div>

            {/* Column 2: Render Area */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Highlighted Matches
                    </h2>
                    {activePattern && (
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {matchCount} match{matchCount !== 1 ? "es" : ""} found
                        </span>
                    )}
                </div>
                <div className="min-h-[300px] p-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100">
                    {activeText ? (
                        <HighlightedText text={activeText} pattern={activePattern} />
                    ) : (
                        <p className="text-zinc-400 dark:text-zinc-600 italic">
                            Enter sample text and click &quot;Update&quot; to see highlighted
                            matches...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
