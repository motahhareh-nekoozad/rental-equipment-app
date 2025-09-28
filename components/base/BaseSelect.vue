<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  options: { label: string; value: string | number }[];
  disabled?: boolean;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : props.placeholder || 'Select...';
});

function toggleDropdown() {
  if (!props.disabled) isOpen.value = !isOpen.value;
}

function selectOption(option: { label: string; value: string | number }) {
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.custom-select')) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative w-full custom-select">
    <!-- Selected -->
    <button
      type="button"
      class="w-full flex justify-between items-center px-4 py-2 border rounded
             border-gray-300 dark:border-gray-700 bg-bg text-text
             focus:outline-none focus:ring-2 focus:ring-primary
             transition"
      @click="toggleDropdown"
      :disabled="props.disabled"
    >
      <span>{{ selectedLabel }}</span>
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <ul
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 border border-gray-300 dark:border-gray-700
             bg-bg rounded shadow-md max-h-60 overflow-auto transition"
    >
      <li
        v-for="opt in props.options"
        :key="opt.value"
        @click="selectOption(opt)"
        class="px-4 py-2 cursor-pointer hover:bg-primary hover:text-bg transition"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>
