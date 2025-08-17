"use client";

import { useState, useEffect } from "react";
import Foundations from "@/components/foundations";
import useValues from "@/hooks/useValues";
import Image from "next/image";
import me from "@/assets/me.png";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import helloAnimation from "@/assets/welcome.json";

export default function Home() {
  const { data, isLoading, isError } = useValues();
  const [showAnimation, setShowAnimation] = useState(true);

  const options = {
    animationData: helloAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showAnimation ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="w-[400px] h-[400px]">{View}</div>
        </div>
      ) : (
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
      )}
    </>
  );
}
