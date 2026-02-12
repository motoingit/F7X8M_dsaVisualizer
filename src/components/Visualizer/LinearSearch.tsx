'use client';

import { useState } from 'react';
import { sleep } from '@/utils/delay';

export default function LinearSearch() {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number | ''>('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [message, setMessage] = useState('Generate an array to start.');
    const [isRunning, setIsRunning] = useState(false);

    const generateArray = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 1);
        setArray(newArray);
        setMessage('Enter a target number and click Search.');
        setFoundIndex(null);
        setActiveIndex(null);
    };

    const generateWorstCase = () => {
        const newArray = Array.from({ length: 15 }, (_, i) => i + 5);
        setArray(newArray);
        const lastVal = newArray[newArray.length - 1];
        setTarget(lastVal);
        setMessage(`Worst Case: Target ${lastVal} is at the end.`);
        setFoundIndex(null);
        setActiveIndex(null);
    };

    const startSearch = async () => {
        if (target === '' || isRunning) return;
        setIsRunning(true);
        setFoundIndex(null);
        setMessage(`Searching for ${target}...`);

        let found = false;
        for (let i = 0; i < array.length; i++) {
            // Check if component is still mounted logic? 
            // For simple script, just proceed. If unmounted, React will warn but it's ok for this scale.

            setActiveIndex(i);
            await sleep(500);

            if (array[i] === Number(target)) {
                setFoundIndex(i);
                setMessage(`Found ${target} at index ${i}!`);
                found = true;
                break;
            }
        }

        if (!found) {
            setMessage(`${target} not found.`);
        }
        setActiveIndex(null);
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <button
                    onClick={generateArray}
                    disabled={isRunning}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    Random Case
                </button>
                <button
                    onClick={generateWorstCase}
                    disabled={isRunning}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                    Worst Case
                </button>
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Target"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={startSearch}
                    disabled={isRunning || target === '' || array.length === 0}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    Start Search
                </button>
            </div>

            <div className="flex items-end gap-2 h-80 bg-gray-900 p-8 rounded-lg border border-gray-800 min-w-[300px] overflow-x-auto">
                {array.length === 0 ? (
                    <div className="text-gray-500 flex items-center justify-center w-full h-full">
                        No array generated
                    </div>
                ) : (
                    array.map((value, idx) => (
                        <div
                            key={idx}
                            className={`w-12 flex items-end justify-center pb-2 text-white font-bold rounded-t duration-300 transition-colors
                ${idx === foundIndex ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' :
                                    idx === activeIndex ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'bg-blue-500 hover:bg-blue-400 cursor-pointer'}
                `}
                            style={{ height: `${Math.max(value * 3 + 20, 40)}px` }}
                            onClick={() => !isRunning && setTarget(value)}
                            title={`Index: ${idx}, Value: ${value}`}
                        >
                            {value}
                        </div>
                    ))
                )}
            </div>

            <p className="text-xl font-semibold text-gray-200 min-h-[1.75rem]">{message}</p>
        </div>
    );
}
