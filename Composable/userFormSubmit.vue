export function useFormSubmit(formData: any, props: any, emits: any) {
  const buttonDisabled = computed(() => props.submitLoading || props.disableSubmit);

  const handleSubmit = async () => {
    // TODO: validation logic
    emits('submit', { ...formData });
  };

  const handleSubmitAndSubmitAnother = async () => {
    // TODO: validation logic
    emits('submitAndSubmitAnother', { ...formData });
  };

  return { handleSubmit, handleSubmitAndSubmitAnother, buttonDisabled };
}
