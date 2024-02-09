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
  //MODULO USUARIO PERFILES
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/usuario/PerfilView.vue')
  },
  {
    path: '/uModuloScc',
    name: '/uModuloScc',
    component: () => import('../views/usuario/UModuloSccView.vue')
  },
  {
    path: '/usuarioReporte:uriu',
    name: 'usuarioReporte',
    component: () => import('../views/usuario/ReporteUsuarioView.vue')
  },

  //Fin MODULO USUARIO PERFILES
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
  {//MODULO EMPLEADO
    path: '/moduloemp:cifCiudadano',
    name: 'moduloemp',
    component: () => import('../views/emp/ModuloEmpView.vue')
  },
  {// MODULO SISTEMA CONTENEDOR CONTROL
    path: '/moduloscc:cifCiudadano',
    name: 'moduloscc',
    component: () => import('../views/scc/ModuloSccView.vue')
  },
  {
    path: '/cModuloScc',
    name: 'cCoduloScc',
    component: () => import('../views/scc/CModuloSccView.vue')
  },
  {
    path: '/reporte:uri',
    name: 'reporte',
    component:() => import('../views/scc/ReporteView.vue')
  },
  {
    path: '/reporteLista:tipo',
    name: 'reporteLista',
    component: () => import('../views/scc/ReporteListaView.vue')
  },
  // Fin MOdulos SCC
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
  {
    path: '/moduloUsuarioUnidad',
    name: 'moduloUsuarioUnidad',
    component: () => import('../views/scc/ReporteView.vue')
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('../views/ImageView.vue')
  },
  {
    path: '/moduloEvento',
    name: 'moduloEvento',
    component: () => import('../views/ModuloEventoView.vue')
  },

  {
    path: '/pCiudadanoBiometrico:cifCiudadano',
    name: 'pCiudadanoBiometrico',
    component: () => import('../views/PCiudadanoBiometricoView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
