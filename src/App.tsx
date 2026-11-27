import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const ACCENTS = {
  lime: { label: 'LIME', hex: '#a3ff47', text: '#070b14' },
  cyan: { label: 'CYAN', hex: '#38bdf8', text: '#070b14' },
  coral: { label: 'CORAL', hex: '#fb7185', text: '#070b14' },
} as const;

type AccentKey = keyof typeof ACCENTS;
type ResumeSection = 'education' | 'skills' | 'experience' | 'projects' | 'leadership' | 'certifications' | null;

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [accentKey, setAccentKey] = useState<AccentKey>('lime');
  const [activeSection, setActiveSection] = useState<ResumeSection>(null);
  const [zoomFull, setZoomFull] = useState(false);
  const [scale, setScale] = useState(1);
  const accent = ACCENTS[accentKey];
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 860 : true
  );

  useEffect(() => {
    const updateScale = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop) {
        setScale(1);
        return;
      }
      // Account for left sidebar + gaps/padding
      const availW = window.innerWidth - 390;
      const availH = window.innerHeight - 40;
      const next = zoomFull ? 1 : Math.min(1, availW / A4_WIDTH, availH / A4_HEIGHT);
      setScale(Math.max(0.48, next));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [zoomFull]);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      const element = resumeRef.current;

      const opt = {
        margin: 0,
        filename: 'Abhishek_Jain_Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: A4_WIDTH,
          onclone: (doc: Document) => {
            doc.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
              if (node.tagName === 'STYLE' && node.textContent?.includes('oklch')) {
                node.remove();
              } else if (node.tagName === 'LINK') {
                node.remove();
              }
            });
            const clonedSheet = doc.getElementById('resume-a4-sheet');
            if (clonedSheet) {
              clonedSheet.style.transform = 'none';
              clonedSheet.style.width = `${A4_WIDTH}px`;
              clonedSheet.style.minHeight = `${A4_HEIGHT}px`;
              clonedSheet.style.display = 'flex';
              clonedSheet.style.flexDirection = 'column';
              clonedSheet.style.justifyContent = 'space-between';
              clonedSheet.style.backgroundColor = '#ffffff';
              clonedSheet.style.color = '#111827';
              clonedSheet.style.fontFamily = "'Georgia', 'Times New Roman', serif";
              clonedSheet.style.boxSizing = 'border-box';
              clonedSheet.style.boxShadow = 'none';
              clonedSheet.style.border = 'none';
            }
          },
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#0f172a',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '2px',
    marginBottom: '6px',
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contactabhiishek101@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row relative"
      style={{
        backgroundColor: '#070b14',
        backgroundImage:
          'radial-gradient(circle at 15% 15%, rgba(163, 255, 71, 0.08), transparent 38%), radial-gradient(circle at 85% 80%, rgba(56, 189, 248, 0.1), transparent 42%), linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 100% 100%, 32px 32px, 32px 32px',
      }}
    >
      {/* Mobile Top Bar */}
      <div
        className="no-print lg:hidden shrink-0 z-50 px-4 py-2.5 flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(9, 13, 22, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '2px solid #1e293b',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#a3ff47', boxShadow: '0 0 10px #a3ff47' }}
          />
          <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#f8fafc', fontFamily: 'ui-monospace, monospace' }}>
            ABHISHEK.DEV
          </span>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-md transition-transform active:translate-y-0.5 disabled:opacity-60 cursor-pointer"
          style={{
            backgroundColor: '#a3ff47',
            color: '#070b14',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0 #000000',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          {isDownloading ? 'EXPORTING...' : '⚡ PDF (A4)'}
        </button>
      </div>

      {/* Gen-Z Neo-Brutalist Bento Sidebar */}
      <aside
        className="no-print hidden lg:flex lg:w-[330px] xl:w-[360px] shrink-0 flex-col justify-between p-5 relative z-10"
        style={{
          backgroundColor: 'rgba(10, 15, 28, 0.88)',
          backdropFilter: 'blur(12px)',
          borderRight: '2px solid #1e293b',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}
      >
        <div className="space-y-3.5">
          {/* Status + Identity Card */}
          <div
            className="p-4 rounded-xl"
            style={{
              backgroundColor: '#0f172a',
              border: '2px solid #334155',
              boxShadow: `4px 4px 0 ${accent.hex}`,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: `${accent.hex}1f`,
                  color: accent.hex,
                  border: `1px solid ${accent.hex}55`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
                />
                OPEN TO WORK
              </div>
              <div className="flex items-center gap-1">
                {(Object.keys(ACCENTS) as AccentKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setAccentKey(k)}
                    aria-label={`Theme ${ACCENTS[k].label}`}
                    className="w-3.5 h-3.5 rounded-full cursor-pointer transition-transform hover:scale-125"
                    style={{
                      backgroundColor: ACCENTS[k].hex,
                      border: accentKey === k ? '2px solid #ffffff' : '1px solid #0f172a',
                    }}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight uppercase" style={{ color: '#ffffff' }}>
              Abhishek Jain
            </h2>
            <p className="text-[11px] mt-1 font-medium" style={{ color: accent.hex, fontFamily: "'JetBrains Mono', monospace" }}>
              FULL-STACK × AI/ML × DEVOPS
            </p>
          </div>

          {/* Chunky Primary Actions */}
          <div className="space-y-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{
                backgroundColor: accent.hex,
                color: accent.text,
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 #000000',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {isDownloading ? '⏳ GENERATING A4 PDF...' : '⚡ DOWNLOAD A4 PDF'}
            </button>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                  backgroundColor: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                🖨️ PRINT
              </button>
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                  backgroundColor: copiedEmail ? accent.hex : '#1e293b',
                  color: copiedEmail ? accent.text : accent.hex,
                  border: '1px solid #334155',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {copiedEmail ? '✓ COPIED' : '📋 EMAIL'}
              </button>
              <button
                onClick={() => setZoomFull((z) => !z)}
                className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                  backgroundColor: zoomFull ? '#f8fafc' : '#1e293b',
                  color: zoomFull ? '#070b14' : '#f8fafc',
                  border: '1px solid #334155',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {zoomFull ? 'FIT' : '100%'}
              </button>
            </div>
          </div>

          {/* Interactive Section Spotlight */}
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                SPOTLIGHT SECTION
              </span>
              {activeSection && (
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  className="text-[10px] font-bold cursor-pointer"
                  style={{ color: accent.hex, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  CLEAR
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(
                [
                  ['education', 'EDU'],
                  ['skills', 'SKILLS'],
                  ['experience', 'EXP'],
                  ['projects', 'PROJECTS'],
                  ['leadership', 'LEAD'],
                  ['certifications', 'CERTS'],
                ] as const
              ).map(([key, label]) => {
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(isActive ? null : key)}
                    className="py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                    style={{
                      backgroundColor: isActive ? accent.hex : '#1e293b',
                      color: isActive ? accent.text : '#cbd5e1',
                      border: `1px solid ${isActive ? '#000' : '#334155'}`,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bento Highlights */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b', boxShadow: '3px 3px 0 #020617' }}
            >
              <div className="font-black text-base" style={{ color: '#a3ff47', fontFamily: 'ui-monospace, monospace' }}>20+</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: '#94a3b8' }}>Live Apps</div>
            </div>
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b', boxShadow: '3px 3px 0 #020617' }}
            >
              <div className="font-black text-base" style={{ color: '#38bdf8', fontFamily: 'ui-monospace, monospace' }}>ARGO CD</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: '#94a3b8' }}>OSS Contrib</div>
            </div>
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b', boxShadow: '3px 3px 0 #020617' }}
            >
              <div className="font-black text-base" style={{ color: '#fbbf24', fontFamily: 'ui-monospace, monospace' }}>#8 INT&apos;L</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: '#94a3b8' }}>Hackathon</div>
            </div>
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b', boxShadow: '3px 3px 0 #020617' }}
            >
              <div className="font-black text-base" style={{ color: '#f472b6', fontFamily: 'ui-monospace, monospace' }}>MSME 6.0</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: '#94a3b8' }}>Shortlisted</div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b' }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#94a3b8', fontFamily: 'ui-monospace, monospace' }}>
              CORE STACK
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'TypeScript', 'React', 'FastAPI', 'YOLOv8', 'Docker', 'K8s', 'Argo CD'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Links */}
          <div className="grid grid-cols-3 gap-2 text-[11px] font-bold" style={{ fontFamily: 'ui-monospace, monospace' }}>
            <a
              href="https://abhiishek.is-a.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 rounded-lg text-center transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#1e293b', color: '#a3ff47', border: '1px solid #334155' }}
            >
              WEB ↗
            </a>
            <a
              href="https://github.com/codewithabhiishek"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 rounded-lg text-center transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
            >
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/codewithabhiishek"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 rounded-lg text-center transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155' }}
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider" style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>
          <span>A4 · 210×297MM</span>
          <span style={{ color: '#a3ff47' }}>ATS READY</span>
        </div>
      </aside>

      {/* Centered A4 Viewport */}
      <main
        className={`flex-1 min-h-0 flex items-center justify-center p-3 lg:p-5 relative z-10 ${
          zoomFull ? 'overflow-auto items-start' : 'overflow-y-auto lg:overflow-hidden'
        }`}
      >
        <div
          className="a4-scale-wrapper"
          style={
            isDesktop
              ? {
                  width: `${A4_WIDTH * scale}px`,
                  height: `${A4_HEIGHT * scale}px`,
                }
              : { width: '100%', maxWidth: `${A4_WIDTH}px` }
          }
        >
          <div
            id="resume-a4-sheet"
            ref={resumeRef}
            className="a4-sheet flex flex-col justify-between"
            style={
              isDesktop
                ? {
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    padding: '32px 42px',
                  }
                : { padding: '22px 18px' }
            }
          >
            <div>
              {/* Header */}
              <header style={{ textAlign: 'center', marginBottom: '12px' }}>
                <h1
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  Abhishek Jain
                </h1>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px 8px',
                    marginTop: '5px',
                    fontSize: '11.5px',
                    color: '#1e293b',
                  }}
                >
                  <span>+91 9548469164</span>
                  <span>|</span>
                  <a
                    href="mailto:contactabhiishek101@gmail.com"
                    style={{ color: '#0f172a', textDecoration: 'underline' }}
                  >
                    contactabhiishek101@gmail.com
                  </a>
                  <span>|</span>
                  <a
                    href="https://www.linkedin.com/in/codewithabhiishek"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0f172a', textDecoration: 'underline' }}
                  >
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/codewithabhiishek"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0f172a', textDecoration: 'underline' }}
                  >
                    GitHub
                  </a>
                  <span>|</span>
                  <a
                    href="https://abhiishek.is-a.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0f172a', textDecoration: 'underline' }}
                  >
                    Portfolio
                  </a>
                </div>
              </header>

              {/* EDUCATION */}
              <section
                style={{
                  marginBottom: '10px',
                  opacity: activeSection && activeSection !== 'education' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Education</h2>
                <div style={{ marginBottom: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>DBS Global University</span>
                    <span style={{ fontSize: '11.5px', color: '#1e293b' }}>2023 – 2026</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11.5px', fontStyle: 'italic', color: '#334155' }}>
                    <span>Bachelor of Computer Applications</span>
                    <span>CGPA: 7.48</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>Jim Corbett Public School</span>
                    <span style={{ fontSize: '11.5px', color: '#1e293b' }}>2023</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11.5px', fontStyle: 'italic', color: '#334155' }}>
                    <span>Class XII</span>
                    <span>74.89%</span>
                  </div>
                </div>
              </section>

              {/* TECHNICAL SKILLS */}
              <section
                style={{
                  marginBottom: '10px',
                  opacity: activeSection && activeSection !== 'skills' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Technical Skills</h2>
                <div style={{ fontSize: '11.5px', lineHeight: 1.42, color: '#1e293b' }}>
                  <div><strong style={{ color: '#0f172a' }}>Languages:</strong> Python, TypeScript, SQL, Bash</div>
                  <div><strong style={{ color: '#0f172a' }}>Frontend:</strong> React, Vite, Tailwind CSS</div>
                  <div><strong style={{ color: '#0f172a' }}>Backend:</strong> FastAPI, WebSockets, SQLModel, SQLite</div>
                  <div><strong style={{ color: '#0f172a' }}>AI/ML:</strong> YOLOv8, ByteTrack, OpenCV, XGBoost, scikit-learn</div>
                  <div><strong style={{ color: '#0f172a' }}>DevOps:</strong> Docker, Kubernetes, Jenkins, Terraform, Git, GitHub Actions, Argo CD</div>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section
                style={{
                  marginBottom: '10px',
                  opacity: activeSection && activeSection !== 'experience' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Experience</h2>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>Freelance Software Engineer</span>
                    <span style={{ fontSize: '11.5px', color: '#1e293b' }}>2025 – 2026</span>
                  </div>
                  <div style={{ fontSize: '11.5px', fontStyle: 'italic', color: '#334155', marginBottom: '3px' }}>
                    Self-Employed
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.3px', lineHeight: 1.38, color: '#1e293b' }}>
                    <li>Built and deployed full-stack client web applications end-to-end — frontend, backend, API integration, and deployment.</li>
                    <li>Shipped production software including an inventory &amp; billing system, a CRM platform, and a business website for a dental practice.</li>
                    <li>Partnered directly with clients from requirements through launch, delivering working, deployed products.</li>
                    <li>
                      <strong style={{ color: '#0f172a' }}>Selected Work:</strong>{' '}
                      <span style={{ textDecoration: 'underline' }}>Inventory &amp; Billing System</span> |{' '}
                      <span style={{ textDecoration: 'underline' }}>CRM Platform</span> |{' '}
                      <span style={{ textDecoration: 'underline' }}>Dentist Website</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* PROJECTS */}
              <section
                style={{
                  marginBottom: '10px',
                  opacity: activeSection && activeSection !== 'projects' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Projects</h2>

                {/* Project 1 */}
                <div style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#0f172a' }}>
                      <strong style={{ textDecoration: 'underline' }}>ChargeIQ — EV Route Planner</strong>{' '}
                      <span style={{ color: '#475569' }}>|</span>{' '}
                      <span style={{ fontStyle: 'italic', fontSize: '11px', color: '#334155' }}>
                        React, Vite, FastAPI, Python, OSRM, OpenChargeMap, XGBoost, scikit-learn
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#1e293b', whiteSpace: 'nowrap' }}>2026</span>
                  </div>
                  <ul style={{ margin: '2px 0 0 0', paddingLeft: '18px', fontSize: '11.3px', lineHeight: 1.38, color: '#1e293b' }}>
                    <li>Built a full-stack EV trip planner with OSRM and OpenChargeMap, cutting charging-stop planning time by 30%.</li>
                    <li>Trained XGBoost and scikit-learn models to predict station wait times and improve route reliability.</li>
                    <li>Designed a hybrid real/estimated data system with a 10% battery reserve safety margin.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#0f172a' }}>
                      <strong style={{ textDecoration: 'underline' }}>Traffic Intelligence Platform</strong>{' '}
                      <span style={{ color: '#475569' }}>|</span>{' '}
                      <span style={{ fontStyle: 'italic', fontSize: '11px', color: '#334155' }}>
                        YOLOv8n, ByteTrack, OpenCV, FastAPI, React 19, WebSockets
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#1e293b', whiteSpace: 'nowrap' }}>2026</span>
                  </div>
                  <ul style={{ margin: '2px 0 0 0', paddingLeft: '18px', fontSize: '11.3px', lineHeight: 1.38, color: '#1e293b' }}>
                    <li>Built an AI traffic monitoring platform using YOLOv8n, ByteTrack, and OpenCV for real-time vehicle detection and tracking.</li>
                    <li>Added speed estimation, zone-violation detection, and JWT role-based access control.</li>
                    <li>Streamed live telemetry at 30 FPS, cutting manual monitoring needs by 60% for site operators.</li>
                    <li>
                      <strong style={{ color: '#0f172a' }}>Additional Projects:</strong> 20+ live, working apps (full-stack, AI/ML, cloud) — see all at{' '}
                      <a
                        href="https://abhiishek.is-a.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0f172a', textDecoration: 'underline' }}
                      >
                        abhiishek.is-a.dev
                      </a>
                      .
                    </li>
                    <li>
                      <strong style={{ color: '#0f172a' }}>Open Source:</strong> Contributor to Argo CD (Docker Hub webhook parser, namespace validation UX) —{' '}
                      <a
                        href="https://github.com/codewithabhiishek"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0f172a', textDecoration: 'underline' }}
                      >
                        GitHub
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* LEADERSHIP */}
              <section
                style={{
                  marginBottom: '10px',
                  opacity: activeSection && activeSection !== 'leadership' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Leadership</h2>
                <div style={{ marginBottom: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                      Hackathon Organizer (SIH Internal Round)
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#1e293b' }}>2025</span>
                  </div>
                  <div style={{ fontSize: '11.2px', fontStyle: 'italic', color: '#334155', marginBottom: '2px' }}>
                    DBS Global University
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.3px', lineHeight: 1.36, color: '#1e293b' }}>
                    <li>Coordinated logistics for 50+ teams and 200+ participants.</li>
                    <li>Drove 15+ functional prototypes and a 20% rise in student participation year-over-year.</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '5px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    International Hackathon Winner
                  </div>
                  <div style={{ fontSize: '11.3px', fontStyle: 'italic', color: '#1e293b' }}>
                    Secured 8th rank in an International Hackathon at Christ University, Delhi NCR
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#0f172a' }}>
                      <strong>MSME Idea Hackathon 6.0</strong>{' '}
                      <span style={{ color: '#475569' }}>|</span>{' '}
                      <span style={{ fontStyle: 'italic', fontSize: '11.2px', color: '#334155' }}>
                        Host Institute: Bennett University, Noida
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#1e293b', whiteSpace: 'nowrap' }}>2026</span>
                  </div>
                  <div style={{ fontSize: '11.3px', fontStyle: 'italic', color: '#1e293b' }}>
                    Shortlisted for Pitch Round; cleared Host Institute Round with Expert Committee backing; awaiting funding.
                  </div>
                </div>
              </section>

              {/* CERTIFICATIONS */}
              <section
                style={{
                  opacity: activeSection && activeSection !== 'certifications' ? 0.28 : 1,
                  transition: 'opacity 180ms ease',
                }}
              >
                <h2 style={sectionHeadingStyle}>Certifications</h2>
                <div style={{ fontSize: '11.5px', lineHeight: 1.45, color: '#1e293b' }}>
                  <div>
                    <strong style={{ color: '#0f172a' }}>IBM DevOps and Software Engineering Specialization</strong> – IBM, Mar 2024
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Linux Commands &amp; Shell Scripting Essentials V2</strong> – Coursera, Mar 2024
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
