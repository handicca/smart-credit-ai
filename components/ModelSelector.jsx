import { MODELS } from "@/lib/constants";

export default function ModelSelector({ value, onChange, inputClass }) {
  return (
    <section>
      <h2 className="text-sm font-bold text-slate-700 mb-3">Model Prediksi</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-600">
            Pilih Model
          </label>

          <select
            name="model"
            value={value}
            onChange={onChange}
            className={`${inputClass("model")} text-slate-800`}
          >
            {MODELS.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
                {model.recommended ? " (Recommended)" : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-blue-500 p-2 mt-1 border border-blue-500 rounded-xl bg-blue-500/10">
            XGBoost memberikan performa terbaik berdasarkan evaluasi model.
          </p>
        </div>
      </div>
    </section>
  );
}
