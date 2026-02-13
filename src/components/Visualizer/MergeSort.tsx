'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

export default function MergeSort() {
    const [array, setArray] = useState<number[]>([]);
    const [activeRange, setActiveRange] = useState<[number, number] | null>(null);
    const [compareIndices, setCompareIndices] = useState<[number, number] | null>(null);
    const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState('Generate an array to start sorting.');
    const [isRunning, setIsRunning] = useState(false);

    // Stop signal
    const isRunningRef = useRef(false);

    useEffect(() => {
        return () => { isRunningRef.current = false; };
    }, []);

    const generateArray = () => {
        const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 1);
        setArray(newArray);
        setMessage('Array generated. Click Start Sort.');
        setSortedIndices(new Set());
        setActiveRange(null);
        setCompareIndices(null);
        isRunningRef.current = false;
        setIsRunning(false);
    };

    const merge = async (arr: number[], start: number, mid: number, end: number) => {
        if (!isRunningRef.current) return;

        const leftArr = arr.slice(start, mid + 1);
        const rightArr = arr.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        setMessage(`Merging ranges [${start}-${mid}] and [${mid + 1}-${end}]`);
        setActiveRange([start, end]);

        while (i < leftArr.length && j < rightArr.length) {
            if (!isRunningRef.current) return;

            setCompareIndices([start + i, mid + 1 + j]);
            await sleep(100);

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }

            // Visual update for the overwrite
            setArray([...arr]);
            k++;
            await sleep(50);
        }

        while (i < leftArr.length) {
            if (!isRunningRef.current) return;
            arr[k] = leftArr[i];
            setArray([...arr]);
            i++;
            k++;
            await sleep(50);
        }
        while (j < rightArr.length) {
            if (!isRunningRef.current) return;
            arr[k] = rightArr[j];
            setArray([...arr]);
            j++;
            k++;
            await sleep(50);
        }
    };

    const mergeSortHelper = async (arr: number[], start: number, end: number) => {
        if (start >= end || !isRunningRef.current) return;

        const mid = Math.floor((start + end) / 2);

        await mergeSortHelper(arr, start, mid);
        await mergeSortHelper(arr, mid + 1, end);

        await merge(arr, start, mid, end);
    };

    const startSort = async () => {
        if (isRunning || array.length === 0) return;

        setIsRunning(true);
        isRunningRef.current = true;
        setMessage('Sorting...');

        const arrCopy = [...array];
        await mergeSortHelper(arrCopy, 0, arrCopy.length - 1);

        if (isRunningRef.current) {
            // Mark all as sorted
            const sorted = new Set<number>();
            for (let i = 0; i < arrCopy.length; i++) sorted.add(i);
            setSortedIndices(sorted);
            setMessage('Merge Sort Complete!');
            setActiveRange(null);
            setCompareIndices(null);
        }

        setIsRunning(false);
        isRunningRef.current = false;
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <button
                    onClick={generateArray}
                    disabled={isRunning}
                    className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 transition shadow-lg hover:shadow-cyan-500/20"
                >
                    Reset Array
                </button>
                <button
                    onClick={startSort}
                    disabled={isRunning || array.length === 0}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 transition shadow-lg hover:shadow-cyan-500/50"
                >
                    {isRunning ? 'Sorting...' : 'Start Merge Sort'}
                </button>
            </div>

            <div className="flex items-end gap-[2px] h-80 bg-black/40 backdrop-blur-sm border border-gray-800 p-8 rounded-xl w-full max-w-4xl justify-center relative overflow-hidden box-glow">
                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                {array.length === 0 ? (
                    <div className="text-gray-500 w-full flex items-center justify-center h-full">Click Reset to Generate Array</div>
                ) : (
                    array.map((value, idx) => {
                        // Determine Color
                        let bgClass = 'bg-gray-400';
                        // If fully sorted
                        if (sortedIndices.has(idx)) bgClass = 'bg-gradient-to-t from-green-600 to-emerald-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]';
                        // If in current active range being merged
                        else if (activeRange && idx >= activeRange[0] && idx <= activeRange[1]) {
                            // If being compared specifically
                            if (compareIndices && (compareIndices[0] === idx || compareIndices[1] === idx)) {
                                bgClass = 'bg-gradient-to-t from-purple-600 to-pink-500 shadow-[0_0_15px_rgba(219,39,119,0.8)] scale-110';
                            } else {
                                bgClass = 'bg-gradient-to-t from-blue-600 to-cyan-400';
                            }
                        }

                        return (
                            <div
                                key={idx}
                                className={`w-3 md:w-5 flex items-end justify-center rounded-t-sm transition-all duration-100 ${bgClass}`}
                                style={{ height: `${Math.max(value * 5 + 10, 20)}px` }}
                            >
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-lg font-mono text-cyan-400 min-h-[1.75rem] animate-pulse">{message}</p>
        </div>
    );
}
