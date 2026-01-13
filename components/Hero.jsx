"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ConfidenceChart from "./ConfidenceChart";
import AssetRatioGauge from "./AssetRatioGauge";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-4xl text-slate-800 sm:text-5xl font-extrabold leading-tight">
          Faster decisions. Fairer outcomes.
        </h1>
        <p className="mt-4 text-slate-600 max-w-prose">
          Smart Credit AI memberikan penilaian kelayakan kredit yang cepat dan
          transparan bagi pemberi pinjaman dan peminjam. Bentuk singkat,
          penjelasan yang jelas, dan faktor-faktor yang dapat dijelaskan.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            Coba Demo
          </Link>
        </div>

        <ul className="mt-6 flex gap-6 text-sm text-slate-600">
          <li>
            <strong className="text-slate-900">0.5s</strong> avg inference
          </li>
          <li>
            <strong className="text-slate-900">3</strong> tested models
          </li>
          <li>
            <strong className="text-slate-900">Explainable</strong> results
          </li>
        </ul>

        {/* Model badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-md border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 relative before:content-[''] before:absolute before:size-2 before:rounded-full before:bg-green-500 before:-top-1 before:-left-1 before:animate-pulse">
            XGBoost (Recommended)
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-md border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 relative before:content-[''] before:absolute before:size-2 before:rounded-full before:bg-green-500 before:-top-1 before:-left-1 before:animate-pulse">
            Random Forest
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-md border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 relative before:content-[''] before:absolute before:size-2 before:rounded-full before:bg-green-500 before:-top-1 before:-left-1 before:animate-pulse">
            Logistic Regression
          </span>
        </div>
      </div>

      {/* Right: Result preview card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm sticky top-16"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-800">Result preview</h3>
            <p className="mt-1 text-sm text-slate-600">
              Keputusan berdasarkan model {"xgboost"}
            </p>

            <div
              className={`mt-3 inline-flex px-3 py-1 rounded-md text-sm font-semibold bg-green-100 text-green-800`}
            >
              {"Disetujui"}
            </div>
          </div>

          {/* CONFIDENCE CHART */}
          <div className="w-36">
            <ConfidenceChart confidence={99} />
          </div>
        </div>

        {/* ASSET RATIO */}
        <div className="mt-6">
          <AssetRatioGauge ratio={4} />
        </div>

        {/* FOOTNOTE */}
        <div className="mt-6 text-xs text-slate-500 leading-relaxed">
          Pratinjau ini menunjukkan bagaimana Smart Credit AI menjelaskan
          keputusan menggunakan tingkat kepercayaan dan indikator keuangan
          utama.
        </div>
      </motion.div>
    </section>
  );
}
