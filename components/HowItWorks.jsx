const STEPS = [
  {
    title: "Isi data dasar",
    desc: "Formulir singkat: pendapatan, skor kredit, aset, dan jumlah pinjaman.",
  },
  {
    title: "Model mengevaluasi risiko",
    desc: "Model klasifikasi yang andal menghasilkan skor ratio dan keputusan.",
  },
  {
    title: "Terima hasil & panduan",
    desc: "Keputusan disertai penjelasan faktor utama yang memengaruhi hasil.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-xl text-slate-800 font-semibold">How it works</h3>

      <ol className="mt-4 space-y-3">
        {STEPS.map((s, i) => (
          <li key={i} className="flex gap-4 items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 font-semibold">
              {i + 1}
            </div>
            <div>
              <h4 className="font-medium text-slate-800">{s.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
