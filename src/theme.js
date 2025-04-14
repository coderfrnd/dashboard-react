import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

// Color Design Tokens
export const tokens = () => ({
  gray: {
    100: "#141414",
    200: "#292929",
    300: "#3d3d3d",
    400: "#525252",
    500: "#666666",
    600: "#858585",
    700: "#a3a3a3",
    800: "#c2c2c2",
    900: "#e0e0e0",
  },
  primary: {
    100: "#040509",
    200: "#080b12",
    300: "#0c101b",
    400: "#fcfcfc",
    500: "#f2f0f0",
    600: "#434957",
    700: "#727681",
    800: "#a1a4ab",
    900: "#d0d1d5",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },
});

// Mui Theme Settings
export const themeSettings = () => {
  const colors = tokens();

  return {
    palette: {
      mode: "light",
      primary: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[600],
      },
      secondary: {
        main: colors.greenAccent[500],
        light: colors.greenAccent[400],
        dark: colors.greenAccent[600],
      },
      neutral: {
        dark: colors.gray[700],
        main: colors.gray[500],
        light: colors.gray[100],
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#000000",
        secondary: "#000000",
      },
    },
    typography: {
      fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Inter", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundImage: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "12px 16px",
          },
          head: {
            fontWeight: 600,
            backgroundColor: "rgba(0,0,0,0.02)",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.02)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(0,0,0,0.1)",
          },
        },
      },
    },
  };
};

// Context For Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {},
  }));

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return [theme, colorMode];
};
