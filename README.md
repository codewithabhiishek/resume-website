# Resume Website

A clean, classic, print-ready **Resume Website** built with **React**, **TypeScript**, **Tailwind CSS**, and **html2pdf.js** — featuring a sticky action bar and one-click high-resolution PDF export.

---

## ✨ Features

- **Classic Editorial Typography**: Crisp serif resume layout (`Georgia`, `Times New Roman`) styled for readability and ATS-friendly hierarchy.
- **One-Click PDF Export**: Generates and downloads a letter-size (`8.5 × 11 in`) high-DPI PDF (`scale: 2`) directly in the browser via `html2pdf.js`.
- **Sticky Navigation Bar**: Quick-access `Download PDF` button with loading spinner state.
- **Responsive Design**: Scales cleanly from mobile screens to desktop preview (`max-w-[850px]`).

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **PDF Generation**: `html2pdf.js`
- **Build Tool**: Vite 6

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Local Development

```bash
git clone https://github.com/codewithabhiishek/resume-website.git
cd resume-website
npm install
npm run dev
```

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server |
| `npm run typecheck` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run build` | Build the production bundle into `dist/` |

---

## 📁 Project Structure

```text
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── src/
    ├── App.tsx        # Resume layout & PDF export handler
    ├── main.tsx       # React entry point
    ├── index.css      # Tailwind CSS entry
    └── html2pdf.d.ts  # TypeScript declarations for html2pdf.js
```

---

## 👤 Author

**Abhishek** — [@codewithabhiishek](https://github.com/codewithabhiishek)
