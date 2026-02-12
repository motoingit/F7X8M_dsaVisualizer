import BubbleSort from '@/components/Visualizer/BubbleSort';

export default function BubbleSortPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-8">Bubble Sort Visualization</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
            </p>

            <div className="w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl">
                <BubbleSort />
            </div>
        </div>
    );
}
