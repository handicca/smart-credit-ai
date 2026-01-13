"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PredictForm from "@/components/PredictForm";
import ResultCard from "@/components/ResultCard";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function DemoPage() {
  // hold result returned from API to show in ResultCard
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        aria-labelledby="demo-form-title"
      >
        <PredictForm
          apiUrl="/api/predict"
          onResult={setResult}
          onLoadingChange={setLoading}
        />
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <ResultCard result={result} loading={loading} />
      </motion.aside>
      <Tooltip
        id="form-tooltip"
        place="top"
        className="max-w-60 sm:max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-xl"
      />
    </div>
  );
}
