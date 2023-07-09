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
    component: () => import('../views/AboutView.vue')
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
  {//perfil ciudadano que viene de la lista de ciudadanos
    path: '/perfilCiudadano:cifCiudadano',
    name: 'perfilCiudadano',
    component: () => import('../views/PerfilCiudadanoView.vue')
  },
  {//reporte del perfil viene de perfil ciudadano con parametros del reporte
    path: '/reportePerfil:reporte',
    name: 'reportePerfil',
    component: () => import('../views/ReportePerfilView.vue')
  },
  {
    path: '/perfilCiudadanoUsuario',
    name: 'perfilCiudadanoUsuario',
    component: () => import('../views/PerfilCiudadanoUsuarioView.vue')
  },
  {
    path: '/reporteUsuario:reporteusuario',
    name: 'reporteUsuario',
    component: () => import('../views/ReporteUsuarioView.vue')
  },
  {
    path: '/biometrico:cifCiudadano',
    name: 'biometrico',
    component: () => import('../views/ModuloBiometricoView.vue')
  },
  {
    path: '/pernicions:cifCiudadano',
    name: 'pernicions',
    component: () => import('../views/ModuloPernicionView.vue')
  },
  {
    path: '/inventario:cifCiudadano',
    name: 'inventario',
    component: () => import('../views/ModuloInventarioView.vue')
  },
  {
    path: '/record:gestion:mes:tipo',
    name: 'record',
    component: () => import('../views/ModuloRecordView.vue')
  },
  {
    path: '/moduloUnidad',
    name: 'moduloUnidad',
    component: () => import('../views/ModuloUnidadView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
