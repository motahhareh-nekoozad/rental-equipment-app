<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

// Sidebar links with icon names (computed for reactive translation)
const links = computed(() => [
  { label: t("equipment"), icon: "mdi:tools", to: "/admin/equipment" },
  { label: t("users"), icon: "mdi:account-group", to: "/admin/users" },
  { label: t("settings"), icon: "mdi:cog", to: "/admin/settings" },
])
</script>

<template>
  <aside class="w-60 p-6 flex flex-col space-y-4 bg-bg border dark:border-gray-700">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="py-2 px-4 flex items-center space-x-2 rtl:space-x-reverse rounded border border-transparent hover:border-primary hover:bg-secondary transition duration-300"
      active-class="bg-primary border-primary text-bg"
    >
      <Icon :icon="link.icon" class="w-5 h-5" />
      <span>{{ link.label }}</span>
    </NuxtLink>
  </aside>
</template>
