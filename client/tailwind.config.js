/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'whitish': '#f6f4f3',
        'whitecream': '#d1c8c1',
        'cream': '#86654b',
        'brownish': '#31241e'
      },
      textColor: {
        'whitish': '#f6f4f3',
        'whitecream': '#d1c8c1',
        'cream': '#86654b',
        'brownish': '#31241e'
      },
    },
  },
  plugins: [],
}