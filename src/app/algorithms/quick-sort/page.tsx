import QuickSort from '@/components/Visualizer/QuickSort';

export default function QuickSortPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-tighter">
                Quick Sort
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                Quick Sort is a highly efficient sorting algorithm that uses a <span className="text-white font-medium">Divide and Conquer</span> strategy. It selects a 'pivot' element and partitions the array around it.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-purple-900/20">
                <QuickSort />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Time Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Best Case</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(n log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Average Case</span>
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg font-mono text-sm border border-blue-500/30">O(n log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Worst Case</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm border border-red-500/30">O(n²)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="text-blue-400 font-mono font-bold">O(log n)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            O(n²) happens if the pivot is always the smallest/largest element (e.g., already sorted). This can be mitigated with randomized pivots.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-pink-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-red-400">Pivot:</strong> Select an element (we use the last element).</li>
                        <li><strong className="text-purple-400">Partition:</strong> Rearrange elements such that all elements less than pivot are on left, and greater are on right.</li>
                        <li><strong className="text-blue-400">Recursion:</strong> Apply the same steps to the left and right sub-arrays.</li>
                        <li><strong className="text-white">In-Place:</strong> Unlike Merge Sort, it doesn't require extra array space (besides stack).</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1:
        if arr[j] < pivot:
            i++
            swap arr[i] with arr[j]
    swap arr[i + 1] with arr[high]
    return i + 1`}
                </pre>
            </div>
        </div>
    );
}
