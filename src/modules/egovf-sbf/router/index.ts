import { RouteLocationNormalizedLoaded } from 'vue-router';
import isAdminGuard from '../guards/is-admin.guard';
import isSuperAdminGuard from '../guards/is-superAdmin.guard';

export const sbfRoutes = {
  path: '/sbf',
  name: 'sbf',
  redirect: { name: 'dashboard' },
  component: () => import('../layouts/SbfLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('../layouts/DashBoard.vue')
    },
    {
      path: '/biblioteca',
      name: 'biblioteca',
      component: () => import('../modules/Biblioteca/views/BibliotecaView.vue'),
      // beforeEnter: [ isSuperAdminGuard, isAdminGuard],
    },
    {
      path: '/biblioteca/detalles/:idBiblioteca',
      name: 'DetallesBiblioteca',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idBiblioteca: Number(route.params.idBiblioteca),
      }),
      component: () => import('../modules/Biblioteca/views/DetailsBiblioteca.vue'),
    },
    { 
      path: '/libros',
      name: 'libros',
      component: () => import('../modules/Biblioteca/views/LibrosView.vue')
    },
    { 
      path: '/libros/:idLibro', // add or updated libro
      name: 'libro',
       props: (route: RouteLocationNormalizedLoaded) => ({
        idLibro: Number(route.params.idLibro),
      }),
      component: () => import('../modules/Biblioteca/views/LibroView.vue'),
      beforeEnter: [ isAdminGuard],
    },
    {
      path: '/libro/detalles/:idLibro',
      name: 'DetallesLibro',
      // props: true,
      props: (route: RouteLocationNormalizedLoaded) => ({
        idLibro: Number(route.params.idLibro),
      }),
      
      component: () => import('../modules/Biblioteca/views/DetailsLibro.vue'),
    },
    {
      path: '/prestamos',
      name: 'prestamos',
      component: () => import('../modules/Prestamo/views/PrestamosView.vue')
    },
    {
      path: '/prestamo/:idPrestamo',
      name: 'prestamo',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idPrestamo: Number(route.params.idPrestamo),
      }),
      component: () => import('../modules/Prestamo/views/PrestamoView.vue')
    },
    {
      path: '/prestamo/detalles/:idPrestamo',
      name: 'DetallesPrestamo',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idPrestamo: Number(route.params.idPrestamo),
      }),
      component: () => import('../modules/Prestamo/views/DetailsPrestamo.vue'),
    },
    {
      path: '/facultad',
      name: 'facultad',
      component: () => import('../modules/Facultad/views/FacultadView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/unidad',
      name: 'unidad',
      component: () => import('../modules/Unidad/view/UnidadView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../modules/users/views/UserView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/lectores',
      name: 'lectores',
      component: () => import('../modules/users/views/LectorView.vue'),
      beforeEnter: [ isAdminGuard],
    },
  ]
};
