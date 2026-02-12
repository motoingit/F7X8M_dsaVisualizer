import InsertionSort from '@/components/Visualizer/InsertionSort';

export default function InsertionSortPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Insertion Sort</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                Insertion Sort works like sorting playing cards in your hand. You pick a card and "insert" it into its correct position amongst the already sorted cards.
            </p>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12">
                <InsertionSort />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Time Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Best Case</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(n)</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2 pl-2 border-l-2 border-gray-700">When array is already sorted.</div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Average Case</span>
                            <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-lg font-mono text-sm">O(n²)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Worst Case</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm">O(n²)</span>
                        </div>
                        <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-700">When array is reverse sorted.</div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">How it Works & Tips</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                        <li><strong className="text-blue-400">Pick:</strong> Take an element from the unsorted part.</li>
                        <li><strong className="text-purple-400">Shift:</strong> Compare with elements in sorted part and shift them right if they are larger.</li>
                        <li><strong className="text-green-400">Insert:</strong> Place the element in the correct empty spot.</li>
                        <li><strong className="text-yellow-400">Advantage:</strong> Very efficient for small datasets (N &lt; 50) and nearly sorted data. Often used as the base case for complex sorts (Merge Sort, Shell Sort).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Pseudocode</h3>
                    <pre className="bg-black/50 p-4 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800">
                        {`mark first element as sorted
for each unsorted element X
  'extract' the element X
  for j = lastSortedIndex down to 0
    if current element j > X
      move sorted element to the right by 1
    break loop and insert X here`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
