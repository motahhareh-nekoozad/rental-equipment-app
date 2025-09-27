import rtl from "tailwindcss-rtl";

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B8860B",
        secondary: "#1B2A49",
        baseBlack: "	#000000",
        gold: "#FFD700",
        white: "#FFFFFF",
      },
    },
  },
};
