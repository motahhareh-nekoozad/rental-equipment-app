<script setup lang="ts">
import { ref, onMounted } from "vue";

// Dark/Light mode state
const isDark = ref(false);

// Load saved theme on mount
onMounted(() => {
  isDark.value = localStorage.getItem("admin-theme") === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);
});

// Toggle theme handler
function toggleTheme(value: boolean) {
  isDark.value = value;
  localStorage.setItem("admin-theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
}
</script>

<template>
  <header class="flex items-center justify-between bg-bg border-b border-gray-300 dark:border-gray-700 p-4 sticky top-0 z-50">
    <!-- Logo -->
    <div class="flex items-center space-x-2 rtl:space-x-reverse">
      <!-- <img alt="Logo" class="h-8 w-8" /> -->
      <span class="text-xl font-bold text-primary">RentalGear</span>
    </div>

    <!-- Dark/Light toggle -->
    <div>
      <BaseCheck v-model="isDark" label="Dark Mode" @update:modelValue="toggleTheme" />
    </div>
  </header>
</template>
