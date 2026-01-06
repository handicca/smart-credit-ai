export const formatRupiah = (value) => {
  if (!value || isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const buildApiPayload = (form) => ({
  model: form.model,
  pendidikan: form.education,
  wirausaha: form.selfEmployed,
  jumlah_tanggungan: Number(form.dependents) || 0,
  pendapatan_tahunan: Number(form.annual_income),
  jumlah_pinjaman: Number(form.loan_amount),
  jangka_waktu_pinjaman: Number(form.loan_term_years),
  skor_kredit: Number(form.cibil_score),
  aset_rumah: Number(form.residential_assets_value) || 0,
  aset_usaha: Number(form.commercial_assets_value) || 0,
  aset_mewah: Number(form.luxury_assets_value) || 0,
  aset_bank: Number(form.bank_asset_value) || 0,
});
