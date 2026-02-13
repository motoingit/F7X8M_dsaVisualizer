import HamiltonianCycle from '@/components/Visualizer/HamiltonianCycle';

export default function HamiltonianCyclePage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 uppercase tracking-tighter">
                Hamiltonian Cycle
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                A Hamiltonian Cycle (or Circuit) is a path in a graph that visits every vertex exactly once and returns to the starting vertex. It is an <span className="text-white font-medium">NP-Complete</span> problem.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-rose-900/20">
                <HamiltonianCycle />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-rose-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Time Complexity</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm border border-red-500/30">O(N!)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg font-mono text-sm border border-blue-500/30">O(N)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Finding a Hamiltonian Cycle is computationally expensive (factorial time) due to the vast number of possible permutations to check.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-red-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-rose-400">Backtracking:</strong> We try to add vertices to the path recursively.</li>
                        <li><strong className="text-red-400">Constraints:</strong> We can only add a vertex if it is adjacent to the previous vertex and hasn't been visited yet.</li>
                        <li><strong className="text-white">Completion:</strong> If all vertices are visited and there is an edge back to start, we found a cycle.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-pink-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`hamiltonian(graph, path, pos):
    if pos == V:
        if graph[path[pos-1]][path[0]] == 1:
            return true
        else:
            return false

    for v = 1 to V-1:
        if isSafe(v, graph, path, pos):
            path[pos] = v
            if hamiltonian(graph, path, pos + 1):
                return true
            path[pos] = -1 // Backtrack
            
    return false`}
                </pre>
            </div>
        </div>
    );
}
