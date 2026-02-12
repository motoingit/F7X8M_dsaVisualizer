'use client';

import { useState, useEffect, useRef } from 'react';
import { BST, BSTNode } from '@/lib/BST';
import { sleep } from '@/utils/delay';

export default function BSTVisualizer() {
    const bstRef = useRef<BST>(new BST());
    const [inputValue, setInputValue] = useState<number | ''>('');
    const [message, setMessage] = useState('Binary Search Tree initialized.');
    const [nodes, setNodes] = useState<BSTNode[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [highlightNode, setHighlightNode] = useState<BSTNode | null>(null);

    // Helper to flatten node list for rendering
    const updateNodes = () => {
        const list: BSTNode[] = [];
        const traverse = (n: BSTNode | null) => {
            if (!n) return;
            list.push(n); // Push reference
            traverse(n.left);
            traverse(n.right);
        };
        bstRef.current.generatePositions();
        traverse(bstRef.current.getRoot());
        setNodes([...list]);
    };

    useEffect(() => {
        updateNodes();
    }, []); // Initial load

    const insert = async () => {
        if (inputValue === '' || isProcessing) return;
        const value = Number(inputValue);
        setIsProcessing(true);
        setMessage(`Searching for insertion point for ${value}...`);

        let current = bstRef.current.getRoot();

        // Animation Loop
        while (current) {
            setHighlightNode(current);
            await sleep(400);

            if (value < current.value) {
                if (!current.left) break;
                current = current.left;
            } else {
                if (!current.right) break;
                current = current.right;
            }
        }

        bstRef.current.insert(value);
        setHighlightNode(null);
        updateNodes(); // Update visual state
        setInputValue('');
        setMessage(`Inserted ${value}.`);
        setIsProcessing(false);
    };

    const clear = () => {
        bstRef.current = new BST();
        updateNodes();
        setMessage('Tree cleared.');
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Value"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyDown={(e) => e.key === 'Enter' && insert()}
                />
                <button
                    onClick={insert}
                    disabled={isProcessing || inputValue === ''}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition shadow-lg"
                >
                    Insert
                </button>
                <button
                    onClick={clear}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
                >
                    Clear Tree
                </button>
            </div>

            <p className="text-gray-300 h-6 font-mono text-sm">{message}</p>

            {/* SVG Container for Tree */}
            <div className="relative w-full max-w-[800px] h-[500px] bg-gray-900 border border-gray-800 rounded-xl shadow-inner overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 800 500">
                    {/* Draw Links first so they are behind nodes */}
                    {nodes.map((node, i) => (
                        <g key={`link-${i}`}>
                            {node.left && (
                                <line
                                    x1={node.x} y1={node.y}
                                    x2={node.left.x} y2={node.left.y}
                                    stroke="#4b5563" strokeWidth="2"
                                />
                            )}
                            {node.right && (
                                <line
                                    x1={node.x} y1={node.y}
                                    x2={node.right.x} y2={node.right.y}
                                    stroke="#4b5563" strokeWidth="2"
                                />
                            )}
                        </g>
                    ))}

                    {/* Draw Nodes */}
                    {nodes.map((node, i) => {
                        const isHighlight = highlightNode === node;

                        return (
                            <g key={`node-${i}`} className="transition-all duration-300">
                                <circle
                                    cx={node.x} cy={node.y} r="20"
                                    fill={isHighlight ? '#fbbf24' : '#3b82f6'}
                                    stroke={isHighlight ? '#f59e0b' : '#1d4ed8'} strokeWidth="2"
                                    className="shadow-lg transition-colors duration-300"
                                />
                                <text
                                    x={node.x} y={node.y}
                                    dy=".3em" textAnchor="middle"
                                    className="text-white text-xs font-bold pointer-events-none select-none fill-white"
                                >
                                    {node.value}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
