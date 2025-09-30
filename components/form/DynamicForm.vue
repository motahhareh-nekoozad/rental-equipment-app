<script setup lang="ts">
import { ref } from 'vue';
import { useFormFields } from '@/composables/useFormFields';
import { useFormSubmit } from '@/composables/useFormSubmit';
import SectionRenderer from './SectionRenderer.vue';
import ButtonGroup from './ButtonGroup.vue';

interface Props {
  fields: any[];
  model: Record<string, any>;
  modelValue?: Record<string, any>;
  modelName?: string;
  submitLoading?: boolean;
  disableSubmit?: boolean;
  displayButtonsSubmit?: boolean;
  mode?: 'create' | 'update';
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'update:modelValue', payload: Record<string, any>): void;
  (e: 'submit', payload: Record<string, any>): void;
  (e: 'submitAndSubmitAnother', payload: Record<string, any>): void;
}>();

// Composables
const { formData, groupedFields, updateFieldValue } = useFormFields(props, emits);
const { handleSubmit, handleSubmitAndSubmitAnother, buttonDisabled } = useFormSubmit(formData, props, emits);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <template v-for="(fields, sectionName) in groupedFields" :key="sectionName">
      <SectionRenderer
        :section-name="sectionName"
        :fields="fields"
        :update-field-value="updateFieldValue"
      />
    </template>

    <ButtonGroup
      v-if="props.displayButtonsSubmit"
      :submit-loading="props.submitLoading"
      :disable-submit="buttonDisabled"
      @submit="handleSubmit"
      @submitAndSubmitAnother="handleSubmitAndSubmitAnother"
    />
  </form>
</template>
