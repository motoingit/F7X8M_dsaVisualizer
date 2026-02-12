'use client';

import { useState } from 'react';
import { sleep } from '@/utils/delay';

export default function StackVisualizer() {
    const [stack, setStack] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState<number | ''>('');
    const [message, setMessage] = useState('Stack is empty.');
    const [isAnimating, setIsAnimating] = useState(false);
    const [poppingIndex, setPoppingIndex] = useState<number | null>(null);

    const push = async () => {
        if (inputValue === '' || isAnimating) return;
        if (stack.length >= 8) {
            setMessage('Stack Overflow! Cannot push more items.');
            return;
        }
        setIsAnimating(true);
        const val = Number(inputValue);
        setStack([...stack, val]);
        setInputValue('');
        setMessage(`Pushed ${val} onto the stack.`);
        await sleep(300); // Allow render
        setIsAnimating(false);
    };

    const pop = async () => {
        if (stack.length === 0 || isAnimating) {
            setMessage('Stack Underflow! Stack is empty.');
            return;
        }
        setIsAnimating(true);
        const val = stack[stack.length - 1];
        setPoppingIndex(stack.length - 1);
        setMessage(`Popping ${val}...`);

        await sleep(500); // Wait for exit animation

        setStack(stack.slice(0, -1));
        setPoppingIndex(null);
        setMessage(`Popped ${val} from the stack.`);
        setIsAnimating(false);
    };

    const peek = async () => {
        if (stack.length === 0) {
            setMessage('Stack is empty.');
            return;
        }
        const val = stack[stack.length - 1];
        setMessage(`Top element is ${val}.`);
        // Highlight top element logic could be added here
    };

    const clear = () => {
        setStack([]);
        setMessage('Stack cleared.');
    }

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Value"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && push()}
                />
                <button
                    onClick={push}
                    disabled={isAnimating || inputValue === ''}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    Push
                </button>
                <button
                    onClick={pop}
                    disabled={isAnimating || stack.length === 0}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
                >
                    Pop
                </button>
                <button
                    onClick={peek}
                    disabled={isAnimating || stack.length === 0}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 transition"
                >
                    Peek
                </button>
                <button
                    onClick={clear}
                    disabled={isAnimating || stack.length === 0}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-col-reverse items-center justify-start gap-2 h-96 w-40 bg-gray-900 border-x-2 border-b-2 border-gray-700 p-4 rounded-b-lg overflow-y-auto">
                {stack.map((value, idx) => (
                    <div
                        key={idx}
                        className={`w-full py-3 text-center text-white font-bold rounded shadow-lg transition-all duration-500 transform
                ${idx === poppingIndex ? 'translate-x-[100%] opacity-0 bg-red-500' : 'translate-x-0 opacity-100 bg-blue-500'}
                ${idx === stack.length - 1 && idx !== poppingIndex ? 'animate-bounce-in' : ''}
                `}
                    >
                        {value}
                    </div>
                ))}
                {stack.length === 0 && (
                    <div className="text-gray-500 text-sm mt-auto mb-auto">Empty Stack</div>
                )}
            </div>

            <p className="text-xl font-semibold text-gray-200 min-h-[1.75rem]">{message}</p>
        </div>
    );
}
