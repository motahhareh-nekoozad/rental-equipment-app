// nuxt.config.ts

export default defineNuxtConfig({
  // Compatibility & devtools
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // CSS
  css: ["@/assets/css/main.css"],

  // Modules
  modules: [
    "@nuxtjs/tailwindcss",
  ],

  // Tailwind config path
  tailwindcss: {
    configPath: "tailwind.config.js",
  },

  //components auto import
    components: [
    { path: '~/components', global: true } // global registration
  ],
});
