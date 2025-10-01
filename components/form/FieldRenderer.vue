<script setup lang="ts">
import BaseFieldResolver from './BaseFieldResolver.vue';


const props = defineProps({
  field: Object,
  updateFieldValue: Function,
});

const value = ref(null);

const onChange = (val: any) => {
  value.value = val;
  props.updateFieldValue(props.field, val);
};
</script>

<template>
  <div>
    <label v-if="field.label" class="block mb-1 font-medium">{{ field.label }}</label>
    <BaseFieldResolver
      :field="props.field"
      v-model="value"
      @update:modelValue="onChange"
    />
  </div>
</template>
