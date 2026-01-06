"use client";

import { PieChart, Pie, Cell } from "recharts";

export default function ConfidenceChart({ confidence }) {
  /* ================= SAFE PARSING ================= */
  const parsedValue = (() => {
    if (!confidence) return 0;

    if (typeof confidence === "string") {
      return Number(confidence.replace("%", ""));
    }

    if (typeof confidence === "number") {
      return confidence;
    }

    return 0;
  })();

  const value = Math.min(Math.max(parsedValue, 0), 100);

  const data = [
    { name: "Confidence", value },
    { name: "Remaining", value: 100 - value },
  ];

  const color =
    value >= 75 ? "#16a34a" :
    value >= 50 ? "#f59e0b" :
    "#dc2626";

  /* ================= RENDER ================= */
  return (
    <div className="flex flex-col items-center">
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={55}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>

      <div
        className="mt-1 text-sm font-semibold"
        style={{ color }}
      >
        {value.toFixed(1)}%
      </div>

      <div className="text-xs text-slate-500">
        Tingkat keyakinan model
      </div>
    </div>
  );
}