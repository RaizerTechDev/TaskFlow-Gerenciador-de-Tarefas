/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        primary: '#3B82F6',
        'primary-dark': '#2563EB',
        secondary: '#64748B',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B'
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out'
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
