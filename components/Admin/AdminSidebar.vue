<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { computed } from "vue"

const props = defineProps<{
  collapsed: boolean
  mobileOpen: boolean
}>()
const emit = defineEmits(["update:mobileOpen"])

const { t, locale } = useI18n()

const links = computed(() => [
  { label: t("Admin.Dashboard"), icon: "mdi:view-dashboard", to: "/admin/dashboard" },
  { label: t("Admin.Category"), icon: "mdi:shape", to: "/admin/category" },
  { label: t("Admin.Member"), icon: "mdi:account", to: "/admin/member" },
  { label: t("Admin.Client"), icon: "mdi:account-multiple", to: "/admin/client" },
  { label: t("Admin.Product"), icon: "mdi:package-variant", to: "/admin/product" },
  { label: t("Admin.Setting"), icon: "mdi:cog", to: "/admin/settings" },
  { label: t("Admin.Ticket"), icon: "mdi:ticket", to: "/admin/tickets" },
])

const drawerSide = computed(() => (locale.value === "fa" ? "right" : "left"))
</script>

<template>
  <!-- دسکتاپ -->
  <aside class="hidden md:flex flex-col p-4 bg-bg transition-all
         border-r dark:border-gray-700 ltr:border-r rtl:border-l" :class="collapsed ? 'w-14 items-center' : 'w-60'">
    <!-- لینک‌ها -->
    <div class="flex flex-col space-y-2 flex-1">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to"
        class="group relative py-2 px-3 flex items-center rounded transition hover:bg-secondary"
        active-class="bg-primary text-bg">
        <Icon :icon="link.icon" class="w-5 h-5" />
        <span v-if="!props.collapsed" class="ml-2 rtl:mr-2">{{ link.label }}</span>

        <!-- Tooltip -->
        <span v-else class="absolute top-1/2 -translate-y-1/2
         ltr:left-full rtl:right-full
         ml-2 rtl:mr-2
         bg-gray-800 text-white text-xs rounded px-2 py-1
         whitespace-nowrap
         max-w-xs
         opacity-0 group-hover:opacity-100
         transition-all z-50">
          {{ link.label }}
        </span>
      </NuxtLink>
    </div>
  </aside>

  <!-- موبایل -->
  <BaseDrawer v-model="props.mobileOpen" :side="drawerSide">
    <div class="p-4 space-y-4">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="block py-2 px-4 rounded hover:bg-secondary"
        active-class="bg-primary text-bg" @click="emit('update:mobileOpen', false)">
        <Icon :icon="link.icon" class="inline-block w-5 h-5 mr-2 rtl:ml-2" />
        {{ link.label }}
      </NuxtLink>
    </div>
  </BaseDrawer>
</template>
