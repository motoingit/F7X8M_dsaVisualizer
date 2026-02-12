import LinearSearch from '@/components/Visualizer/LinearSearch';

export default function LinearSearchPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Linear Search</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                Linear Search is the simplest searching algorithm. It checks every element in the list sequentially until a match is found or the whole list has been searched.
            </p>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12">
                <LinearSearch />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Time Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Best Case</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2 pl-2 border-l-2 border-gray-700">When target is at index 0.</div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Average Case</span>
                            <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-lg font-mono text-sm">O(n)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Worst Case</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm">O(n)</span>
                        </div>
                        <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-700">When target is at end or not present.</div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Advantages & Disadvantages</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                        <li><strong className="text-green-400">Simple:</strong> Very easy to implement.</li>
                        <li><strong className="text-blue-400">Flexibility:</strong> Works on unsorted arrays and linked lists.</li>
                        <li><strong className="text-red-400">Inefficient:</strong> Very slow for large datasets compared to Binary Search (O(log n)).</li>
                        <li><strong className="text-yellow-400">Usage:</strong> Use when N i small or data is unsorted.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Pseudocode</h3>
                    <pre className="bg-black/50 p-4 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800">
                        {`for each item in the list
  if item == target
    return its index
return -1`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
