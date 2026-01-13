export function InfoTooltip({ content }) {
  return (
    <span
      data-tooltip-id="form-tooltip"
      data-tooltip-content={content}
      aria-label="Informasi tambahan"
      className="cursor-help select-none text-slate-400 font-serif ms-0.5 inline-grid place-content-center border rounded-full size-3 relative -top-0.5 text-xs hover:text-slate-600"
    >
      i
    </span>
  );
}
