<script setup lang="ts">
import { ref, watch, computed } from "vue"

const props = defineProps<{
  modelValue: boolean
  side?: "left" | "right"
}>()
const emit = defineEmits(["update:modelValue"])

// reactive local state
const isOpen = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => (isOpen.value = val)
)
watch(isOpen, (val) => emit("update:modelValue", val))

const sideClass = computed(() =>
  props.side === "right" ? "right-0 translate-x-full" : "left-0 -translate-x-full"
)

const sideOpenClass = computed(() =>
  props.side === "right" ? "translate-x-0 right-0" : "translate-x-0 left-0"
)
</script>

<template>
  <!-- Backdrop -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="isOpen = false"
    />
  </transition>

  <!-- Drawer -->
  <transition name="slide">
    <div
      class="fixed top-0 bottom-0 w-64 bg-bg border-r dark:border-gray-700 z-50 transition-transform"
      :class="[isOpen ? sideOpenClass : sideClass]"
    >
      <slot />
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
</style>
