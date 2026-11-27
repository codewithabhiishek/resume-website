import React, { useRef, useState } from 'react';
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
        margin: [0.4, 0.4, 0.4, 0.4] as [number, number, number, number],
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
          orientation: 'portrait' as const,
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
    <div className="min-h-screen bg-gray-200">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-gray-800 text-lg">Resume</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div
          ref={resumeRef}
          className="max-w-[850px] mx-auto bg-white shadow-xl"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          {/* Header */}
          <header className="px-12 pt-12 pb-6 border-b-2 border-gray-800">
            <h1 className="text-4xl font-bold text-gray-900 tracking-wide text-center uppercase">
              John Anderson
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                San Francisco, CA 94102
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (555) 123-4567
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                john.anderson@email.com
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                linkedin.com/in/johnanderson
              </span>
            </div>
          </header>

          {/* Body */}
          <div className="px-12 py-8 space-y-7">
            {/* Professional Summary */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Results-driven Software Engineer with 5+ years of experience in designing, developing, and deploying
                scalable web applications. Proficient in modern JavaScript frameworks, cloud technologies, and agile
                methodologies. Proven track record of delivering high-quality solutions that improve user experience
                and drive business growth. Strong collaborator with excellent communication skills and a passion for
                continuous learning.
              </p>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Professional Experience
              </h2>

              {/* Job 1 */}
              <div className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Senior Software Engineer</h3>
                    <p className="text-sm text-gray-600 italic">TechCorp Solutions Inc.</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">Jan 2022 – Present</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Led a team of 5 developers in building a microservices-based platform serving 2M+ users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Reduced application load time by 40% through code optimization and caching strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Mentored junior developers and conducted code reviews to maintain code quality standards</span>
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Software Engineer</h3>
                    <p className="text-sm text-gray-600 italic">WebDev Agency LLC</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">Jun 2019 – Dec 2021</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Developed and maintained 15+ client-facing web applications using React and Node.js</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Collaborated with UX/UI designers to implement responsive, accessible interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Built RESTful APIs and integrated third-party services (Stripe, Twilio, AWS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Achieved 98% customer satisfaction rating through timely delivery and quality assurance</span>
                  </li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Junior Developer</h3>
                    <p className="text-sm text-gray-600 italic">StartupHub Technologies</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">Aug 2017 – May 2019</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Assisted in full-stack development of an e-commerce platform using React and Express</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Wrote unit and integration tests achieving 85% code coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Participated in daily standups and sprint planning in an Agile environment</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Education
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-sm text-gray-600 italic">University of California, Berkeley</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">Aug 2013 – May 2017</span>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                GPA: 3.7/4.0 | Dean's List (6 semesters) | Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-900">Languages: </span>
                  JavaScript, TypeScript, Python, HTML5, CSS3, SQL
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Frameworks: </span>
                  React, Next.js, Node.js, Express, Django, Tailwind CSS
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Databases: </span>
                  PostgreSQL, MongoDB, Redis, Firebase
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Tools & Platforms: </span>
                  Git, Docker, AWS, Vercel, Figma, Jira
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Methodologies: </span>
                  Agile/Scrum, TDD, CI/CD, REST, GraphQL
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Soft Skills: </span>
                  Leadership, Communication, Problem-Solving, Teamwork
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Certifications
              </h2>
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li className="flex justify-between items-center">
                  <span>
                    <span className="font-semibold text-gray-900">AWS Certified Solutions Architect</span>
                    <span className="text-gray-500"> – Amazon Web Services</span>
                  </span>
                  <span className="text-gray-500 text-xs">2023</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>
                    <span className="font-semibold text-gray-900">Google Professional Cloud Developer</span>
                    <span className="text-gray-500"> – Google Cloud</span>
                  </span>
                  <span className="text-gray-500 text-xs">2022</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>
                    <span className="font-semibold text-gray-900">Meta Front-End Developer Certificate</span>
                    <span className="text-gray-500"> – Coursera</span>
                  </span>
                  <span className="text-gray-500 text-xs">2021</span>
                </li>
              </ul>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                Key Projects
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">TaskFlow – Project Management App</h3>
                    <span className="text-gray-500 text-xs ml-4 whitespace-nowrap">React, Node.js, PostgreSQL</span>
                  </div>
                  <p className="mt-1">Built a real-time collaborative project management tool with drag-and-drop Kanban boards, team chat, and automated reporting. Serves 500+ active users.</p>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">ShopSmart – E-Commerce Platform</h3>
                    <span className="text-gray-500 text-xs ml-4 whitespace-nowrap">Next.js, Stripe, MongoDB</span>
                  </div>
                  <p className="mt-1">Developed a full-stack e-commerce solution with payment processing, inventory management, and admin dashboard. Achieved $50K+ in first-year sales.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="px-12 py-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400 italic">
              References available upon request
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
