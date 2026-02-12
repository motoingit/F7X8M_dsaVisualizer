'use client';

import { useState, useEffect } from 'react';
import { sleep } from '@/utils/delay';

export default function InsertionSort() {
    const [array, setArray] = useState<number[]>([]);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [compareIdx, setCompareIdx] = useState<number | null>(null);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed] = useState(300);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 5);
        setArray(newArray);
        setActiveIdx(null);
        setCompareIdx(null);
        setSortedIndices([]);
    };

    const generateWorstCase = () => {
        const newArray = Array.from({ length: 15 }, (_, i) => 50 - (i * 3));
        setArray(newArray);
        setActiveIdx(null);
        setCompareIdx(null);
        setSortedIndices([]);
    };

    const startSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        const arr = [...array];
        const n = arr.length;

        // First element is trivially sorted
        setSortedIndices([0]);

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            setActiveIdx(i);
            await sleep(speed);

            while (j >= 0 && arr[j] > key) {
                setCompareIdx(j);
                await sleep(speed);

                arr[j + 1] = arr[j];
                setArray([...arr]);
                j = j - 1;
                await sleep(speed);
            }

            arr[j + 1] = key;
            setArray([...arr]);
            setCompareIdx(null);

            const newSorted = [];
            for (let k = 0; k <= i; k++) newSorted.push(k);
            setSortedIndices(newSorted);
            await sleep(speed);
        }

        setActiveIdx(null);
        setIsSorting(false);
    };

    const getBarColor = (idx: number) => {
        if (idx === activeIdx) return 'bg-purple-500'; // Element being inserted
        if (idx === compareIdx) return 'bg-yellow-400'; // Comparing with
        if (sortedIndices.includes(idx)) return 'bg-green-500';
        return 'bg-blue-600';
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex gap-4">
                <button
                    onClick={resetArray}
                    disabled={isSorting}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition"
                >
                    Random Case
                </button>
                <button
                    onClick={generateWorstCase}
                    disabled={isSorting}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
                >
                    Worst Case
                </button>
                <button
                    onClick={startSort}
                    disabled={isSorting}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold disabled:opacity-50 transition shadow-lg"
                >
                    {isSorting ? 'Sorting...' : 'Start Sort'}
                </button>
            </div>

            <div className="flex items-end justify-center gap-1 h-64 w-full px-4 border-b border-gray-700">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className={`w-8 ${getBarColor(idx)} rounded-t transition-all duration-300 shadow-md transform ${idx === activeIdx ? '-translate-y-4' : ''}`}
                        style={{ height: `${value * 5}px` }}
                    >
                        <span className="hidden group-hover:block text-xs text-center -mt-4 text-white">{value}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div> Active Key</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded"></div> Comparing</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Sorted Portion</div>
            </div>
        </div>
    );
}
