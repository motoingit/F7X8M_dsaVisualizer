'use client';

import { useState, useEffect } from 'react';
import { dijkstra, Node, getNodesInShortestPathOrder } from '@/lib/pathfinding/dijkstra';
import { sleep } from '@/utils/delay';

export default function PathfindingVisualizer() {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [running, setRunning] = useState(false);

    // Constants for standard layout
    const ROW_COUNT = 20;
    const COL_COUNT = 40;
    const START_NODE_ROW = 10;
    const START_NODE_COL = 5;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    useEffect(() => {
        resetGrid();
    }, []);

    const createNode = (row: number, col: number) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    };

    const getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < ROW_COUNT; row++) {
            const currentRow = [];
            for (let col = 0; col < COL_COUNT; col++) {
                currentRow.push(createNode(row, col));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    const resetGrid = () => {
        setGrid(getInitialGrid());
        setRunning(false);
    };

    // Toggles wall state for a node
    const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        // Don't overwrite start/end
        if (node.isStart || node.isFinish) return grid;

        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    const visualizeDijkstra = async () => {
        if (running) return;
        setRunning(true);

        // We need to operate on a fresh copy OR current grid state?
        // Dijkstra mutates properties. Let's restart.
        // Actually, to visualize, we just need to reset distances if we want to run again.
        // For simplicity, let's assume one run per reset

        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode); // This mutates grid!

        // Animate Visited
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                await sleep(10);
                await animatePath(finishNode);
                setRunning(false); // Done
                return;
            }

            const node = visitedNodesInOrder[i];
            if (node.isStart || node.isFinish) continue;

            // Animate simply by changing class via ref or state. 
            // State update for every node is slow.
            // Let's use direct DOM manipulation for performance or optimized state.
            // Given React, state is safer but slower. 
            // For 800 nodes, 10ms delay * 800 = 8s. That's fine.

            // Wait! We can't easily animate with state updates inside loop without valid re-renders.
            // React batching might block this.
            // Better: Use CSS animation classes applied via state OR imperative ID selection.
            document.getElementById(`node-${node.row}-${node.col}`)?.classList.add('node-visited');
            await sleep(10);
        }
        setRunning(false);
    };

    const animatePath = async (finishNode: Node) => {
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const node = nodesInShortestPathOrder[i];
            if (node.isStart || node.isFinish) continue;
            document.getElementById(`node-${node.row}-${node.col}`)?.classList.add('node-shortest-path');
            await sleep(30);
        }
    };

    // --- Handlers ---

    const handleMouseDown = (row: number, col: number) => {
        if (running) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    // If mouse enters a cell while pressed
    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed || running) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const generateRandomMaze = () => {
        if (running) return;
        const newGrid = getInitialGrid();
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let col = 0; col < COL_COUNT; col++) {
                const node = newGrid[row][col];
                if (node.isStart || node.isFinish) continue;
                if (Math.random() < 0.3) {
                    node.isWall = true;
                }
            }
        }
        setGrid(newGrid);
        // Clear all animations
        clearVisuals();
    };

    const clearVisuals = () => {
        // Hard reset DOM classes
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let col = 0; col < COL_COUNT; col++) {
                const el = document.getElementById(`node-${row}-${col}`);
                if (el) {
                    el.classList.remove('node-visited', 'node-shortest-path');
                }
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full select-none" onMouseUp={handleMouseUp}>
            <div className="flex gap-4 flex-wrap justify-center">
                <button
                    onClick={() => { resetGrid(); clearVisuals(); }}
                    disabled={running}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white rounded transition disabled:opacity-50"
                >
                    Reset Grid
                </button>
                <button
                    onClick={generateRandomMaze}
                    disabled={running}
                    className="px-4 py-2 bg-blue-900 border border-blue-700 hover:bg-blue-800 text-blue-100 rounded transition disabled:opacity-50"
                >
                    Generate Maze (Random)
                </button>
                <button
                    onClick={visualizeDijkstra}
                    disabled={running}
                    className="px-4 py-2 bg-green-900 border border-green-700 hover:bg-green-800 text-green-100 rounded transition disabled:opacity-50 font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                    Visualize Dijkstra
                </button>
            </div>

            <div className="grid gap-[1px] bg-gray-900 border border-gray-800 p-1">
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex">
                        {row.map((node, nodeIdx) => {
                            const { isStart, isFinish, isWall } = node;
                            const extraClass = isFinish
                                ? 'bg-red-500'
                                : isStart
                                    ? 'bg-green-500'
                                    : isWall
                                        ? 'bg-white'
                                        : 'bg-black'; // Default unvisited

                            return (
                                <div
                                    id={`node-${node.row}-${node.col}`}
                                    key={nodeIdx}
                                    className={`w-4 h-4 md:w-6 md:h-6 border border-gray-800/30 ${extraClass} transition-colors duration-200 cursor-pointer hover:opacity-80`}
                                    onMouseDown={() => handleMouseDown(node.row, node.col)}
                                    onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend & Styles */}
            <style jsx global>{`
        .node-visited {
          animation-name: visitedAnimation;
          animation-duration: 1.5s;
          animation-timing-function: ease-out;
          animation-delay: 0;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;
        }

        @keyframes visitedAnimation {
          0% {
            transform: scale(0.3);
            background-color: rgba(0, 0, 66, 0.75);
            border-radius: 100%;
          }
          50% {
            background-color: rgba(17, 104, 217, 0.75);
          }
          100% {
            transform: scale(1);
            background-color: rgba(0, 190, 218, 0.75);
          }
        }

        .node-shortest-path {
          animation-name: shortestPathAnimation;
          animation-duration: 1.5s;
          animation-timing-function: ease-out;
          animation-delay: 0;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;
        }

        @keyframes shortestPathAnimation {
          0% {
            transform: scale(0.6);
            background-color: rgb(255, 254, 106);
          }
          100% {
            transform: scale(1);
            background-color: rgb(255, 254, 106);
          }
        }
      `}</style>

            <div className="flex gap-4 text-xs md:text-sm text-gray-400 mt-4 flex-wrap justify-center">
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500"></div> Start</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"></div> End</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white"></div> Wall</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-black border border-gray-800"></div> Unvisited</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#00beda]"></div> Visited</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#fffe6a]"></div> Shortest Path</div>
            </div>
        </div>
    );
}
