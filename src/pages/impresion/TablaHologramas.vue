<template>
  <div class="overflow-x-auto">
    <table class="w-full border border-gray-300 text-sm">
      <thead>
        <tr class="bg-gray-100 text-left text-xs uppercase tracking-wide text-gray-600">
          <th class="px-2 py-2">#</th>
          <th class="px-2 py-2">Folio</th>
          <th class="px-2 py-2">Tipo</th>
          <th class="px-2 py-2">Fecha</th>
          <th class="px-2 py-2">Hora Impresión</th>
          <th class="px-2 py-2">Placa</th>
          <th class="px-2 py-2">Tipo Placa</th>
          <th class="px-2 py-2">Combustible</th>
          <th class="px-2 py-2">Técnico</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reg, index) in historial"
          :key="reg.folio"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
        >
          <td class="px-2 py-2 text-gray-600">{{ index + 1 }}</td>
          <td class="px-2 py-2 font-medium text-blue-600">{{ reg.folio }}</td>
          <td class="px-2 py-2">{{ reg.tipo }}</td>
          <td class="px-2 py-2">{{ reg.fecha }}</td>
          <td class="px-2 py-2">{{ reg.horaImpresion }}</td>
          <td class="px-2 py-2">{{ reg.placa }}</td>
          <td class="px-2 py-2">{{ reg.tipoPlaca }}</td>
          <td class="px-2 py-2">{{ reg.combustible }}</td>
          <td class="px-2 py-2">{{ reg.tecnico }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['historial', 'filtros'])
</script>

<style scoped>
table {
  @apply rounded overflow-hidden shadow-sm;
}
</style>
