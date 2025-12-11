"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/**
 * Props:
 * - data: [{ name: string, value: number }]
 * Expects value in 0..1 or 0..100; component normalizes if needed.
 */
export default function FeatureChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-400">
        No feature data available
      </div>
    );
  }

  // normalize data to 0..100 if values are 0..1
  const normalized = data.map((d) => {
    const v = Number(d.value ?? d.importance ?? 0);
    return {
      name: d.name,
      value: v <= 1 ? +(v * 100).toFixed(2) : +v.toFixed(2),
    };
  });

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          layout="vertical"
          data={normalized}
          margin={{ top: 6, right: 12, left: 8, bottom: 6 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `${v}%`}
            domain={[0, "dataMax"]}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => `${Number(value).toFixed(1)}%`}
            wrapperStyle={{ zIndex: 50 }}
            contentStyle={{
              padding: "4px 8px",
              fontSize: "12px",
              borderRadius: "6px",
            }}
          />
          <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
