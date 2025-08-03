// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import ImpresionLayout from '@/layouts/ImpresionLayout.vue'
import CajaLayout from '@/layouts/CajaLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/impresion',
    component: ImpresionLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/impresion/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
      path: 'usuarios',
      name: 'AdminUsuarios',
      component: () => import('@/pages/admin/Usuarios.vue'),
    },
    ],
  },
  {
    path: '/caja',
    component: CajaLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/caja/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
