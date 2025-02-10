/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        '_black': "#001C30",
        'darkCyan': "#176B87",
        'cyanLight': "#64CCC5",
        'blueshLight': '#DAFFFB',
      },
      colors: {
        '_black': "#001C30",
        'darkCyan': "#176B87",
        '_light': "#80C4E9",
        'cyanLight': "#64CCC5",
        'blueshLight': '#DAFFFB',
        'pink': "#E966A0",
        "orange": "#ee6c4d",
      }
    },
  },
  plugins: [],

}

