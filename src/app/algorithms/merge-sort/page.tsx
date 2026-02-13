import MergeSort from '@/components/Visualizer/MergeSort';

export default function MergeSortPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-tighter">
                Merge Sort
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                Merge Sort is a highly efficient, stable sorting algorithm that follows the <span className="text-white font-medium">Divide and Conquer</span> strategy. It recursively divides the array into halves, sorts them, and then merges the sorted halves.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-blue-900/20">
                <MergeSort />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-colors">
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
                            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-lg font-mono text-sm border border-purple-500/30">O(n log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="text-red-400 font-mono font-bold">O(n)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Unlike Quicksort, Merge Sort guarantees O(n log n) performance but requires O(n) auxiliary space.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-cyan-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-blue-400">Divide:</strong> Find the middle point to divide the array into two halves.</li>
                        <li><strong className="text-cyan-400">Conquer:</strong> Call merge sort for the first half and the second half recursively.</li>
                        <li><strong className="text-emerald-400">Merge:</strong> Merge the two sorted halves into a single sorted array.</li>
                        <li><strong className="text-purple-400">Base Case:</strong> If the array has only one element, it is already sorted.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-pink-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`mergeSort(arr, left, right):
    if left >= right:
        return
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)

merge(arr, left, mid, right):
    create temp arrays L[], R[]
    copy data to L[] and R[]
    i = 0, j = 0, k = left
    while i < n1 and j < n2:
        if L[i] <= R[j]: arr[k] = L[i]; i++
        else: arr[k] = R[j]; j++
        k++
    copy remaining elements of L[] and R[]`}
                </pre>
            </div>
        </div>
    );
}
