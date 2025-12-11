export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-sm text-slate-600">© {new Date().getFullYear()} Smart Credit AI — Team</div>
        <div className="text-sm text-slate-500">Built for Capstone Project</div>
      </div>
    </footer>
  );
}
