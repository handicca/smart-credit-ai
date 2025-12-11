"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PredictForm from "@/components/PredictForm";
import ResultCard from "@/components/ResultCard";


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
        {/* <h1 id="demo-form-title" className="text-2xl font-bold">
          Credit Eligibility Demo
        </h1>
        <p className="mt-2 text-slate-600">
          Fill the form to get a risk score, decision and an explanation of top
          contributing factors.
        </p> */}

        {/* <div className="mt-6"> */}
          <PredictForm apiUrl="/api/predict" onResult={setResult} onLoadingChange={setLoading} />
        {/* </div> */}
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <ResultCard result={result} loading={loading} />
      </motion.aside>
    </div>
  );
}