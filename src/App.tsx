import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Maximize2,
  Minimize2,
  Printer,
} from "lucide-react";
import { A4ResumeSheet, A4_HEIGHT, A4_WIDTH } from "./components/A4ResumeSheet";
import { PROFILE } from "./data/resumeData";

const QUICK_INFO = [
  { key: "20+", val: "LIVE APPLICATIONS" },
  { key: "OSS", val: "ARGO CD CONTRIBUTOR" },
  { key: "#08", val: "INTERNATIONAL HACKATHON" },
  { key: "6.0", val: "MSME IDEA SHORTLISTED" },
];

const STACK_GROUPS = [
  { label: "CORE", items: ["Python", "TypeScript", "React", "FastAPI"] },
  { label: "AI/ML", items: ["YOLOv8"] },
  { label: "INFRA", items: ["Docker", "Kubernetes", "Terraform", "Argo CD"] },
];

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const previewAreaRef = useRef<HTMLElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [zoomMode, setZoomMode] = useState<"fit" | "full">("fit");
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const updateScale = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop) {
        setScale(1);
        return;
      }
      if (zoomMode === "full") {
        setScale(1);
        return;
      }
      const area = previewAreaRef.current;
      const availW = (area ? area.clientWidth : window.innerWidth - 340) - 56;
      const availH = (area ? area.clientHeight : window.innerHeight) - 72;
      const next = Math.min(1, availW / A4_WIDTH, availH / A4_HEIGHT);
      setScale(Math.max(0.45, next));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [zoomMode]);

  const handleDownloadPDF = useCallback(async () => {
    if (!resumeRef.current || isDownloading) return;
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
            doc
              .querySelectorAll('style, link[rel="stylesheet"]')
              .forEach((node) => {
                if (
                  node.tagName === "STYLE" &&
                  node.textContent?.includes("oklch")
                ) {
                  node.remove();
                } else if (node.tagName === "LINK") {
                  node.remove();
                }
              });
            const clonedSheet = doc.getElementById("resume-a4-sheet");
            if (clonedSheet) {
              clonedSheet.style.transform = "none";
              clonedSheet.style.width = `${A4_WIDTH}px`;
              clonedSheet.style.height = `${A4_HEIGHT - 1}px`;
              clonedSheet.style.minHeight = `${A4_HEIGHT - 1}px`;
              clonedSheet.style.overflow = "hidden";
              clonedSheet.style.padding = "32px 42px";
              clonedSheet.style.backgroundColor = "#ffffff";
              clonedSheet.style.color = "#1e293b";
              clonedSheet.style.fontFamily =
                "'Georgia', 'Times New Roman', serif";
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
  }, [isDownloading]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  }, []);

  // Keyboard shortcuts: D = Download PDF, P = Print, Z = Toggle Zoom
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "d") {
        e.preventDefault();
        void handleDownloadPDF();
      } else if (k === "p") {
        e.preventDefault();
        window.print();
      } else if (k === "z") {
        e.preventDefault();
        setZoomMode((m) => (m === "fit" ? "full" : "fit"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDownloadPDF]);

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-[#08090c] text-[#f4f4f0]">
      {/* ---------------- MOBILE STICKY ACTION BAR ---------------- */}
      <header className="no-print lg:hidden sticky top-0 z-50 border-b border-[#1f242d] bg-[#0c0e13]/95 backdrop-blur-sm px-3.5 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-[#f4f4f0] truncate">
              ABHIISHEK JAIN
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[#c8ff29]/30 bg-[#c8ff29]/10 font-mono-tech text-[9px] font-bold text-[#c8ff29] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff29] animate-pulse" />
              OPEN
            </span>
          </div>
          <div className="font-mono-tech text-[10px] text-[#8b949e] truncate">
            FULL-STACK × AI/ML × DEVOPS
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c8ff29] text-[#08090c] font-mono-tech text-[10px] font-extrabold uppercase tracking-wider cursor-pointer disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? "..." : "PDF"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            aria-label="Print Resume"
            className="p-1.5 border border-[#2d3340] bg-[#08090c] text-[#f4f4f0] cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email Me"
            className="p-1.5 border border-[#2d3340] bg-[#08090c] text-[#f4f4f0]"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ---------------- FIXED LEFT SIDEBAR (DESKTOP 320-340px) ---------------- */}
      <aside className="no-print hidden lg:flex lg:w-[320px] xl:w-[340px] shrink-0 h-screen flex-col justify-between border-r border-[#1f242d] bg-[#0c0e13] blueprint-grid p-5 overflow-y-auto">
        <div className="space-y-4">
          {/* A. Identity Block */}
          <div className="relative border border-[#2d3340] bg-[#08090c] p-4">
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#c8ff29]" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#c8ff29]" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#c8ff29]" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#c8ff29]" />

            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="font-mono-tech text-[10px] tracking-[0.2em] text-[#8b949e]">
                ID // 01
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#c8ff29]/35 bg-[#c8ff29]/10 font-mono-tech text-[10px] font-bold tracking-widest text-[#c8ff29]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff29] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8ff29]" />
                </span>
                OPEN TO WORK
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#f4f4f0]">
              ABHIISHEK JAIN
            </h1>
            <p className="font-mono-tech text-[11px] font-bold tracking-wide text-[#c8ff29] mt-1">
              FULL-STACK × AI/ML × DEVOPS
            </p>
          </div>

          {/* B. Resume Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#c8ff29] text-[#08090c] font-mono-tech text-xs font-extrabold uppercase tracking-wider hover:bg-[#d7ff5c] active:translate-y-px transition-all disabled:opacity-60 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                {isDownloading ? "GENERATING PDF..." : "DOWNLOAD RESUME"}
              </span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-[#08090c]/15 border border-[#08090c]/25">
                D
              </kbd>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center justify-between px-2.5 py-2 border border-[#2d3340] bg-[#08090c] text-[#f4f4f0] font-mono-tech text-[10.5px] font-bold uppercase tracking-wider hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5" />
                  PRINT
                </span>
                <kbd className="text-[9px] text-[#8b949e]">P</kbd>
              </button>
              <div className="flex border border-[#2d3340] bg-[#08090c]">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 font-mono-tech text-[10.5px] font-bold uppercase tracking-wider text-[#f4f4f0] hover:text-[#c8ff29] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  EMAIL
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  aria-label="Copy email address"
                  className="px-2 border-l border-[#2d3340] text-[#8b949e] hover:text-[#c8ff29] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-[#c8ff29]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* C. Quick Information (editorial hairline list) */}
          <div className="border-t border-[#1f242d] pt-3">
            <div className="font-mono-tech text-[10px] tracking-[0.2em] text-[#8b949e] mb-2">
              HIGHLIGHTS //
            </div>
            <div className="divide-y divide-[#1f242d] border-y border-[#1f242d]">
              {QUICK_INFO.map((item) => (
                <div key={item.val} className="py-1.5 flex items-baseline justify-between gap-2">
                  <span className="font-mono-tech text-xs font-bold text-[#c8ff29] shrink-0">
                    {item.key}
                  </span>
                  <span className="font-mono-tech text-[10.5px] tracking-wider text-[#f4f4f0] text-right">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* D. Technical Stack */}
          <div>
            <div className="font-mono-tech text-[10px] tracking-[0.2em] text-[#8b949e] mb-2">
              TECH STACK //
            </div>
            <div className="space-y-2">
              {STACK_GROUPS.map((group) => (
                <div key={group.label} className="flex items-start gap-2">
                  <span className="font-mono-tech text-[9.5px] font-bold text-[#8b949e] w-10 pt-1 shrink-0">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 border border-[#2d3340] bg-[#08090c] font-mono-tech text-[10px] text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. External Links */}
          <div className="border-t border-[#1f242d] pt-3">
            <div className="font-mono-tech text-[10px] tracking-[0.2em] text-[#8b949e] mb-2">
              LINKS //
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 py-2 border border-[#2d3340] bg-[#08090c] font-mono-tech text-[10.5px] font-bold text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 py-2 border border-[#2d3340] bg-[#08090c] font-mono-tech text-[10.5px] font-bold text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
              >
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </a>
              <a
                href={PROFILE.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 py-2 border border-[#2d3340] bg-[#08090c] font-mono-tech text-[10.5px] font-bold text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* F. Sidebar Footer */}
        <footer className="border-t border-[#1f242d] pt-3 mt-4 grid grid-cols-2 gap-x-3 gap-y-1 font-mono-tech text-[9.5px] text-[#8b949e]">
          <div className="flex justify-between">
            <span>DOCUMENT:</span>
            <span className="text-[#f4f4f0]">RESUME.PDF</span>
          </div>
          <div className="flex justify-between">
            <span>FORMAT:</span>
            <span className="text-[#f4f4f0]">A4</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS:</span>
            <span className="text-[#c8ff29]">ATS READY</span>
          </div>
          <div className="flex justify-between">
            <span>VERSION:</span>
            <span className="text-[#f4f4f0]">2026</span>
          </div>
        </footer>
      </aside>

      {/* ---------------- MAIN RESUME PREVIEW AREA ---------------- */}
      <main
        ref={previewAreaRef}
        className={`print-stage flex-1 min-w-0 min-h-0 relative blueprint-grid flex flex-col items-center ${
          zoomMode === "full" && isDesktop
            ? "overflow-auto justify-start py-6 px-4"
            : "overflow-y-auto lg:overflow-hidden justify-center p-3 sm:p-5 lg:p-6"
        }`}
      >
        {/* Subtle ambient spotlight behind the A4 sheet */}
        <div
          className="no-print pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 48%, rgba(200, 255, 41, 0.045), transparent 58%)",
          }}
        />

        {/* Subtle floating document metadata + optional zoom toggle (desktop) */}
        <div className="no-print hidden lg:flex items-center justify-between w-full max-w-[840px] mb-2.5 px-1 font-mono-tech text-[10px] tracking-[0.18em] text-[#8b949e] relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c8ff29]" />
            <span>A4 PORTRAIT · 210 × 297 MM · ATS VERIFIED</span>
          </div>
          <button
            type="button"
            onClick={() => setZoomMode((m) => (m === "fit" ? "full" : "fit"))}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[#2d3340] bg-[#0c0e13] text-[#f4f4f0] hover:border-[#c8ff29] hover:text-[#c8ff29] transition-colors cursor-pointer"
          >
            {zoomMode === "fit" ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            <span>{zoomMode === "fit" ? `FIT (${Math.round(scale * 100)}%)` : "100% A4"}</span>
            <kbd className="text-[9px] text-[#8b949e] ml-0.5">Z</kbd>
          </button>
        </div>

        {/* Centered A4 Resume Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="a4-scale-wrapper shrink-0 relative z-10"
          style={
            isDesktop
              ? {
                  width: `${A4_WIDTH * scale}px`,
                  height: `${A4_HEIGHT * scale}px`,
                }
              : { width: "100%", maxWidth: `${A4_WIDTH}px` }
          }
        >
          <div
            style={
              isDesktop
                ? {
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    width: `${A4_WIDTH}px`,
                  }
                : undefined
            }
          >
            <A4ResumeSheet sheetRef={resumeRef} />
          </div>
        </motion.div>

        {/* Mobile Footer Links */}
        <div className="no-print lg:hidden w-full max-w-[794px] mt-4 pt-3 border-t border-[#1f242d] flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px] text-[#8b949e]">
          <span>RESUME.PDF · A4 · ATS READY</span>
          <div className="flex items-center gap-3">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#c8ff29]">
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#c8ff29]">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#c8ff29]">
              Portfolio <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
