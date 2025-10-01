<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <AdminLoginForm
      v-model="loginModel"
      :submit-loading="loading"
      :disable-submit="loading"
      @submit="handleLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loginModel = ref({ username: '', password: '' });
const loading = ref(false);

const handleLogin = async (formData: any) => {
  loading.value = true;
  try {
    // await api.login(formData.username, formData.password);
    console.log('Login submitted:', formData);
  } finally {
    loading.value = false;
  }
};
</script>
