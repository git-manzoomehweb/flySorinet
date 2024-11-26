/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "Primery-900": "#BD0006",
        "Primery-800": "#CB0017",
        "Primery-700": "#D8111F",
        "Primery-600": "#EA2124",
        "Primery-500": "#F92F24",
        "Primery-400": "#F44543",
        "Primery-300": "#EB6A69",
        "Primery-200": "#F49593",
        "Primery-100": "#FFCACF",
        "Primery-50": "#FFEAED",

        "Footer-900": "#1E1919"
      },
      backgroundImage: {
        'footer-gradient': 'linear-gradient(277.8deg, #1D0202 0.86%, #121212 99.53%)',
        "main-desktop-back": "background: linear-gradient(251.49deg, #FFFFFF 10.95%, #FFEAEA 90.06%)",
        "shadow-gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0) 44.98%, #000000 100%)",
        "light-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0) 63.58%, #FFFFFF 95.87%)",
        "shadow-gradient-full": "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.97%, #000000 100%)"
      },
    },
    plugins: [],
  },
};
