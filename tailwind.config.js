/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: '#007AFF',
          gray: {
            50: '#F2F2F7',
            100: '#E5E5EA',
            200: '#D1D1D6',
            300: '#C7C7CC',
            400: '#AEAEB2',
            500: '#8E8E93',
            600: '#636366',
            700: '#48484A',
            800: '#3A3A3C',
            900: '#2C2C2E'
          },
          red: '#FF3B30',
          green: '#34C759',
          yellow: '#FFCC00',
          orange: '#FF9500',
          purple: '#AF52DE',
          pink: '#FF2D55'
        }
      },
      borderRadius: {
        'ios': '10px',
        'ios-lg': '14px',
        'ios-xl': '18px',
      },
      boxShadow: {
        'ios': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'ios-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backdropBlur: {
        'ios': '20px',
      },
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}