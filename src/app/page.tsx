import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Welcome to DSA Visualizer
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mb-10">
        Master Data Structures and Algorithms through interactive, step-by-step visualizations.
        Perfect for students and developers preparing for interviews.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard" className="px-8 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50">
          Start Learning
        </Link>
        <Link href="#features" className="px-8 py-3 border border-gray-600 rounded-lg text-gray-300 font-semibold hover:bg-gray-800 transition">
          View Features
        </Link>
      </div>

      <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500/50 transition">
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Sorting</h3>
          <p className="text-gray-400">Visualize Bubble Sort, Selection Sort, Merge Sort, and more.</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-purple-500/50 transition">
          <h3 className="text-2xl font-bold mb-2 text-purple-400">Searching</h3>
          <p className="text-gray-400">See how Linear Search and Binary Search find elements.</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-500/50 transition">
          <h3 className="text-2xl font-bold mb-2 text-green-400">Data Structures</h3>
          <p className="text-gray-400">Interactive Stacks, Queues, Linked Lists, and Trees.</p>
        </div>
      </div>
    </div>
  );
}
