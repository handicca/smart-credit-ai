const ITEMS = [
  {
    title: "Fast & Lightweight",
    desc: "Eligibility predictions in seconds with a concise input form.",
  },
  {
    title: "Explainable",
    desc: "Top contributing factors are displayed for transparency.",
  },
  {
    title: "Practical",
    desc: "Designed as a decision-support tool for human underwriters.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold">Why Smart Credit?</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ITEMS.map((it, idx) => (
          <div key={idx} className="p-4 rounded-lg">
            <h4 className="font-semibold"><span className="text-blue-600 font-bold pr-2">✓</span>{it.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
