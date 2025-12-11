"use client";

import { useState, useRef } from "react";

const INITIAL_STATE = {
  full_name: "",
  age: "",
  cibil_score: "",
  annual_income: "",
  employment_status: "Employed",
  employment_length_months: "",
  dependents: "",
  total_assets_value: "",
  other_debt_total: "",
  loan_amount: "",
  loan_term_months: "",
};

// Helper untuk formatting Rupiah visual
const formatIDR = (val) => {
  if (!val || isNaN(val)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export default function PredictForm({ apiUrl = "/api/predict", onResult, onLoadingChange }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState("");

  const firstInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Hapus error field saat user mulai memperbaiki
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const required = ["age", "cibil_score", "annual_income", "loan_amount"];

    required.forEach((field) => {
      if (!form[field] && form[field] !== 0) {
        newErrors[field] = "This field is mandatory";
      }
    });

    const age = Number(form.age);
    if (form.age && (age < 18 || age > 80)) {
      newErrors.age = "Age must be between 18 - 80 years old";
    }

    const score = Number(form.cibil_score);
    if (form.cibil_score && (score < 300 || score > 900)) {
      newErrors.cibil_score = "CIBIL scores are usually between 300 - 900";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("");

    if (!validate()) {
      setStatusMsg("Please correct the input error.");
      return;
    }

    setLoading(true);
    onLoadingChange?.(true)
    onResult?.(null);

    try {
      const payload = {
        full_name: form.full_name || null,
        age: Number(form.age),
        cibil_score: Number(form.cibil_score),
        annual_income: Number(form.annual_income),
        employment_status: form.employment_status,
        employment_length_months: Number(form.employment_length_months) || 0,
        dependents: Number(form.dependents) || 0,
        total_assets_value: Number(form.total_assets_value) || 0,
        other_debt_total: Number(form.other_debt_total) || 0,
        loan_amount: Number(form.loan_amount),
        loan_term_months: Number(form.loan_term_months) || 12,
      };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server Error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      onResult?.(data);
      setStatusMsg("Prediction successfully calculated!");
    } catch (err) {
      console.error(err);
      setStatusMsg(err.message || "Failed to contact server.");
    } finally {
      setLoading(false);
      onLoadingChange?.(false)
    }
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setStatusMsg("");
    onResult?.(null);
    firstInputRef.current?.focus();
  };

  const fillExample = () => {
    setForm({
      full_name: "Jane Example",
      age: "32",
      cibil_score: "680",
      annual_income: "120000000",
      employment_status: "Employed",
      employment_length_months: "36",
      dependents: "1",
      total_assets_value: "500000000",
      other_debt_total: "10000000",
      loan_amount: "50000000",
      loan_term_months: "36",
    });
    setErrors({});
    setStatusMsg("Sample data loaded successfully.");
  };

  const getInputClass = (fieldName) => `
    w-full rounded-md border px-3 py-2 text-sm transition-all
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    ${
      errors[fieldName]
        ? "border-red-500 bg-red-50"
        : "border-slate-300 focus:border-blue-500"
    }
  `;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          Credit Eligibility Form
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your financial data to calculate the probability of loan
          approval.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
      >
        {/* Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="full_name"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Name (Opsional)
          </label>
          <input
            ref={firstInputRef}
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
            className={getInputClass("full_name")}
          />
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Age <span className="text-red-500">*</span>
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className={getInputClass("age")}
          />
          {errors.age && (
            <p className="text-[10px] text-red-500 mt-1">{errors.age}</p>
          )}
        </div>

        {/* CIBIL Score */}
        <div>
          <label
            htmlFor="cibil_score"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Score CIBIL (300-900) <span className="text-red-500">*</span>
          </label>
          <input
            id="cibil_score"
            name="cibil_score"
            type="number"
            value={form.cibil_score}
            onChange={handleChange}
            className={getInputClass("cibil_score")}
          />
          {errors.cibil_score && (
            <p className="text-[10px] text-red-500 mt-1">
              {errors.cibil_score}
            </p>
          )}
        </div>

        {/* Annual income */}
        <div className="md:col-span-2">
          <label
            htmlFor="annual_income"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Annual income (IDR) <span className="text-red-500">*</span>
          </label>
          <input
            id="annual_income"
            name="annual_income"
            type="number"
            value={form.annual_income}
            onChange={handleChange}
            className={getInputClass("annual_income")}
          />
          <p className="text-[10px] text-blue-600 mt-1 h-4">
            {formatIDR(form.annual_income)}
          </p>
          {errors.annual_income && (
            <p className="text-[10px] text-red-500 mt-1">
              {errors.annual_income}
            </p>
          )}
        </div>

        {/* Employment status */}
        <div>
          <label
            htmlFor="employment_status"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Employment Status
          </label>
          <select
            id="employment_status"
            name="employment_status"
            value={form.employment_status}
            onChange={handleChange}
            className={getInputClass("employment_status")}
          >
            <option value="Employed">Employed</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>

        {/* Employment Length */}
        <div>
          <label
            htmlFor="employment_length_months"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Employment length (months)
          </label>
          <input
            id="employment_length_months"
            name="employment_length_months"
            type="number"
            value={form.employment_length_months}
            onChange={handleChange}
            className={getInputClass("employment_length_months")}
          />
        </div>

        {/* Dependents */}
        <div>
          <label
            htmlFor="dependents"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Number of dependents
          </label>
          <input
            id="dependents"
            name="dependents"
            type="number"
            value={form.dependents}
            onChange={handleChange}
            className={getInputClass("dependents")}
          />
        </div>

        {/* Total assets */}
        <div>
          <label
            htmlFor="total_assets_value"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Total assets value (IDR)
          </label>
          <input
            id="total_assets_value"
            name="total_assets_value"
            type="number"
            value={form.total_assets_value}
            onChange={handleChange}
            className={getInputClass("total_assets_value")}
          />
          <p className="text-[10px] text-blue-600 mt-1 h-4">
            {formatIDR(form.total_assets_value)}
          </p>
        </div>

        {/* Other debt */}
        <div>
          <label
            htmlFor="other_debt_total"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Other total debt (IDR)
          </label>
          <input
            id="other_debt_total"
            name="other_debt_total"
            type="number"
            value={form.other_debt_total}
            onChange={handleChange}
            className={getInputClass("other_debt_total")}
          />
          <p className="text-[10px] text-blue-600 mt-1 h-4">
            {formatIDR(form.other_debt_total)}
          </p>
        </div>

        {/* Loan amount */}
        <div>
          <label
            htmlFor="loan_amount"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Requested loan amount (IDR) <span className="text-red-500">*</span>
          </label>
          <input
            id="loan_amount"
            name="loan_amount"
            type="number"
            value={form.loan_amount}
            onChange={handleChange}
            className={getInputClass("loan_amount")}
          />
          <p className="text-[10px] text-blue-600 mt-1 h-4">
            {formatIDR(form.loan_amount)}
          </p>
          {errors.loan_amount && (
            <p className="text-[10px] text-red-500 mt-1">
              {errors.loan_amount}
            </p>
          )}
        </div>

        {/* Loan term */}
        <div>
          <label
            htmlFor="loan_term_months"
            className="block text-[11px] font-bold text-slate-500 uppercase mb-1"
          >
            Loan term (months)
          </label>
          <input
            id="loan_term_months"
            name="loan_term_months"
            type="number"
            value={form.loan_term_months}
            onChange={handleChange}
            placeholder="12"
            className={getInputClass("loan_term_months")}
          />
        </div>

        {/* Action */}
        <div className="md:col-span-2 flex flex-wrap items-center gap-3 mt-4 pt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Processing..." : "Predict Eligibility"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={fillExample}
            className="text-xs text-blue-600 font-semibold hover:underline ml-auto"
          >
            Use Example Data
          </button>
        </div>

        {/* Pesan Status */}
        {statusMsg && (
          <div
            className={`md:col-span-2 p-3 rounded-lg text-sm font-medium ${
              statusMsg.includes("berhasil")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {statusMsg}
          </div>
        )}
      </form>
    </div>
  );
}
