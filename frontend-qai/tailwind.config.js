/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",   // If you have pages dir too
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",     // If you use src folder
  ],
  theme: {
    extend: { boxShadow: {
        smooth: "0 4px 14px rgba(0,0,0,0.08)",
      },
      scrollbar: ['rounded'],
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          },
        },
      }
    },
  },
  plugins: [
    scrollbar,
  ],
};