export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
  },
  secondary: {
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  tertiary: {
    500: "#8884d8",
  },
  background: {
    navbar: "#d1d3da",
    light: "#2d2d34",
    main: "#1f2026",
  },
};

export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
      navbar: tokens.background.navbar, // <- NEW
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontSize: 32,
      fontFamily: "Inter, sans-serif",
    },
    h2: {
      fontSize: 24,
      fontFamily: "Inter, sans-serif",
    },
    h3: {
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "Inter, sans-serif",
      color: tokens.grey[200],
    },
    h4: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Inter, sans-serif",
      color: tokens.grey[300],
    },
    h5: {
      fontSize: 12,
      fontWeight: 400,
      fontFamily: "Inter, sans-serif",
      color: tokens.grey[500],
    },
    h6: {
      fontSize: 10,
      fontFamily: "Inter, sans-serif",
      color: tokens.grey[700],
    },
  },
};
