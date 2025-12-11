const STEPS = [
  { title: "Provide basic data", desc: "Short form: income, score, assets, loan amount." },
  { title: "Model evaluates risk", desc: "Robust classifiers produce a risk score and decision." },
  { title: "Receive result & guidance", desc: "Decision is accompanied by top factor explanations." }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold">How it works</h3>
      <ol className="mt-4 space-y-3">
        {STEPS.map((s, i) => (
          <li key={i} className="flex gap-4 items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 font-semibold">{i + 1}</div>
            <div>
              <h4 className="font-medium">{s.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
