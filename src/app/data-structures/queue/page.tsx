import QueueVisualizer from '@/components/Visualizer/Queue';

export default function QueuePage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Queue (FIFO)</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                A Queue is a linear data structure that follows the FIFO (First-In, First-Out) principle. The first element added is the first one removed, like a line at a store.
            </p>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12">
                <QueueVisualizer />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Enqueue (Insert)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Dequeue (Remove)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Peek (Front)</span>
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
                        <li><strong className="text-purple-400">Task Scheduling:</strong> CPU scheduling, print job spooling.</li>
                        <li><strong className="text-blue-400">Data Buffers:</strong> Streaming video/audio (buffering).</li>
                        <li><strong className="text-green-400">BFS:</strong> Breadth-First Search algorithms in graphs.</li>
                        <li><strong className="text-yellow-400">Web Servers:</strong> Handling incoming requests in order.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">How it Works</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li><strong className="text-white">FIFO Principle:</strong> First In, First Out.</li>
                        <li><strong className="text-green-400">Enqueue(x):</strong> Add item x to the back (rear) of the queue.</li>
                        <li><strong className="text-red-400">Dequeue():</strong> Remove the item from the front (head).</li>
                        <li><strong className="text-blue-400">Peek():</strong> View the front item without removing it.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
