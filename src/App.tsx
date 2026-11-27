import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 860 : true
  );

  useEffect(() => {
    const updateScale = () => {
      const desktop = window.innerWidth >= 860;
      setIsDesktop(desktop);
      if (!desktop) {
        setScale(1);
        return;
      }
      const availW = window.innerWidth - 40;
      const availH = window.innerHeight - 76;
      const next = Math.min(1, availW / A4_WIDTH, availH / A4_HEIGHT);
      setScale(Math.max(0.45, next));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col"
      style={{ backgroundColor: '#e2e8f0' }}
    >
      {/* Top Bar */}
      <div
        className="no-print shrink-0 z-50"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #cbd5e1',
        }}
      >
        <div className="max-w-[1000px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-sm sm:text-base" style={{ color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
              Abhishek&apos;s Resume
            </span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF (A4)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Centered A4 Viewport */}
      <main className="flex-1 min-h-0 flex items-center justify-center p-3 lg:p-4 overflow-y-auto lg:overflow-hidden">
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
              <section style={{ marginBottom: '10px' }}>
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
              <section style={{ marginBottom: '10px' }}>
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
              <section style={{ marginBottom: '10px' }}>
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
              <section style={{ marginBottom: '10px' }}>
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
              <section style={{ marginBottom: '10px' }}>
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
              <section>
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
