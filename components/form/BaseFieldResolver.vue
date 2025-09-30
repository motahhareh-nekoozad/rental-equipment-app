<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import BaseCheck from '../base/BaseCheck.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseSelect from '../base/BaseSelect.vue';


const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: [String, Number, Boolean, Array, Object], default: null },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

// Mapping field types to components
const componentMap: Record<string, any> = {
  text: BaseInput,
  select: BaseSelect,
  multiselect: BaseSelect,
  checkbox: BaseCheck,
};

const currentValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val;
  }
);

const updateValue = (value: any) => {
  currentValue.value = value;
  emit('update:modelValue', value);
};

const componentType = computed(() => componentMap[props.field.type]);
</script>

<template>
  <div class="w-full">
    <label v-if="field.label" class="block text-sm font-medium mb-1">
      {{ field.label }}
    </label>

    <component
      :is="componentType"
      v-model="currentValue"
      :field="field"
      :disabled="disabled || field.disabled"
      class="w-full"
    />
    
    <p v-if="field.helperText" class="text-xs text-gray-500 mt-1">
      {{ field.helperText }}
    </p>
  </div>
</template>
