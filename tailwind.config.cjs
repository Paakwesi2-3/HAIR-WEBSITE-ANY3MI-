module.exports = {
  content: ["./public/**/*.html", "./public/**/*.js", "./src/**/*.{js,ts,jsx,tsx}", "./**/*.html"],
  theme: {
    extend: {
      colors: {
        // Override the default 500 shades to match the brand
        pink: {
          500: '#EC4899',
        },
        blue: {
          500: '#3B82F6',
        },
        brandPink: '#EC4899',
        brandBlue: '#3B82F6',
      },
    },
  },
  plugins: [],
};
