"use client";

import { Mail, Linkedin, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-12">
        Feel free to reach out for collaborations, opportunities, or just to
        connect. I’d love to hear from you!
      </p>

      <div className="flex gap-8">
        <Link
          href="https://www.linkedin.com/in/dooa-ansari-5a881a70/"
          target="_blank"
          className="flex flex-col items-center group"
        >
          <div className="p-4 bg-blue-600 rounded-full group-hover:scale-110 transition-transform shadow-md">
            <Linkedin className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            LinkedIn
          </span>
        </Link>

        <Link
          href="mailto:dooaansari@gmail.com"
          className="flex flex-col items-center group"
        >
          <div className="p-4 bg-red-500 rounded-full group-hover:scale-110 transition-transform shadow-md">
            <Mail className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Email
          </span>
        </Link>

        <Link
          href="https://github.com/dooa-ansari"
          target="_blank"
          className="flex flex-col items-center group"
        >
          <div className="p-4 bg-gray-800 rounded-full group-hover:scale-110 transition-transform shadow-md">
            <Github className="text-white w-8 h-8" />
          </div>
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            GitHub
          </span>
        </Link>
      </div>
    </div>
  );
}
