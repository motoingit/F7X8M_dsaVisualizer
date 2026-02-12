'use client';

import Link from 'next/link';

export default function AboutDeveloper() {
    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/StartYourWay', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/StartYourWay', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
        { name: 'Email', url: 'mailto:contact@dsa-visualizer.com', icon: 'M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z' },
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
