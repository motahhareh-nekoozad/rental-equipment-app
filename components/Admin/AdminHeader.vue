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
function toggleTheme(value: boolean) {
  isDark.value = value
  localStorage.setItem("admin-theme", isDark.value ? "dark" : "light")
  document.documentElement.classList.toggle("dark", isDark.value)
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
  <header class="flex items-center justify-between bg-bg border-b border-gray-300 dark:border-gray-700 p-4 sticky top-0 z-50">
    <div class="flex items-center space-x-2 rtl:space-x-reverse">
      <!-- toggle sidebar -->
      <button @click="toggleSidebar" class="p-1 rounded hover:bg-secondary transition" aria-label="Toggle sidebar">
        <!-- when sidebar is open-->
        <Icon
          v-if="!props.collapsed"
          icon="mdi:menu-open"
          class="w-4 h-4 transition-transform"
          :class="{ 'scale-x-[-1]': locale === 'fa' }"
        />
        <!--when sidebar is close-->
        <Icon
          v-else
          icon="mdi:menu"
          class="w-4 h-4 transition-transform"
          :class="{ 'scale-x-[-1]': locale === 'en' }"
        />
      </button>

      <!-- Logo -->
      <span class="text-xl font-bold text-primary">RentalGear</span>
    </div>

    <!-- Dark/Light toggle -->
    <BaseCheck v-model="isDark" label="Dark Mode" @update:modelValue="toggleTheme" />
  </header>
</template>
