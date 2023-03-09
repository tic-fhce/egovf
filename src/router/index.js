import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sesion',
    name: 'sesion',
    component: () => import('../views/SesionView.vue')
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('../views/InicioView.vue')
  },
  {
    path: '/escritorio',
    name: 'escritorio',
    component: () => import('../views/EscritorioView.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/PerfilView.vue')
  },
  {
    path: '/listaPersonas',
    name: 'listaPersonas',
    component: () => import('../views/ListaPersonaView.vue')
  },
  {
    path: '/perfilCiudadano:cifCiudadano',
    name: 'perfilCiudadano',
    component: () => import('../views/PerfilCiudadanoView.vue')
  },
  {
    path: '/reportePerfil:reporte',
    name: 'reportePerfil',
    component: () => import('../views/ReportePerfilView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
