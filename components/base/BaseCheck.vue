<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from "vue";

const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const isRtl = ref(false);

onMounted(() => {
  // Only runs on client
  isRtl.value = document.documentElement.dir === 'rtl';
});

function toggle() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <div class="flex items-center" :class="{'flex-row-reverse': isRtl}">
    <span v-if="label" class="mr-2 dark:text-white" :class="{'mr-0 ml-2': isRtl}">{{ label }}</span>
    <button
      @click="toggle"
      :class="[
        'w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none',
        props.modelValue ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
      ]"
    >
      <span
        :class="[
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300',
          props.modelValue ? 'translate-x-6' : 'translate-x-0'
        ]"
      ></span>
    </button>
  </div>
</template>
