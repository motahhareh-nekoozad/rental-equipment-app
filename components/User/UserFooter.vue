<script setup lang="ts">
import { Icon } from "@iconify/vue"

// Example footer links
const footerLinks = [
  { text: "About Us", href: "/about" },
  { text: "Contact", href: "/contact" },
  { text: "Privacy Policy", href: "/privacy" },
]
</script>

<template>
  <footer class="bg-primary text-white py-6 px-4 mt-auto transition-colors duration-500 rounded-t-2xl shadow-lg">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
      <!-- Copyright text -->
      <p class="text-sm">&copy; {{ new Date().getFullYear() }} RentalGear. All rights reserved.</p>

      <!-- Footer links -->
      <div class="flex space-x-4 rtl:space-x-reverse">
        <a
          v-for="link in footerLinks"
          :key="link.text"
          :href="link.href"
          class="text-white text-sm hover:text-bg transition-colors duration-300 flex items-center space-x-1 rtl:space-x-reverse"
        >
          <!-- Icon next to link text -->
          <Icon icon="mdi:arrow-right" class="w-4 h-4" />
          <span>{{ link.text }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>
