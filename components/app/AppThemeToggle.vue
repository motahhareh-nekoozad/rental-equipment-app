<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineProps, defineEmits, watch } from "vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

function toggle() {
  emit("update:modelValue", !props.modelValue);
}

watch(() => props.modelValue, (val) => {
  document.documentElement.classList.toggle("dark", val);
});
</script>

<template>
  <button @click="toggle" aria-label="Toggle dark mode"
    class="relative size-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 shadow-lg transition-colors duration-500 hover:scale-110">
    <!--Sun With glow -->
    <Icon icon="mdi:weather-sunny"
      class="absolute w-6 h-6 text-primary drop-shadow-[0_0_4px_theme(colors.primary)] transition-all duration-500 transform"
      :class="{
        'opacity-100 scale-100 rotate-0': !props.modelValue,
        'opacity-0 scale-50 rotate-180': props.modelValue
      }" />
    <!--gradient subtle shadow -->
    <Icon icon="mdi:weather-night"
      class="absolute w-6 h-6 text-white dark:text-gray-200 drop-shadow-[0_0_2px_#ffffff] transition-all duration-500 transform"
      :class="{
        'opacity-0 scale-50 rotate-180': !props.modelValue,
        'opacity-100 scale-100 rotate-0': props.modelValue
      }" />
  </button>
</template>
