import CurrencyInput from "react-currency-input-field";
import { InfoTooltip } from "./InfoTooltip";

export default function CurrencyInputField({
  label,
  name,
  value,
  onValueChange,
  tooltipContent,
  error,
  inputClass,
  required = false,
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <InfoTooltip content={tooltipContent}/>
      <CurrencyInput
        name={name}
        value={value}
        onValueChange={(val) => {
          onValueChange(name, val);
        }}
        defaultValue={0}
        placeholder="Rp 100.000.000"
        min={0}
        prefix="Rp "
        groupSeparator="."
        decimalSeparator=","
        allowDecimals={false}
        allowNegativeValue={false}
        className={`${inputClass(name)} text-slate-800`}
      />

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
