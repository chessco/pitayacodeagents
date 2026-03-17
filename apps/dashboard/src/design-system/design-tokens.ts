export const designTokens = {
  colors: {
    pitaya: {
      magenta: '#E21A65', // Logo Right
      cyan: '#00AAD2',    // Logo Left
      emerald: '#00B285', // Logo Crest
      
      background: '#040508', // Super dark space base
      surface: '#0A0C13',    // Dark structural frames
      card: '#10121D',       // Card panels
      border: '#1A1D30',     // Subtle mesh dividing lines
      
      success: '#00B285',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#00AAD2',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    }
  },
  spacing: {
    layout: {
      sidebar: '260px',
      topbar: '64px',
    }
  },
  radius: {
    card: '12px',
    button: '8px',
  },
  shadows: {
    soft: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    glow: '0 0 15px -1px rgba(226, 26, 101, 0.3)',
  }
};
