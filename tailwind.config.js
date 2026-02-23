/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A0522D', // Un tono marrón siena
        secondary: '#F5F5DC', // Beige
        background: '#FFF8E1', // Crema/beige muy claro
        text: '#36454F',      // Carbón oscuro para el texto
        accent: '#8B4513',    // Un marrón más oscuro para acentos
      }
    },
  },
  plugins: [],
}