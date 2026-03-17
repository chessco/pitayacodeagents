/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        pitaya: {
          magenta: '#E21A65',
          cyan: '#00AAD2',
          emerald: '#00B285',
          
          background: '#040508',
          surface: '#0A0C13',
          card: '#10121D',
          border: '#1A1D30',
          
          success: '#00B285',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#00AAD2',
          
          // Legacy mappings just to avoid breaking early code if any used them
          primary: '#E21A65',
          secondary: '#00AAD2',
          accent: '#00B285',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E21A65, #00AAD2, #00B285)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-magenta': 'glowMagenta 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowMagenta: {
          '0%': { boxShadow: '0 0 5px rgba(226, 26, 101, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(226, 26, 101, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
