import GraphTraversal from '@/components/Visualizer/GraphTraversal';

export default function DFSPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase tracking-tighter">
                Depth First Search (DFS)
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a <span className="text-white font-medium">Stack</span> data structure (or recursion).
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-purple-900/20">
                <GraphTraversal mode="DFS" />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Time Complexity</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(V + E)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg font-mono text-sm border border-blue-500/30">O(V)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Where V is the number of vertices and E is the number of edges. Space is used for the recursion stack and visited array.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-indigo-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-purple-400">Stack:</strong> DFS uses a LIFO (Last In First Out) stack.</li>
                        <li><strong className="text-indigo-400">Deep Dive:</strong> It goes deep into the graph before backtracking.</li>
                        <li><strong className="text-blue-400">Backtracking:</strong> When no more unvisited neighbors exist, it backtracks to the previous node.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-violet-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`DFS(graph, startNode):
    stack = [startNode]
    visited = {startNode}
    
    while stack is not empty:
        current = stack.pop()
        print current
        
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                stack.push(neighbor)`}
                </pre>
            </div>
        </div>
    );
}
