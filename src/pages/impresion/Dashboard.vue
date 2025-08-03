<template>
  <div class="p-6 space-y-8">
    <!-- Resumen diario -->
    <div class="grid grid-cols-7 gap-3">
      <ResumenItem tipo="00" :cantidad="70" />
<ResumenItem tipo="0" :cantidad="20" />
<ResumenItem tipo="1" :cantidad="0" />
<ResumenItem tipo="2" :cantidad="0" />
<ResumenItem tipo="Cancelados" :cantidad="0" />
<ResumenItem tipo="Rechazo" :cantidad="2" />
<ResumenItem tipo="Total" :cantidad="92" />

    </div>

    <!-- Tabla de historial -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Historial del Día</h2>
      <div class="flex flex-wrap gap-3 mb-3">
  <input type="date" v-model="filtros.fecha" class="input" />

  <select v-model="filtros.tipo" class="input">
    <option value="">Todos</option>
    <option v-for="t in tipos" :key="t">{{ t }}</option>
  </select>

  <select v-model="filtros.tecnico" class="input">
    <option value="">Todos</option>
    <option v-for="tec in tecnicos" :key="tec.clave" :value="tec.nombre">{{ tec.nombre }}</option>
  </select>

  <input
    type="text"
    placeholder="Placa"
    v-model="filtros.placa"
    class="input"
  />

  <select v-model="filtros.combustible" class="input">
    <option value="">Combustible</option>
    <option v-for="c in tiposCombustible" :key="c">{{ c }}</option>
  </select>
</div>


      <TablaHologramas :filtros="filtros" :historial="historialFiltrado" />
    </div>
<div class="flex justify-end mt-2">
  <div class="flex gap-1 items-center text-xs">
    <button
      @click="anteriorPagina"
      :disabled="paginaActual === 1"
      class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
    >
      ←
    </button>
    <span class="px-2">Página {{ paginaActual }} / {{ totalPaginas }}</span>
    <button
      @click="siguientePagina"
      :disabled="paginaActual === totalPaginas"
      class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
    >
      →
    </button>
  </div>
</div>


    <!-- Registrar botón -->
    <button @click="mostrarModal = true" class="btn-primary">Registrar Holograma</button>

    <!-- Modal de registro -->
    <Modal v-if="mostrarModal" @cerrar="mostrarModal = false">
      <FormularioRegistro
        :consecutivo="consecutivo"
        :tecnicos="tecnicos"
        @registro-exitoso="agregarRegistro"
      />
    </Modal>
  </div>
  
</template>

<script setup>
import { ref, computed } from 'vue'
import ResumenItem from './ResumenItem.vue'
import TablaHologramas from './TablaHologramas.vue'
import Modal from './Modal.vue'
import FormularioRegistro from './FormularioRegistro.vue'

// Historial (simulado)
const historial = ref([
  { folio: 10001, tipo: '00', fecha: '2025-08-01', horaImpresion: '08:30', placa: 'ABC1234', tipoPlaca: 'Particular', combustible: 'Gasolina', tecnico: 'Lucía' },
  { folio: 10002, tipo: '0', fecha: '2025-08-01', horaImpresion: '09:00', placa: 'CD12EF', tipoPlaca: 'Discapacidad', combustible: 'Diesel', tecnico: 'Vicente Guerrero' },
  { folio: 10003, tipo: 'Rechazo', fecha: '2025-08-01', horaImpresion: '09:15', placa: 'CARG12', tipoPlaca: 'Carga', combustible: 'Gasolina', tecnico: 'Lucía' },
  { folio: 10004, tipo: '1', fecha: '2025-08-01', horaImpresion: '10:00', placa: 'ABC5678', tipoPlaca: 'Particular', combustible: 'Gasolina', tecnico: 'Vicente Guerrero' },
  { folio: 10005, tipo: '2', fecha: '2025-08-01', horaImpresion: '10:25', placa: 'CD22FF', tipoPlaca: 'Discapacidad', combustible: 'Diesel', tecnico: 'Lucía' },
  { folio: 10006, tipo: '0', fecha: '2025-08-01', horaImpresion: '11:00', placa: 'CARG88', tipoPlaca: 'Carga', combustible: 'Gas LP', tecnico: 'Vicente Guerrero' },
  { folio: 10007, tipo: 'Rechazo', fecha: '2025-08-01', horaImpresion: '11:30', placa: 'ABC9999', tipoPlaca: 'Particular', combustible: 'Gasolina', tecnico: 'Lucía' },
  { folio: 10008, tipo: '00', fecha: '2025-08-01', horaImpresion: '12:00', placa: 'CD44ZZ', tipoPlaca: 'Discapacidad', combustible: 'Diesel', tecnico: 'Vicente Guerrero' },
  { folio: 10009, tipo: '1', fecha: '2025-08-01', horaImpresion: '12:30', placa: 'CARG44', tipoPlaca: 'Carga', combustible: 'Gasolina', tecnico: 'Lucía' },
  { folio: 10010, tipo: '2', fecha: '2025-08-01', horaImpresion: '13:00', placa: 'ABC7777', tipoPlaca: 'Particular', combustible: 'Gasolina', tecnico: 'Vicente Guerrero' },
])

const filtros = ref({
  fecha: '',
  tipo: '',
  tecnico: '',
})

const paginaActual = ref(1)
const porPagina = 5

const historialFiltrado = computed(() => {
  const filtrados = historial.value.filter(h => {
    const coincideFecha = !filtros.value.fecha || h.fecha === filtros.value.fecha
    const coincideTipo = !filtros.value.tipo || h.tipo === filtros.value.tipo
    const coincideTecnico = !filtros.value.tecnico || h.tecnico === filtros.value.tecnico
    return coincideFecha && coincideTipo && coincideTecnico
  })

  const inicio = (paginaActual.value - 1) * porPagina
  const fin = inicio + porPagina
  return filtrados.slice(inicio, fin)
})

const totalPaginas = computed(() =>
  Math.ceil(
    historial.value.filter(h => {
      const coincideFecha = !filtros.value.fecha || h.fecha === filtros.value.fecha
      const coincideTipo = !filtros.value.tipo || h.tipo === filtros.value.tipo
      const coincideTecnico = !filtros.value.tecnico || h.tecnico === filtros.value.tecnico
      return coincideFecha && coincideTipo && coincideTecnico
    }).length / porPagina
  )
)

function siguientePagina() {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++
}

function anteriorPagina() {
  if (paginaActual.value > 1) paginaActual.value--
}


const contadores = computed(() => {
  const res = { '0': 0, '00': 0, '1': 0, '2': 0, Rechazo: 0 }
  historial.value.forEach(h => {
    if (res[h.tipo] !== undefined) res[h.tipo]++
  })
  return res
})

const tipos = ['0', '00', '1', '2', 'Rechazo']

const tecnicos = [
  { clave: 'TEC01', nombre: '17485' },
  { clave: 'TEC02', nombre: '17585' }
]

const mostrarModal = ref(false)

const consecutivo = computed(() => {
  const ult = historial.value.at(-1)?.folio || 10000
  return ult + 1
})

function agregarRegistro(data) {
  historial.value.push(data)
  mostrarModal.value = false
}
</script>

<style scoped>
.input {
  @apply border px-3 py-1 rounded;
}
.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700;
}
</style>
