import { createRouter, createWebHistory } from "vue-router";
//import HomeView from '../views/HomeView.vue'

import EscritorioLayout from "@/layouts/EscritorioLayout";
import FrontLayout from "@/layouts/FrontLayout";
const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Inicio",
    component: FrontLayout,
    children: [
      {
        path: "/home",
        name: "HomeView",
        //component: () => import("@/views/Front/HomeView.vue"),
        component: () => import('@/modules/egovf/views/HomeView.vue')
      },
      {
        path: "/sesion",
        name: "SesionView",
        //component: () => import("@/views/Front/SesionView.vue"),
        component:()=> import('@/modules/egovf/views/SessionView.vue')
      },
      {
        path: "/libreReporte:uriu",
        name: "ReporteLibreView",
        component: () => import("@/views/Usuario/ReporteLibreView.vue"),
      },
    ],
  },
  {
    path: "/egovf",
    redirect: "/escritorio",
    name: "eGovf",
    component: EscritorioLayout,
    children: [
      {
        path: "/escritorio",
        name: "EscritorioViewVue",
        component: () => import("@/views/Escritorio/EscritorioViewVue.vue"),
      },
      {
        path: "/perfil",
        name: "PerfilView",
        component: () => import("@/modules/egovf/views/Usuario/PerfilView.vue"),
      },
      {
        path: "/listadeciudadanos",
        name: "ListaView",
        component: () => import("@/modules/egovf/views/Ciudadano/ListaView.vue"),
      },
      {
        path: "/perfilCiudadano:cifCiudadano",
        name: "PerfilCiudadanoView",
        component: () => import("@/modules/egovf/views/Ciudadano/PerfilCiudadanoView.vue"),
      },
      //MODULO EMPLEADO
      {
        // verificado
        path: "/moduloemp:cifCiudadano",
        name: "ModuloEmpView",
        component: () => import("@/modules/egovf-emp/views/ModuloEmpView.vue"),
      },
      {
        //verificado
        path: "/tipoempleado",
        name: "TipoEmpleadoView",
        component: () => import("@/modules/egovf-emp/views/TipoEmpleadoView.vue"),
      },
      {//Verificado
        path: "/listaEmpleado:id",
        name: "ListaEmpleadoView",
        component: () => import("@/modules/egovf-emp/views/ListaEmpleadoView.vue"),
      },
      {//revisado
        path: "/moduloscc:cifCiudadano",
        name: "ModuloSccView",
        component: () => import("@/modules/egovf-scc/views/ModuloSccView.vue"),
      },
      // END MODULO EMPLEADO
      // MODULO INVENTARIO
      {
        path: "/inventario",
        name: "InvenarioView",
        component: () => import("@/modules/egovf-inv/views/InventarioView.vue"),
      },
      {
        path: "/tipoEquipos",
        name: "EquiposView",
        component: () => import("@/modules/egovf-inv/views/EquiposView.vue"),
      },
      {
        //Revisado Nuevo
        path: "/listaequipos:id",
        name: "ListaEquiposView",
        component: () => import("@/modules/egovf-inv/views/ListaEquiposView.vue"),
      },
      // END MODULO INVENTARIO
      {
        path: "/listaEquipo",
        name: "ListaEquipoView",
        component: () => import("@scc/views/ListaEquipoView.vue"),
      },
      {
        //revisado
        path: "/umoduloscc",
        name: "UModuloSccView",
        component: () => import("@/modules/egovf-scc/views/UModuloSccView.vue"),
      },
      {
        //revisado nuevo
        path: "/menumoduloscc",
        name: "ModuloSccMenuView",
        component: () => import("@/modules/egovf-scc/views/ModuloSccMenuView.vue"),
      },
      {
        //revisado nuevo
        path: "/observaciones",
        name: "ObservacionesView",
        component: () => import("@/modules/egovf-scc/views/ObservacionesView.vue"),
      },
      {
        //revisado nuevo
        path: "/biometricos",
        name: "BiometricosView",
        component: () => import("@/modules/egovf-scc/views/BiometricosView.vue"),
      },
      {
        //revisado nuevo
        path: "/horarios",
        name: "HorariosView",
        component: () => import("@/modules/egovf-scc/views/HorariosView.vue"),
      },
      {
        path: "/umoduloemp",
        name: "UModuloEmpView",
        component: () => import("@/views/Usuario/UModuloEmpView.vue"),
      },
      {
        // MODULO SISTEMA CONTENEDOR CONTROL
        //revisado
        path: "/reporte:uri",
        name: "ReporteView",
        component: () => import("@/modules/egovf-scc/views/ReporteView.vue"),
      },
      /*{
        // MODULO SISTEMA CONTENEDOR CONTROL REPORTE DE ASISTENCIAS PARA EL USUARIO
        path: "/ureporte:uri",
        name: "UReporteView",
        component: () => import("@/views/Usuario/UReporteView.vue"),
      },*/
      {
        // revisado Nuevo
        path: "/usuarioreporte:uri",
        name: "UsuarioReporteView",
        component: () => import("@/modules/egovf-scc/views/UsuarioReporteView.vue"),
      },
      {
        // MODULO SISTEMA CONTENEDOR CONTROL
        //revisado
        path: "/record:uri",
        name: "RecordView",
        component: () => import("@/modules/egovf-scc/views/RecordView.vue"),
      },
      {
        // MODULO SISTEMA CONTENEDOR CONTROL ADMINISTRACION DE SCC
        //Revisado
        path: "/menuObs",
        name: "MenuObsView",
        component: () => import("@/modules/egovf-scc/views/MenuObsView.vue"),
      },
      {
        //Revisado
        path: "/listaObservaciones:gestion",
        name: "ListaObservacionesView",
        component: () => import("@/modules/egovf-scc/views/ListaObservacionesView.vue"),
      },
      {
        //Revisado
        path: "/obsModuloScc",
        name: "ObsView",
        component: () => import("@/modules/egovf-scc/views/ObsView.vue"),
      },
      {
        //Revisado
        path: "/obsEliminado",
        name: "ListaObsEliminadosView",
        component: () => import("@/modules/egovf-scc/views/ListaObsEliminadosView.vue"),
      },

      {
        // Avisos
        path: "/avisos",
        name: "AvisoView",
        component: () => import("@/modules/egovf-scc/views/AvisoView.vue"),
      },
      // MODULO SISTEMA DE INVENTARIO
      {
        //Revisado Nuevo
        path: "/invmodulomenu",
        name: "ModuloInvMenuView",
        component: () => import("@/modules/egovf-inv/views/ModuloInvMenuView.vue"),
      },
      //MODULO SRA
      {
        path: "/ambientes",
        name: "AmbientesView",
        component: () => import("../modules/egovf-sra/views/AmbientesView.vue"),
      },
      {
        path: "/eventos",
        name: "EventosView",
        component: () => import("../modules/egovf-sra/views/EventosView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
