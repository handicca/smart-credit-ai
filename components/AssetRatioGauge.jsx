"use client";

function parseRatio(value) {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value.replace("x", "").trim());
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

export default function AssetRatioGauge({ ratio }) {
  const ratioValue = parseRatio(ratio);
  const capped = Math.min(ratioValue, 5);
  const percent = (capped / 5) * 100;

  const status =
    ratioValue >= 2
      ? {
          label: "Aman",
          color: "text-green-700",
          bg: "bg-green-200",
          desc: "Total aset jauh melebihi jumlah pinjaman.",
        }
      : ratioValue >= 1
      ? {
          label: "Waspada",
          color: "text-yellow-700",
          bg: "bg-yellow-200",
          desc: "Aset cukup, namun margin keamanan terbatas.",
        }
      : {
          label: "Risiko Tinggi",
          color: "text-red-700",
          bg: "bg-red-200",
          desc: "Aset tidak mencukupi untuk menutup pinjaman.",
        };

  return (
    <div className="mt-6">
      {/* TITLE */}
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-slate-700">
          Rasio Aset terhadap Pinjaman
        </h4>
        <p className="text-xs text-slate-500">
          Indikator kemampuan aset dalam menutup kewajiban pinjaman.
        </p>
      </div>

      {/* GAUGE */}
      <div className="relative">
        {/* Risk Bands */}
        <div className="relative h-4 rounded-full overflow-hidden flex">
          <div className="w-1/3 bg-red-200" />
          <div className="w-1/3 bg-yellow-200" />
          <div className="w-1/3 bg-green-200" />
        </div>

        {/* Marker */}
        <div
          className="absolute -top-1"
          style={{ left: `${percent}%` }}
        >
          <div className="w-1 h-6 bg-slate-900 rounded-full" />
        </div>
      </div>

      {/* SCALE */}
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>0x</span>
        <span className={`font-semibold ${status.color}`}>
          {ratioValue.toFixed(2)}x
        </span>
        <span>≥ 5x</span>
      </div>

      {/* STATUS */}
      <div className="mt-3 flex items-start gap-2">
        <span className={`mt-1 h-2 w-2 rounded-full ${status.bg}`} />
        <div>
          <p className={`text-sm font-medium ${status.color}`}>
            Profil Aset: {status.label}
          </p>
          <p className="text-sm text-slate-600">{status.desc}</p>
        </div>
      </div>
    </div>
  );
}
