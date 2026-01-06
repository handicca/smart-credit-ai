const ITEMS = [
  {
    title: "Cepat & Ringan",
    desc: "Prediksi kelayakan kredit dalam hitungan detik dengan formulir input yang ringkas.",
  },
  {
    title: "Dapat Dijelaskan",
    desc: "Faktor-faktor utama yang berkontribusi ditampilkan untuk meningkatkan transparansi.",
  },
  {
    title: "Praktis",
    desc: "Dirancang sebagai alat pendukung keputusan bagi analis kredit manusia.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold">Mengapa Smart Credit?</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ITEMS.map((it, idx) => (
          <div key={idx} className="p-4 rounded-lg">
            <h4 className="font-semibold">
              <span className="text-blue-600 font-bold pr-2">✓</span>
              {it.title}
            </h4>
            <p className="text-sm text-slate-600 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
