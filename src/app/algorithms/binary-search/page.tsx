import BinarySearch from '@/components/Visualizer/BinarySearch';

export default function BinarySearchPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-white">Binary Search</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                Binary Search is a fast search algorithm that works on sorted arrays. It repeatedly divides the search interval in half.
            </p>

            <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12 rounded-xl">
                <BinarySearch />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Time Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Best Case</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(1)</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2 pl-2 border-l-2 border-gray-700">Target matches the middle element immediately.</div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Average Case</span>
                            <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-lg font-mono text-sm">O(log n)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Worst Case</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm">O(log n)</span>
                        </div>
                        <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-700">Target not found or at the extremes.</div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">How it Works</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                        <li><strong className="text-white">Sorted Input:</strong> The array MUST be sorted.</li>
                        <li><strong className="text-white">Divide:</strong> Find the middle element.</li>
                        <li><strong className="text-white">Conquer:</strong> If target &lt; middle, search left half. If target &gt; middle, search right half.</li>
                        <li><strong className="text-white">Repeat:</strong> Continue until found or the interval is empty.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Pseudocode</h3>
                    <pre className="bg-black/50 p-4 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800">
                        {`low = 0, high = n-1
while low <= high
  mid = floor((low + high) / 2)
  if A[mid] == target return mid
  if A[mid] < target
    low = mid + 1
  else
    high = mid - 1
return -1`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
