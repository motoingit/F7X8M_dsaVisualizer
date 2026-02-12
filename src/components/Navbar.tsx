'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-black border-b border-gray-900 border-opacity-50">

            <Link href="/" className="text-2xl font-bold text-white tracking-widest uppercase hover:text-gray-300 transition-colors">
                DSA<span className="font-light text-gray-500">Viz</span>
            </Link>

            <div className="flex gap-8 items-center text-sm font-medium uppercase tracking-wider">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                </Link>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                    Algorithms
                </Link>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                </Link>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                </Link>

                {session ? (
                    <div className="flex gap-6 items-center border-l border-gray-800 pl-6">
                        <span className="text-gray-500">
                            {session.user?.name}
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="text-white hover:text-gray-300 bg-gray-900 px-4 py-2 rounded-none border border-gray-800 hover:border-gray-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="px-6 py-2 bg-white text-black font-bold hover:bg-gray-200 transition-colors border border-transparent"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
