<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()

const isDark = ref(false)
const collapsed = ref(false)
const mobileOpen = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem("admin-theme") === "dark"
  document.documentElement.classList.toggle("dark", isDark.value)
  document.documentElement.setAttribute("dir", locale.value === "fa" ? "rtl" : "ltr")
})
</script>

<template>
  <div class="flex h-screen flex-col bg-bg text-text">
    <!-- Header -->
    <AdminHeader
      v-model:collapsed="collapsed"
      v-model:mobileOpen="mobileOpen"
      v-model:isDark="isDark"
    />

    <!-- Main layout -->
    <div class="flex flex-1">
      <AdminSidebar
        v-model:collapsed="collapsed"
        v-model:mobileOpen="mobileOpen"
      />

      <main class="flex-1 p-6 bg-bg text-primary">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
