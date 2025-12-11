import Link from "next/link";
import FeatureChart from "./FeatureChart";

const sampleFeatures = [
  { name: "Debt-to-income ratio", value: 42 }, // percentage (0..100)
  { name: "CIBIL score", value: 31 },
  { name: "Employment length", value: 12 },
];

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Faster decisions. Fairer outcomes.
        </h1>
        <p className="mt-4 text-slate-600 max-w-prose">
          Smart Credit AI delivers fast, transparent credit eligibility
          assessments for lenders and borrowers. Short form, clear explanations,
          and explainable factors.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            Try Demo
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-md text-sm text-slate-700 hover:bg-slate-50"
          >
            Learn more
          </a>
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
      </div>

      {/* Right: Result preview card */}
      <div className="w-full">
        <div className="mt-2 p-6 rounded-xl bg-white shadow-sm">
          <h4 className="font-semibold mb-3">Result preview</h4>

          <div className="flex items-center justify-between mb-3">
            <div className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-sm font-medium">
              Status
            </div>
            <div className="text-xl font-bold text-slate-400">—%</div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-600">Top factors</p>

            {/* Recharts feature importance */}
            <div className="mt-3">
              <FeatureChart data={sampleFeatures} />
            </div>

            <div className="mt-3 text-sm text-slate-500">
              This preview shows the top contributing factors and their relative importance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
