export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-40 bg-slate-200 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-100" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-10 w-full bg-slate-200 rounded-md animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-10 bg-slate-200 rounded-md animate-pulse" />
          </div>
          <div className="h-10 w-full bg-slate-200 rounded-md animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-8 w-24 bg-slate-200 rounded-md animate-pulse" />
          <div className="h-4 w-32 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* Subtle loading text */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Loading Smart Credit AI…
        </p>
      </div>
    </div>
  );
}
