export const MODELS = [
  { value: "xgboost", label: "XGBoost", recommended: true },
  { value: "random_forest", label: "Random Forest" },
  { value: "logreg", label: "Logistic Regression" },
];

export const INITIAL_FORM = {
  model: "xgboost",
  education: "Graduate",
  selfEmployed: "No",
  dependents: "1",
  annual_income: "",
  loan_amount: "",
  loan_term_years: "10",
  cibil_score: "600",
  residential_assets_value: "",
  commercial_assets_value: "",
  luxury_assets_value: "",
  bank_asset_value: "",
};
