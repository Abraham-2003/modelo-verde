// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#d0fdd7',         // fondo sidebar
        palmeiras: '#006437',    // verde intenso si lo quieres usar
        rejection: '#ef4444',    // para tipo 00
        holo0: '#9ca3af',        // gris tipo 0
        holo1: '#3b82f6',        // azul tipo 1
        holo2: '#10b981',        // verde tipo 2
      }
    },
  },
  plugins: [],
}
