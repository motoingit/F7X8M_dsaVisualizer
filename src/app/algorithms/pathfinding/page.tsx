import PathfindingVisualizer from '@/components/Visualizer/Pathfinding';

export default function PathfindingPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-white uppercase tracking-tighter">Pathfinding (Dijkstra)</h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light">
                Dijkstra's Algorithm guarantees the shortest path between nodes in a graph. It radiates out from the starting point until it finds the target.
            </p>

            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden">
                <PathfindingVisualizer />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="glass-water-card rounded-xl p-8 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Usage</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-400 font-mono text-sm">
                        <li><strong className="text-white">Draw Walls:</strong> Click and drag on the grid to create obstacles.</li>
                        <li><strong className="text-white">Generate Maze:</strong> Use the button to create a random layout.</li>
                        <li><strong className="text-white">Visualize:</strong> Click 'Visualize Dijkstra' to see the search wavefront.</li>
                        <li><strong className="text-white">Result:</strong> The algorithm will animate visited nodes (blue) and then the shortest path (yellow).</li>
                    </ul>
                </div>

                <div className="glass-water-card rounded-xl p-8 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Time (Matrix)</span>
                            <span className="text-green-400 font-mono font-bold">O(V²)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Time (Heap)</span>
                            <span className="text-yellow-400 font-mono font-bold">O(E + V log V)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space</span>
                            <span className="text-blue-400 font-mono font-bold">O(V)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed">
                            V is the number of vertices (nodes), E is the number of edges. Dijkstra is widely used in network routing protocols and mapping services.
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre">
                    {`function Dijkstra(Graph, source):
  create vertex set Q
  for each vertex v in Graph:
    dist[v] = INFINITY
    prev[v] = UNDEFINED
    add v to Q
  dist[source] = 0
  
  while Q is not empty:
    u = vertex in Q with min dist[u]
    remove u from Q
    
    for each neighbor v of u:
      alt = dist[u] + length(u, v) // length(u, v) is 1 for grid
      if alt < dist[v]:
        dist[v] = alt
        prev[v] = u
  return dist[], prev[]`}
                </pre>
            </div>
        </div>
    );
}
