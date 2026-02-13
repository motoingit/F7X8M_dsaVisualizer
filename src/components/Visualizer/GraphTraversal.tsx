'use client';

import { useState, useRef, useEffect } from 'react';
import { sleep } from '@/utils/delay';

type Node = { id: number; x: number; y: number };
type Edge = { source: number; target: number };

export default function GraphTraversal({ mode }: { mode: 'BFS' | 'DFS' }) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [visited, setVisited] = useState<Set<number>>(new Set());
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [queueStack, setQueueStack] = useState<number[]>([]); // Visual representation of Queue or Stack
    const [message, setMessage] = useState(`Click 'Generate Graph' to start.`);
    const [isRunning, setIsRunning] = useState(false);
    const [startNode, setStartNode] = useState<number>(0);

    const isRunningRef = useRef(false);
    const adjList = useRef<Map<number, number[]>>(new Map());

    useEffect(() => {
        generateGraph();
        return () => { isRunningRef.current = false; };
    }, []);

    const generateGraph = () => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const width = 800;
        const height = 400;
        const numNodes = 10;

        // Generate Nodes
        for (let i = 0; i < numNodes; i++) {
            newNodes.push({
                id: i,
                x: Math.random() * (width - 100) + 50,
                y: Math.random() * (height - 100) + 50,
            });
        }

        // Generate Random Edges
        const adj = new Map<number, number[]>();
        for (let i = 0; i < numNodes; i++) adj.set(i, []);

        // Ensure connectivity (spanning tree)
        for (let i = 1; i < numNodes; i++) {
            const parent = Math.floor(Math.random() * i);
            newEdges.push({ source: parent, target: i });
            adj.get(parent)?.push(i);
            adj.get(i)?.push(parent);
        }

        // Add some random extra edges
        for (let i = 0; i < 5; i++) {
            const u = Math.floor(Math.random() * numNodes);
            const v = Math.floor(Math.random() * numNodes);
            if (u !== v && !newEdges.some(e => (e.source === u && e.target === v) || (e.source === v && e.target === u))) {
                newEdges.push({ source: u, target: v });
                adj.get(u)?.push(v);
                adj.get(v)?.push(u);
            }
        }

        setNodes(newNodes);
        setEdges(newEdges);
        adjList.current = adj;

        setVisited(new Set());
        setActiveNode(null);
        setQueueStack([]);
        setMessage(`${mode}: Graph Generated. Click Start.`);
        setIsRunning(false);
        isRunningRef.current = false;
    };

    const runBFS = async () => {
        const queue = [startNode];
        const visitedSet = new Set<number>();
        visitedSet.add(startNode);

        setVisited(new Set(visitedSet));
        setQueueStack([...queue]);
        setMessage(`Starting BFS from Node ${startNode}`);

        while (queue.length > 0) {
            if (!isRunningRef.current) return;

            const curr = queue.shift()!;
            setQueueStack([...queue]); // Update visual queue
            setActiveNode(curr);
            setMessage(`Visiting Node ${curr}`);
            await sleep(800);

            const neighbors = adjList.current.get(curr) || [];
            for (const neighbor of neighbors) {
                if (!visitedSet.has(neighbor)) {
                    visitedSet.add(neighbor);
                    queue.push(neighbor);
                    setVisited(new Set(visitedSet));
                    setQueueStack([...queue]);
                    setMessage(`Node ${neighbor} added to Queue`);
                    await sleep(400);
                }
            }
        }
        setMessage("BFS Traversal Complete!");
        setActiveNode(null);
    };

    const runDFS = async () => {
        const stack = [startNode];
        const visitedSet = new Set<number>();

        setQueueStack([...stack]);
        setMessage(`Starting DFS from Node ${startNode}`);

        while (stack.length > 0) {
            if (!isRunningRef.current) return;

            const curr = stack.pop()!;
            setQueueStack([...stack]); // Update visual stack

            if (!visitedSet.has(curr)) {
                visitedSet.add(curr);
                setVisited(new Set(visitedSet));
                setActiveNode(curr);
                setMessage(`Visiting Node ${curr}`);
                await sleep(800);

                const neighbors = adjList.current.get(curr) || [];
                // Sort neighbors to ensure deterministic order if needed, or random
                for (const neighbor of neighbors) {
                    if (!visitedSet.has(neighbor)) {
                        stack.push(neighbor);
                        setQueueStack([...stack]);
                        setMessage(`Node ${neighbor} added to Stack`);
                        await sleep(400);
                    }
                }
            }
        }
        setMessage("DFS Traversal Complete!");
        setActiveNode(null);
    };

    const startTraversal = async () => {
        if (isRunning) return;
        setIsRunning(true);
        isRunningRef.current = true;
        setVisited(new Set());

        if (mode === 'BFS') await runBFS();
        else await runDFS();

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
                <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg border border-gray-700">
                    <span className="text-sm text-gray-400">Start Node:</span>
                    <input
                        type="number"
                        min="0"
                        max={nodes.length - 1}
                        value={startNode}
                        onChange={(e) => setStartNode(Number(e.target.value))}
                        disabled={isRunning}
                        className="w-16 bg-black border border-gray-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={startTraversal}
                    disabled={isRunning}
                    className={`px-6 py-2 bg-gradient-to-r text-white font-bold rounded-lg disabled:opacity-50 transition shadow-lg ${mode === 'BFS' ? 'from-green-500 to-emerald-600 hover:shadow-emerald-500/50' : 'from-purple-500 to-indigo-600 hover:shadow-purple-500/50'}`}
                >
                    {isRunning ? 'Running...' : `Start ${mode}`}
                </button>
            </div>

            <div className="relative w-full max-w-4xl h-[500px] bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden box-glow p-4">
                <svg className="w-full h-full">
                    {/* Edges */}
                    {edges.map((edge, i) => {
                        const s = nodes[edge.source];
                        const t = nodes[edge.target];
                        if (!s || !t) return null;

                        const isVisitedEdge = visited.has(edge.source) && visited.has(edge.target);
                        // Simple heuristic: if both visited, color it? Not strictly true for DFS tree but okay for visual

                        return (
                            <line
                                key={i}
                                x1={s.x} y1={s.y}
                                x2={t.x} y2={t.y}
                                stroke={isVisitedEdge ? "#4b5563" : "#374151"}
                                strokeWidth="2"
                                className="transition-all duration-500"
                            />
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => {
                        let fill = "#1f2937"; // gray-800
                        let stroke = "#374151";
                        let radius = 20;

                        if (visited.has(node.id)) {
                            fill = mode === 'BFS' ? "#059669" : "#7c3aed"; // Green or Purple
                            stroke = "#fff";
                        }

                        if (activeNode === node.id) {
                            fill = "#f59e0b"; // Amber
                            stroke = "#fff";
                            radius = 25;
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

                {/* Data Structure Visual (Queue/Stack) */}
                <div className="absolute bottom-4 right-4 bg-black/80 p-4 rounded-lg border border-gray-700 min-w-[150px]">
                    <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-2 border-b border-gray-700 pb-1">
                        {mode === 'BFS' ? 'Queue' : 'Stack'}
                    </h4>
                    <div className="flex gap-2 overflow-x-auto max-w-[200px] scrollbar-hide">
                        {queueStack.map((val, idx) => (
                            <div key={idx} className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-800 rounded border border-gray-600 text-xs font-mono">
                                {val}
                            </div>
                        ))}
                        {queueStack.length === 0 && <span className="text-gray-600 text-xs italic">Empty</span>}
                    </div>
                </div>
            </div>

            <p className={`text-lg font-mono min-h-[1.75rem] animate-pulse max-w-2xl text-center ${mode === 'BFS' ? 'text-emerald-400' : 'text-purple-400'}`}>
                {message}
            </p>
        </div>
    );
}
