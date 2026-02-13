'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

export default function ExponentialSearch() {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number | null>(null);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [searchRange, setSearchRange] = useState<[number, number] | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [message, setMessage] = useState('Generate an array to start searching.');
    const [isRunning, setIsRunning] = useState(false);

    // Stop signal
    const isRunningRef = useRef(false);

    useEffect(() => {
        return () => { isRunningRef.current = false; };
    }, []);

    const generateArray = () => {
        // Must be sorted for Exponential Search
        const newArray = Array.from({ length: 32 }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);
        setArray(newArray);

        // Randomly pick a target from array or a random number
        const randomTarget = Math.random() > 0.3
            ? newArray[Math.floor(Math.random() * newArray.length)]
            : Math.floor(Math.random() * 100);

        setTarget(randomTarget);
        setMessage(`Target: ${randomTarget}. Click Start Search.`);
        setFoundIndex(null);
        setActiveIdx(null);
        setSearchRange(null);
        isRunningRef.current = false;
        setIsRunning(false);
    };

    const binarySearch = async (arr: number[], l: number, r: number, x: number) => {
        if (!isRunningRef.current) return;

        setMessage(`Binary Search in range [${l}, ${r}]`);
        setSearchRange([l, r]);
        await sleep(500);

        while (l <= r) {
            if (!isRunningRef.current) return;

            const mid = Math.floor(l + (r - l) / 2);
            setActiveIdx(mid);
            setMessage(`Checking middle index ${mid} (Value: ${arr[mid]})`);
            await sleep(400);

            if (arr[mid] === x) {
                setFoundIndex(mid);
                setMessage(`Found ${x} at index ${mid}!`);
                return;
            }

            if (arr[mid] < x) {
                l = mid + 1;
                setMessage(`${arr[mid]} < ${x}, searching right...`);
            } else {
                r = mid - 1;
                setMessage(`${arr[mid]} > ${x}, searching left...`);
            }
            setSearchRange([l, r]);
            await sleep(400);
        }

        setMessage(`${x} not found in the array.`);
    };

    const startSearch = async () => {
        if (isRunning || array.length === 0 || target === null) return;

        setIsRunning(true);
        isRunningRef.current = true;
        setFoundIndex(null);
        setActiveIdx(null);
        setSearchRange(null);

        const n = array.length;

        // Step 1: Check index 0
        setMessage(`Checking index 0...`);
        setActiveIdx(0);
        await sleep(500);

        if (array[0] === target) {
            setFoundIndex(0);
            setMessage(`Found ${target} at index 0!`);
            setIsRunning(false);
            isRunningRef.current = false;
            return;
        }

        // Step 2: Find range
        let i = 1;
        while (i < n && array[i] <= target) {
            if (!isRunningRef.current) break;

            setMessage(`Exponential Jump: Checking index ${i} (Value: ${array[i]}) <= ${target}`);
            setActiveIdx(i);
            // Highlight the range we just jumped over roughly
            setSearchRange([i / 2, i]);
            await sleep(600);

            i = i * 2;
        }

        if (!isRunningRef.current) return;

        // Step 3: Binary Search
        const left = Math.floor(i / 2);
        const right = Math.min(i, n - 1);

        setMessage(`Target is between index ${left} and ${right}. Starting Binary Search...`);
        await sleep(800);

        await binarySearch(array, left, right, target);

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
                    Reset & New Target
                </button>
                <button
                    onClick={startSearch}
                    disabled={isRunning || array.length === 0}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-lg hover:from-teal-400 hover:to-emerald-400 disabled:opacity-50 transition shadow-lg hover:shadow-emerald-500/50"
                >
                    {isRunning ? 'Searching...' : 'Start Search'}
                </button>
            </div>

            {target !== null && (
                <div className="bg-gray-800/50 px-6 py-2 rounded-full border border-gray-700">
                    Target: <span className="font-bold text-emerald-400 text-xl ml-2">{target}</span>
                </div>
            )}

            <div className="flex items-end gap-[2px] h-60 bg-black/40 backdrop-blur-sm border border-gray-800 p-8 rounded-xl w-full max-w-4xl justify-center relative overflow-hidden box-glow">
                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                {array.length === 0 ? (
                    <div className="text-gray-500 w-full flex items-center justify-center h-full">Click Reset to Generate Array</div>
                ) : (
                    array.map((value, idx) => {
                        let bgClass = 'bg-gray-600';
                        let opacity = 'opacity-50'; // fade uninteresting elements

                        // Highlight Logic
                        if (idx === foundIndex) {
                            bgClass = 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] scale-110 z-10';
                            opacity = 'opacity-100';
                        } else if (idx === activeIdx) {
                            bgClass = 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)] z-10';
                            opacity = 'opacity-100'; // Active item fully visible
                        } else if (searchRange && idx >= searchRange[0] && idx <= searchRange[1]) {
                            bgClass = 'bg-blue-500';
                            opacity = 'opacity-90'; // In range items visible
                        }

                        return (
                            <div
                                key={idx}
                                className={`flex-1 rounded-t-sm transition-all duration-300 ${bgClass} ${opacity} hover:opacity-100`}
                                style={{ height: `${value}%` }}
                                title={`Index: ${idx}, Value: ${value}`}
                            ></div>
                        );
                    })
                )}
            </div>

            <p className="text-lg font-mono text-teal-400 min-h-[1.75rem] animate-pulse text-center max-w-2xl">{message}</p>
        </div>
    );
}
