import { reactive, computed, watch } from 'vue';

export function useFormFields(props: any, emits: any) {
  const formData = reactive({ ...props.model });

  // Initialize default values
  props.fields.forEach((field: any) => {
    if (formData[field.key] === undefined) formData[field.key] = field.default ?? '';
  });

  // Update field value
  const updateFieldValue = (field: any, value: any) => {
    formData[field.key] = value;
    emits('update:modelValue', { ...formData });
  };

  // Group fields by section
  const groupedFields = computed(() => {
    const groups: Record<string, any[]> = {};
    props.fields.forEach((field: any) => {
      const section = field.section || 'Default';
      if (!groups[section]) groups[section] = [];
      groups[section].push(field);
    });
    return groups;
  });

  return { formData, groupedFields, updateFieldValue };
}
