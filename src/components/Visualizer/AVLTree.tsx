'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    height: number;
    id: number; // For React keys

    constructor(value: number, id: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.id = id;
    }
}

export default function AVLTree() {
    const [root, setRoot] = useState<Node | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [message, setMessage] = useState('Enter a value to insert.');
    const [highlightNode, setHighlightNode] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    // For React rendering, we need a way to force update or state that mirrors tree
    // We'll use a version counter or just setRoot with new reference
    const rootRef = useRef<Node | null>(null);
    const isRunningRef = useRef(false);
    const nodeIdCounter = useRef(0);

    useEffect(() => {
        return () => { isRunningRef.current = false; };
    }, []);

    const getHeight = (node: Node | null): number => {
        return node ? node.height : 0;
    };

    const getBalance = (node: Node | null): number => {
        return node ? getHeight(node.left) - getHeight(node.right) : 0;
    };

    const rightRotate = async (y: Node) => {
        const x = y.left!;
        const T2 = x.right;

        setMessage(`Right Rotation on ${y.value}`);
        setHighlightNode(y.id);
        await sleep(600);

        x.right = y;
        y.left = T2;

        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

        return x;
    };

    const leftRotate = async (x: Node) => {
        const y = x.right!;
        const T2 = y.left;

        setMessage(`Left Rotation on ${x.value}`);
        setHighlightNode(x.id);
        await sleep(600);

        y.left = x;
        x.right = T2;

        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;

        return y;
    };

    const insert = async (node: Node | null, value: number): Promise<Node> => {
        if (!node) {
            const newNode = new Node(value, nodeIdCounter.current++);
            setMessage(`Inserted ${value}`);
            setHighlightNode(newNode.id);
            await sleep(400);
            return newNode;
        }

        if (value < node.value) {
            node.left = await insert(node.left, value);
        } else if (value > node.value) {
            node.right = await insert(node.right, value);
        } else {
            return node; // No duplicates
        }

        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

        const balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left!.value) {
            return await rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right!.value) {
            return await leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left!.value) {
            setMessage(`Left-Right Case: Rotating Left on ${node.left!.value}`);
            node.left = await leftRotate(node.left!);
            // Force render update
            setRoot(cloneTree(rootRef.current));
            return await rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right!.value) {
            setMessage(`Right-Left Case: Rotating Right on ${node.right!.value}`);
            node.right = await rightRotate(node.right!);
            // Force render update
            setRoot(cloneTree(rootRef.current));
            return await leftRotate(node);
        }

        return node;
    };

    // Deep clone to force React re-render, suboptimal but simple for visualization
    const cloneTree = (node: Node | null): Node | null => {
        if (!node) return null;
        const newNode = new Node(node.value, node.id);
        newNode.height = node.height;
        newNode.left = cloneTree(node.left);
        newNode.right = cloneTree(node.right);
        return newNode;
    };

    const handleInsert = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val)) return;

        if (isRunning) return;
        setIsRunning(true);
        isRunningRef.current = true;
        setInputValue('');

        rootRef.current = await insert(rootRef.current, val);
        setRoot(cloneTree(rootRef.current));

        setMessage(`Tree Balanced.`);
        setHighlightNode(null);
        setIsRunning(false);
        isRunningRef.current = false;
    };

    const handleReset = () => {
        setRoot(null);
        rootRef.current = null;
        nodeIdCounter.current = 0;
        setMessage('Tree Cleared.');
    };

    // --- Visualization ---
    const renderTree = (node: Node | null, x: number, y: number, level: number, offset: number) => {
        if (!node) return null;

        // Dynamic spread based on depth
        // const spread = 200 / (level + 1); 
        const spread = 200 / Math.pow(1.5, level);

        const leftX = x - spread;
        const rightX = x + spread;
        const nextY = y + 60;

        return (
            <g key={node.id}>
                {node.left && (
                    <line x1={x} y1={y} x2={leftX} y2={nextY} stroke="#555" strokeWidth="2" />
                )}
                {node.right && (
                    <line x1={x} y1={y} x2={rightX} y2={nextY} stroke="#555" strokeWidth="2" />
                )}

                {renderTree(node.left, leftX, nextY, level + 1, -1)}
                {renderTree(node.right, rightX, nextY, level + 1, 1)}

                <circle
                    cx={x} cy={y}
                    r="20"
                    fill={highlightNode === node.id ? "#f59e0b" : "#1f2937"}
                    stroke={highlightNode === node.id ? "#fff" : "#374151"}
                    strokeWidth="2"
                    className="transition-all duration-300"
                />
                <text x={x} y={y} dy="5" textAnchor="middle" fill="white" fontWeight="bold">
                    {node.value}
                </text>
                <text x={x + 25} y={y} dy="5" textAnchor="middle" fill="#aaa" fontSize="10">
                    h:{node.height}
                </text>
            </g>
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center z-20">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white w-24 focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button
                    onClick={handleInsert}
                    disabled={isRunning}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition shadow-lg"
                >
                    Insert
                </button>
                <button
                    onClick={handleReset}
                    disabled={isRunning}
                    className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 transition shadow-lg"
                >
                    Clear
                </button>
            </div>

            <div className="relative w-full max-w-4xl h-[500px] bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden box-glow p-4 flex justify-center">
                <svg className="w-full h-full" viewBox="0 10 800 500">
                    <g transform="translate(400, 40)">
                        {renderTree(root, 0, 0, 0, 0)}
                    </g>
                </svg>
            </div>

            <p className="text-lg font-mono text-blue-400 min-h-[1.75rem] animate-pulse max-w-2xl text-center">
                {message}
            </p>
        </div>
    );
}
