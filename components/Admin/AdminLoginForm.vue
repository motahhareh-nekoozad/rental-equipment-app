<script setup lang="ts">
import { reactive } from 'vue';
import ButtonGroup from '../form/ButtonGroup.vue';
import FieldRenderer from '../form/FieldRenderer.vue';

const props = defineProps({
  modelValue: Object,
  submitLoading: Boolean,
  disableSubmit: Boolean,
});

const emits = defineEmits(['update:modelValue', 'submit']);

const formData = reactive({
  username: '',
  password: '',
  ...props.modelValue,
});

const updateFieldValue = (field: any, value: any) => {
  formData[field.key] = value;
  emits('update:modelValue', { ...formData });
};

const handleSubmit = () => {
  emits('submit', { ...formData });
};

const loginFields = [
  { key: 'username', label: 'Username', type: 'text', required: true },
  { key: 'password', label: 'Password', type: 'password', required: true },
];
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
    <FieldRenderer
      v-for="field in loginFields"
      :key="field.key"
      :field="field"
      :update-field-value="updateFieldValue"
    />

    <ButtonGroup
      :submit-loading="props.submitLoading"
      :disable-submit="props.disableSubmit"
      @submit="handleSubmit"
      :is-submit-and-submit-another-allowed="false"
    />
  </form>
</template>
