import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      const element = resumeRef.current;

      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3] as [number, number, number, number],
        filename: 'John_Anderson_Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'landscape' as const,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100 flex flex-col">
      {/* Compact Top Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200 shrink-0 z-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-slate-800 text-sm sm:text-base">Resume</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
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
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Single-Screen Resume Container */}
      <main className="flex-1 min-h-0 p-2.5 sm:p-4 lg:p-5 flex items-center justify-center">
        <div
          ref={resumeRef}
          className="w-full max-w-[1360px] lg:h-full bg-white shadow-lg border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          {/* Header */}
          <header className="px-5 sm:px-8 py-3.5 sm:py-4 border-b-2 border-slate-800 bg-slate-50/70 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shrink-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide uppercase leading-none">
                John Anderson
              </h1>
              <p className="text-xs sm:text-sm text-blue-700 font-semibold mt-1 tracking-wide font-sans">
                Senior Software Engineer · Full-Stack &amp; Cloud Architecture
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-sans">
              <span className="flex items-center gap-1">
                <span className="text-slate-400">📍</span> San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">📞</span> (555) 123-4567
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">✉️</span> john.anderson@email.com
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">🔗</span> linkedin.com/in/johnanderson
              </span>
            </div>
          </header>

          {/* 2-Column Body filling available viewport height cleanly */}
          <div className="flex-1 min-h-0 px-5 sm:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 overflow-y-auto lg:overflow-hidden">
            {/* Left Column: Summary, Skills, Education, Certifications */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3.5 lg:border-r lg:border-slate-200 lg:pr-6">
              {/* Professional Summary */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5 font-sans">
                  Professional Summary
                </h2>
                <p className="text-[12.5px] text-slate-700 leading-snug">
                  Results-driven Software Engineer with 5+ years of experience designing, developing, and deploying scalable web applications. Proficient in modern JavaScript frameworks, cloud technologies, and agile delivery with a strong focus on performance and user experience.
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5 font-sans">
                  Technical Skills
                </h2>
                <div className="space-y-1.5 text-[12px] text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Languages: </span>
                    JavaScript, TypeScript, Python, HTML5, CSS3, SQL
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Frameworks: </span>
                    React, Next.js, Node.js, Express, Django, Tailwind CSS
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Databases: </span>
                    PostgreSQL, MongoDB, Redis, Firebase
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Tools &amp; Cloud: </span>
                    Git, Docker, AWS, Vercel, Figma, Jira
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Practices: </span>
                    Agile/Scrum, TDD, CI/CD, REST, GraphQL
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5 font-sans">
                  Education
                </h2>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[13px] font-semibold text-slate-900 leading-snug">
                    B.S. in Computer Science
                  </h3>
                  <span className="text-[11px] text-slate-500 whitespace-nowrap font-sans">2013 – 2017</span>
                </div>
                <p className="text-[12px] text-slate-600 italic">University of California, Berkeley</p>
                <p className="mt-1 text-[11.5px] text-slate-600 leading-snug">
                  GPA: 3.7/4.0 · Dean&apos;s List (6 semesters) · Data Structures, Algorithms, Web &amp; Database Systems
                </p>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5 font-sans">
                  Certifications
                </h2>
                <ul className="text-[12px] text-slate-700 space-y-1">
                  <li className="flex justify-between items-center gap-2">
                    <span><strong className="text-slate-900">AWS Solutions Architect</strong> · AWS</span>
                    <span className="text-slate-500 text-[11px] font-sans">2023</span>
                  </li>
                  <li className="flex justify-between items-center gap-2">
                    <span><strong className="text-slate-900">Google Cloud Developer</strong> · GCP</span>
                    <span className="text-slate-500 text-[11px] font-sans">2022</span>
                  </li>
                  <li className="flex justify-between items-center gap-2">
                    <span><strong className="text-slate-900">Meta Front-End Developer</strong> · Coursera</span>
                    <span className="text-slate-500 text-[11px] font-sans">2021</span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Right Column: Professional Experience & Key Projects */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-3.5">
              {/* Work Experience */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans">
                  Professional Experience
                </h2>

                <div className="space-y-3">
                  {/* Job 1 */}
                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <span className="text-[13.5px] font-semibold text-slate-900">Senior Software Engineer</span>
                        <span className="text-[12.5px] text-slate-600 italic"> · TechCorp Solutions Inc.</span>
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap font-sans">Jan 2022 – Present</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 text-[12px] text-slate-700 leading-snug">
                      <li>• Led a team of 5 developers building a microservices platform serving 2M+ active users.</li>
                      <li>• Reduced application load time by 40% via code splitting, query tuning, and caching.</li>
                      <li>• Built automated CI/CD pipelines with GitHub Actions, cutting deployment time by 60%.</li>
                      <li>• Mentored junior engineers and drove code reviews to uphold production quality standards.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <span className="text-[13.5px] font-semibold text-slate-900">Software Engineer</span>
                        <span className="text-[12.5px] text-slate-600 italic"> · WebDev Agency LLC</span>
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap font-sans">Jun 2019 – Dec 2021</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 text-[12px] text-slate-700 leading-snug">
                      <li>• Delivered and maintained 15+ client-facing web applications using React and Node.js.</li>
                      <li>• Partnered with UI/UX designers to build responsive, WCAG-accessible interfaces.</li>
                      <li>• Engineered RESTful APIs and integrated Stripe, Twilio, and AWS services with 98% CSAT.</li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <span className="text-[13.5px] font-semibold text-slate-900">Junior Developer</span>
                        <span className="text-[12.5px] text-slate-600 italic"> · StartupHub Technologies</span>
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap font-sans">Aug 2017 – May 2019</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 text-[12px] text-slate-700 leading-snug">
                      <li>• Built full-stack e-commerce features using React and Express in an Agile sprint team.</li>
                      <li>• Authored unit and integration test suites achieving 85% automated code coverage.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Key Projects */}
              <section>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans">
                  Key Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] text-slate-700">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-semibold text-slate-900 text-[13px]">TaskFlow</h3>
                      <span className="text-blue-700 text-[10.5px] font-sans font-medium whitespace-nowrap">React · Node · Postgres</span>
                    </div>
                    <p className="mt-1 leading-snug">
                      Real-time collaborative project manager with drag-and-drop Kanban boards, team chat, and reporting for 500+ active users.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-semibold text-slate-900 text-[13px]">ShopSmart</h3>
                      <span className="text-blue-700 text-[10.5px] font-sans font-medium whitespace-nowrap">Next.js · Stripe · MongoDB</span>
                    </div>
                    <p className="mt-1 leading-snug">
                      Full-stack e-commerce platform with checkout, inventory tracking, and analytics dashboard driving $50K+ first-year sales.
                    </p>
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
