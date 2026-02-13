import Link from 'next/link';

export default function Dashboard() {
    const categories = [
        {
            title: "Sorting",
            items: [
                { name: 'Bubble Sort', href: '/algorithms/bubble-sort', desc: 'Comparison based sort', complexity: 'O(n²)' },
                { name: 'Selection Sort', href: '/algorithms/selection-sort', desc: 'Find minimum and swap', complexity: 'O(n²)' },
                { name: 'Insertion Sort', href: '/algorithms/insertion-sort', desc: 'Build sorted array', complexity: 'O(n²)' },
                { name: 'Merge Sort', href: '/algorithms/merge-sort', desc: 'Divide and Conquer', complexity: 'O(n log n)' },
                { name: 'Quick Sort', href: '/algorithms/quick-sort', desc: 'Partition based sort', complexity: 'O(n log n)' },
                { name: 'Heap Sort', href: '/algorithms/heap-sort', desc: 'Binary Heap based', complexity: 'O(n log n)' },
            ]
        },
        {
            title: "Searching",
            items: [
                { name: 'Linear Search', href: '/algorithms/linear-search', desc: 'Sequential check', complexity: 'O(n)' },
                { name: 'Binary Search', href: '/algorithms/binary-search', desc: 'Divide and conquer', complexity: 'O(log n)' },
                { name: 'Exponential Search', href: '/algorithms/exponential-search', desc: 'Unbounded Search', complexity: 'O(log i)' },
                { name: 'Pathfinding', href: '/algorithms/pathfinding', desc: 'Dijkstra in a grid', complexity: 'O(E+VlogV)' },
            ]
        },
        {
            title: "Graphs",
            items: [
                { name: 'BFS Traversal', href: '/algorithms/bfs', desc: 'Breadth First Search', complexity: 'O(V+E)' },
                { name: 'DFS Traversal', href: '/algorithms/dfs', desc: 'Depth First Search', complexity: 'O(V+E)' },
                { name: 'Hamiltonian Cycle', href: '/algorithms/hamiltonian', desc: 'Visit every node once', complexity: 'O(N!)' },
            ]
        },
        {
            title: "Data Structures",
            items: [
                { name: 'Stack', href: '/data-structures/stack', desc: 'LIFO Structure', complexity: 'O(1)' },
                { name: 'Queue', href: '/data-structures/queue', desc: 'FIFO Structure', complexity: 'O(1)' },
                { name: 'Binary Search Tree', href: '/data-structures/bst', desc: 'Hierarchical node tree', complexity: 'O(log n)' },
                { name: 'AVL Tree', href: '/data-structures/avl-tree', desc: 'Self-Balancing BST', complexity: 'O(log n)' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black p-8 md:p-24 selection:bg-white selection:text-black font-sans relative">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-24 tracking-tighter uppercase border-b border-gray-900 pb-12 animate-fade-in">
                Algorithm Dashboard
            </h1>

            <div className="space-y-32">
                {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-12 animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                        <div className="flex items-baseline justify-between border-b border-gray-800 pb-4">
                            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">
                                {cat.title}
                            </h2>
                            <span className="text-xs font-mono text-gray-700">Category {String(idx + 1).padStart(2, '0')}</span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {cat.items.map((algo) => (
                                <div key={algo.name} className="relative group perspective-1000">
                                    {/* Glow Effect Behind */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-gray-800 to-gray-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500 -z-10"></div>

                                    <Link
                                        href={algo.href}
                                        className="block h-full bg-black border border-gray-900 p-8 rounded-2xl transform transition-all duration-500 ease-out group-hover:rotate-2 group-hover:scale-105 group-hover:border-gray-600 shadow-2xl relative overflow-hidden"
                                    >
                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none z-20"></div>

                                        {/* Background Detail */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/10 rounded-full blur-2xl -translate-y-16 translate-x-16 pointer-events-none group-hover:bg-gray-700/20 transition-colors duration-500"></div>

                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <h3 className="text-2xl font-black text-white group-hover:text-white uppercase tracking-wide transition-colors duration-300">
                                                {algo.name}
                                            </h3>
                                            <span className="font-mono text-xs text-gray-500 border border-gray-800 px-3 py-1 rounded-full bg-black group-hover:border-white/40 group-hover:text-white transition-all duration-300">
                                                {algo.complexity}
                                            </span>
                                        </div>

                                        <p className="font-mono text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed uppercase mb-8 transition-colors duration-300 relative z-10">
                                            {algo.desc}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 group-hover:text-white transition-colors duration-300 uppercase tracking-widest relative z-10">
                                            <span>Explore Logic</span>
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
