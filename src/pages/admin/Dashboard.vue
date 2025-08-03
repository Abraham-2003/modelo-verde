<template>
  <div class="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-xl">
    <!-- Título + Botón -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Historial de Cargas</h2>
      <button
        @click="mostrarModal = true"
        class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md shadow-sm transition"
      >
        Registrar nuevo lote
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-3 mb-6">
      <button
        v-for="f in filtros"
        :key="f"
        @click="tipoSeleccionado = f"
        :class="[
          'px-4 py-2 rounded-full font-semibold transition',
          tipoSeleccionado === f ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ nombreTipo(f) }}
      </button>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3 font-bold text-gray-600">#</th>
            <th class="p-3 font-bold text-gray-600">Tipo</th>
            <th class="p-3 font-bold text-gray-600">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="holo in hologramasFiltrados"
            :key="holo.numero"
            :class="[' rounded-lg shadow-sm transition-all', colorFila(holo.tipo)]"
            style="margin-bottom: 0.5rem;"
          >
            <td class="p-4 border border-white font-mono rounded-l-md">{{ holo.numero }}</td>
            <td class="p-4 border border-white font-semibold">{{ nombreTipo(holo.tipo) }}</td>
            <td class="p-4 border border-white rounded-r-md">{{ holo.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <teleport to="body">
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 relative">
        <button
          @click="mostrarModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <form @submit.prevent="confirmarEnvio" class="space-y-6">
          <h2 class="text-lg font-semibold text-center text-sky-700">Registro de Hologramas</h2>

          <!-- Folios -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-medium">Folio inicial</label>
              <input
                v-model.number="folioInicial"
                type="number"
                :class="['px-2 py-1 rounded-md bg-white', folioInicial <= 0 ? 'border-red-500 border' : 'border-slate-400 border']"
                required
              />
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium">Folio final</label>
              <input
                v-model.number="folioFinal"
                type="number"
                :class="['px-2 py-1 rounded-md bg-white', folioFinal <= folioInicial ? 'border-red-500 border' : 'border-slate-400 border']"
                required
              />
            </div>
          </div>

          <!-- Contador -->
          <div class="text-right font-semibold text-sky-700 text-sm">
            Total a registrar: {{ contador }} hologramas
          </div>

          <!-- Tipo -->
          <div class="flex flex-col">
            <label class="text-sm font-medium">Tipo de holograma</label>
            <select
              v-model="tipo"
              :class="['px-2 py-1 rounded-md bg-white', !tipo ? 'border-red-500 border' : 'border-slate-400 border']"
              required
            >
              <option disabled value="">Selecciona tipo</option>
              <option value="rechazo">Rechazo</option>
              <option value="0">Tipo 0</option>
              <option value="00">Tipo 00</option>
              <option value="1">Tipo 1</option>
              <option value="2">Tipo 2</option>
            </select>
          </div>

          <!-- Fecha -->
          <div class="flex flex-col">
            <label class="text-sm font-medium">Fecha</label>
            <input
              v-model="fecha"
              type="date"
              :class="['px-2 py-1 rounded-md bg-white', !fecha ? 'border-red-500 border' : 'border-slate-400 border']"
              required
            />
          </div>

          <!-- Botón -->
          <button
            type="submit"
            class="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md shadow-sm transition-colors"
          >
            Subir lote
          </button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const mostrarModal = ref(false)

const hologramas = ref([
  { numero: 7474701, tipo: '0', fecha: '01/08/2025 22:00' },
  { numero: 7474702, tipo: '00', fecha: '01/08/2025 22:01' },
  { numero: 7474703, tipo: '1', fecha: '01/08/2025 22:02' },
  { numero: 7474704, tipo: '2', fecha: '01/08/2025 22:03' },
  { numero: 7474705, tipo: 'rechazo', fecha: '01/08/2025 22:04' },
  { numero: 7474706, tipo: '1', fecha: '01/08/2025 22:05' },
  { numero: 7474707, tipo: '0', fecha: '01/08/2025 22:06' },
])

const tipoSeleccionado = ref('todos')
const filtros = ['todos', 'rechazo', '0', '00', '1', '2']

const hologramasFiltrados = computed(() => {
  if (tipoSeleccionado.value === 'todos') return hologramas.value
  return hologramas.value.filter(h => h.tipo === tipoSeleccionado.value)
})

function colorFila(tipo) {
  return {
    rechazo: 'bg-purple-100 text-purple-800',
    '0': 'bg-yellow-100 text-yellow-700',
    '00': 'bg-green-100 text-green-700',
    '1': 'bg-orange-100 text-orange-700',
    '2': 'bg-red-100 text-red-700',
  }[tipo] || 'bg-gray-100 text-gray-700'
}


function nombreTipo(tipo) {
  return {
    todos: 'Todos',
    rechazo: 'Rechazo (morado)',
    '0': 'Tipo 0 (amarillo)',
    '00': 'Tipo 00 (verde)',
    '1': 'Tipo 1 (naranja)',
    '2': 'Tipo 2 (rojo)',
  }[tipo] || tipo
}

// Formulario
const folioInicial = ref(0)
const folioFinal = ref(null)
const contador = ref(0)
const tipo = ref('')
const fecha = ref('')
const folioFinalManual = ref(false)

watch(folioInicial, () => {
  if (!folioFinalManual.value && folioInicial.value > 0) {
    folioFinal.value = folioInicial.value + 99
  }
})
watch(folioFinal, (nuevo) => {
  folioFinalManual.value = nuevo !== folioInicial.value + 99
})
watch([folioInicial, folioFinal], () => {
  contador.value = folioFinal.value >= folioInicial.value
    ? folioFinal.value - folioInicial.value + 1
    : 0
})
onMounted(() => {
  const hoy = new Date()
  fecha.value = hoy.toISOString().slice(0, 10)
})

function confirmarEnvio() {
  if (folioInicial.value <= 0 || folioFinal.value <= 0 || contador.value <= 0 || !fecha.value || !tipo.value) {
    Swal.fire({
            title: 'Campos incompletos o inválidos',
      text: 'Por favor corrige los errores antes de continuar.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
    return
  }

  Swal.fire({
    title: '¿Deseas registrar este lote?',
    text: `Se registrarán ${contador.value} hologramas del tipo "${tipo.value}".`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      enviarHologramas()
    }
  })
}

function enviarHologramas() {
  console.log({
    folioInicial: folioInicial.value,
    folioFinal: folioFinal.value,
    fecha: fecha.value,
    tipo: tipo.value,
    cantidad: contador.value
  })

  Swal.fire({
    title: '¡Lote registrado!',
    text: `Se han cargado correctamente ${contador.value} hologramas del tipo "${tipo.value}".`,
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    resetearFormulario()
    mostrarModal.value = false
  })
}

function resetearFormulario() {
  folioInicial.value = 0
  folioFinal.value = null
  tipo.value = ''
  contador.value = 0
  folioFinalManual.value = false
  const hoy = new Date()
  fecha.value = hoy.toISOString().slice(0, 10)
}
</script>
