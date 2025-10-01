<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"

// Props
const props = defineProps<{
  collapsed: boolean
  mobileOpen: boolean
}>()
const emit = defineEmits(["update:collapsed", "update:mobileOpen"])

// i18n
const { locale } = useI18n()

// Dark/Light mode
const isDark = ref(false)
onMounted(() => {
  isDark.value = localStorage.getItem("admin-theme") === "dark"
  document.documentElement.classList.toggle("dark", isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
}

// Toggle sidebar (desktop/mobile)
function toggleSidebar() {
  if (window.innerWidth < 768) {
    emit("update:mobileOpen", !props.mobileOpen)
  } else {
    emit("update:collapsed", !props.collapsed)
  }
}
</script>

<template>
  <header
    class="flex items-center justify-between bg-bg border-b border-gray-300 dark:border-gray-700 p-3 sticky top-0 z-50">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
      <!-- toggle sidebar -->
      <BaseButton @click="toggleSidebar" type="button" size="sm"
        class="flex items-center justify-center size-8 !p-2 bg-transparent hover:bg-secondary transition"
        aria-label="Toggle sidebar">
        <Icon v-if="!props.collapsed" icon="mdi:menu-open"
          class="w-6 h-6 text-black dark:text-white transition-transform"
          :class="{ 'scale-x-[-1]': locale === 'fa' }" />
        <Icon v-else icon="mdi:menu" class="w-6 h-6 text-black dark:text-white transition-transform"
          :class="{ 'scale-x-[-1]': locale === 'en' }" />
      </BaseButton>

      <!-- Logo -->
      <span class="text-xl font-bold text-primary">RentalGear</span>
    </div>

    <!-- Dark/Light toggle -->
    <AppThemeToggle v-model="isDark" />
  </header>
</template>
