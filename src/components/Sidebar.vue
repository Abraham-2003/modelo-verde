<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>{{ nombreUsuario }}</h2>
      <p class="rol" v-if="rol">{{ rol.toUpperCase() }}</p>
    </div>

    <nav class="sidebar-nav">
      <ul v-if="itemsRol.length">
        <li v-for="item in itemsRol" :key="item.texto">
          <div class="item-principal" @click="toggle(item.texto)">
            <span>{{ item.texto }}</span>
            <span class="flecha">{{ openItem === item.texto ? '▲' : '▼' }}</span>
          </div>
          <transition name="desplegar">
  <ul v-show="openItem === item.texto" class="submenu">
    <li v-for="sub in item.subitems" :key="sub" class="subitem">
      • {{ sub }}
    </li>
  </ul>
</transition>

        </li>
      </ul>

      <div v-else class="alerta">⚠️ Rol no reconocido</div>
    </nav>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
auth.loadUser()

const nombreUsuario = computed(() => auth.user?.nombre ?? 'Sin nombre')
const rol = computed(() => auth.user?.rol ?? null)
const openItem = ref(null)

function toggle(texto) {
  openItem.value = openItem.value === texto ? null : texto
}

const rutasPorRol = {
  admin: [
  {
    texto: 'Gestión',
    subitems: [
      'Usuarios',
      'Permisos',
      'Roles',
      'Historial de accesos',
      'Configuración general'
    ]
  },
  {
    texto: 'Reportes',
    subitems: [
      'Generales',
      'Por usuario',
      'Errores del sistema',
      'Estadísticas',
      'Exportación CSV'
    ]
  },
  {
    texto: 'Cargas',
    subitems: [
      'Registrar nuevo lote',
      'Historial de placas',
      'Revisión manual',
      'Tipo de placas'
    ]
  },
  {
    texto: 'Visualización',
    subitems: [
      'Dashboard',
      'Filtros avanzados',
      'Vista por fecha',
      'Vista por tipo'
    ]
  },
  {
    texto: 'Soporte & Mantenimiento',
    subitems: [
      'Logs del sistema',
      'Validaciones internas',
      'Backup',
      'Restauración'
    ]
  }
],
  caja: [
  {
    texto: 'Finanzas',
    subitems: ['Cobros', 'Pagos', 'Resumen mensual', 'Arqueo de caja', 'Transferencias internas']
  },
  {
    texto: 'Historial',
    subitems: ['Facturas', 'Transacciones', 'Clientes frecuentes', 'Descuentos aplicados']
  },
  {
    texto: 'Reportes',
    subitems: ['Ingresos por día', 'Comparativa mensual', 'Alertas por irregularidad']
  },
  {
    texto: 'Configuración',
    subitems: ['Tipos de cobro', 'Usuarios de caja', 'Restricciones de horario']
  }
],
  impresion: [
  {
    texto: 'Hologramas',
    subitems: ['Carga manual', 'Reimpresión', 'Validaciones', 'Historial de impresión']
  },
  {
    texto: 'Soporte',
    subitems: ['Preguntas frecuentes', 'Técnico', 'Sistema', 'Guía rápida', 'Reportes']
  },
  {
    texto: 'Documentación',
    subitems: ['Manual de usuario', 'Políticas de impresión', 'Formatos oficiales']
  },
  {
    texto: 'Estadísticas',
    subitems: ['Por técnico', 'Por tipo de holograma', 'Totales diarios']
  }
]

}

const itemsRol = computed(() => rutasPorRol[rol.value] ?? [])
</script>

<style scoped>
.sidebar {
  width: 270px;
  background: linear-gradient(to bottom, #14532d, #268862ff);
  color: #ecfef3;
  height: 100vh;
  padding: 24px 16px;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
}

.sidebar-header {
  text-align: center;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #caffd5;
}

.rol {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: #88f4b0;
}

.item-principal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #26a26a;
  padding: 12px 14px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.item-principal:hover {
  background-color: #2cc77c;
  transform: translateX(2px);
}

.submenu {
  margin-top: 4px;
  padding-left: 14px;
}

.subitem {
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 6px;
  background-color: #1f6845;
  color: #e0fcec;
  transition: background 0.2s;
  font-size: 0.85rem;
}

.subitem:hover {
  background-color: #2b8460;
}

.flecha {
  font-size: 0.75rem;
  color: #d1ffe4;
}
.desplegar-enter-active,
.desplegar-leave-active {
  transition: all 0.8s ease;
  overflow: hidden;
}

.desplegar-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
}

.desplegar-enter-to {
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
}

.desplegar-leave-from {
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
}

.desplegar-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
}


.alerta {
  padding: 1rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffcaca;
  border-radius: 8px;
  font-size: 0.9rem;
}

</style>
