<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// i18n composable
const { t, locale } = useI18n();

// Dark/Light mode state
const isDark = ref(false);

// Load saved theme on mount
onMounted(() => {
  isDark.value = localStorage.getItem("admin-theme") === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);
  document.documentElement.setAttribute("dir", locale.value === "fa" ? "rtl" : "ltr");
});


</script>

<template>
  <div class="flex h-screen flex-col bg-bg text-text transition-colors">
    <!-- Header -->
    <AdminHeader />

    <!-- Main layout -->
    <div class="flex flex-1 transition-all">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Main content -->
      <main class="flex-1 p-6 bg-bg text-primary transition-colors">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
