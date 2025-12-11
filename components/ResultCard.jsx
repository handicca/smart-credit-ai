"use client";

import { motion } from "framer-motion";
import FeatureChart from "./FeatureChart";
import RiskGaugePro from "./RiskGaugePro";

export default function ResultCard({ result }) {
  // if no result, show a neutral placeholder
  if (!result) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h3 className="font-semibold">Result preview</h3>
        <div className="mt-3 text-sm text-slate-600">
          No prediction yet. Fill the form to get a result.
        </div>
        <div className="mt-4">
          <div className="h-40 flex items-center justify-center text-slate-400">
            Preview will appear here
          </div>
        </div>
      </div>
    );
  }

  const { decision, risk_score = 0, features = [], message = "" } = result;
  // normalize features to objects {name, value}
  const formatted = features.map((f) => ({
    name: f.name ?? f.feature ?? "feature",
    value: Number(f.importance ?? f.value ?? 0),
  }));

//   const animKey = result ? `${result.risk_score}-${result.decision}` : "empty";

  return (
    <motion.div
      key={risk_score}
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01, boxShadow: "0 10px 30px rgba(16,24,40,0.08)" }}
      className="p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">Prediction result</h3>
          <div className="mt-1 text-sm text-slate-600">Decision</div>
          <div
            className={`mt-2 inline-block px-3 py-1 rounded-md text-sm font-semibold ${
              decision === "Approved" || decision === "Layak"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {decision}
          </div>
        </div>

        <div className="w-28">
          <RiskGaugePro key={risk_score} score={risk_score} size={100}/>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-slate-600">
          Top contributing factors
        </div>
        <FeatureChart data={formatted} />
      </div>

      {message && <div className="mt-4 text-sm text-slate-600">{message}</div>}
    </motion.div>
  );
}
