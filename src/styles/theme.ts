export interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
      gradient: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      main: string;
      paper: string;
      content: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      white: string;
    };
    border: {
      main: string;
      light: string;
    };
    status: {
      error: string;
      success: string;
      warning: string;
      info: string;
    };
    white: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  padding: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
    container: string;
  };
  margin: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    button: string;
    buttonActive: string;
    card: string;
    header: string;
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  layout: {
    sidebarWidth: string;
    sidebarWidthMobile: string;
    headerHeight: string;
    contentMaxWidth: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: {
      main: '#408CFF',
      light: '#98BFFA',
      dark: '#2563EB',
      gradient: 'linear-gradient(135deg, #408CFF 0%, #2563EB 100%)',
    },
    secondary: {
      main: '#74D4FF',
      light: '#8EC5FF',
      dark: '#51A2FF',
    },
    background: {
      main: '#E3F2FD',
      paper: '#FFFFFF',
      content: '#F0F7FF',
    },
    text: {
      primary: '#5C5E66',
      secondary: '#A0A0A0',
      disabled: '#C0C0C0',
      white: '#FFFFFF',
    },
    border: {
      main: '#E5E6EC',
      light: '#F0F1F5',
    },
    status: {
      error: '#EF4444',
      success: '#00BC7D',
      warning: '#F59E0B',
      info: '#408CFF',
    },
    white: '#FFFFFF',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
  },
  padding: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '40px',
    section: '48px',
    container: '116px',
  },
  margin: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '40px',
    section: '64px',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    xs: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    sm: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
    md: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)',
    lg: '0px 4px 16px 0px rgba(0, 0, 0, 0.1)',
    xl: '0px 8px 32px 0px rgba(0, 0, 0, 0.12)',
    button: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)',
    buttonActive: '0px 4px 12px 0px rgba(64, 140, 255, 0.3)',
    card: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)',
    header: '0px 4px 32px 0px rgba(0, 0, 0, 0.05)',
  },
  typography: {
    fontFamily: {
      primary: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'Courier New', Courier, monospace",
    },
    fontSize: {
      xs: '10px',
      sm: '11px',
      base: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '40px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.04em',
      normal: '0',
      wide: '0.02em',
    },
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  layout: {
    sidebarWidth: '100px',
    sidebarWidthMobile: '80px',
    headerHeight: '64px',
    contentMaxWidth: '1200px',
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
      gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    },
    secondary: {
      main: '#7DD3FC',
      light: '#A5F3FC',
      dark: '#38BDF8',
    },
    background: {
      main: '#0F172A',
      paper: '#1E293B',
      content: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      disabled: '#64748B',
      white: '#FFFFFF',
    },
    border: {
      main: '#334155',
      light: '#475569',
    },
    status: {
      error: '#F87171',
      success: '#34D399',
      warning: '#FBBF24',
      info: '#60A5FA',
    },
    white: '#FFFFFF',
  },
};

