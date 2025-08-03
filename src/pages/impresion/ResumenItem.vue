<template>
  <div
    class="p-4 rounded text-center shadow"
    :class="tipo === 'Total' ? 'bg-emerald-100 font-bold' : 'bg-gray-100'"
  >
    <h3 class="text-lg font-bold">
      {{ tipo === 'Total' ? 'Total del Día' : 'Holograma ' + tipo }}
    </h3>
    <p class="text-2xl">{{ cantidad }}</p>
  </div>
</template>

<script setup>
defineProps(['tipo', 'cantidad'])
</script>
