import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

import EscritorioLayout from '@/layouts/EscritorioLayout'
import FrontLayout from '@/layouts/FrontLayout'
const routes = [
  {
    path: '/',
    redirect:'/home',
    name: 'Inicio',
    component: FrontLayout,
    children:[
      {
        path:'/home',
        name:'HomeView',
        component: () => import('@/views/Front/HomeView.vue')
      },
      {
        path:'/sesion',
        name:'SesionView',
        component:()=> import('@/views/Front/SesionView.vue')
      },
      {
        path:'/libreReporte:uriu',
        name:'ReporteLibreView',
        component:()=> import('@/views/Usuario/ReporteLibreView.vue')
      }
    ]
  },
  {
    path: '/egovf',
    redirect: '/escritorio',
    name: 'eGovf',
    component: EscritorioLayout,
    children:[
      {
        path:'/escritorio',
        name:'EscritorioViewVue',
        component:()=>import('@/views/Escritorio/EscritorioViewVue.vue')
      },
      {
        path: '/perfil',
        name: 'PerfilView',
        component: () => import('@/views/Usuario/PerfilView.vue')
      },
      {
        path: '/listadeciudadanos',
        name: 'ListaView',
        component: () => import('@/views/Ciudadano/ListaView.vue')
      },
      {
        path: '/perfilCiudadano:cifCiudadano',
        name: 'PerfilCiudadanoView',
        component: () => import('@/views/Ciudadano/PerfilCiudadanoView.vue')
      },
      //MODULO EMPLEADO
      {
        path: '/moduloemp:cifCiudadano',
        name: 'ModuloEmpView',
        component: () => import('@/views/Empleado/ModuloEmpView.vue')
      },
      {
        path: '/tipoempleado',
        name: 'TipoEmpleadoView',
        component: () => import('@/views/Empleado/TipoEmpleadoView.vue')
      },
      {
        path: '/listaEmpleado:id',
        name: 'ListaEmpleadoView',
        component: () => import('@/views/Empleado/ListaEmpleadoView.vue')
      },
      // END MODULO EMPLEADO
      // MODULO SISTEMA CONTENEDOR CONTROL
      {
        path: '/moduloscc:cifCiudadano',
        name: 'ModuloSccView',
        component: () => import('@/views/Scc/ModuloSccView.vue')
      },
      {
        path: '/listaEquipo',
        name: 'ListaEquipoView',
        component: () => import('@/views/Scc/ListaEquipoView.vue')
      },
      {
        path: '/umoduloscc',
        name: 'UModuloSccView',
        component: () => import('@/views/Usuario/UModuloSccView.vue')
      },
      {
        path: '/umoduloemp',
        name: 'UModuloEmpView',
        component: () => import('@/views/Usuario/UModuloEmpView.vue')
      },
      {// MODULO SISTEMA CONTENEDOR CONTROL
        path: '/reporte:uri',
        name: 'ReporteView',
        component: () => import('@/views/Scc/ReporteView.vue')
      },
      {// MODULO SISTEMA CONTENEDOR CONTROL REPORTE DE ASISTENCIAS PARA EL USUARIO
        path: '/ureporte:uri',
        name: 'UReporteView',
        component: () => import('@/views/Usuario/UReporteView.vue')
      },
      {// MODULO SISTEMA CONTENEDOR CONTROL
        path: '/record:uri',
        name: 'RecordView',
        component: () => import('@/views/Scc/RecordView.vue')
      },
      {// MODULO SISTEMA CONTENEDOR CONTROL ADMINISTRACION DE SCC
        path: '/obsModuloScc',
        name: 'ObsView',
        component: () => import('@/views/Scc/ObsView.vue')
      },
      // MODULO SISTEMA DE INVENTARIO
      {
        path: '/moduloinv:cifCiudadano',
        name: 'ModuloInvView',
        component: () => import('@/views/Inv/ModuloInvView.vue')
      },
      {
        path: '/umoduloinv',
        name: 'UModuloInvView',
        component: () => import('@/views/Usuario/UModuloInvView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(){
    return{top:0}
  },
})

export default router
