'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800">
            <Link href="/" className="text-xl font-bold text-blue-500">
                DSA Visualizer
            </Link>
            <div className="flex gap-6 items-center">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                </Link>
                {session ? (
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-400">Hi, {session.user?.name}</span>
                        <button onClick={() => signOut()} className="text-red-400 hover:text-red-300 transition-colors">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
