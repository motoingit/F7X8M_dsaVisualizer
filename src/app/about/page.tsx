'use client';

import Link from 'next/link';

export default function AboutDeveloper() {
    const socialLinks = [
        { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
        { name: 'Instagram', url: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
        { name: 'YouTube', url: 'https://youtube.com', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
        { name: 'Twitter', url: 'https://twitter.com', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
        { name: 'Facebook', url: 'https://facebook.com', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
        { name: 'Discord', url: 'https://discord.com', icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' },
        { name: 'GitHub', url: 'https://github.com/StartYourWay', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/StartYourWay', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
        { name: 'Email', url: 'mailto:contact@dsa-visualizer.com', icon: 'M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z' },
        { name: 'Contact', url: 'tel:+911234567890', icon: 'M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.37 2.33.57 3.58.57 1.23 0 1.91 1.01 1.91 1.91V21a2 2 0 01-2 2C7.61 23 2 17.39 2 6.45A2 2 0 014 4.49h3.64c.9 0 1.91.68 1.91 1.91 0 1.25.2 2.46.57 3.57.11.35.03.74-.25 1.02l-2.2 2.21z' }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8 font-light flex items-center justify-center relative overflow-hidden">

            {/* Interactive Background Elements */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <div className="max-w-4xl w-full glass-water-card rounded-3xl p-12 md:p-16 border border-gray-800 shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.01]">
                <h1 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-widest text-center md:text-left bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Developer Profile
                </h1>

                <div className="flex flex-col md:flex-row gap-16 items-center">

                    {/* Photo / Avatar Section */}
                    <div className="relative group perspective-1000">
                        <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-900 rounded-2xl flex items-center justify-center text-4xl font-black text-white border border-gray-700 shadow-2xl transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 overflow-hidden relative">
                            {/* Placeholder for Photo - User can replace src later */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black z-0"></div>
                            <span className="relative z-10 text-7xl text-gray-700 group-hover:text-white transition-colors duration-300">DV</span>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10"></div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-wider mb-2 text-white">Mohit Singh</h2>
                            <p className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-6">Full Stack Engineer & UI Enthusiast</p>
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                Passionate about simplifying complex computer science concepts through <span className="text-white font-medium">minimalist design</span> and <span className="text-white font-medium">interactive visualization</span>.
                                Building tools that bridge the gap between abstract logic and visual understanding.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB'].map((skill, i) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 border border-gray-800 rounded-full text-xs text-gray-400 font-mono hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 justify-center md:justify-start pt-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    className="group p-4 bg-gray-900 rounded-xl hover:bg-white hover:text-black transition-all duration-300 border border-gray-800 hover:border-white shadow-lg relative overflow-hidden"
                                >
                                    <svg className="w-6 h-6 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d={link.icon} />
                                    </svg>
                                    <span className="sr-only">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
