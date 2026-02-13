'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

export default function QuickSort() {
    const [array, setArray] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null);
    const [activeRange, setActiveRange] = useState<[number, number] | null>(null); // [left, right] pointers
    const [currentRange, setCurrentRange] = useState<[number, number] | null>(null); // [start, end] of partition
    const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState('Generate an array to start sorting.');
    const [isRunning, setIsRunning] = useState(false);

    // Stop signal
    const isRunningRef = useRef(false);

    useEffect(() => {
        return () => { isRunningRef.current = false; };
    }, []);

    const generateArray = () => {
        const newArray = Array.from({ length: 25 }, () => Math.floor(Math.random() * 50) + 1);
        setArray(newArray);
        setMessage('Array generated. Click Start Sort.');
        setSortedIndices(new Set());
        setPivotIndex(null);
        setActiveRange(null);
        setCurrentRange(null);
        isRunningRef.current = false;
        setIsRunning(false);
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
        if (!isRunningRef.current) return -1;

        const pivot = arr[high];
        setPivotIndex(high);
        setCurrentRange([low, high]);
        setMessage(`Partitioning range [${low}-${high}] with Pivot ${pivot}`);
        await sleep(300);

        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (!isRunningRef.current) return -1;

            setActiveRange([i + 1, j]);
            await sleep(100);

            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await sleep(100);
            }
        }

        // Swap arr[i+1] and arr[high] (pivot)
        if (!isRunningRef.current) return -1;
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        await sleep(200);

        return i + 1;
    };

    const quickSortHelper = async (arr: number[], low: number, high: number) => {
        if (low < high && isRunningRef.current) {
            const pi = await partition(arr, low, high);
            if (pi === -1) return; // Stopped

            // Mark pivot as sorted relative to this range
            setSortedIndices(prev => new Set(prev).add(pi));

            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        } else if (low === high && isRunningRef.current) {
            setSortedIndices(prev => new Set(prev).add(low));
        }
    };

    const startSort = async () => {
        if (isRunning || array.length === 0) return;

        setIsRunning(true);
        isRunningRef.current = true;
        setMessage('Sorting...');
        setSortedIndices(new Set());

        const arrCopy = [...array];
        await quickSortHelper(arrCopy, 0, arrCopy.length - 1);

        if (isRunningRef.current) {
            // Ensure all are marked sorted at the end
            const sorted = new Set<number>();
            for (let i = 0; i < arrCopy.length; i++) sorted.add(i);
            setSortedIndices(sorted);
            setMessage('Quick Sort Complete!');
            setPivotIndex(null);
            setActiveRange(null);
            setCurrentRange(null);
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
                    className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 transition shadow-lg"
                >
                    Reset Array
                </button>
                <button
                    onClick={startSort}
                    disabled={isRunning || array.length === 0}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 transition shadow-lg hover:shadow-pink-500/50"
                >
                    {isRunning ? 'Sorting...' : 'Start Quick Sort'}
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
                        let extraStyle = {};

                        // If sorted
                        if (sortedIndices.has(idx)) {
                            bgClass = 'bg-gradient-to-t from-green-600 to-emerald-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]';
                        }
                        // Pivot
                        else if (idx === pivotIndex) {
                            bgClass = 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] z-10';
                            extraStyle = { transform: 'scale(1.1) translateY(-5px)' };
                        }
                        // Active Pointers
                        else if (activeRange && (idx === activeRange[0] || idx === activeRange[1])) {
                            bgClass = 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]';
                        }
                        // Current Partition Range
                        else if (currentRange && idx >= currentRange[0] && idx <= currentRange[1]) {
                            bgClass = 'bg-purple-500/50';
                        }

                        return (
                            <div
                                key={idx}
                                className={`w-4 md:w-6 flex items-end justify-center rounded-t-sm transition-all duration-100 ${bgClass}`}
                                style={{ height: `${Math.max(value * 5 + 10, 20)}px`, ...extraStyle }}
                            >
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-lg font-mono text-purple-400 min-h-[1.75rem] animate-pulse">{message}</p>
        </div>
    );
}
