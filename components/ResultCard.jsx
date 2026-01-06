"use client";

import { motion } from "framer-motion";
import ConfidenceChart from "./ConfidenceChart";
import AssetRatioGauge from "./AssetRatioGauge";

export default function ResultCard({ result, loading }) {
  /*  LOADING STATE  */
  if (loading) {
    return <ResultCardSkeleton />;
  }

  /*  EMPTY STATE  */
  if (!result) {
    return (
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm sticky top-16">
        <h3 className="font-semibold text-slate-800">Hasil Prediksi</h3>
        <p className="mt-3 text-sm text-slate-600">
          Belum ada hasil prediksi. Silakan isi formulir untuk melihat hasil.
        </p>
        <div className="mt-6 h-40 flex items-center justify-center text-slate-400 border border-dashed rounded-lg">
          Hasil akan ditampilkan di sini
        </div>
      </div>
    );
  }

  /*  DATA NORMALIZATION  */
  const { decision, confidence, ratio_aset_pinjaman, model } = result;

  const statusClass =
    decision === "Disetujui"
      ? "bg-green-100 text-green-800"
      : decision === "Disetujui Bersyarat"
      ? "bg-orange-100 text-orange-800"
      : "bg-red-100 text-red-800";

  /*  RESULT CARD  */
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm sticky top-16"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            Hasil Prediksi Kelayakan
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Keputusan berdasarkan model {model}
          </p>

          <div
            className={`mt-3 inline-flex px-3 py-1 rounded-md text-sm font-semibold ${statusClass}`}
          >
            {decision}
          </div>
        </div>

        {/* CONFIDENCE CHART */}
        <div className="w-36">
          <ConfidenceChart confidence={confidence} />
        </div>
      </div>

      {/* ASSET RATIO */}
      <div className="mt-6">
        <AssetRatioGauge ratio={ratio_aset_pinjaman} />
      </div>

      {/* FOOTNOTE */}
      <div className="mt-6 text-xs text-slate-500 leading-relaxed">
        Hasil ini merupakan rekomendasi berbasis model pembelajaran mesin dan
        tidak menggantikan penilaian manusia. Keputusan akhir tetap memerlukan
        evaluasi lanjutan.
      </div>
    </motion.div>
  );
}

function ResultCardSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse sticky top-16">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-3 w-full">
          <div className="h-5 w-3/4 max-w-xs bg-slate-200 rounded-md" />
          <div className="h-4 w-full max-w-sm bg-slate-200 rounded-md" />
          <div className="h-6 w-24 bg-slate-200 rounded-full" />
        </div>

        {/* Donut skeleton */}
        <div className="self-start sm:self-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-slate-200 shrink-0" />
      </div>

      {/* ASSET RATIO */}
      <div className="mt-6 space-y-3">
        <div className="h-4 w-2/3 max-w-xs bg-slate-200 rounded-md" />
        <div className="h-3 w-full max-w-sm bg-slate-200 rounded-md" />

        {/* Gauge */}
        <div className="mt-2 h-4 w-full rounded-full bg-slate-200" />

        {/* Ratio value */}
        <div className="flex justify-between mt-2">
          <div className="h-3 w-8 bg-slate-200 rounded-md" />
          <div className="h-4 w-16 bg-slate-200 rounded-md" />
          <div className="h-3 w-8 bg-slate-200 rounded-md" />
        </div>

        {/* Status */}
        <div className="mt-3 flex items-start gap-2">
          <div className="h-2 w-2 rounded-full bg-slate-200 mt-1 shrink-0" />
          <div className="space-y-2 w-full">
            <div className="h-4 w-1/2 max-w-xs bg-slate-200 rounded-md" />
            <div className="h-3 w-full max-w-sm bg-slate-200 rounded-md" />
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded-md" />
        <div className="h-3 w-5/6 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
}
