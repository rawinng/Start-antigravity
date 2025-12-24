import RegexTester from "@/components/RegexTester";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/icon.png"
              alt="Regex Learning Tool"
              width={56}
              height={56}
              className="rounded-xl shadow-lg"
            />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Regex Learning Tool
            </h1>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Enter a regular expression pattern and sample text to visualize
            matches instantly. Highlights update in real-time as you type.
          </p>
        </div>

        {/* Regex Tester Component */}
        <RegexTester />

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>
            Built with{" "}
            <a
              href="https://nextjs.org"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            &{" "}
            <a
              href="https://tailwindcss.com"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
