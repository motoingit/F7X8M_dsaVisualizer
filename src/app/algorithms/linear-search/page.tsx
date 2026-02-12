import LinearSearch from '@/components/Visualizer/LinearSearch';

export default function LinearSearchPage() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-8">Linear Search Visualization</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center">
                Linear Search checks each element in the list sequentially until a match is found or the whole list has been searched.
            </p>

            <div className="w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl">
                <LinearSearch />
            </div>
        </div>
    );
}
