'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

type Node = { id: number; x: number; y: number };
type Edge = { source: number; target: number };

export default function HamiltonianCycle() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [path, setPath] = useState<number[]>([]);
    const [message, setMessage] = useState(`Click 'Generate Graph' to start.`);
    const [isRunning, setIsRunning] = useState(false);

    const isRunningRef = useRef(false);
    const adjList = useRef<Map<number, number[]>>(new Map());
    const pathRef = useRef<number[]>([]);

    useEffect(() => {
        generateGraph();
        return () => { isRunningRef.current = false; };
    }, []);

    const generateGraph = () => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const width = 800;
        const height = 400;
        const numNodes = 6; // Keep small for visualization as it's NP-Complete

        // Generate Nodes in a circle for better visualization of cycle
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 150;

        for (let i = 0; i < numNodes; i++) {
            const angle = (i * 2 * Math.PI) / numNodes;
            newNodes.push({
                id: i,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            });
        }

        const adj = new Map<number, number[]>();
        for (let i = 0; i < numNodes; i++) adj.set(i, []);

        // Create a guaranteed cycle 0-1-2-3-4-5-0
        for (let i = 0; i < numNodes; i++) {
            const u = i;
            const v = (i + 1) % numNodes;
            newEdges.push({ source: u, target: v });
            adj.get(u)?.push(v);
            adj.get(v)?.push(u);
        }

        // Add some random edges to make it interesting (chords)
        for (let i = 0; i < 3; i++) {
            const u = Math.floor(Math.random() * numNodes);
            const v = Math.floor(Math.random() * numNodes);
            if (u !== v && Math.abs(u - v) > 1 && !((u === 0 && v === numNodes - 1) || (u === numNodes - 1 && v === 0))) {
                // Check if edge exists
                if (!newEdges.some(e => (e.source === u && e.target === v) || (e.source === v && e.target === u))) {
                    newEdges.push({ source: u, target: v });
                    adj.get(u)?.push(v);
                    adj.get(v)?.push(u);
                }
            }
        }

        setNodes(newNodes);
        setEdges(newEdges);
        adjList.current = adj;

        setPath([]);
        pathRef.current = [];
        setMessage(`Graph Generated. Click Start Finding.`);
        setIsRunning(false);
        isRunningRef.current = false;
    };

    const hamiltonianUtil = async (pos: number) => {
        if (!isRunningRef.current) return false;

        // Base case: If all vertices are included in path
        if (pathRef.current.length === nodes.length) {
            // And if there is an edge from the last included vertex to the first vertex
            const last = pathRef.current[pathRef.current.length - 1];
            const first = pathRef.current[0];
            const neighbors = adjList.current.get(last) || [];

            if (neighbors.includes(first)) {
                // Complete the cycle visually
                pathRef.current.push(first);
                setPath([...pathRef.current]);
                return true;
            } else {
                return false;
            }
        }

        const curr = pathRef.current[pos - 1];
        const neighbors = adjList.current.get(curr) || [];

        for (const v of neighbors) {
            if (!isRunningRef.current) return false;

            // Check if vertex v is already in path
            if (!pathRef.current.includes(v)) {
                pathRef.current.push(v);
                setPath([...pathRef.current]);
                setMessage(`Trying path: ${pathRef.current.join(' -> ')}`);
                await sleep(500);

                if (await hamiltonianUtil(pos + 1)) return true;

                // Backtrack
                pathRef.current.pop();
                setPath([...pathRef.current]);
                setMessage(`Backtracking...`);
                await sleep(300);
            }
        }

        return false;
    };

    const findCycle = async () => {
        if (isRunning) return;
        setIsRunning(true);
        isRunningRef.current = true;

        // Start from node 0
        pathRef.current = [0];
        setPath([0]);
        setMessage(`Starting from Node 0`);
        await sleep(500);

        const found = await hamiltonianUtil(1);

        if (isRunningRef.current) {
            if (found) {
                setMessage("Hamiltonian Cycle Found!");
            } else {
                setMessage("No Hamiltonian Cycle exists in this graph.");
            }
        }
        setIsRunning(false);
        isRunningRef.current = false;
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            <div className="flex gap-4 items-center flex-wrap justify-center z-20">
                <button
                    onClick={generateGraph}
                    disabled={isRunning}
                    className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 transition shadow-lg"
                >
                    New Graph
                </button>
                <button
                    onClick={findCycle}
                    disabled={isRunning}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-lg hover:from-red-500 hover:to-rose-500 disabled:opacity-50 transition shadow-lg hover:shadow-rose-500/50"
                >
                    {isRunning ? 'Searching...' : 'Find Cycle'}
                </button>
            </div>

            <div className="relative w-full max-w-4xl h-[400px] bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden box-glow p-4 flex justify-center items-center">
                <svg className="w-full h-full">
                    {/* Edges */}
                    {edges.map((edge, i) => {
                        const s = nodes[edge.source];
                        const t = nodes[edge.target];
                        const sIdx = path.indexOf(edge.source);
                        const tIdx = path.indexOf(edge.target);

                        // Check if this edge is part of the current path
                        let stroke = "#374151";
                        let width = "2";

                        // If both nodes are in path and they are adjacent in path
                        if (sIdx !== -1 && tIdx !== -1) {
                            if (Math.abs(sIdx - tIdx) === 1) {
                                stroke = "#f43f5e"; // Rose 500
                                width = "4";
                            }
                        }

                        return (
                            <line
                                key={i}
                                x1={s.x} y1={s.y}
                                x2={t.x} y2={t.y}
                                stroke={stroke}
                                strokeWidth={width}
                                className="transition-all duration-300"
                            />
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => {
                        let fill = "#1f2937";
                        let stroke = "#374151";
                        let radius = 20;

                        if (path.includes(node.id)) {
                            fill = "#e11d48"; // Rose 600
                            stroke = "#fff";

                            // If it's the current head of path
                            if (path[path.length - 1] === node.id) {
                                fill = "#fb7185"; // Rose 400
                                radius = 25;
                            }
                        }

                        return (
                            <g key={node.id} className="transition-all duration-300">
                                <circle
                                    cx={node.x} cy={node.y}
                                    r={radius}
                                    fill={fill}
                                    stroke={stroke}
                                    strokeWidth="3"
                                    className="transition-all duration-300 shadow-lg"
                                />
                                <text
                                    x={node.x} y={node.y}
                                    dy="5" textAnchor="middle"
                                    fill="white" fontWeight="bold" fontSize="14"
                                    className="pointer-events-none"
                                >
                                    {node.id}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <p className="text-lg font-mono text-rose-400 min-h-[1.75rem] animate-pulse max-w-2xl text-center">
                {message}
            </p>
        </div>
    );
}
