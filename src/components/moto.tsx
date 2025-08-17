"use client";
import { motion } from "framer-motion";

const words = ["Dooa", "Ansari,", "Helping", "Businesses", "Grow"];

export default function MotoText() {
  return (
    <h1 className="text-2xl font-bold flex flex-wrap gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.6 }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
