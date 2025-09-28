<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "~/components/base/BaseButton.vue"; // import BaseButton

definePageMeta({
  layout: 'admin-layout'
});

const { locale, t } = useI18n();
const currentLocale = ref("fa");
const selectedLocale = ref("fa"); // temporary before Save

// Load saved locale on mount
onMounted(() => {
  const savedLocale = localStorage.getItem("admin-locale");
  if (savedLocale) {
    currentLocale.value = savedLocale;
    selectedLocale.value = savedLocale;
  }
  locale.value = currentLocale.value;
  document.documentElement.setAttribute("dir", currentLocale.value === "fa" ? "rtl" : "ltr");
});

// Change language handler (applied on Save)
function saveLanguage() {
  currentLocale.value = selectedLocale.value;
  locale.value = selectedLocale.value;
  localStorage.setItem("admin-locale", selectedLocale.value);
  document.documentElement.setAttribute("dir", selectedLocale.value === "fa" ? "rtl" : "ltr");
}

// Options for BaseSelect
const languageOptions = [
  { label: "فارسی", value: "fa" },
  { label: "English", value: "en" }
];
</script>

<template>
  <div class="p-6 flex flex-col space-y-6 bg-bg text-text min-h-screen">
    <h1 class="text-2xl font-bold">{{ t("settings") }}</h1>

    <!-- Language Selector -->
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <span>{{ t("language") }}:</span>
      <BaseSelect
        v-model="selectedLocale"
        :options="languageOptions"
      />
      <!-- Save button using BaseButton -->
      <BaseButton
        @click="saveLanguage"
        variant="primary"
        size="md"
      >
        {{ t("save") }}
      </BaseButton>
    </div>
  </div>
</template>
