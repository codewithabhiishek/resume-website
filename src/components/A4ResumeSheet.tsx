import React from "react";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  PROFILE,
  PROJECTS,
  SKILLS,
} from "../data/resumeData";

export const A4_WIDTH = 794;
export const A4_HEIGHT = 1123;

interface A4ResumeSheetProps {
  sheetRef: React.RefObject<HTMLDivElement>;
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "#0f172a",
  borderBottom: "1px solid #1e293b",
  paddingBottom: "2px",
  marginBottom: "6px",
};

/**
 * Pure-hex, ATS-friendly A4 resume sheet used both for on-page document preview
 * and clean 1-page PDF/print export without web navigation or decorative UI.
 */
export function A4ResumeSheet({ sheetRef }: A4ResumeSheetProps) {
  return (
    <div
      id="resume-a4-sheet"
      ref={sheetRef}
      className="a4-sheet"
      style={{ padding: "32px 42px" }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "12px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {PROFILE.legalName}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px 8px",
            marginTop: "5px",
            fontSize: "11.5px",
            color: "#1e293b",
          }}
        >
          <span>{PROFILE.phone}</span>
          <span>|</span>
          <a href={`mailto:${PROFILE.email}`} style={{ color: "#0f172a", textDecoration: "underline" }}>
            {PROFILE.email}
          </a>
          <span>|</span>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", textDecoration: "underline" }}>
            LinkedIn
          </a>
          <span>|</span>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", textDecoration: "underline" }}>
            GitHub
          </a>
          <span>|</span>
          <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", textDecoration: "underline" }}>
            Portfolio
          </a>
        </div>
      </header>

      {/* Education */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionHeadingStyle}>Education</h2>
        {EDUCATION.map((edu, idx) => (
          <div key={edu.school} style={{ marginBottom: idx === 0 ? "4px" : 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "2px 8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>{edu.school}</span>
              <span style={{ fontSize: "11.5px", color: "#1e293b" }}>{edu.period}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "2px 8px",
                fontSize: "11.5px",
                fontStyle: "italic",
                color: "#334155",
              }}
            >
              <span>{edu.degree}</span>
              <span>{edu.score}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionHeadingStyle}>Technical Skills</h2>
        <div style={{ fontSize: "11.5px", lineHeight: 1.42, color: "#1e293b" }}>
          {SKILLS.map((group) => (
            <div key={group.category}>
              <strong style={{ color: "#0f172a" }}>{group.category === "DevOps & Cloud" ? "DevOps" : group.category}:</strong>{" "}
              {group.items.join(", ")}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionHeadingStyle}>Experience</h2>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "2px 8px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>{EXPERIENCE.role}</span>
            <span style={{ fontSize: "11.5px", color: "#1e293b" }}>{EXPERIENCE.period}</span>
          </div>
          <div style={{ fontSize: "11.5px", fontStyle: "italic", color: "#334155", marginBottom: "3px" }}>
            {EXPERIENCE.company}
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "11.3px", lineHeight: 1.38, color: "#1e293b" }}>
            {EXPERIENCE.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
            <li>
              <strong style={{ color: "#0f172a" }}>Selected Work:</strong>{" "}
              {EXPERIENCE.selectedWork.map((w, i) => (
                <React.Fragment key={w}>
                  <span style={{ textDecoration: "underline" }}>{w}</span>
                  {i < EXPERIENCE.selectedWork.length - 1 ? " | " : ""}
                </React.Fragment>
              ))}
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionHeadingStyle}>Projects</h2>
        {PROJECTS.map((proj, idx) => (
          <div key={proj.id} style={{ marginBottom: idx === 0 ? "7px" : 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "2px 8px" }}>
              <div style={{ fontSize: "12px", color: "#0f172a", minWidth: 0 }}>
                <strong style={{ textDecoration: "underline" }}>{proj.name}</strong>{" "}
                <span style={{ color: "#475569" }}>|</span>{" "}
                <span style={{ fontStyle: "italic", fontSize: "11px", color: "#334155" }}>
                  {proj.stack.join(", ")}
                </span>
              </div>
              <span style={{ fontSize: "11.5px", color: "#1e293b", whiteSpace: "nowrap" }}>{proj.year}</span>
            </div>
            <ul style={{ margin: "2px 0 0 0", paddingLeft: "18px", fontSize: "11.3px", lineHeight: 1.38, color: "#1e293b" }}>
              {proj.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
              {idx === 1 && (
                <>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Additional Projects:</strong> 20+ live, working apps (full-stack, AI/ML, cloud) — see all at{" "}
                    <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", textDecoration: "underline" }}>
                      abhiishek.is-a.dev
                    </a>
                    .
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Open Source:</strong> Contributor to Argo CD (Docker Hub webhook parser, namespace validation UX) —{" "}
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", textDecoration: "underline" }}>
                      GitHub
                    </a>
                    .
                  </li>
                </>
              )}
            </ul>
          </div>
        ))}
      </section>

      {/* Leadership */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionHeadingStyle}>Leadership</h2>
        {LEADERSHIP.map((item, idx) => (
          <div key={item.title} style={{ marginBottom: idx < LEADERSHIP.length - 1 ? "5px" : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                {item.title}
                {item.year === "2026" && (
                  <>
                    {" "}
                    <span style={{ color: "#475569", fontWeight: 400 }}>|</span>{" "}
                    <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "11.2px", color: "#334155" }}>
                      {item.org}
                    </span>
                  </>
                )}
              </span>
              {item.year !== "INT'L" && (
                <span style={{ fontSize: "11.5px", color: "#1e293b", whiteSpace: "nowrap" }}>{item.year}</span>
              )}
            </div>
            {item.year === "2025" && (
              <div style={{ fontSize: "11.2px", fontStyle: "italic", color: "#334155", marginBottom: "2px" }}>
                {item.org}
              </div>
            )}
            {item.points.length > 1 ? (
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "11.3px", lineHeight: 1.36, color: "#1e293b" }}>
                {item.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: "11.3px", fontStyle: "italic", color: "#1e293b" }}>{item.points[0]}</div>
            )}
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section>
        <h2 style={sectionHeadingStyle}>Certifications</h2>
        <div style={{ fontSize: "11.5px", lineHeight: 1.45, color: "#1e293b" }}>
          {CERTIFICATIONS.map((c) => (
            <div key={c.name}>
              <strong style={{ color: "#0f172a" }}>{c.name}</strong> – {c.issuer}, {c.date}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
