export default function FAQ() {
    const faqs = [
        {
            question: "How do I use this website?",
            answer: "Login to your dashboard (just enter a name) and select an algorithm to visualize."
        },
        {
            question: "Is it free?",
            answer: "Yes, this is an open-source educational project."
        },
        {
            question: "Can I contribute?",
            answer: "Yes, check out the GitHub repository."
        },
        {
            question: "Why use this visualizer?",
            answer: "Visualizing algorithms helps in understanding the step-by-step process and logic."
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-12">Frequently Asked Questions</h1>

            <div className="w-full max-w-4xl space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition">
                        <h3 className="text-xl font-bold mb-2 text-blue-400">{faq.question}</h3>
                        <p className="text-gray-300">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
