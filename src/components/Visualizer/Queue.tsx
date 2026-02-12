'use client';

import { useState } from 'react';
import { sleep } from '@/utils/delay';

export default function QueueVisualizer() {
    const [queue, setQueue] = useState<{ id: number; value: number }[]>([]);
    const [inputValue, setInputValue] = useState<number | ''>('');
    const [message, setMessage] = useState('Queue is empty.');
    const [isAnimating, setIsAnimating] = useState(false);
    const [dequeueingId, setDequeueingId] = useState<number | null>(null);
    const [nextId, setNextId] = useState(0);

    const enqueue = async () => {
        if (inputValue === '' || isAnimating) return;
        if (queue.length >= 8) {
            setMessage('Queue Overflow! Cannot enqueue more items.');
            return;
        }
        const val = Number(inputValue);
        // Add to end
        setQueue([...queue, { id: nextId, value: val }]);
        setNextId(prev => prev + 1);
        setInputValue('');
        setMessage(`Enqueued ${val} to the rear.`);
    };

    const dequeue = async () => {
        if (queue.length === 0 || isAnimating) {
            setMessage('Queue Underflow! Queue is empty.');
            return;
        }
        setIsAnimating(true);
        const item = queue[0];
        setDequeueingId(item.id);
        setMessage(`Dequeuing ${item.value} from the front...`);

        await sleep(500); // Wait for exit animation

        setQueue(prev => prev.slice(1));
        setDequeueingId(null);
        setMessage(`Dequeued ${item.value}.`);
        setIsAnimating(false);
    };

    const peek = () => {
        if (queue.length === 0) {
            setMessage('Queue is empty.');
            return;
        }
        setMessage(`Front element is ${queue[0].value}.`);
    };

    const clear = () => {
        setQueue([]);
        setMessage('Queue cleared.');
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Value"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && enqueue()}
                />
                <button
                    onClick={enqueue}
                    disabled={isAnimating || inputValue === ''}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    Enqueue
                </button>
                <button
                    onClick={dequeue}
                    disabled={isAnimating || queue.length === 0}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
                >
                    Dequeue
                </button>
                <button
                    onClick={peek}
                    disabled={isAnimating || queue.length === 0}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 transition"
                >
                    Peek
                </button>
                <button
                    onClick={clear}
                    disabled={isAnimating || queue.length === 0}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition"
                >
                    Clear
                </button>
            </div>

            <div className="flex items-center justify-start gap-4 h-32 pl-4 pr-4 bg-gray-900 border-y-2 border-gray-700 min-w-[500px] overflow-x-auto rounded-lg">
                {queue.length === 0 ? (
                    <div className="text-gray-500 w-full text-center">Empty Queue</div>
                ) : (
                    queue.map((item) => (
                        <div
                            key={item.id}
                            className={`min-w-[50px] h-[50px] flex items-center justify-center text-white font-bold rounded shadow-lg transition-all duration-500 transform
                    ${item.id === dequeueingId ? '-translate-y-[100%] opacity-0 bg-red-500' : 'translate-y-0 opacity-100 bg-green-600'}
                    `}
                        >
                            {item.value}
                        </div>
                    ))
                )}
            </div>

            <p className="text-xl font-semibold text-gray-200 min-h-[1.75rem]">{message}</p>
        </div>
    );
}
