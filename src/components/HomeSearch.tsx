'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const algorithms = [
    { name: 'Bubble Sort', href: '/algorithms/bubble-sort', category: 'Sorting' },
    { name: 'Selection Sort', href: '/algorithms/selection-sort', category: 'Sorting' },
    { name: 'Insertion Sort', href: '/algorithms/insertion-sort', category: 'Sorting' },
    { name: 'Linear Search', href: '/algorithms/linear-search', category: 'Searching' },
    { name: 'Binary Search', href: '/algorithms/binary-search', category: 'Searching' },
    { name: 'Pathfinding (Dijkstra)', href: '/algorithms/pathfinding', category: 'Searching' },
    { name: 'Stack', href: '/data-structures/stack', category: 'Data Structure' },
    { name: 'Queue', href: '/data-structures/queue', category: 'Data Structure' },
    { name: 'Binary Search Tree (BST)', href: '/data-structures/bst', category: 'Data Structure' },
];

export default function HomeSearch({ needsCompact = false }: { needsCompact?: boolean }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof algorithms>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = algorithms.filter(algo =>
            algo.name.toLowerCase().includes(lowerQuery) ||
            algo.category.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
        setIsOpen(true);
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleFocus = () => {
        if (query.trim() !== '') {
            setIsOpen(true);
        }
    };

    return (
        <div ref={wrapperRef} className={`relative w-full z-50 ${needsCompact ? '' : 'max-w-xl'}`}>
            <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    placeholder="Search..."
                    className="relative w-full bg-black border border-gray-800 text-white rounded-lg px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:border-gray-600 transition-colors placeholder-gray-600 font-mono text-xs md:text-sm uppercase tracking-wider"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    🔍
                </div>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute right-0 w-full md:w-80 mt-2 bg-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden glass-water-card max-h-80 overflow-y-auto">
                    {results.map((algo, idx) => (
                        <Link
                            key={idx}
                            href={algo.href}
                            onClick={() => { setIsOpen(false); setQuery(''); }}
                            className="block px-6 py-4 hover:bg-white/10 transition-colors border-b border-gray-900 last:border-0"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-bold text-sm tracking-wide">
                                        {algo.name}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">
                                        {algo.category}
                                    </div>
                                </div>
                                <span className="text-gray-600 text-sm">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isOpen && query && results.length === 0 && (
                <div className="absolute right-0 w-full md:w-80 mt-2 bg-black border border-gray-800 rounded-lg shadow-2xl p-6 text-center text-gray-500 font-mono text-xs uppercase glass-water-card">
                    No algorithms found.
                </div>
            )}
        </div>
    );
}
