<template>
  <div class="login-container">
    <div class="login-image"></div>
    <div class="login-form-section">
      <div class="login-box">
        <h1 class="title">Iniciar Sesión</h1>
        <p class="instructions">Por favor introduzca su usuario y contraseña para ingresar al sistema.</p>
        <form @submit.prevent="handleLogin" class="form">
          <input v-model="email" type="email" placeholder="Correo electrónico" required />
          <input v-model="password" type="password" placeholder="Contraseña" required />
          <button type="submit">Entrar</button>
        </form>
      </div>
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
    auth.login(usuario) 
    router.push(`/${usuario.rol}`) // 🔀 Redirigir a ruta por rol
  } else {
    alert('Credenciales inválidas')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
}

.login-image {
  flex: 1.2;
  background-image: url('/src/assets/login.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;      /* ✅ Rellena visualmente y se adapta al espacio */
  background-color: #000;      /* ⬛ Fondo de respaldo elegante */
  display: flex;
  justify-content: center;
  align-items: center;
}


.login-form-section {
  flex: 0.8; /* Más ancho el login */
  background-color: #14532d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.login-box {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 18px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
  width: 100%;
  max-width: 400px; /* 🔍 Más ancho para balance visual */
  text-align: center;
  color: #14532d;
  animation: fadeIn 0.6s ease-in-out;
  border: 2px solid #14532d20;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.instructions {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.form input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.25s ease;
}

.form input:focus {
  border-color: #14532d;
  outline: none;
}

.form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #14532d;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form button:hover {
  background-color: #114027;
}

@keyframes fadeIn {
  from {opacity: 0; transform: translateY(10px);}
  to {opacity: 1; transform: translateY(0);}
}

</style>
