import Link from "next/link";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About",
  description:
    "Tentang Smart Credit AI, latar belakang proyek, linimasa pengembangan, pertimbangan etika, dan tim di baliknya.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Umar Faruk Manek",
      id: "B25B9D003",
      description:
        "Membangun REST API, integrasi model, pipeline pemrosesan data, dokumentasi, dan koordinasi tim",
      github: "https://github.com/UmarFarukManek",
      linkedin: "https://linkedin.com/in/umar-faruq-manek-92b17a292",
    },
    {
      name: "Abdillah Husein Sanjani",
      id: "B25B9D007",
      description:
        "Feature engineering, melatih, dan mengevaluasi model klasifikasi risiko kredit.",
      github: "https://github.com/abdilHS",
      linkedin: "https://linkedin.com/in/abdillah-husein-sanjani-65969b214/",
    },
    {
      name: "Reza Gunawan Ridlo Setiadi",
      id: "B25B9D008",
      description:
        "Analisis data, cleaning data, visualisasi data, dan validasi data.",
      github: "https://github.com/RezaGnwn",
      linkedin: "https://linkedin.com/in/rezagnwn",
    },
    {
      name: "Handika",
      id: "B25B9D009",
      description:
        "Mengimplementasikan UI/UX, layout responsif, arsitektur komponen, dan alur interaksi pengguna.",
      github: "https://github.com/handicca",
      linkedin: "https://linkedin.com/in/handicca",
    },
  ];

  const timeline = [
    {
      phase: "Perumusan Masalah & Riset",
      detail:
        "Mengidentifikasi tantangan dalam evaluasi kredit tradisional serta meninjau pendekatan credit scoring berbasis AI yang telah ada.",
    },
    {
      phase: "Pemahaman & Persiapan Data",
      detail:
        "Mengeksplorasi karakteristik dataset, melakukan praproses data, dan merekayasa fitur yang relevan.",
    },
    {
      phase: "Pengembangan Model",
      detail:
        "Melatih dan mengevaluasi model pembelajaran mesin untuk menghasilkan skor risiko yang dapat diinterpretasikan.",
    },
    {
      phase: "Pengembangan Sistem",
      detail:
        "Mengembangkan front-end, back-end API, serta mengintegrasikan model ke dalam aplikasi web.",
    },
    {
      phase: "Pengujian & Evaluasi",
      detail:
        "Menguji kegunaan sistem, performa, serta penanganan error dengan berbagai skenario.",
    },
    {
      phase: "Finalisasi & Presentasi",
      detail:
        "Menyempurnakan UI/UX, menyiapkan dokumentasi, dan memfinalisasi proyek untuk evaluasi capstone.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl text-slate-800 sm:text-5xl font-extrabold leading-tight">
          Tentang Smart Credit AI
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Smart Credit AI adalah proyek capstone yang mengeksplorasi bagaimana
          pembelajaran mesin dapat membantu institusi keuangan dalam menilai
          kelayakan kredit melalui penilaian risiko serta keluaran keputusan
          yang dapat dijelaskan.
        </p>

        <div className="mt-6">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            Coba Demo
          </Link>
        </div>
      </div>

      {/* Project timeline */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800">
          Timeline Pengembangan Project
        </h2>

        <div className="mt-6 space-y-4">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <h3 className="font-semibold text-slate-800">{item.phase}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ethical disclaimer */}
      <div className="mt-14 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-amber-800">
          Ethical disclaimer
        </h2>
        <p className="mt-3 text-sm text-amber-900 leading-relaxed">
          Smart Credit AI dirancang sebagai sistem pendukung keputusan dan tidak
          menggantikan penilaian manusia. Prediksi dan skor risiko yang
          dihasilkan model didasarkan pada data historis dan pola statistik yang
          berpotensi mengandung bias. Keputusan kredit akhir harus selalu
          melibatkan peninjauan oleh manusia serta mematuhi regulasi dan standar
          etika yang berlaku.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <CTA />
      </div>

      {/* Team section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-slate-800">Team Project</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Project ini dikembangkan secara kolaboratif oleh tim multidisiplin
          dengan latar belakang software engineering, data science, dan project
          management.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Initial badge */}
                <div className="flex items-center gap-3 h-12">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm leading-none">
                    {initials}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">
                      ID: {member.id}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-600 flex-1">
                  {member.description}
                </p>

                {/* Social links */}
                <div className="mt-4 flex gap-4 text-sm">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
