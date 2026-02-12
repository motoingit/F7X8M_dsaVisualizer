import StackVisualizer from '@/components/Visualizer/Stack';

export default function StackPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Stack (LIFO)</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                A Stack is a linear data structure that follows the LIFO (Last-In, First-Out) principle. The last element added is the first one removed.
            </p>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12">
                <StackVisualizer />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Push (Insert)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Pop (Remove)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Peek (Top)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Search</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm">O(n)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Applications</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                        <li><strong className="text-purple-400">Function Calls:</strong> Managing function execution context (Call Stack).</li>
                        <li><strong className="text-blue-400">Undo/Redo:</strong> Storing history of operations in editors.</li>
                        <li><strong className="text-green-400">Parsing:</strong> Syntax parsing and expression evaluation (e.g., balanced parentheses).</li>
                        <li><strong className="text-yellow-400">Backtracking:</strong> Solving mazes or puzzles (DFS).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">How it Works</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li><strong className="text-white">LIFO Principle:</strong> Last In, First Out.</li>
                        <li><strong className="text-green-400">Push(x):</strong> Add item x to the top of the stack.</li>
                        <li><strong className="text-red-400">Pop():</strong> Remove the item from the top.</li>
                        <li><strong className="text-blue-400">Peek():</strong> View the top item without removing it.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
