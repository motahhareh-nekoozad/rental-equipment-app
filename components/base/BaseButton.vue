<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from "vue";

// Define props with TypeScript types
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    disabled: false,
  }
);

// Emit click event
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

// Compute classes dynamically based on props
const buttonClasses = computed(() => {
  const base = "rounded font-medium focus:outline-none focus:ring-2 transition-all";

  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<string, string> = {
    primary: "bg-primary text-bg hover:opacity-80 dark:bg-primary-dark dark:text-bg",
    secondary: "bg-secondary text-bg hover:opacity-80 dark:bg-secondary-dark dark:text-bg",
    danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  };

  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return [base, sizeClasses[props.size!], variantClasses[props.variant!], disabledClass].join(" ");
});
</script>

<template>
  <button
    :type="props.type"
    :class="buttonClasses"
    :disabled="props.disabled"
    @click="(e) => emit('click', e)"
  >
    <slot />
  </button>
</template>
