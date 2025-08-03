<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="confirmarEnvio" class="w-full max-w-3xl bg-white text-gray-800 rounded-lg shadow-md p-8 space-y-6">
      
      <h2 class="text-lg font-semibold text-center text-sky-700">Registro de Hologramas</h2>

      <!-- Folios -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Folio Inicial -->
        <div class="flex flex-col">
          <label class="text-sm font-medium">Folio inicial</label>
          <input
            v-model.number="folioInicial"
            type="number"
            :class="[
              'px-2 py-1 rounded-md bg-white',
              folioInicial <= 0 ? 'border-red-500 border' : 'border-slate-400 border'
            ]"
            required
          />
        </div>

        <!-- Folio Final -->
        <div class="flex flex-col">
          <label class="text-sm font-medium">Folio final</label>
          <input
            v-model.number="folioFinal"
            type="number"
            :class="[
              'px-2 py-1 rounded-md bg-white',
              folioFinal <= folioInicial ? 'border-red-500 border' : 'border-slate-400 border'
            ]"
            required
          />
        </div>
      </div>

      <!-- Contador -->
      <div class="text-right font-semibold text-sky-700 text-sm">
        Total a registrar: {{ contador }} hologramas
      </div>

      <!-- Tipo de holograma -->
      <div class="flex flex-col">
        <label class="text-sm font-medium">Tipo de holograma</label>
        <select
          v-model="tipo"
          :class="[
            'px-2 py-1 rounded-md bg-white',
            !tipo ? 'border-red-500 border' : 'border-slate-400 border'
          ]"
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
          :class="[
            'px-2 py-1 rounded-md bg-white',
            !fecha ? 'border-red-500 border' : 'border-slate-400 border'
          ]"
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
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const folioInicial = ref(0)
const folioFinal = ref(null)
const contador = ref(0)
const tipo = ref('')
const fecha = ref('')
const folioFinalManual = ref(false)

// Autocompletar folioFinal si no se ha tocado
watch(folioInicial, () => {
  if (!folioFinalManual.value && folioInicial.value > 0) {
    folioFinal.value = folioInicial.value + 99
  }
})

// Detectar modificación manual
watch(folioFinal, (nuevo) => {
  folioFinalManual.value = nuevo !== folioInicial.value + 99
})

// Recalcular contador
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