import AVLTree from '@/components/Visualizer/AVLTree';

export default function AVLTreePage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black min-h-screen text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 uppercase tracking-tighter">
                AVL Tree
            </h1>
            <p className="text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed">
                An AVL Tree is a <span className="text-white font-medium">self-balancing Binary Search Tree</span> (BST) where the difference between heights of left and right subtrees cannot be more than one for all nodes.
            </p>

            {/* Visualizer Container */}
            <div className="w-full max-w-7xl glass-water-card p-4 md:p-8 rounded-xl flex flex-col items-center mb-16 overflow-hidden shadow-2xl shadow-blue-900/20">
                <AVLTree />
            </div>

            {/* Educational Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Complexity Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Complexity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Search</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Insert</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Delete</span>
                            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg font-mono text-sm border border-green-500/30">O(log n)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-400 font-mono">Space Complexity</span>
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg font-mono text-sm border border-blue-500/30">O(n)</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                            Guaranteed logarithmic time complexity due to strict balancing.
                        </div>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="glass-water-card rounded-xl p-8 border border-gray-800 hover:border-indigo-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">How it Works</h3>
                    <ul className="list-disc list-inside space-y-4 text-gray-300 text-sm font-light">
                        <li><strong className="text-blue-400">Balance Factor:</strong> Height(Left) - Height(Right). Must be -1, 0, or 1.</li>
                        <li><strong className="text-indigo-400">Rotations:</strong> Used to restore balance.</li>
                        <li><strong className="text-white">LL Case:</strong> Right Rotate.</li>
                        <li><strong className="text-white">RR Case:</strong> Left Rotate.</li>
                        <li><strong className="text-white">LR Case:</strong> Left Rotate child, then Right Rotate node.</li>
                        <li><strong className="text-white">RL Case:</strong> Right Rotate child, then Left Rotate node.</li>
                    </ul>
                </div>
            </div>

            {/* Pseudocode Section */}
            <div className="w-full max-w-5xl glass-water-card rounded-xl p-8 border border-gray-800 mt-8 mb-16 hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">Pseudocode</h3>
                <pre className="bg-black/50 p-6 rounded-lg text-gray-300 font-mono text-xs overflow-x-auto border border-gray-800 whitespace-pre shadow-inner">
                    {`insert(node, key):
    if node is NULL: return new Node(key)
    if key < node.key: node.left = insert(node.left, key)
    else if key > node.key: node.right = insert(node.right, key)
    else: return node

    node.height = 1 + max(height(node.left), height(node.right))
    balance = getBalance(node)

    # Left Left Case
    if balance > 1 and key < node.left.key: return rightRotate(node)
    
    # Right Right Case
    if balance < -1 and key > node.right.key: return leftRotate(node)
    
    # Left Right Case
    if balance > 1 and key > node.left.key:
        node.left = leftRotate(node.left)
        return rightRotate(node)
    
    # Right Left Case
    if balance < -1 and key < node.right.key:
        node.right = rightRotate(node.right)
        return leftRotate(node)`}
                </pre>
            </div>
        </div>
    );
}
