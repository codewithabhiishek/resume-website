import { useRef, useState } from "react";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Printer,
  Terminal,
} from "lucide-react";
import { A4ResumeSheet, A4_HEIGHT, A4_WIDTH } from "./components/A4ResumeSheet";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  HIGHLIGHTS,
  LEADERSHIP,
  PROFILE,
  PROJECTS,
  SKILLS,
} from "./data/resumeData";

const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono-tech text-xs font-bold tracking-[0.2em] text-[#c8ff29]">
        {index}
      </span>
      <span className="h-px w-8 bg-[#2d3340]" />
      <h2 className="font-mono-tech text-xs font-bold uppercase tracking-[0.22em] text-[#8b949e]">
        {title}
      </h2>
    </div>
  );
}

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    try {
      const opt = {
        margin: 0,
        filename: "Abhishek_Jain_Resume.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: A4_WIDTH,
          onclone: (doc: Document) => {
            doc.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
              if (node.tagName === "STYLE" && node.textContent?.includes("oklch")) {
                node.remove();
              } else if (node.tagName === "LINK") {
                node.remove();
              }
            });
            const clonedSheet = doc.getElementById("resume-a4-sheet");
            if (clonedSheet) {
              clonedSheet.style.width = `${A4_WIDTH}px`;
              clonedSheet.style.minHeight = `${A4_HEIGHT}px`;
              clonedSheet.style.padding = "32px 42px";
              clonedSheet.style.backgroundColor = "#ffffff";
              clonedSheet.style.color = "#1e293b";
              clonedSheet.style.fontFamily = "'Georgia', 'Times New Roman', serif";
              clonedSheet.style.boxSizing = "border-box";
              clonedSheet.style.boxShadow = "none";
              clonedSheet.style.border = "none";
            }
          },
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(resumeRef.current).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f4f4f0] blueprint-grid selection:bg-[#c8ff29] selection:text-[#08090c]">
      {/* ---------------- STICKY NAVIGATION ---------------- */}
      <header className="no-print sticky top-0 z-50 border-b border-[#1f242d] bg-[#08090c]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="#about"
              className="font-mono-tech text-xs sm:text-sm font-bold tracking-wider text-[#f4f4f0] hover:text-[#c8ff29] transition-colors flex items-center gap-2 shrink-0"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 border border-[#2d3340] bg-[#0e1016] text-[#c8ff29] text-[11px]">
                AJ
              </span>
              <span className="hidden xs:inline">ABHIISHEK.DEV</span>
            </a>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#c8ff29]/30 bg-[#c8ff29]/10 font-mono-tech text-[10px] font-bold tracking-widest text-[#c8ff29]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff29] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8ff29]" />
              </span>
              OPEN TO WORK
            </span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6">
            <a
              href="#about"
              className="hidden md:inline text-xs font-mono-tech uppercase tracking-widest text-[#8b949e] hover:text-[#f4f4f0] transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-xs font-mono-tech uppercase tracking-widest text-[#8b949e] hover:text-[#f4f4f0] transition-colors"
            >
              Projects
            </a>
            <a
              href="#resume"
              className="text-xs font-mono-tech uppercase tracking-widest text-[#8b949e] hover:text-[#f4f4f0] transition-colors"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-[#c8ff29] text-[#08090c] font-mono-tech text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#d8ff66] active:translate-y-px transition-all disabled:opacity-60 cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Exporting..." : "Download PDF"}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="about" className="no-print border-b border-[#1f242d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#8b949e]">
                <span className="text-[#c8ff29]">00 //</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#ff6b35]" /> {PROFILE.location}
                </span>
                <span>·</span>
                <span>BCA &apos;26 · DBS GLOBAL UNIVERSITY</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-bold tracking-[-0.035em] leading-[0.95] text-[#f4f4f0]">
                {PROFILE.name}
                <span className="text-[#c8ff29]">.</span>
              </h1>

              <p className="mt-5 font-mono-tech text-sm sm:text-base font-bold tracking-wide text-[#c8ff29]">
                {PROFILE.headline}
              </p>

              <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#8b949e] leading-relaxed">
                {PROFILE.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#c8ff29] text-[#08090c] font-mono-tech text-xs font-extrabold uppercase tracking-wider hover:bg-[#d8ff66] transition-all"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                  <ArrowDownRight className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#2d3340] bg-[#0e1016] text-[#f4f4f0] font-mono-tech text-xs font-bold uppercase tracking-wider hover:border-[#c8ff29] hover:text-[#c8ff29] transition-all"
                >
                  Explore Projects
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Asymmetrical Editorial Spec Block */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 border border-[#1f242d] bg-[#0e1016] p-5"
            >
              <div className="flex items-center justify-between border-b border-[#1f242d] pb-3 mb-4 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#8b949e]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#c8ff29]" /> SYSTEM.SPEC
                </span>
                <span className="text-[#c8ff29]">ONLINE</span>
              </div>
              <dl className="space-y-3 font-mono-tech text-xs">
                <div className="flex justify-between gap-4 border-b border-[#1f242d]/70 pb-2">
                  <dt className="text-[#8b949e]">ROLE</dt>
                  <dd className="text-[#f4f4f0] text-right">SWE / AI / DevOps</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1f242d]/70 pb-2">
                  <dt className="text-[#8b949e]">EXPERIENCE</dt>
                  <dd className="text-[#f4f4f0] text-right">Freelance (2025–26)</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1f242d]/70 pb-2">
                  <dt className="text-[#8b949e]">OPEN SOURCE</dt>
                  <dd className="text-[#c8ff29] text-right">Argo CD</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8b949e]">STATUS</dt>
                  <dd className="text-[#ff6b35] text-right">Open to Work</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- DEVELOPER HIGHLIGHTS STRIP ---------------- */}
      <section className="no-print border-b border-[#1f242d] bg-[#0c0e13]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1f242d]">
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="py-6 sm:px-5 first:sm:pl-0 last:sm:pr-0 group"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#8b949e] mb-2">
                  0{idx + 1} //
                </div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f4f4f0] group-hover:text-[#c8ff29] transition-colors">
                  {item.metric}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#f4f4f0]">
                  {item.label}
                </div>
                <div className="mt-0.5 text-xs text-[#8b949e]">{item.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TECHNICAL SKILLS ---------------- */}
      <section className="no-print border-b border-[#1f242d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <SectionLabel index="01" title="Technical Skills" />
          <div className="border-t border-[#1f242d]">
            {SKILLS.map((group) => (
              <div
                key={group.category}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 py-4 border-b border-[#1f242d] items-center hover:bg-[#0e1016]/70 transition-colors px-2 -mx-2"
              >
                <div className="md:col-span-3 font-mono-tech text-xs font-bold uppercase tracking-wider text-[#8b949e]">
                  {group.category}
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 border border-[#2d3340] bg-[#0e1016] font-mono-tech text-xs text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EXPERIENCE & FEATURED PROJECTS ---------------- */}
      <section id="projects" className="no-print border-b border-[#1f242d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 space-y-14">
          {/* Experience */}
          <motion.div {...FADE_UP}>
            <SectionLabel index="02" title="Experience" />
            <div className="border border-[#1f242d] bg-[#0e1016] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1f242d] pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f0]">
                    {EXPERIENCE.role}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#c8ff29] mt-1">
                    {EXPERIENCE.company}
                  </p>
                </div>
                <span className="font-mono-tech text-xs text-[#8b949e]">
                  {EXPERIENCE.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-[#8b949e]">
                {EXPERIENCE.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="font-mono-tech text-[#c8ff29] mt-0.5">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#1f242d] flex flex-wrap items-center gap-2">
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#8b949e] mr-2">
                  Selected Work:
                </span>
                {EXPERIENCE.selectedWork.map((w) => (
                  <span
                    key={w}
                    className="px-2.5 py-1 border border-[#2d3340] bg-[#08090c] font-mono-tech text-xs text-[#f4f4f0]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div {...FADE_UP}>
            <SectionLabel index="03" title="Featured Projects" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PROJECTS.map((proj) => (
                <article
                  key={proj.id}
                  className="border border-[#1f242d] bg-[#0e1016] p-6 flex flex-col justify-between hover:border-[#c8ff29]/70 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono-tech text-xs text-[#8b949e] mb-3">
                      <span className="text-[#c8ff29]">PROJECT // {proj.id}</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f0] group-hover:text-[#c8ff29] transition-colors">
                      {proj.name}
                    </h3>
                    <div className="mt-2 inline-block px-2 py-0.5 border border-[#ff6b35]/40 bg-[#ff6b35]/10 font-mono-tech text-[11px] text-[#ff6b35]">
                      {proj.impact}
                    </div>
                    <p className="mt-3 text-sm text-[#8b949e] leading-relaxed">
                      {proj.description}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-[#8b949e]">
                      {proj.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-[#c8ff29]">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1f242d] flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-[#2d3340] bg-[#08090c] font-mono-tech text-[10px] text-[#f4f4f0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Additional Projects & Open Source */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href={PROFILE.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#1f242d] bg-[#0e1016] p-5 flex items-center justify-between gap-4 hover:border-[#c8ff29] transition-colors group"
              >
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#c8ff29]">
                    MORE WORK
                  </div>
                  <div className="text-base font-bold text-[#f4f4f0] mt-1">
                    20+ Live Applications (Full-Stack, AI/ML, Cloud)
                  </div>
                  <div className="font-mono-tech text-xs text-[#8b949e] mt-0.5">
                    abhiishek.is-a.dev
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8b949e] group-hover:text-[#c8ff29] shrink-0" />
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#1f242d] bg-[#0e1016] p-5 flex items-center justify-between gap-4 hover:border-[#c8ff29] transition-colors group"
              >
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#ff6b35]">
                    OPEN SOURCE
                  </div>
                  <div className="text-base font-bold text-[#f4f4f0] mt-1">
                    Contributor to Argo CD
                  </div>
                  <div className="font-mono-tech text-xs text-[#8b949e] mt-0.5">
                    Docker Hub webhook parser · namespace validation UX
                  </div>
                </div>
                <Github className="w-4 h-4 text-[#8b949e] group-hover:text-[#c8ff29] shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- LEADERSHIP, EDUCATION & CERTIFICATIONS ---------------- */}
      <section className="no-print border-b border-[#1f242d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Leadership Timeline */}
          <motion.div {...FADE_UP} className="lg:col-span-7">
            <SectionLabel index="04" title="Leadership & Achievements" />
            <div className="border-l border-[#2d3340] pl-5 space-y-6">
              {LEADERSHIP.map((item) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 bg-[#c8ff29]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-[#f4f4f0]">{item.title}</h3>
                    <span className="font-mono-tech text-xs text-[#c8ff29]">{item.year}</span>
                  </div>
                  <div className="font-mono-tech text-xs text-[#8b949e] mt-0.5">{item.org}</div>
                  <ul className="mt-2 space-y-1 text-sm text-[#8b949e]">
                    {item.points.map((pt) => (
                      <li key={pt}>· {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div {...FADE_UP} className="lg:col-span-5 space-y-8">
            <div>
              <SectionLabel index="05" title="Education" />
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div key={edu.school} className="border border-[#1f242d] bg-[#0e1016] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-sm text-[#f4f4f0]">{edu.school}</h3>
                      <span className="font-mono-tech text-xs text-[#8b949e]">{edu.period}</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2 mt-1 text-xs text-[#8b949e]">
                      <span>{edu.degree}</span>
                      <span className="font-mono-tech text-[#c8ff29]">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel index="06" title="Certifications" />
              <div className="space-y-2.5">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="border border-[#1f242d] bg-[#0e1016] p-3.5">
                    <div className="text-xs font-bold text-[#f4f4f0]">{c.name}</div>
                    <div className="font-mono-tech text-[11px] text-[#8b949e] mt-1">
                      {c.issuer} · {c.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- DEDICATED A4 RESUME SECTION ---------------- */}
      <section id="resume" className="border-b border-[#1f242d] bg-[#0c0e13]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="no-print flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <SectionLabel index="07" title="Resume · A4 ATS Document" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f4f0]">
                Read, Print, or Export as A4 PDF
              </h2>
              <p className="text-sm text-[#8b949e] mt-1">
                Formatted to exact A4 (210 × 297 mm) dimensions for recruiters and ATS parsers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c8ff29] text-[#08090c] font-mono-tech text-xs font-extrabold uppercase tracking-wider hover:bg-[#d8ff66] transition-all disabled:opacity-60 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloading ? "Generating PDF..." : "Download A4 PDF"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#2d3340] bg-[#0e1016] text-[#f4f4f0] font-mono-tech text-xs font-bold uppercase tracking-wider hover:border-[#c8ff29] hover:text-[#c8ff29] transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print A4
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#2d3340] bg-[#0e1016] text-[#f4f4f0] font-mono-tech text-xs font-bold uppercase tracking-wider hover:border-[#c8ff29] hover:text-[#c8ff29] transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#c8ff29]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEmail ? "Email Copied" : "Copy Email"}
              </button>
            </div>
          </div>

          <div className="print-only-container flex justify-center border border-[#1f242d] bg-[#08090c] p-3 sm:p-8">
            <A4ResumeSheet sheetRef={resumeRef} />
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c8ff29]">
              LET&apos;S CONNECT
            </div>
            <p className="text-lg font-bold text-[#f4f4f0] mt-1">
              Open to full-stack, AI/ML &amp; DevOps roles.
            </p>
            <p className="font-mono-tech text-xs text-[#8b949e] mt-1">
              © {new Date().getFullYear()} {PROFILE.name} · Built in India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2d3340] bg-[#0e1016] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2d3340] bg-[#0e1016] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2d3340] bg-[#0e1016] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href={PROFILE.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2d3340] bg-[#0e1016] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
