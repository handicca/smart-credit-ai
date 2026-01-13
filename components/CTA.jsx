import Link from "next/link";

export default function CTA() {
  return (
    <section className="rounded-lg p-6 bg-linear-to-r from-blue-50 to-transparent">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg text-slate-800 font-semibold">Siap mencoba Smart Credit?</h4>
          <p className="text-sm text-slate-600">
            Coba demo untuk melihat bagaimana keputusan dijelaskan.
          </p>
        </div>
        <div>
          <Link
            href={"/demo"}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Coba demo
          </Link>
        </div>
      </div>
    </section>
  );
}
