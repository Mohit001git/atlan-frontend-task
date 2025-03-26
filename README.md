📌 SQL Query Simulator
🟢 Overview
SQL Query Simulator is a web-based application designed to simulate the execution of SQL queries and display the results in a structured table format. It allows users to select predefined SQL queries, view simulated results, and switch between light and dark mode using a simple UI.

🛠 Tech Stack
Framework: React (Vite)

State Management: React Hooks

Styling: Plain CSS

CSV Parsing: Papaparse

Deployment: Vercel

Major Packages Installed
react - Frontend UI Library

react-dom - DOM Rendering

papaparse - CSV Data Parsing

vite - Fast Build Tool for Development and Production

@vitejs/plugin-react-swc - React Plugin for Vite

⏱ Page Load Time
Measured Using: Chrome DevTools (Lighthouse)

Load Time: Approx 0.8 to 1.2 seconds for a basic network connection.

Lighthouse Score: 90+ for Performance and Accessibility.

Steps to Measure Load Time
Open Chrome DevTools (Ctrl + Shift + I).

Go to the Performance tab.

Start recording and reload the page.

Analyze metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

🚀 Optimisations for Performance
Lazy Loading: Implemented lazy loading using React’s React.lazy() to reduce initial bundle size.

Minification: Vite automatically handles JS and CSS minification.

Tree Shaking: Removed unused imports and code through Vite’s tree shaking.

Efficient State Management: Used minimal state management using useState() to reduce re-renders.

Asset Optimization: Compressed images and optimized CSS.

Async Data Fetching: Fetched data asynchronously using fetch() to avoid blocking the UI.

Code Splitting: Split the code into smaller chunks using Vite’s build optimization.
