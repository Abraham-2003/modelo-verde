<template>
  <header class="navbar">
    <div class="logo">
      <h1>Vicente Guerrero</h1>
    </div>

    <div class="usuario-menu" @click="toggleMenu">
      <img src="/src/assets/vue.svg" alt="Usuario" class="usuario-icono" />
      <span>{{ nombreUsuario }}</span>
      <div v-if="mostrarMenu" class="menu-dropdown">
        <ul>
          <li @click="cambiarContraseña">Cambiar contraseña</li>
          <li @click="cerrarSesion">Cerrar sesión</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()
auth.loadUser()

const nombreUsuario = computed(() => auth.user?.nombre ?? 'Usuario')
const mostrarMenu = ref(false)

function toggleMenu() {
  mostrarMenu.value = !mostrarMenu.value
}

function cerrarSesion() {
  auth.logout()
  router.push('/login')
}

function cambiarContraseña() {
  alert('Función aún no implementada') // Puedes redirigir a una ruta o abrir un modal aquí
  mostrarMenu.value = false
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #14532d, #268862ff);
  color: #f9f9f9;
  padding: 14px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-family: 'Segoe UI', sans-serif;
}

.logo h1 {
  font-size: 1.6rem;
  margin: 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.usuario-menu {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-weight: 500;
  transition: color 0.3s ease;
}

.usuario-menu:hover {
  color: #c7ffe2;
}

.usuario-icono {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover;
}

.menu-dropdown {
  position: absolute;
  top: 42px;
  right: 0;
  background-color: #1f472c;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  width: 180px;
  z-index: 10;
  animation: fadeIn 0.3s ease;
}

.menu-dropdown ul {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.menu-dropdown li {
  padding: 10px;
  color: #f1f1f1;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-dropdown li:hover {
  background-color: #198754;
}

/* Animación para dropdown */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
