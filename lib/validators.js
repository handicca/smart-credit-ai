export const validateForm = (form) => {
  const errors = {};
  const required = [
    "annual_income",
    "loan_amount",
    "loan_term_years",
    "cibil_score",
  ];

  required.forEach((f) => {
    if (!form[f]) errors[f] = "Wajib diisi";
  });

  if (form.cibil_score) {
    const score = Number(form.cibil_score);
    if (score < 300 || score > 900) {
      errors.cibil_score = "Skor kredit harus 300 – 900";
    }
  }

  return errors;
};
