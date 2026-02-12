export default function FAQ() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-24 selection:bg-white selection:text-black">
            <h1 className="text-4xl md:text-6xl font-black mb-24 tracking-tighter uppercase border-b border-gray-900 pb-12">
                Frequently Asked Questions
            </h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
                <div className="bg-black border-l-2 border-gray-800 hover:border-white pl-8 py-4 transition-all duration-300">
                    <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-200">
                        What is this platform?
                    </h2>
                    <p className="font-mono text-sm text-gray-500 leading-relaxed">
                        A minimalist, interactive tool designed to visualize complex algorithms and data structures. It aims to simplify computer science concepts through pure visual logic.
                    </p>
                </div>

                <div className="bg-black border-l-2 border-gray-800 hover:border-white pl-8 py-4 transition-all duration-300">
                    <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-200">
                        Is it free to use?
                    </h2>
                    <p className="font-mono text-sm text-gray-500 leading-relaxed">
                        Yes, completely open-source and free. We believe educational tools should be accessible to everyone.
                    </p>
                </div>

                <div className="bg-black border-l-2 border-gray-800 hover:border-white pl-8 py-4 transition-all duration-300">
                    <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-200">
                        Can I contribute?
                    </h2>
                    <p className="font-mono text-sm text-gray-500 leading-relaxed">
                        Absolutely. Check out our GitHub repository linked in the developer section. Contributions to new algorithms are welcome.
                    </p>
                </div>

                <div className="bg-black border-l-2 border-gray-800 hover:border-white pl-8 py-4 transition-all duration-300">
                    <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-200">
                        Why monochrome?
                    </h2>
                    <p className="font-mono text-sm text-gray-500 leading-relaxed">
                        We removed distracting colors from the UI to focus attention solely on the algorithmic visualizations, where color has specific logical meaning.
                    </p>
                </div>
            </div>
        </div>
    );
}
