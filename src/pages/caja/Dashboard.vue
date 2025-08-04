<template>
  <div class="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-xl">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">Historial de Notas</h2>
      <button @click="mostrarModal = true" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md shadow-sm transition">
        Registrar nota
      </button>
    </div>

    <div class="mb-4">
      <input v-model="busqueda" placeholder="Buscar por placa..." class="w-full px-4 py-2 border border-slate-300 rounded-md bg-gray-50 text-sm" />
    </div>

    <table class="min-w-full text-sm border rounded-lg overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3 font-bold text-gray-600">Nota #</th>
          <th class="p-3 font-bold text-gray-600">Placa</th>
          <th class="p-3 font-bold text-gray-600">Tipo</th>
          <th class="p-3 font-bold text-gray-600">Combustible</th>
          <th class="p-3 font-bold text-gray-600">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nota, index) in notasPaginadas" :key="nota.numero" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
          <td class="p-3 font-mono">{{ nota.numero }}</td>
          <td class="p-3 font-semibold">{{ nota.placa }}</td>
          <td class="p-3">{{ nota.tipo }}</td>
          <td class="p-3 capitalize">{{ nota.combustible }}</td>
          <td class="p-3">{{ nota.fecha }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 flex justify-end items-center gap-2 text-sm">
      <button @click="paginaActual--" :disabled="paginaActual === 1" class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
        ← Anterior
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="paginaActual++" :disabled="paginaActual === totalPaginas" class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
        Siguiente →
      </button>
    </div>
  </div>

  <!-- Modal -->
  <teleport to="body">
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        <button @click="mostrarModal = false" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">×</button>

        <form @submit.prevent="registrarNota" class="space-y-4">
          <h2 class="text-lg font-semibold text-center text-sky-700">Registro de Nota</h2>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Placa</label>
            <input v-model="placa" @input="actualizarTipoPlaca" type="text" class="px-3 py-1 border border-slate-400 rounded-md bg-white" required />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Tipo de placa</label>
            <input :value="tipoPlaca" disabled class="px-3 py-1 border border-slate-400 rounded-md bg-gray-100 text-gray-700" />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Tipo de combustible</label>
            <select v-model="combustible" class="px-3 py-1 border border-slate-400 rounded-md bg-white" required>
              <option disabled value="">Selecciona tipo</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diésel</option>
              <option value="electrico">Eléctrico</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Fecha</label>
            <input v-model="fecha" type="date" class="px-3 py-1 border border-slate-400 rounded-md bg-white" required />
          </div>

          <button type="submit" class="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md transition">
            Guardar nota
          </button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const mostrarModal = ref(false)
const placa = ref('')
const tipoPlaca = ref('')
const combustible = ref('')
const fecha = ref('')
const busqueda = ref('')
const paginaActual = ref(1)
const porPagina = 5

const notas = ref([
  { numero: 1001, placa: 'ABC-123', tipo: 'Particular', combustible: 'gasolina', fecha: '02/08/2025' },
  { numero: 1002, placa: '12XYZ78', tipo: 'Discapacidad', combustible: 'diesel', fecha: '02/08/2025' },
  { numero: 1003, placa: 'XY1234', tipo: 'Carga', combustible: 'hibrido', fecha: '01/08/2025' },
  { numero: 1004, placa: 'JHK-876', tipo: 'Motocicleta', combustible: 'gasolina', fecha: '03/08/2025' },
  { numero: 1005, placa: 'ZZ9999', tipo: 'Transporte público', combustible: 'gas', fecha: '03/08/2025' },
  { numero: 1006, placa: 'MNO-456', tipo: 'Particular', combustible: 'electricidad', fecha: '01/08/2025' },
  { numero: 1007, placa: 'AAA-111', tipo: 'Carga', combustible: 'diesel', fecha: '02/08/2025' },
  { numero: 1008, placa: 'BCD-222', tipo: 'Discapacidad', combustible: 'hibrido', fecha: '03/08/2025' },
  { numero: 1009, placa: 'EFG-333', tipo: 'Motocicleta', combustible: 'gasolina', fecha: '03/08/2025' },
  { numero: 1010, placa: 'HIJ-444', tipo: 'Particular', combustible: 'diesel', fecha: '01/08/2025' }
])


const notasFiltradas = computed(() =>
  busqueda.value ? notas.value.filter(n => n.placa.toLowerCase().includes(busqueda.value.toLowerCase())) : notas.value
)

const totalPaginas = computed(() =>
  Math.ceil(notasFiltradas.value.length / porPagina)
)

const notasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return notasFiltradas.value.slice(inicio, inicio + porPagina)
})

onMounted(() => {
  const hoy = new Date()
  fecha.value = hoy.toISOString().slice(0, 10)
})

function clasificarPlaca(p) {
  const upper = p.toUpperCase()
  if (/^[A-Z]{3}/.test(upper)) return 'Particular'
  if (/^\d{2}/.test(upper)) return 'Discapacidad'
  if (/^[A-Z]{2}/.test(upper)) return 'Carga'
  return 'Desconocido'
}

function actualizarTipoPlaca() {
  tipoPlaca.value = clasificarPlaca(placa.value)
}

function registrarNota() {
  if (!placa.value || !combustible.value || !fecha.value) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor completa todos los campos.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
    return
  }

  actualizarTipoPlaca()

  Swal.fire({
    title: '¿Confirmar datos?',
    html: `
      <strong>Placa:</strong> ${placa.value} <br/>
      <strong>Tipo:</strong> ${tipoPlaca.value} <br/>
      <strong>Combustible:</strong> ${combustible.value} <br/>
      <strong>Fecha:</strong> ${fecha.value}
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      const nuevoNumero = notas.value.length ? notas.value.at(-1).numero + 1 : 1001

      notas.value.push({
        numero: nuevoNumero,
        placa: placa.value,
        tipo: tipoPlaca.value,
        combustible: combustible.value,
        fecha: fecha.value
      })

      Swal.fire({
        title: 'Nota registrada',
        text: `Se ha guardado la nota para la placa ${placa.value}.`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        mostrarModal.value = false
        placa.value = ''
        tipoPlaca.value = ''
        combustible.value = ''
        const hoy = new Date()
        fecha.value = hoy.toISOString().slice(0, 10)
        paginaActual.value = 1
      })
    }
  })
}

</script>
