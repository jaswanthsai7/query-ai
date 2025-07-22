# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Folder structure example

frontend-qai/
├── public/
│   └── index.html
├── src/
│   ├── assets/               # Static assets like images, logos, icons
│   ├── components/           # Reusable UI components (Navbar, Button, etc.)
│   ├── features/             # Feature-specific folders (e.g., spends, chat)
│   │   ├── spends/           # Manage Spends feature
│   │   │   ├── SpendsPage.jsx
│   │   │   └── SpendForm.jsx
│   │   ├── chat/             # AI Chat feature
│   │   │   └── ChatPage.jsx
│   │   └── analysis/         # Spend Analysis feature
│   │       └── AnalysisPage.jsx
│   ├── hooks/                # Custom hooks (e.g., useTheme, useSpends)
│   ├── layouts/              # Layouts like NavbarLayout, SidebarLayout
│   ├── pages/                # Route-level pages (calls feature components)
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── router/               # React Router config
│   │   └── AppRouter.jsx
│   ├── styles/               # Global styles (like index.css, theme config)
│   ├── utils/                # Helper functions (formatDate, API wrappers)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js

