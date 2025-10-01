<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useI18n } from "vue-i18n"
import { Icon } from "@iconify/vue"

// Props
const props = defineProps<{ mobileOpen: boolean }>()
const emit = defineEmits(["update:mobileOpen"])

// i18n
const { t, locale } = useI18n()
const isRTL = computed(() => locale.value === "fa")

// Dark/Light mode
const isDark = ref(false)
onMounted(() => {
    isDark.value = localStorage.getItem("user-theme") === "dark"
    document.documentElement.classList.toggle("dark", isDark.value)
})

// Toggle theme
function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle("dark", isDark.value)
    localStorage.setItem("user-theme", isDark.value ? "dark" : "light")
}

// Toggle mobile menu
function toggleMobileMenu() {
    emit("update:mobileOpen", !props.mobileOpen)
}

// Cart count example
const cartCount = ref(3)

// Navigation links
const navLinks = [
    { key: 'categories', route: '/categories', icon: 'mdi:format-list-bulleted' },
    { key: 'products', route: '/products', icon: 'mdi:shopping' },
    { key: 'reservations', route: '/reservations', icon: 'mdi:calendar-check' },
    { key: 'payments', route: '/payments', icon: 'mdi:credit-card' },
]
</script>

<template>
    <header
        class="flex items-center justify-between bg-bg border-b border-gray-300 dark:border-gray-700 px-4 py-3 sticky top-0 z-50 transition-colors duration-500">
        <!-- Left: Logo + Mobile menu -->
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <!-- Mobile menu button (visible only on small screens) -->
            <BaseButton @click="toggleMobileMenu" size="sm" variant="secondary"
                class="sm:hidden flex items-center justify-center p-2">
                <Icon icon="mdi:menu" class="size-5 text-primary" />
            </BaseButton>

            <!-- Logo -->
            <span class="text-xl font-bold text-primary">RentalGear</span>

            <!-- Navigation links -->
            <nav class="hidden md:flex items-center space-x-4 rtl:space-x-reverse ml-6">
                <BaseButton v-for="link in navLinks" :key="link.key" size="sm" variant="secondary"
                    class="hover-nav flex  items-center !text-black dark:!text-white space-x-1 !bg-transparent rtl:space-x-reverse"
                    :to="link.route">
                    <div class="flex items-center">
                        <Icon :icon="link.icon" class="w-4 h-4 text-primary text-center" />

                    </div>
                    <span>{{ t(`User.Header.${link.key}`) }}</span>
                </BaseButton>
            </nav>
        </div>

        <!-- Right: action buttons -->
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <template v-if="!isRTL">
                <!-- Cart -->
                <BaseButton size="sm" variant="secondary"
                    class="relative flex items-center justify-center !p-1.5 rounded-full" aria-label="Cart">
                    <Icon icon="mdi:cart" class="size-5 text-primary" />
                    <span v-if="cartCount > 0"
                        class="absolute -top-1 -right-1 text-xs w-4 h-4 rounded-full flex items-center justify-center bg-red-500 text-white">
                        {{ cartCount }}
                    </span>
                </BaseButton>

                <!-- Theme toggle -->
                <AppThemeToggle v-model="isDark" />

                <!-- Profile -->
                <BaseButton size="sm" variant="secondary" class="flex items-center justify-center !p-1.5 rounded-full"
                    aria-label="Profile">
                    <img alt="Profile" class="size-5 rounded-full" />
                </BaseButton>
            </template>

            <template v-else>
                <!-- RTL order: Profile -> Theme -> Cart -->
                <BaseButton size="sm" variant="secondary" class="flex items-center justify-center !p-1.5 rounded-full"
                    aria-label="Profile">
                    <img alt="Profile" class="size-5 rounded-full" />
                </BaseButton>

                <AppThemeToggle v-model="isDark" />

                <BaseButton size="sm" variant="secondary"
                    class="relative flex items-center justify-center !p-1.5 rounded-full" aria-label="Cart">
                    <Icon icon="mdi:cart" class="size-5 text-primary" />
                    <span v-if="cartCount > 0"
                        class="absolute -top-1 -right-1 text-xs w-4 h-4 rounded-full flex items-center justify-center bg-red-500 text-white">
                        {{ cartCount }}
                    </span>
                </BaseButton>
            </template>
        </div>
    </header>
</template>

<style scoped>
.hover-nav {
    position: relative;
    transition: all 0.3s ease;
}

.hover-nav::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: theme(colors.primary);
    transition: width 0.3s ease;
}

.hover-nav:hover::after {
    width: 100%;
}
</style>
