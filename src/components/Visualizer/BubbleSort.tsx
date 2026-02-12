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

    const startSort = async () => {
        if (isRunning || array.length === 0) return;
        setIsRunning(true);
        setMessage('Sorting...');

        // Create a copy to manipulate
        const arr = [...array];
        const n = arr.length;
        let newSorted = new Set<number>();

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await sleep(300);

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]); // Trigger re-render with swapped values
                    await sleep(300);
                }
            }
            newSorted.add(n - 1 - i);
            setSortedIndices(new Set(newSorted));
        }
        newSorted.add(0);
        setSortedIndices(new Set(newSorted));
        setActiveIndices(null);
        setMessage('Array Sorted!');
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center">
                <button
                    onClick={generateArray}
                    disabled={isRunning}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    Generate New Array
                </button>
                <button
                    onClick={startSort}
                    disabled={isRunning || array.length === 0}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 transition"
                >
                    Start Sort
                </button>
            </div>

            <div className="flex items-end gap-2 h-80 bg-gray-900 p-8 rounded-lg border border-gray-800 min-w-[300px] overflow-x-auto">
                {array.length === 0 ? (
                    <div className="text-gray-500 w-full flex items-center justify-center h-full">No array generated</div>
                ) : (
                    array.map((value, idx) => {
                        const isActive = activeIndices && (activeIndices[0] === idx || activeIndices[1] === idx);
                        const isSorted = sortedIndices.has(idx);
                        let colorClass = 'bg-blue-500';
                        if (isSorted) colorClass = 'bg-green-500 shadow-[0_0_10px_#22c55e]';
                        else if (isActive) colorClass = 'bg-yellow-500 shadow-[0_0_10px_#eab308]';

                        return (
                            <div
                                key={idx}
                                className={`w-12 flex items-end justify-center pb-2 text-white font-bold rounded-t transition-all duration-300 ${colorClass}`}
                                style={{ height: `${Math.max(value * 3 + 20, 40)}px` }}
                            >
                                {value}
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-xl font-semibold text-gray-200 min-h-[1.75rem]">{message}</p>
        </div>
    );
}
