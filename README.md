<div align="center">

# 📄 Abhishek Jain — Resume Website

**A pixel-accurate, single-page A4 resume website with instant client-side PDF export.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Portfolio](https://abhiishek.is-a.dev/) · [GitHub](https://github.com/codewithabhiishek) · [LinkedIn](https://www.linkedin.com/in/codewithabhiishek) · [Email](mailto:contactabhiishek101@gmail.com)

</div>

---

## ✨ Highlights

- **True A4 Sheet (`210 × 297 mm` / `794 × 1123 px`)**: Styled with classic LaTeX-inspired serif typography (`Georgia`, `Times New Roman`) and clean section dividers.
- **Zero-Scroll Desktop Viewport**: Automatically scales the full A4 page to fit the user's laptop or desktop screen (`100vh`) while remaining responsive on mobile devices.
- **One-Click A4 PDF Export**: Generates and downloads `Abhishek_Jain_Resume.pdf` at `2×` Retina resolution directly in the browser using `html2pdf.js`, with a custom `onclone` pipeline that strips Tailwind v4 `oklch()` rules so rendering never fails.
- **Native Print Support**: Includes `@page { size: A4 portrait; margin: 0; }` and `@media print` rules for clean `Cmd/Ctrl + P` printing.
- **Interactive Links**: Direct clickable links for Email, LinkedIn, GitHub, and Portfolio.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | React 18 + TypeScript | Component structure & strict type safety |
| **Styling** | Tailwind CSS v4 + Hex CSS | Responsive layout & print-safe A4 styling |
| **PDF Engine** | `html2pdf.js` (`html2canvas` + `jsPDF`) | Client-side high-DPI A4 PDF generation |
| **Build Tool** | Vite 6 | Fast HMR dev server & production bundling |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `18+`
- **npm** `9+`

### Run Locally

```bash
# Clone the repository
git clone https://github.com/codewithabhiishek/resume-website.git
cd resume-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run typecheck` | Run TypeScript compiler check (`tsc --noEmit`) |
| `npm run build` | Bundle production assets into `dist/` |

---

## 📁 Project Structure

```text
Resume-Website/
├── public/
│   └── favicon.svg        # Custom vector resume favicon
├── src/
│   ├── App.tsx            # A4 resume layout, viewport auto-scaling & PDF export
│   ├── main.tsx           # React entry point
│   ├── index.css          # A4 sheet dimensions, print rules & Tailwind entry
│   └── html2pdf.d.ts      # TypeScript declarations for html2pdf.js
├── index.html             # Document metadata, title & favicon link
├── package.json
├── tsconfig.json
└── vite.config.js
```

---

## 📬 Contact

- **Name**: Abhishek Jain
- **Portfolio**: [abhiishek.is-a.dev](https://abhiishek.is-a.dev/)
- **GitHub**: [@codewithabhiishek](https://github.com/codewithabhiishek)
- **Email**: [contactabhiishek101@gmail.com](mailto:contactabhiishek101@gmail.com)
