import ExponentialSearch from '@/components/Visualizer/ExponentialSearch';

export default function ExponentialSearchPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 uppercase tracking-tighter">
                Exponential Search
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                Exponential Search is particularly useful for <span className="text-white font-medium">unbounded or infinite arrays</span>. It works by finding a range where the search key may be present and then performing a binary search within that range.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-teal-900/20">
                <ExponentialSearch />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-teal-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Time Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Best Case</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(1)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Average Case</span>
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg font-mono text-sm border border-blue-500/30">O(log i)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Worst Case</span>
                            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-lg font-mono text-sm border border-purple-500/30">O(log i)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="text-green-400 font-mono font-bold">O(1)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Where 'i' is the index where the element is found. It's faster than Binary Search when the element is near the beginning.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-emerald-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-teal-400">Step 1:</strong> Check if the first element is the target.</li>
                        <li><strong className="text-emerald-400">Step 2:</strong> Find range by repeatedly doubling index <code>i</code> (1, 2, 4, 8...) until <code>arr[i] &gt; target</code>.</li>
                        <li><strong className="text-blue-400">Step 3:</strong> Perform Binary Search in the range <code>[i/2, min(i, n-1)]</code>.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`exponentialSearch(arr, n, x):
    if arr[0] == x:
        return 0
    i = 1
    while i < n and arr[i] <= x:
        i = i * 2
    
    return binarySearch(arr, i/2, min(i, n-1), x)`}
                </pre>
            </div>
        </div>
    );
}
