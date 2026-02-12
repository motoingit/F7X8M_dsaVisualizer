export default function About() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <p className="text-gray-400 mb-8 max-w-2xl text-center text-lg leading-relaxed">
                This project is designed to help students visualize Data Structures and Algorithms with an intuitive and interactive interface.
                Built with Next.js, React, and Tailwind CSS.
            </p>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg max-w-lg w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Contact</h2>
                <p className="text-gray-300">Email: contact@example.com</p>
                <p className="text-gray-300 mt-2">Created by Mohit for PBL Project.</p>
            </div>
        </div>
    );
}
