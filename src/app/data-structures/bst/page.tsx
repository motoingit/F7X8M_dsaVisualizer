import BSTVisualizer from '@/components/Visualizer/BST';

export default function BSTPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Binary Search Tree</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children. The left child is smaller than the parent, and the right child is greater.
            </p>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center mb-12">
                <BSTVisualizer />
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Comparisons & Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Search (Average)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(log n)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Insert (Average)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(log n)</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Delete (Average)</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm">O(log n)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Worst Case (Skewed)</span>
                            <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-lg font-mono text-sm">O(n)</span>
                        </div>
                        <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-700">Happens when data is inserted in sorted order (becomes a linked list).</div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Properties & Tips</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm mb-6">
                        <li><strong className="text-purple-400">In-order Traversal:</strong> Visiting Left-Root-Right gives sorted data.</li>
                        <li><strong className="text-blue-400">Balancing:</strong> Standard BSTs can become unbalanced. AVL Trees or Red-Black Trees are used in production to guarantee O(log n).</li>
                        <li><strong className="text-yellow-400">Applications:</strong> Database indexing, auto-completion, hierarchical data storage.</li>
                        <li><strong className="text-red-400">Tip:</strong> Try inserting 1, 2, 3, 4 sequentially to see the worst case!</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">How it Works</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li><strong className="text-white">Rule:</strong> Left child &lt; Parent &lt; Right child.</li>
                        <li><strong className="text-green-400">Search(x):</strong> Start at root. If x &lt; root, go left. If x &gt; root, go right. Repeat.</li>
                        <li><strong className="text-blue-400">Insert(x):</strong> Search for x. If not found, insert at the empty spot (null leaf) where the search ended.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
