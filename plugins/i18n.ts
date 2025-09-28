import { createI18n } from "vue-i18n";
import type { NuxtApp } from "#app"; 
import fa from "~/locales/fa.json";
import en from "~/locales/en.json";

export default (nuxtApp: NuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "fa",
    fallbackLocale: "fa",
    messages: { fa, en },
  });

  nuxtApp.vueApp.use(i18n);
};
// plugins/i18n.ts