'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { sleep } from '@/utils/delay';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (res?.error) {
                setError('Invalid credentials');
                setLoading(false);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong');
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        // Set a cookie (this is client side, better to use server action or api but cookie works for simple gate)
        setLoading(true);
        document.cookie = "guest-mode=true; path=/; max-age=86400"; // 1 day
        await sleep(500); // Faux loading
        router.push('/dashboard');
        router.refresh(); // Refresh to update middleware state
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="glass-water-card w-full max-w-md p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">

                {/* Animated Background Blob */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

                <h1 className="text-3xl font-black text-center mb-8 uppercase tracking-widest relative z-10 animate-fade-in">
                    Sign In
                </h1>

                <form onSubmit={handleCredentialsLogin} className="space-y-6 relative z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <label className="block text-sm font-mono text-gray-400 mb-2 uppercase">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors font-mono"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-mono text-gray-400 mb-2 uppercase">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors font-mono"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-mono text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Access Account'}
                    </button>
                </form>

                <div className="relative z-10 mt-6 flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="h-px bg-gray-800 flex-1"></div>
                    <span className="px-4 text-gray-500 text-xs font-mono uppercase">OR</span>
                    <div className="h-px bg-gray-800 flex-1"></div>
                </div>

                <button
                    onClick={handleGuestLogin}
                    disabled={loading}
                    className="w-full mt-6 py-3 bg-transparent border border-gray-700 text-gray-300 font-mono text-sm uppercase tracking-wider rounded-lg hover:bg-gray-900 hover:border-gray-500 transition-colors relative z-10 animate-fade-in"
                    style={{ animationDelay: '0.3s' }}
                >
                    Continue as Guest →
                </button>

                <div className="mt-8 text-center relative z-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p className="text-sm text-gray-500 font-mono">
                        New here?{' '}
                        <Link href="/signup" className="text-white hover:underline transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
