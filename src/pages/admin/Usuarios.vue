<template>
  <div class="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-xl">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold text-gray-800">Gestión de Usuarios</h2>
      <button
        @click="mostrarModal = true"
        class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md shadow-sm transition"
      >
        Registrar usuario
      </button>
    </div>

    <!-- Filtro -->
    <div class="mb-4 flex gap-3 items-center">
      <label class="text-sm font-medium text-gray-600">Filtrar por rol:</label>
      <select
        v-model="filtroRol"
        class="px-3 py-1 border border-slate-300 rounded-md bg-white text-sm"
      >
        <option value="">Todos</option>
        <option value="admin">Administrador</option>
        <option value="caja">Caja</option>
        <option value="impresion">Impresión</option>
      </select>
    </div>

    <!-- Tabla -->
    <table class="min-w-full text-sm border rounded-lg overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3 font-bold text-gray-600">#</th>
          <th class="p-3 font-bold text-gray-600">Nombre</th>
          <th class="p-3 font-bold text-gray-600">Correo</th>
          <th class="p-3 font-bold text-gray-600">Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(usuario, index) in usuariosPaginados"
          :key="usuario.correo"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
        >
          <td class="p-3">{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
          <td class="p-3 font-semibold">{{ usuario.nombre }}</td>
          <td class="p-3">{{ usuario.correo }}</td>
          <td class="p-3 capitalize">{{ usuario.rol }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="mt-4 flex justify-end items-center gap-2 text-sm">
      <button
        @click="paginaActual--"
        :disabled="paginaActual === 1"
        class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        ← Anterior
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button
        @click="paginaActual++"
        :disabled="paginaActual === totalPaginas"
        class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>
  </div>

  <!-- Modal de registro -->
  <teleport to="body">
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">
        <button
          @click="mostrarModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <form @submit.prevent="registrarUsuario" class="space-y-4">
          <h2 class="text-lg font-semibold text-center text-sky-700">Registro de Usuario</h2>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Nombre completo</label>
            <input v-model="nombre" type="text" required class="px-3 py-1 border border-slate-400 rounded-md bg-white" />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Correo</label>
            <input v-model="correo" type="email" required class="px-3 py-1 border border-slate-400 rounded-md bg-white" />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Contraseña</label>
            <input v-model="contrasena" type="password" required class="px-3 py-1 border border-slate-400 rounded-md bg-white" />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium">Rol</label>
            <select v-model="rol" required class="px-3 py-1 border border-slate-400 rounded-md bg-white">
              <option disabled value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="caja">Caja</option>
              <option value="impresion">Impresión</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md transition"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const mostrarModal = ref(false)
const nombre = ref('')
const correo = ref('')
const contrasena = ref('')
const rol = ref('')
const filtroRol = ref('')
const paginaActual = ref(1)
const porPagina = 5

const usuarios = ref([
  { nombre: 'Ana Martínez', correo: 'ana@example.com', rol: 'admin' },
  { nombre: 'Luis Torres', correo: 'luis@example.com', rol: 'caja' },
  { nombre: 'Carlos Núñez', correo: 'carlos@example.com', rol: 'impresion' },
  { nombre: 'María López', correo: 'maria@example.com', rol: 'caja' },
  { nombre: 'Pedro Sánchez', correo: 'pedro@example.com', rol: 'impresion' },
  { nombre: 'Laura Gómez', correo: 'laura@example.com', rol: 'admin' },
])

const usuariosFiltrados = computed(() =>
  filtroRol.value
    ? usuarios.value.filter(u => u.rol === filtroRol.value)
    : usuarios.value
)

const totalPaginas = computed(() =>
  Math.ceil(usuariosFiltrados.value.length / porPagina)
)

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return usuariosFiltrados.value.slice(inicio, inicio + porPagina)
})

function registrarUsuario() {
  if (!nombre.value || !correo.value || !contrasena.value || !rol.value) {
    Swal.fire({
      title: 'Datos incompletos',
      text: 'Por favor llena todos los campos.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
    return
  }

  usuarios.value.push({
    nombre: nombre.value,
    correo: correo.value,
    rol: rol.value
  })

  Swal.fire({
    title: '¡Usuario registrado!',
    text: `Se ha registrado exitosamente a ${nombre.value}.`,
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    mostrarModal.value = false
    nombre.value = ''
    correo.value = ''
    contrasena.value = ''
    rol.value = ''
    paginaActual.value = 1
  })
}
</script>
