import Link from 'next/link';

export default function Dashboard() {
    const algorithms = [
        { name: 'Linear Search', href: '/algorithms/linear-search', desc: 'Find an element by checking sequentially.' },
        { name: 'Bubble Sort', href: '/algorithms/bubble-sort', desc: 'Sort an array by swapping adjacent elements.' },
        { name: 'Stack', href: '/data-structures/stack', desc: 'LIFO data structure operations.' },
        { name: 'Queue', href: '/data-structures/queue', desc: 'FIFO data structure operations.' },
    ];

    return (
        <div className="p-10 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Choose a Topic to Visualize
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {algorithms.map((algo) => (
                    <Link
                        key={algo.name}
                        href={algo.href}
                        className="group block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition shadow hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{algo.name}</h2>
                        <p className="text-gray-400">{algo.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
