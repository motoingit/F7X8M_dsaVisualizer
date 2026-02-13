'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
            {/* Glossy Glow Effect at Top */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 hover:to-purple-400 transition-all">
                            DSA VISUALIZER
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Master algorithms with interactive 3D visualizations. Built for students, developers, and curious minds.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider text-glow-blue">Explore</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Algorithms</Link></li>
                            <li><Link href="/data-structures/stack" className="hover:text-emerald-400 transition-colors">Data Structures</Link></li>
                            <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Network/Other Sites */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider text-glow-purple">Our Network</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">⚡ CodeMaster.io</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">🎨 UIVerse</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">🚀 DevTools</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} DSA Visualizer. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
