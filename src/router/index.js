import { createRouter, createWebHistory } from "vue-router";
import { authGuard, afterNavigation } from './guards'
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
        component: () => import('@/modules/egovf/views/HomeView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: "/agenda",
        name: "AgendaView",
        component: () => import("@/views/Front/AgendaView.vue"),
        meta: { requiresAuth: false }
      },
      {
        path: "/sesion",
        name: "SesionView",
        component:()=> import('@/modules/egovf/views/SessionView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: "/evento/:idEvento",
        name: "EventoView",
        component: () => import("@/views/Front/EventoView.vue"),
        props:true,
        meta: { requiresAuth: false }
      },
      {
        path: "/libreReporte:uriu",
        name: "ReporteLibreView",
        component: () => import("@/views/Usuario/ReporteLibreView.vue"),
        meta: { requiresAuth: false }
      },
      {
        path: "/perfilpublico:cif",
        name: "PerfilPublicoView",
        component: () => import('@/modules/egovf/views/PerfilPublicoView.vue'),
        meta: { requiresAuth: false }
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
        meta: {title:'Escritorio', requiresAuth: true }
      },
      {
        path: "/perfil",
        name: "PerfilView",
        component: () => import("@/modules/egovf/views/Usuario/PerfilView.vue"),
        meta: { title: 'Mi Perfil' ,requiresAuth: true }
      },
      {
        path: "/listadeciudadanos",
        name: "ListaView",
        component: () => import("@/modules/egovf/views/Ciudadano/ListaView.vue"),
        meta: { title: 'Lista de Ciudadanos',requiresAuth: true  }
      },
      {
        path: "/listadepersonas",
        name: "ListaPersonaView",
        component: () => import("@/modules/egovf/views/Ciudadano/ListaPersonaView.vue"),
        meta: { title: 'Lista de Personas sin Ciudadania',requiresAuth: true  }
      },
      {
        path: "/perfilCiudadano/:cifCiudadano",
        name: "PerfilCiudadanoView",
        component: () => import("@/modules/egovf/views/Ciudadano/PerfilCiudadanoView.vue"),
        props:true,
        meta: { title: 'Perfil del Ciudadano', parent: 'ListaView' ,requiresAuth: true  }
      },
      {
        path: "/moduloCiudadano/:cifCiudadano/:idModulo/:titulo",
        name: "MenuView",
        component: () => import("@/modules/egovf/views/Ciudadano/MenuView.vue"),
        props:true,
        meta: { title: ':titulo', parent: 'PerfilCiudadanoView', requiresAuth: true  }
      },

      {
        path: "/ciudadanos",
        name: "ListaCiudadanoView",
        component: () => import("@/modules/egovf/views/Ciudadano/ListaCiudadanoView.vue"),
        meta: { title: 'Ciudadanos',requiresAuth: true }
      },
      
      
      //MODULO EMPLEADO
      {
        // verificado
        path: "/menuMscc",
        name: "MenuMsccView",
        component: () => import("@/modules/egovf-emp/views/MenuMsccView.vue"),
        meta: { title: 'Menu Modulo SCC',requiresAuth: true  }
      },
      {
        // verificado
        path: "/moduloemp/:cifCiudadano",
        name: "ModuloEmpView",
        component: () => import("@/modules/egovf-emp/views/ModuloEmpView.vue"),
        props:true,
        meta: { title: 'Modulo Empleado', parent: 'PerfilCiudadanoView',requiresAuth: true  }
      },
      {
        //verificado
        path: "/tipoempleado",
        name: "TipoEmpleadoView",
        component: () => import("@/modules/egovf-emp/views/TipoEmpleadoView.vue"),
        meta: { title: 'Empleados',parent:'MenuMsccView',requiresAuth: true  }

      },
      {//Verificado
        path: "/listaEmpleado/:idEmpleado/:titulo",
        name: "ListaEmpleadoView",
        component: () => import("@/modules/egovf-emp/views/ListaEmpleadoView.vue"),
        props:true,
        meta: { title: ':titulo', parent:'TipoEmpleadoView',requiresAuth: true  }
      },
      {//revisado
        path: "/moduloscc/:cifCiudadano",
        name: "ModuloSccView",
        component: () => import("@/modules/egovf-scc/views/ModuloSccView.vue"),
        props:true,
        meta: { title: 'Modulo Seguimiento Contenedor de Control',requiresAuth: true  }
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
        meta: { title: 'Modulo Seguimineto Contenedor de Controles',requiresAuth: true }

      },
      {
        //revisado nuevo
        path: "/observaciones",
        name: "ObservacionesView",
        component: () => import("@/modules/egovf-scc/views/ObservacionesView.vue"),
        meta: { title: 'Observaciones', parent: 'ModuloSccMenuView',requiresAuth: true }
      },
      {
        //revisado nuevo
        path: "/horarios",
        name: "HorariosView",
        component: () => import("@/modules/egovf-scc/views/HorariosView.vue"),
        meta: { title: 'Horarios', parent: 'ModuloSccMenuView',requiresAuth: true }
      },
      {
        //revisado nuevo
        path: "/biometricos",
        name: "BiometricosView",
        component: () => import("@/modules/egovf-scc/views/BiometricosView.vue"),
        meta: { title: 'Biometricos', parent: 'ModuloSccMenuView',requiresAuth: true }
      },
      
      {
        path: "/umoduloemp",
        name: "UModuloEmpView",
        component: () => import("@/views/Usuario/UModuloEmpView.vue"),
      },
      {
        // MODULO CONTENEDOR DE CONTROL
        //revisado
        path: "/reporte/:cifCiudadano/:gestion/:m/:di/:df",
        name: "ReporteView",
        component: () => import("@/modules/egovf-scc/views/ReporteView.vue"),
        props:true,
        meta: { title: 'Reporte de Asistencia', parent: 'ModuloSccView',requiresAuth: true }
      },
      /*{
        // MODULO SISTEMA CONTENEDOR CONTROL REPORTE DE ASISTENCIAS PARA EL USUARIO
        path: "/ureporte:uri",
        name: "UReporteView",
        component: () => import("@/views/Usuario/UReporteView.vue"),
      },*/
      {
        // revisado Nuevo
        path: "/usuarioreporte/:cif/:gestion/:m/:di/:df",
        name: "UsuarioReporteView",
        component: () => import("@/modules/egovf-scc/views/UsuarioReporteView.vue"),
        meta: { title: 'Reporte de Asistencia', parent: 'ModuloSccMenuView', requiresAuth:true},
        props:true
      },
      {
        // MODULO SISTEMA CONTENEDOR CONTROL
        //revisado
        path: "/listaEmpleado/:idEmpleado/:titulo/record/:gestion/:m/:tipo",
        name: "RecordView",
        component: () => import("@/modules/egovf-scc/views/RecordView.vue"),
        meta: { title: 'Record de Asistencias', parent: 'ListaEmpleadoView',requiresAuth: true },
        props:true
      },
      {
        // MODULO SISTEMA CONTENEDOR CONTROL ADMINISTRACION DE SCC
        //Revisado
        path: "/menuObs",
        name: "MenuObsView",
        component: () => import("@/modules/egovf-scc/views/MenuObsView.vue"),
        meta: { title: 'Menu Observaciones',parent:'MenuMsccView',requiresAuth: true },
      },
      {
        //Revisado
        path: "/listaObservaciones:gestion",
        name: "ListaObservacionesView",
        component: () => import("@/modules/egovf-scc/views/ListaObservacionesView.vue"),
        meta: { title: 'Observasiones', parent: 'MenuObsView',requiresAuth: true },
      },
      {
        //Revisado
        path: "/obsModuloScc",
        name: "ObsView",
        component: () => import("@/modules/egovf-scc/views/ObsView.vue"),
        meta: { title: 'Solicitud de Observaciones de los Empleados', parent: 'MenuObsView',requiresAuth: true }
      },
      {
        //Revisado
        path: "/obsEliminado",
        name: "ListaObsEliminadosView",
        component: () => import("@/modules/egovf-scc/views/ListaObsEliminadosView.vue"),
        meta: { title: 'Solicitud de Observaciones Eliminadas', parent: 'MenuObsView',requiresAuth: true },

      },

      {
        // Avisos
        path: "/avisos",
        name: "AvisoView",
        component: () => import("@/modules/egovf-scc/views/AvisoView.vue"),
        meta: { title: 'Avisos',parent:'MenuMsccView',requiresAuth: true  }
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
        name: "ListaAmbientesView",
        component: () => import("@/modules/egovf-sra/views/ListaAmbientesView.vue"),
        meta: { title: 'Lista de Ambientes' }
      },
      {
        path: "/servicios/:idAmbiente",
        name: "ListaServiciosView",
        component: () => import("@/modules/egovf-sra/views/ListaServiciosView.vue"),
        meta: { title: 'Lista de Servicios',parent:'ListaAmbientesView' },
        props:true
      },
      
      {
        path: "/menusolicitudes",
        name: "MenuSolicitudesView",
        component: () => import("@/modules/egovf-sra/views/MenuSolicitudesView.vue"),
        meta: { title: 'Menu de Solicitudes' , requiresAuth: true}
        
      },
      {
        path: "/usuarioSolicitudes/:estado/:idEvento/:titulo",
        name: "ListaSolicitudesUsuarioView",
        component: () => import("@/modules/egovf-sra/views/ListaSolicitudesUsuarioView.vue"),
        props:true,
        meta: { title: ':titulo', parent: 'MenuSolicitudesView', requiresAuth: true}
      },
      {
        path: "/solicitudes/:estado/:idEvento/:titulo",
        name: "ListaSolicitudesView",
        component: () => import("@/modules/egovf-sra/views/ListaSolicitudesView.vue"),
        props:true,
        meta: { title: ':titulo', parent: 'MenuSolicitudesView', requiresAuth: true}
      },
      {
        path: "/listaSolicitudes/:gestion/:mes",
        name: "SolicitudesView",
        component: () => import("@/modules/egovf-sra/views/SolicitudesView.vue"),
        props:true
      },
      {
        path: "/listaSolicitudesUsuario/:gestion/:mes",
        name: "SolicitudesUsuarioView",
        component: () => import("@/modules/egovf-sra/views/SolicitudesUsuarioView.vue"),
        props:true,
        meta: { title: 'Solicitudes', parent: 'MenuSolicitudesView', requiresAuth: true}
      },
      {
        path: "/listaEventos",
        name: "ListaEventosView",
        component: () => import("@/modules/egovf-sra/views/ListaEventosView.vue"),
        props:true,
        meta: { title: 'Mis Eventos', requiresAuth: true}
      },
      
      {
        path: "/eventos",
        name: "EventosView",
        component: () => import("@/modules/egovf-sra/views/EventosView.vue"),
        meta: { title: 'Eventos de la Facultad' ,requiresAuth: true }
        
      },
      {
        path: "/fechas/:idAmbiente",
        name: "FechasView",
        component: () => import("@/modules/egovf-sra/views/FechasView.vue"),
        props:true,
        meta: { title: 'Calendario de Eventos', parent: 'EventosView',requiresAuth: true }
      },
      {
        path: "/eventosUsuario",
        name: "EventosUsuarioView",
        component: () => import("@/modules/egovf-sra/views/EventosUsuarioView.vue"),
        meta: { title: 'Eventos de la Facultad', requiresAuth: true  }
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

// ✅ USAR EL GUARD IMPORTADO
router.beforeEach(authGuard)

// ✅ Opcional: afterEach guard
router.afterEach(afterNavigation)

export default router;
