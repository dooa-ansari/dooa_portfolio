"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-transparent shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link href="/" className="text-lg font-bold">
          Dooa Ansari
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className={`px-3 py-1 rounded transition-colors ${
              pathname === "/" ? "bg-cyan-700 bg-opacity-60 font-bold text-cyan-100" : "hover:bg-cyan-700 hover:bg-opacity-30"
            }`}
          >
            Values
          </Link>
          <Link
            href="/skills"
            className={`px-3 py-1 rounded transition-colors ${
              pathname === "/skills" ? "bg-cyan-700 bg-opacity-60 font-bold text-cyan-100" : "hover:bg-cyan-700 hover:bg-opacity-30"
            }`}
          >
            Skills
          </Link>
          <Link
            href="/projects"
            className={`px-3 py-1 rounded transition-colors ${
              pathname === "/projects" ? "bg-cyan-700 bg-opacity-60 font-bold text-cyan-100" : "hover:bg-cyan-700 hover:bg-opacity-30"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-1 rounded transition-colors ${
              pathname === "/contact" ? "bg-cyan-700 bg-opacity-60 font-bold text-cyan-100" : "hover:bg-cyan-700 hover:bg-opacity-30"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
