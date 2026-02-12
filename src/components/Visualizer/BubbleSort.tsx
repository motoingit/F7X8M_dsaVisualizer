'use client';

import { useState } from 'react';
import { sleep } from '@/utils/delay';

export default function BubbleSort() {
    const [array, setArray] = useState<number[]>([]);
    const [activeIndices, setActiveIndices] = useState<[number, number] | null>(null);
    const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState('Generate an array to start sorting.');
    const [isRunning, setIsRunning] = useState(false);

    const generateArray = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 1);
        setArray(newArray);
        setMessage('Array generated. Click Start Sort.');
        setSortedIndices(new Set());
        setActiveIndices(null);
    };

    const generateWorstCase = () => {
        const newArray = Array.from({ length: 15 }, (_, i) => 50 - (i * 3));
        setArray(newArray);
        setMessage('Worst Case Generated. Click Start Sort.');
        setSortedIndices(new Set());
        setActiveIndices(null);
    };

    const generateBestCase = () => {
        const newArray = Array.from({ length: 15 }, (_, i) => i * 3 + 1);
        setArray(newArray);
        setMessage('Best Case Generated. Click Start Sort.');
        setSortedIndices(new Set());
        setActiveIndices(null);
    };

    const startSort = async () => {
        if (isRunning || array.length === 0) return;
        setIsRunning(true);
        setMessage('Sorting...');

        // Create a copy to manipulate
        const arr = [...array];
        const n = arr.length;
        let newSorted = new Set<number>();
        let swapped = false;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await sleep(300);

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]); // Trigger re-render with swapped values
                    swapped = true;
                    await sleep(300);
                }
            }
            newSorted.add(n - 1 - i);
            setSortedIndices(new Set(newSorted));

            // Optimization for Best Case O(n)
            if (!swapped) {
                setMessage('Optimization: No swaps made, array is sorted!');
                // Mark all remaining as sorted
                for (let k = 0; k < n - i - 1; k++) {
                    newSorted.add(k);
                }
                setSortedIndices(new Set(newSorted));
                break;
            }
        }
        newSorted.add(0);
        setSortedIndices(new Set(newSorted));
        setActiveIndices(null);
        if (swapped) setMessage('Array Sorted!');
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <button
                    onClick={generateArray}
                    disabled={isRunning}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white hover:bg-gray-700 disabled:opacity-50 transition"
                >
                    Random Case
                </button>
                <button
                    onClick={generateBestCase}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-900 border border-green-700 rounded text-green-100 hover:bg-green-800 disabled:opacity-50 transition"
                >
                    Best Case
                </button>
                <button
                    onClick={generateWorstCase}
                    disabled={isRunning}
                    className="px-4 py-2 bg-red-900 border border-red-700 rounded text-red-100 hover:bg-red-800 disabled:opacity-50 transition"
                >
                    Worst Case
                </button>
                <button
                    onClick={startSort}
                    disabled={isRunning || array.length === 0}
                    className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 disabled:opacity-50 transition"
                >
                    Start Sort
                </button>
            </div>

            <div className="flex items-end gap-1 h-80 bg-gray-900 border border-gray-800 p-8 min-w-[300px] overflow-x-auto justify-center">
                {array.length === 0 ? (
                    <div className="text-gray-500 w-full flex items-center justify-center h-full">No array generated</div>
                ) : (
                    array.map((value, idx) => {
                        const isActive = activeIndices && (activeIndices[0] === idx || activeIndices[1] === idx);
                        const isSorted = sortedIndices.has(idx);
                        let colorClass = 'bg-blue-600';
                        if (isSorted) colorClass = 'bg-green-500';
                        else if (isActive) colorClass = 'bg-yellow-500';

                        return (
                            <div
                                key={idx}
                                className={`w-8 flex items-end justify-center pb-2 text-white font-bold rounded-t transition-all duration-300 ${colorClass}`}
                                style={{ height: `${Math.max(value * 3 + 20, 40)}px` }}
                            >
                                <span className="text-[10px] hidden md:block">{value}</span>
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-xl font-mono text-white min-h-[1.75rem]">{message}</p>
        </div>
    );
}
