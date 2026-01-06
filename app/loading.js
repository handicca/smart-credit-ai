export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div
        className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}
