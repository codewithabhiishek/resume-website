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
        filename: 'John_Anderson_Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: A4_WIDTH,
          onclone: (doc: Document) => {
            // Strip Tailwind v4 oklch() stylesheets from the cloned doc so html2canvas never fails parsing oklch
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
              clonedSheet.style.color = '#1e293b';
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
      // Fallback to native A4 print dialog if canvas export is blocked
      window.print();
    } finally {
      setIsDownloading(false);
    }
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
              Resume · A4 Preview
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

      {/* Centered A4 Viewport (fits 100% on desktop without scrolling) */}
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
                    padding: '34px 42px',
                  }
                : { padding: '24px 20px' }
            }
          >
            {/* Header */}
            <div>
              <header style={{ borderBottom: '2px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                <h1
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    color: '#0f172a',
                    margin: 0,
                  }}
                >
                  John Anderson
                </h1>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#1d4ed8',
                    marginTop: '3px',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Senior Software Engineer · Full-Stack &amp; Cloud Architecture
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '6px 18px',
                    marginTop: '8px',
                    fontSize: '11.5px',
                    color: '#475569',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  <span>San Francisco, CA 94102</span>
                  <span>•</span>
                  <span>(555) 123-4567</span>
                  <span>•</span>
                  <span>john.anderson@email.com</span>
                  <span>•</span>
                  <span>linkedin.com/in/johnanderson</span>
                </div>
              </header>

              {/* Professional Summary */}
              <section style={{ marginBottom: '14px' }}>
                <h2
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#0f172a',
                    borderBottom: '1px solid #cbd5e1',
                    paddingBottom: '3px',
                    marginBottom: '6px',
                  }}
                >
                  Professional Summary
                </h2>
                <p style={{ fontSize: '12px', lineHeight: 1.48, color: '#334155', margin: 0 }}>
                  Results-driven Software Engineer with 5+ years of experience in designing, developing, and deploying scalable web applications. Proficient in modern JavaScript frameworks, cloud technologies, and agile methodologies. Proven track record of delivering high-quality solutions that improve user experience and drive business growth.
                </p>
              </section>

              {/* Professional Experience */}
              <section style={{ marginBottom: '14px' }}>
                <h2
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#0f172a',
                    borderBottom: '1px solid #cbd5e1',
                    paddingBottom: '3px',
                    marginBottom: '8px',
                  }}
                >
                  Professional Experience
                </h2>

                {/* Job 1 */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Senior Software Engineer</span>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#475569' }}> — TechCorp Solutions Inc.</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>Jan 2022 – Present</span>
                  </div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '11.8px', lineHeight: 1.42, color: '#334155' }}>
                    <li>Led a team of 5 developers in building a microservices-based platform serving 2M+ users.</li>
                    <li>Reduced application load time by 40% through code optimization and caching strategies.</li>
                    <li>Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%.</li>
                    <li>Mentored junior developers and conducted code reviews to maintain code quality standards.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Software Engineer</span>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#475569' }}> — WebDev Agency LLC</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>Jun 2019 – Dec 2021</span>
                  </div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '11.8px', lineHeight: 1.42, color: '#334155' }}>
                    <li>Developed and maintained 15+ client-facing web applications using React and Node.js.</li>
                    <li>Collaborated with UX/UI designers to implement responsive, accessible interfaces.</li>
                    <li>Built RESTful APIs and integrated third-party services (Stripe, Twilio, AWS) with 98% CSAT.</li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Junior Developer</span>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#475569' }}> — StartupHub Technologies</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>Aug 2017 – May 2019</span>
                  </div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '11.8px', lineHeight: 1.42, color: '#334155' }}>
                    <li>Assisted in full-stack development of an e-commerce platform using React and Express.</li>
                    <li>Wrote unit and integration tests achieving 85% automated code coverage.</li>
                  </ul>
                </div>
              </section>

              {/* Key Projects */}
              <section style={{ marginBottom: '14px' }}>
                <h2
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#0f172a',
                    borderBottom: '1px solid #cbd5e1',
                    paddingBottom: '3px',
                    marginBottom: '8px',
                  }}
                >
                  Key Projects
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>TaskFlow</span>
                      <span style={{ fontSize: '10.5px', color: '#1d4ed8', fontFamily: 'system-ui, sans-serif' }}>React, Node.js, PostgreSQL</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', lineHeight: 1.4, color: '#334155' }}>
                      Real-time collaborative project manager with drag-and-drop Kanban boards, team chat, and reporting for 500+ users.
                    </p>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>ShopSmart</span>
                      <span style={{ fontSize: '10.5px', color: '#1d4ed8', fontFamily: 'system-ui, sans-serif' }}>Next.js, Stripe, MongoDB</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', lineHeight: 1.4, color: '#334155' }}>
                      Full-stack e-commerce platform with checkout, inventory management, and analytics driving $50K+ first-year sales.
                    </p>
                  </div>
                </div>
              </section>

              {/* Technical Skills */}
              <section style={{ marginBottom: '14px' }}>
                <h2
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#0f172a',
                    borderBottom: '1px solid #cbd5e1',
                    paddingBottom: '3px',
                    marginBottom: '6px',
                  }}
                >
                  Technical Skills
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '4px 20px', fontSize: '11.8px', lineHeight: 1.45, color: '#334155' }}>
                  <div><strong style={{ color: '#0f172a' }}>Languages:</strong> JavaScript, TypeScript, Python, HTML5, CSS3, SQL</div>
                  <div><strong style={{ color: '#0f172a' }}>Frameworks:</strong> React, Next.js, Node.js, Express, Django, Tailwind</div>
                  <div><strong style={{ color: '#0f172a' }}>Databases:</strong> PostgreSQL, MongoDB, Redis, Firebase</div>
                  <div><strong style={{ color: '#0f172a' }}>Tools &amp; Cloud:</strong> Git, Docker, AWS, Vercel, Figma, Jira</div>
                  <div><strong style={{ color: '#0f172a' }}>Practices:</strong> Agile/Scrum, TDD, CI/CD, REST, GraphQL</div>
                  <div><strong style={{ color: '#0f172a' }}>Soft Skills:</strong> Leadership, Communication, Problem-Solving</div>
                </div>
              </section>

              {/* Education & Certifications side-by-side */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <section>
                  <h2
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#0f172a',
                      borderBottom: '1px solid #cbd5e1',
                      paddingBottom: '3px',
                      marginBottom: '6px',
                    }}
                  >
                    Education
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>B.S. Computer Science</span>
                    <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>2013 – 2017</span>
                  </div>
                  <p style={{ fontSize: '11.8px', fontStyle: 'italic', color: '#475569', margin: '2px 0' }}>
                    University of California, Berkeley
                  </p>
                  <p style={{ fontSize: '11.2px', color: '#334155', margin: 0, lineHeight: 1.4 }}>
                    GPA: 3.7/4.0 · Dean&apos;s List (6 semesters)
                  </p>
                </section>

                <section>
                  <h2
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#0f172a',
                      borderBottom: '1px solid #cbd5e1',
                      paddingBottom: '3px',
                      marginBottom: '6px',
                    }}
                  >
                    Certifications
                  </h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '11.5px', lineHeight: 1.48, color: '#334155' }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong style={{ color: '#0f172a' }}>AWS Solutions Architect</strong> · AWS</span>
                      <span style={{ color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>2023</span>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong style={{ color: '#0f172a' }}>Google Cloud Developer</strong> · GCP</span>
                      <span style={{ color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>2022</span>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong style={{ color: '#0f172a' }}>Meta Front-End Developer</strong> · Coursera</span>
                      <span style={{ color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>2021</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '10.5px', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
                References available upon request
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
