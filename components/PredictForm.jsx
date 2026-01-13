"use client";

import { useState, useRef, useCallback } from "react";

import { INITIAL_FORM } from "@/lib/constants";
import { buildApiPayload } from "@/lib/helpers";
import { validateForm } from "@/lib/validators";
import ModelSelector from "@/components/ModelSelector";
import CurrencyInputField from "./CurrencyInput";
import { InfoTooltip, Tooltip } from "./InfoTooltip";

export default function PredictForm({ apiUrl, onResult, onLoadingChange }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const firstInputRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((p) => {
          const n = { ...p };
          delete n[name];
          return n;
        });
      }
    },
    [errors]
  );

  const handleCurrencyChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value || "",
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatusMsg("Periksa kembali data yang ditandai.");
      return;
    }

    setLoading(true);
    onLoadingChange?.(true);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildApiPayload(form)),
      });

      const data = await res.json();
      onResult?.(data);
      setStatusMsg("Prediksi kelayakan berhasil dihitung.");
    } catch (err) {
      setStatusMsg("Tidak dapat terhubung ke layanan prediksi.");
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatusMsg("");
    onResult?.(null);
    firstInputRef.current?.focus();
  };

  const inputClass = (f) =>
    `w-full rounded-lg border px-3 py-2 text-sm transition
     ${
       errors[f]
         ? "border-red-500 bg-red-50"
         : "border-slate-300 focus:border-blue-500"
     }`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h1 className="text-xl font-bold text-slate-800">
        Form Prediksi Kelayakan Kredit
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Lengkapi data berikut untuk menghitung risiko dan kelayakan kredit.
      </p>
      <form onSubmit={handleSubmit} className="space-y-8 mt-6">
        <ModelSelector
          value={form.model}
          onChange={handleChange}
          inputClass={inputClass}
        />

        {/* PROFIL PEMOHON */}
        <section>
          <h2 className="text-sm font-bold text-slate-700 mb-3">
            Profil Pemohon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Pendidikan
              </label>
              <InfoTooltip content={"Tingkat pendidikan digunakan sebagai indikator stabilitas pekerjaan dan kemampuan finansial jangka panjang."}/>
              <select
                name="education"
                value={form.education}
                onChange={handleChange}
                className={`${inputClass("education")} text-slate-800`}
              >
                <option value="Graduate">Lulusan Perguruan Tinggi</option>
                <option value="Not Graduate">
                  Bukan Lulusan Perguruan Tinggi
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Wirausaha
              </label>
              <InfoTooltip
                content={
                  "Status wirausaha membantu sistem menilai kestabilan dan konsistensi sumber pendapatan pemohon."
                }
              />
              <select
                name="selfEmployed"
                value={form.selfEmployed}
                onChange={handleChange}
                className={`${inputClass("selfEmployed")} text-slate-800`}
              >
                <option value="No">Tidak</option>
                <option value="Yes">Ya</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Jumlah Tanggungan
              </label>
              <InfoTooltip
                content={
                  "Jumlah orang yang secara finansial menjadi tanggungan pemohon. Semakin banyak tanggungan, semakin besar beban finansial."
                }
              />
              <input
                name="dependents"
                type="number"
                min="0"
                value={form.dependents}
                onChange={handleChange}
                className={`${inputClass("dependents")} text-slate-800`}
              />
            </div>
          </div>
        </section>

        {/* INFORMASI PINJAMAN */}
        <section>
          <h2 className="text-sm font-bold text-slate-700 mb-3">
            Informasi Pinjaman
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencyInputField
              label="Pendapatan Tahunan"
              name="annual_income"
              value={form.annual_income}
              onValueChange={handleCurrencyChange}
              error={errors.annual_income}
              required
              inputClass={inputClass}
              tooltipContent={
                "Total pendapatan kotor pemohon dalam satu tahun. Digunakan untuk menilai kemampuan membayar pinjaman."
              }
            />
            <CurrencyInputField
              label="Jumlah Pinjaman"
              name="loan_amount"
              value={form.loan_amount}
              onValueChange={handleCurrencyChange}
              error={errors.loan_amount}
              required
              inputClass={inputClass}
              tooltipContent={
                "Total dana yang diajukan untuk dipinjam oleh pemohon."
              }
            />

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Waktu Pinjaman (tahun)
                <span className="text-red-500">*</span>
              </label>
              <InfoTooltip
                content={
                  "Durasi pinjaman dalam satuan tahun. Jangka waktu yang lebih panjang dapat menurunkan cicilan, tetapi meningkatkan risiko kredit."
                }
              />
              <input
                name="loan_term_years"
                type="number"
                min="1"
                value={form.loan_term_years}
                onChange={handleChange}
                className={`${inputClass("dependents")} text-slate-800`}
              />
              {errors.loan_term_years && (
                <p className="text-xs text-red-500">{errors.loan_term_years}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Skor Kredit (300 - 900)<span className="text-red-500">*</span>
              </label>
              <InfoTooltip
                content={
                  "Skor kredit mencerminkan riwayat pembayaran dan perilaku keuangan pemohon. Skor yang lebih tinggi menunjukkan risiko kredit yang lebih rendah."
                }
              />
              <input
                name="cibil_score"
                type="number"
                value={form.cibil_score}
                max={900}
                min={300}
                onChange={handleChange}
                className={`${inputClass("dependents")} text-slate-800`}
              />
              {errors.cibil_score && (
                <p className="text-xs text-red-500">{errors.cibil_score}</p>
              )}
            </div>
          </div>
        </section>

        {/* INFORMASI ASET */}
        <section>
          <h2 className="text-sm font-bold text-slate-700 mb-3">
            Informasi Aset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencyInputField
              label="Nilai Aset Rumah"
              name="residential_assets_value"
              value={form.residential_assets_value}
              onValueChange={handleCurrencyChange}
              inputClass={inputClass}
              tooltipContent={
                "Perkiraan nilai properti tempat tinggal yang dimiliki oleh pemohon."
              }
            />

            <CurrencyInputField
              label="Nilai Aset Usaha"
              name="commercial_assets_value"
              value={form.commercial_assets_value}
              onValueChange={handleCurrencyChange}
              inputClass={inputClass}
              tooltipContent={
                "Perkiraan nilai aset yang berkaitan dengan kegiatan usaha pemohon, seperti peralatan atau inventaris."
              }
            />

            <CurrencyInputField
              label="Nilai Aset Mewah"
              name="luxury_assets_value"
              value={form.luxury_assets_value}
              onValueChange={handleCurrencyChange}
              inputClass={inputClass}
              tooltipContent={
                "Perkiraan nilai aset bernilai tinggi yang dimiliki pemohon, seperti kendaraan mewah atau barang berharga lainnya."
              }
            />

            <CurrencyInputField
              label="Saldo / Aset Bank"
              name="bank_asset_value"
              value={form.bank_asset_value}
              onValueChange={handleCurrencyChange}
              inputClass={inputClass}
              tooltipContent={
                "Total saldo tabungan atau rekening bank yang dimiliki oleh pemohon."
              }
            />
          </div>
        </section>

        {/* Action */}
        <section className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Memproses..." : "Prediksi Kelayakan"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 text-slate-800 rounded-lg border border-slate-600 text-sm hover:bg-slate-50 cursor-pointer"
          >
            Reset
          </button>
        </section>

        {statusMsg && (
          <p className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm font-semibold text-amber-800">
            {statusMsg}
          </p>
        )}
      </form>
    </div>
  );
}
