'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

export default function HeapSort() {
    const [array, setArray] = useState<number[]>([]);
    const [heapSize, setHeapSize] = useState<number>(0);
    const [activeIndices, setActiveIndices] = useState<[number, number] | null>(null);
    const [swapIndices, setSwapIndices] = useState<[number, number] | null>(null);
    const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState('Generate an array to start sorting.');
    const [isRunning, setIsRunning] = useState(false);

    const isRunningRef = useRef(false);

    useEffect(() => {
        return () => { isRunningRef.current = false; };
    }, []);

    const generateArray = () => {
        // Smaller array for better tree visualization (max 15 nodes for 4 levels)
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10);
        setArray(newArray);
        setHeapSize(newArray.length);
        setMessage('Array generated. Click Start Sort.');
        setSortedIndices(new Set());
        setActiveIndices(null);
        setSwapIndices(null);
        isRunningRef.current = false;
        setIsRunning(false);
    };

    const heapify = async (arr: number[], n: number, i: number) => {
        if (!isRunningRef.current) return;

        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        setActiveIndices([i, -1]); // Highlight current root
        setMessage(`Heapifying node at index ${i}`);
        await sleep(300);

        if (left < n) {
            setActiveIndices([i, left]);
            setMessage(`Comparing Root ${arr[i]} with Left Child ${arr[left]}`);
            await sleep(300);
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            setActiveIndices([i, right]);
            setMessage(`Comparing winner ${arr[largest]} with Right Child ${arr[right]}`);
            await sleep(300);
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            setSwapIndices([i, largest]);
            setMessage(`Swapping ${arr[i]} and ${arr[largest]}`);
            await sleep(300);

            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            setSwapIndices(null);

            await heapify(arr, n, largest);
        }
    };

    const startSort = async () => {
        if (isRunning || array.length === 0) return;
        setIsRunning(true);
        isRunningRef.current = true;

        const arr = [...array];
        const n = arr.length;

        // Build Heap
        setMessage('Building Max Heap...');
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }

        // Extract elements
        setMessage('Extracting elements from Heap...');
        for (let i = n - 1; i > 0; i--) {
            if (!isRunningRef.current) break;

            // Move current root to end
            setMessage(`Moving Max ${arr[0]} to end position ${i}`);
            setSwapIndices([0, i]);
            await sleep(400);

            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            setSortedIndices(prev => new Set(prev).add(i));
            setHeapSize(i); // Reduce heap size visual
            setSwapIndices(null);

            await sleep(200);

            // Heapify root
            await heapify(arr, i, 0);
        }

        if (isRunningRef.current) {
            setSortedIndices(prev => new Set(prev).add(0));
            setHeapSize(0);
            setMessage('Heap Sort Complete!');
            setActiveIndices(null);
        }
        setIsRunning(false);
        isRunningRef.current = false;
    };

    // --- Tree Visualization Helpers ---
    const getTreeLevel = (index: number) => Math.floor(Math.log2(index + 1));
    const getMaxLevel = (n: number) => Math.floor(Math.log2(n));

    const renderNode = (index: number) => {
        if (index >= array.length) return null;

        const level = getTreeLevel(index);
        const maxLevel = getMaxLevel(array.length);

        // Position calculations usually require absolute positioning or SVG
        // Let's use a simplified logical grid or flex approach for clarity
        // Or strictly SVG for lines
        return null;
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center z-20">
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
                    className="px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold rounded-lg hover:from-orange-500 hover:to-amber-400 disabled:opacity-50 transition shadow-lg hover:shadow-amber-500/50"
                >
                    {isRunning ? 'Sorting...' : 'Start Heap Sort'}
                </button>
            </div>

            {/* DUAL VIEW CONTAINER */}
            <div className="grid lg:grid-cols-1 gap-8 w-full max-w-5xl">

                {/* 1. Tree View (SVG) */}
                <div className="h-[300px] w-full bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl relative flex justify-center items-center overflow-hidden box-glow p-4">
                    <p className="absolute top-2 left-4 text-xs text-gray-400 uppercase tracking-widest">Binary Heap View</p>

                    {array.length > 0 && (
                        <svg viewBox="0 0 800 300" className="w-full h-full">
                            {array.map((_, i) => {
                                const left = 2 * i + 1;
                                const right = 2 * i + 2;
                                if (left >= heapSize && right >= heapSize) return null; // Don't draw lines for sorted/non-heap elements? Actually show full tree but styling differs

                                const getPos = (idx: number) => {
                                    const level = Math.floor(Math.log2(idx + 1));
                                    const maxDepth = 4;
                                    const offset = idx - Math.pow(2, level) + 1;
                                    const totalInLevel = Math.pow(2, level);

                                    // x: spread across 800 width
                                    const x = (800 / (totalInLevel + 1)) * (offset + 1);
                                    const y = 40 + level * 60;
                                    return { x, y };
                                };

                                const parent = getPos(i);
                                const lines = [];

                                if (left < heapSize || (left < array.length)) { // Show lines even if sorted? Maybe show ghost lines
                                    const lPos = getPos(left);
                                    lines.push(
                                        <line key={`l-${i}`} x1={parent.x} y1={parent.y} x2={lPos.x} y2={lPos.y} stroke={left < heapSize ? "#555" : "#222"} strokeWidth="2" />
                                    );
                                }
                                if (right < heapSize || (right < array.length)) {
                                    const rPos = getPos(right);
                                    lines.push(
                                        <line key={`r-${i}`} x1={parent.x} y1={parent.y} x2={rPos.x} y2={rPos.y} stroke={right < heapSize ? "#555" : "#222"} strokeWidth="2" />
                                    );
                                }
                                return lines;
                            })}

                            {array.map((val, i) => {
                                const level = Math.floor(Math.log2(i + 1));
                                const offset = i - Math.pow(2, level) + 1;
                                const totalInLevel = Math.pow(2, level);
                                const x = (800 / (totalInLevel + 1)) * (offset + 1);
                                const y = 40 + level * 60;

                                let circleFill = "#1f2937"; // gray-800
                                let stroke = "#374151";
                                let scale = 1;

                                if (sortedIndices.has(i)) {
                                    circleFill = "#059669"; // Green
                                    stroke = "#10b981";
                                } else if (i >= heapSize) {
                                    circleFill = "#111"; // Dark for removed from heap
                                    stroke = "#222";
                                } else {
                                    // Active Logic
                                    if (activeIndices && (activeIndices[0] === i || activeIndices[1] === i)) {
                                        circleFill = "#d97706"; // Amber
                                        stroke = "#f59e0b";
                                        scale = 1.2;
                                    }
                                    if (swapIndices && (swapIndices[0] === i || swapIndices[1] === i)) {
                                        circleFill = "#dc2626"; // Red
                                        stroke = "#ef4444";
                                        scale = 1.2;
                                    }
                                }

                                return (
                                    <g key={`node-${i}`} transform={`translate(${x}, ${y}) scale(${scale})`} className="transition-all duration-300">
                                        <circle r="18" fill={circleFill} stroke={stroke} strokeWidth="2" className="transition-all" />
                                        <text dy="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{val}</text>
                                        <text dy="-25" textAnchor="middle" fill="#666" fontSize="10">{i}</text>
                                    </g>
                                );
                            })}
                        </svg>
                    )}
                </div>

                {/* 2. Array View */}
                <div className="flex items-end gap-1 h-40 bg-black/40 backdrop-blur-sm border border-gray-800 p-4 rounded-xl justify-center relative overflow-hidden box-glow w-full">
                    <p className="absolute top-2 left-4 text-xs text-gray-400 uppercase tracking-widest">Array View</p>

                    {array.length === 0 ? (
                        <div className="text-gray-500 w-full flex items-center justify-center h-full">No array</div>
                    ) : (
                        array.map((value, idx) => {
                            let bgClass = 'bg-gray-600';

                            if (sortedIndices.has(idx)) {
                                bgClass = 'bg-green-500';
                            } else if (idx >= heapSize) {
                                bgClass = 'bg-gray-800'; // Technically sorted part grows from end, but visualization logic keeps track
                            } else if (swapIndices && (swapIndices[0] === idx || swapIndices[1] === idx)) {
                                bgClass = 'bg-red-500';
                            } else if (activeIndices && (activeIndices[0] === idx || activeIndices[1] === idx)) {
                                bgClass = 'bg-amber-500';
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`flex-1 rounded-t-sm transition-all duration-100 ${bgClass}`}
                                    style={{ height: `${value}%` }}
                                ></div>
                            );
                        })
                    )}
                </div>
            </div>

            <p className="text-lg font-mono text-amber-400 min-h-[1.75rem] animate-pulse">{message}</p>
        </div>
    );
}
