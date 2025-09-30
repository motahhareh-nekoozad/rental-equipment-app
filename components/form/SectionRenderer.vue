<script setup lang="ts">
import FieldRenderer from './FieldRenderer.vue';

const props = defineProps({
  sectionName: String,
  fields: Array,
  updateFieldValue: Function,
});
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">{{ sectionName }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldRenderer
        v-for="field in fields"
        :key="field.key"
        :field="field"
        :update-field-value="updateFieldValue"
      />
    </div>
  </div>
</template>
