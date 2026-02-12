'use client';

import { useState } from 'react';
import { sleep } from '@/utils/delay';

export default function BinarySearch() {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number | ''>('');
    const [low, setLow] = useState<number | null>(null);
    const [high, setHigh] = useState<number | null>(null);
    const [mid, setMid] = useState<number | null>(null);
    const [message, setMessage] = useState('Generate a sorted array first.');
    const [isRunning, setIsRunning] = useState(false);

    const generateSorted = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10)
            .sort((a, b) => a - b);
        setArray(newArray);
        setMessage('Array generated. Enter target.');
        resetIndices();
    };

    const generateBestCase = () => {
        // Array where target is exactly in the middle
        const newArray = Array.from({ length: 15 }, (_, i) => 10 + i * 5); // 10, 15, 20...
        setArray(newArray);
        const m = Math.floor(newArray.length / 2);
        setTarget(newArray[m]);
        setMessage('Best Case: Target is the middle element.');
        resetIndices();
    };

    const generateWorstCase = () => {
        // Array where target is not present or at extremes
        const newArray = Array.from({ length: 15 }, (_, i) => 10 + i * 5);
        setArray(newArray);
        setTarget(newArray[0] - 5); // Target not in array
        setMessage('Worst Case: Target not in array.');
        resetIndices();
    };

    const resetIndices = () => {
        setLow(null);
        setHigh(null);
        setMid(null);
    };

    const startSearch = async () => {
        if (target === '' || isRunning || array.length === 0) return;
        setIsRunning(true);
        setMessage(`Searching for ${target}...`);

        let l = 0;
        let r = array.length - 1;
        let found = false;

        while (l <= r) {
            setLow(l);
            setHigh(r);
            await sleep(600);

            const m = Math.floor((l + r) / 2);
            setMid(m);
            await sleep(600);

            if (array[m] === Number(target)) {
                setMessage(`Found ${target} at index ${m}!`);
                found = true;
                break;
            }

            if (array[m] < Number(target)) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        if (!found) {
            setLow(null);
            setHigh(null);
            setMid(null);
            setMessage(`${target} not found.`);
        }
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full text-white">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <button
                    onClick={generateSorted}
                    disabled={isRunning}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded hover:bg-gray-700 disabled:opacity-50 transition"
                >
                    Random Sorted
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
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Target"
                    className="px-4 py-2 bg-black border border-gray-600 rounded text-white w-24 focus:outline-none focus:border-white"
                />
                <button
                    onClick={startSearch}
                    disabled={isRunning || target === '' || array.length === 0}
                    className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 disabled:opacity-50 transition"
                >
                    Start Search
                </button>
            </div>

            <div className="flex items-end justify-center gap-1 h-64 w-full px-4 border-b border-gray-800 pb-4">
                {array.length === 0 ? (
                    <div className="text-gray-500 flex items-center justify-center w-full h-full">
                        Generate sorted array first
                    </div>
                ) : (
                    array.map((value, idx) => {
                        let bgColor = 'bg-gray-700';
                        let opacity = 'opacity-100';

                        // Logic for highlighting range
                        if (low !== null && high !== null) {
                            if (idx >= low && idx <= high) {
                                bgColor = 'bg-blue-600'; // Active range
                            } else {
                                opacity = 'opacity-20'; // Inactive range
                            }
                        }

                        if (idx === mid) bgColor = 'bg-yellow-500';
                        if (idx === mid && value === Number(target)) bgColor = 'bg-green-500';

                        return (
                            <div
                                key={idx}
                                className={`w-10 flex items-end justify-center pb-2 text-white text-xs font-bold rounded-t transition-all duration-300 ${bgColor} ${opacity}`}
                                style={{ height: `${Math.max(value * 2.5 + 20, 30)}px` }}
                            >
                                {value}
                            </div>
                        );
                    })
                )}
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded"></div> Search Range</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded"></div> Mid Point</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Found</div>
            </div>

            <p className="text-xl font-mono min-h-[1.75rem]">{message}</p>
        </div>
    );
}
