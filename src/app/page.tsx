import Link from 'next/link';
import HomeSearch from '@/components/HomeSearch';

export default function Home() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-8 bg-black text-white selection:bg-white selection:text-black relative">

      {/* Search Bar - Top Right Absolute Position */}
      <div className="absolute top-8 right-8 z-30 w-full max-w-sm hidden md:block">
        <HomeSearch needsCompact={true} />
      </div>
      {/* Search Bar - Visible on Mobile (Standard Flow) */}
      <div className="w-full max-w-sm md:hidden mb-12">
        <HomeSearch needsCompact={true} />
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl w-full flex flex-col items-center animate-fade-in text-center mt-12 mb-32">
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase whitespace-pre-wrap leading-[0.85]">
          Algorithm<br />
          <span className="text-gray-800">Visualizer</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl font-light tracking-wide">
          A minimalist interface for complex systems.<br />
          Watch data structures evolve in real-time.
        </p>

        <div className="flex gap-6 z-10">
          <Link
            href="/dashboard"
            className="px-10 py-4 bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-colors border border-white"
          >
            Start Learning
          </Link>
          <Link
            href="#how-it-works"
            className="px-10 py-4 bg-transparent text-gray-400 font-medium text-lg uppercase tracking-widest border border-gray-800 hover:border-gray-500 hover:text-white transition-colors"
          >
            Manual
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="w-full max-w-7xl px-4 flex flex-col items-center border-t border-gray-900 py-24">
        <h2 className="text-4xl font-black mb-24 text-center uppercase tracking-widest text-gray-800">
          Process Flow
        </h2>

        <div className="grid md:grid-cols-3 gap-12 w-full">
          <div className="p-8 border border-gray-900 bg-black hover:border-gray-700 transition duration-300">
            <div className="text-6xl font-black text-gray-900 mb-6">01</div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Select</h3>
            <p className="text-gray-500 font-mono text-sm leading-relaxed">
              Choose an algorithm from the minimalist dashboard. Focus on the logic without distractions.
            </p>
          </div>
          <div className="p-8 border border-gray-900 bg-black hover:border-gray-700 transition duration-300">
            <div className="text-6xl font-black text-gray-700 mb-6">02</div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Visualize</h3>
            <p className="text-gray-500 font-mono text-sm leading-relaxed">
              Watch the step-by-step execution. Colors are used strictly for logical differentiation.
            </p>
          </div>
          <div className="p-8 border border-gray-900 bg-black hover:border-gray-700 transition duration-300">
            <div className="text-6xl font-black text-white mb-6">03</div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Analyze</h3>
            <p className="text-gray-500 font-mono text-sm leading-relaxed">
              Understand Time Complexity breakdowns for Best, Average, and Worst cases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
