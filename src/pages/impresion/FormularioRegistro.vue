<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Registrar Holograma</h2>

    <div class="grid grid-cols-2 gap-3">
      <!-- Horario -->
      <input type="time" v-model="datos.horaLlegada" class="input" placeholder="Hora Llegada" />
<input type="time" v-model="datos.horaImpresion" class="input" placeholder="Hora Impresión" />
<input type="time" v-model="datos.horaEntrega" class="input" placeholder="Hora Entrega" />

      <input v-model="placa" placeholder="Placa" @input="actualizarTipoPlaca" type="text" class="px-3 py-1 border border-slate-400 rounded-md bg-white" required />

      <!-- Tipo de placa -->
      <input :value="tipoPlaca" disabled class="px-3 py-1 border border-slate-400 rounded-md bg-gray-100 text-gray-700" />

      <!-- Nota -->
      <input
        type="text"
        v-model="datos.nota"
        placeholder="Nota (ej. 55555)"
        class="input"
        @change="llenarDatosDesdeNota"
      />

      <!-- Fecha del ticket (autocompletada) -->
      <input type="date" v-model="datos.fechaTicket" class="input" disabled />

      <!-- Placa del ticket (autocompletada) -->
      <input type="text" v-model="datos.placaTicket" class="input" disabled />

      <!-- Tipo de combustible (autocompletado) -->
      <input type="text" v-model="datos.combustible" class="input" disabled />

      <!-- Marca -->
      <select v-model="datos.marca" class="input">
        <option disabled value="">Marca</option>
        <option v-for="m in marcas" :key="m">{{ m }}</option>
      </select>

      <!-- Técnico -->
      <select v-model="datos.tecnico" class="input">
        <option value="">Todos</option>
        <option v-for="tec in tecnicos" :key="tec.clave" :value="tec.nombre">
          {{ tec.nombre }}
        </option>
      </select>

      <!-- Holograma -->
      <input
        type="text"
        v-model="datos.holograma"
        placeholder="Holograma"
        class="input"
        @change="validarConsecutivo"
      />
    </div>

    <!-- Botón guardar -->
    <button class="mt-4 btn" @click="confirmarGuardar">Guardar</button>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { reactive } from 'vue'
import { ref, computed, onMounted } from 'vue'
const placa = ref('')
const tipoPlaca = ref('')
const datos = reactive({
  hora: '',
  nota: '',
  fechaTicket: '',
  placaTicket: '',
  combustible: '',
  marca: '',
  tecnico: '',
  holograma: ''
})

const marcas = ['Toyota', 'Nissan', 'Chevrolet', 'Ford']
const tecnicos = [
  { clave: '001', nombre: 'Carlos' },
  { clave: '002', nombre: 'Andrea' },
  { clave: '003', nombre: 'Marcos' }
]
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
actualizarTipoPlaca()

function llenarDatosDesdeNota() {
  if (datos.nota === '55555') {
    datos.fechaTicket = '2025-08-01'
    datos.placaTicket = 'ABC1234'
    datos.combustible = 'Gasolina'

    if (datos.placa !== datos.placaTicket) {
      Swal.fire({
        icon: 'warning',
        title: 'Placa no coincide',
        text: `La placa registrada (${datos.placa}) no coincide con la del ticket (${datos.placaTicket}).`
      })
    }
  }
}

function validarConsecutivo() {
  if (datos.holograma !== '10003') {
    Swal.fire({
      icon: 'warning',
      title: 'Holograma no consecutivo',
      text: `Se esperaba el holograma 10003. ¿Deseas continuar?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    })
  }
}

function confirmarGuardar() {
  Swal.fire({
    icon: 'question',
    title: '¿Confirmar registro?',
    html: `Placa: <strong>${datos.placa}</strong><br>Holograma: <strong>${datos.holograma}</strong>`,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Holograma guardado correctamente.'
      })
    }
  })
}
</script>

<style scoped>
.input {
  @apply border p-2 rounded w-full;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>
