<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
      <button
        @click="$emit('cerrar')"
        class="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
      >
        &times;
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
// Este modal se cierra al emitir el evento 'cerrar'
// El contenido dinámico se incluye por medio del <slot />
</script>

<style scoped>
/* Se puede expandir con animaciones si lo deseas */
</style>
