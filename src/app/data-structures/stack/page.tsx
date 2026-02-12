import StackVisualizer from '@/components/Visualizer/Stack';

export default function StackPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-8">Stack Visualization</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                A Stack is a LIFO (Last In, First Out) data structure. Elements are added and removed from the toggle.
            </p>

            <div className="w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl flex flex-col items-center">
                <StackVisualizer />
            </div>
        </div>
    );
}
