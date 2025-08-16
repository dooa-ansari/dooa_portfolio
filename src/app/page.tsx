"use client";
import Rain from "@/components/rain";
import Foundations from "@/components/foundations";
import useValues from "@/hooks/useValues";
import Navbar from "@/components/navbar";
import Image from "next/image";
import me from "@/assets/me.png";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading, isError } = useValues();

  if (isLoading) return <div>Loading values...</div>;
  if (isError) return <div>Failed to load values.</div>;

  return (
    <main className="relative flex flex-col flex-1 min-h-screen">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <Rain />
      </div>

      <div className="relative z-10 flex flex-row h-screen overflow-hidden">
        <Foundations valuesList={data} />
        <motion.div
          className="flex items-center justify-center h-full max-w-[50vw] flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={me}
            alt="Me"
            width={500}
            className="object-contain h-full w-auto max-w-full"
            style={{ maxHeight: "100vh" }}
          />
        </motion.div>
      </div>
    </main>
  );
}
