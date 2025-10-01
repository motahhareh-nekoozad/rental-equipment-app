<script setup lang="ts">
const props = defineProps({
  submitLoading: Boolean,
  disableSubmit: Boolean,
  isSubmitAndSubmitAnotherAllowed: { type: Boolean, default: true },
});

const emits = defineEmits(['submit', 'submitAndSubmitAnother']);
</script>

<template>
  <div class="flex gap-4 mt-4">
    <button
      type="button"
      class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      :disabled="disableSubmit || submitLoading"
      @click="$emit('submit')"
    >
      Submit
    </button>

    <button
      v-if="isSubmitAndSubmitAnotherAllowed"
      type="button"
      class="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
      :disabled="disableSubmit || submitLoading"
      @click="$emit('submitAndSubmitAnother')"
    >
      Submit and Add Another
    </button>
  </div>
</template>
