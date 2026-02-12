'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, masterPassword }),
            });

            if (res.ok) {
                setIsLoading(false);
                router.push('/login');
            } else {
                const data = await res.json();
                setError(data.message || 'Signup failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[90vh] w-full overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-green-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

            <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-green-500/10">
                <h2 className="text-4xl font-bold text-center text-white mb-2 tracking-tight">Sign Up</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">Join the algorithm revolution</p>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-sm text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-gray-800 transition-all outline-none placeholder-gray-600"
                            placeholder="Choose a unique username"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:bg-gray-800 transition-all outline-none placeholder-gray-600"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Master Key <span className="text-gray-500 text-xs">(Optional)</span></label>
                        <input
                            type="password"
                            value={masterPassword}
                            onChange={(e) => setMasterPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-gray-800 transition-all outline-none placeholder-gray-600"
                            placeholder="Recovery key"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl text-white/90 font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400 text-sm">
                    Already verified? <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold hover:underline decoration-2 underline-offset-4 transition-all">Sign in here</Link>
                </p>
            </div>
        </div>
    );
}
