import HeapSort from '@/components/Visualizer/HeapSort';

export default function HeapSortPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 uppercase tracking-tighter">
                Heap Sort
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                Heap Sort is a comparison-based sorting technique based on the <span className="text-white font-medium">Binary Heap</span> data structure. It's similar to selection sort where we first find the maximum element and place the maximum element at the end.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-orange-900/20">
                <HeapSort />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-orange-500/30 transition-colors">
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
                            <span className="text-green-400 font-mono font-bold">O(1)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Heap Sort is excellent for systems with limited memory as it requires constant auxiliary space.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-amber-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-amber-400">Build Max Heap:</strong> Convert the array into a Max Heap where parent &gt; children. Time: O(n).</li>
                        <li><strong className="text-orange-400">Extract Max:</strong> Swap the root (max element) with the last element of the heap. Time: O(1).</li>
                        <li><strong className="text-red-400">Heapify:</strong> Reduce heap size by 1 and heapify the root to maintain Max Heap property. Time: O(log n).</li>
                        <li><strong className="text-white">Repeat:</strong> Continue until the heap size is 1. The array is now sorted.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-yellow-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`heapSort(arr):
    n = length(arr)
    # Build Max Heap
    for i = n/2 - 1 down to 0:
        heapify(arr, n, i)
    
    # Extract elements
    for i = n - 1 down to 0:
        swap arr[0] with arr[i]
        heapify(arr, i, 0)

heapify(arr, n, i):
    largest = i
    l = 2*i + 1
    r = 2*i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        swap arr[i] with arr[largest]
        heapify(arr, n, largest)`}
                </pre>
            </div>
        </div>
    );
}
