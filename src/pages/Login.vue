<template>
  <div class="login-background">
    <div class="login-box">
      <h1 class="title">Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin" class="form">
        <input v-model="email" type="email" placeholder="Correo" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth' 

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

// Simulación de usuarios estáticos
const usuarios = [
  { email: 'admin@veri.com', password: 'admin123', nombre: 'Abraham', rol: 'admin' },
  { email: 'caja@veri.com', password: 'caja123', nombre: 'Carlos', rol: 'caja' },
  { email: 'impresion@veri.com', password: 'impresion123', nombre: 'Lucía', rol: 'impresion' }
]

const handleLogin = () => {
  const usuario = usuarios.find(u => u.email === email.value && u.password === password.value)

  if (usuario) {
    auth.login(usuario) // 🟢 Guardar en store + localStorage
    router.push(`/${usuario.rol}`) // 🔀 Redirigir a ruta por rol
  } else {
    alert('Credenciales inválidas')
  }
}
</script>

<style scoped>
.login-background {
  position: relative;
  background: url('/src/assets/verificentro-login.webp') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-background::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(20, 120, 60, 0.37); /* Verde opaco tipo croma */
  z-index: 0;
}

.login-box {
  position: relative;
  z-index: 1; /* Para que esté encima del filtro verde */
}


.login-box {
  background: rgba(170, 170, 170, 0.82);
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  width: 520px;
  color: white;
  text-align: center;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
}

.form input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  color: black;
}

.form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #20af4b;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.form button:hover {
  background-color: #16913b;
}
</style>
