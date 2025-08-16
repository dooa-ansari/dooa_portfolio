"use client";

import React from "react";
import { motion } from "framer-motion";
import Value from "./value";
import type { Value as ValueType } from "@/types/value_t";

type ValueResponse = ValueType[] | undefined;

interface FoundationsProps {
  valuesList: ValueResponse;
}

const Foundations = ({ valuesList }: FoundationsProps) => {
  if (!valuesList) return null;

  const radius = 200;
  const center = radius;
  const count = valuesList.length;

  return (
    <div className="flex p-12 m-12">
      <div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {valuesList.map((value, index) => {
          const count = valuesList.length;
          const angle = (index / count) * 2 * Math.PI - Math.PI / count;
          const x = center + radius * Math.cos(angle) - 60;
          const y = center + radius * Math.sin(angle) - 60;

          return (
            <motion.div
              key={value.id}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
            >
              <Value title={value.title} description={value.description} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Foundations;
