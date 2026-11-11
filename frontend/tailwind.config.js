/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd3c5',
          300: '#fba88f',
          400: '#f37f59',
          500: '#df6035',
          600: '#cc4f27',
          700: '#aa3f1d',
          800: '#8b351c',
          900: '#72301c',
          950: '#3d160b',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
          50: '#f0f4f9',
          100: '#dce5f0',
          200: '#bdd0e3',
          300: '#91b3d2',
          400: '#5f90be',
          500: '#2f4b79',
          600: '#284167',
          700: '#203352',
          800: '#1c2b44',
          900: '#1a253a',
          950: '#101725',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          50: '#f5f8fc',
          100: '#e8f0f8',
          200: '#d6e4f0',
          300: '#adc9e2',
          400: '#7fa9d0',
          500: '#2a3656',
          600: '#232d48',
          700: '#1c243a',
          800: '#171d2e',
          900: '#131724',
        },
        dark: {
          50: '#e8ebed',  // Light theme background
          100: '#e0e4e7', // Light border / subtle surface
          200: '#cccccc', // Light theme border
          300: '#b0b5bc',
          400: '#808080', // Dark theme muted foreground
          500: '#6b7280', // Light theme muted foreground
          600: '#4b5563',
          700: '#353535', // Dark theme border
          800: '#202020', // Dark theme card / surface
          900: '#1f1f1f', // Dark theme sidebar
          950: '#1a1a1a', // Dark theme background
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
