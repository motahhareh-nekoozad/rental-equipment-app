<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

// Props for dynamic input
const props = defineProps<{
  modelValue: string | number;
  type?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

// Compute dynamic classes based on props
const inputClasses = computed(() => {
  const base = "rounded border focus:outline-none focus:ring-2 transition w-full";

  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<string, string> = {
    primary: "border-gray-300 dark:border-gray-700 bg-white dark:bg-baseBlack text-text dark:text-white focus:ring-primary",
    secondary: "border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-text dark:text-white focus:ring-secondary",
    danger: "border-red-500 bg-white dark:bg-baseBlack text-red-600 dark:text-red-400 focus:ring-red-500",
  };

  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return [base, sizeClasses[props.size ?? "md"], variantClasses[props.variant ?? "primary"], disabledClass].join(" ");
});

// Handle input event
function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <input
    :type="props.type ?? 'text'"
    :placeholder="props.placeholder ?? ''"
    :value="props.modelValue"
    :disabled="props.disabled"
    :class="inputClasses"
    @input="updateValue"
  />
</template>

<style scoped>
/* Optional focus shadow for better UI feedback */
input:focus {
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3);
}
</style>
