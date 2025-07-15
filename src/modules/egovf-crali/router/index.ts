import { RouteLocationNormalizedLoaded } from 'vue-router';

export const craliRoutes = {
  path: '/crali',
  name: 'crali',
  
  // redirect: { name: 'crali-dashboard' },
  component: () => import('../layouts/CraliLayout.vue'),
  children: [
    // {
    //   path: 'dashboard',
    //   name: 'admin-dashboard',
    //   component: () => import('@/modules/admin/views/DashboardView.vue')
    // },
    {
      path: '/biblioteca',
      name: 'biblioteca',
      component: () => import('../modules/Biblioteca/views/BibliotecaView.vue')
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
      path: '/libros/:idLibro',
      name: 'libro',
       props: (route: RouteLocationNormalizedLoaded) => ({
        idLibro: Number(route.params.idLibro),
      }),
      component: () => import('../modules/Biblioteca/views/LibroView.vue')
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
      component: () => import('../modules/users/views/UserPrestamos.vue')
    },
    {
      path: '/facultad',
      name: 'facultad',
      component: () => import('../modules/Facultad/views/FacultadView.vue')
    },
    {
      path: '/unidad',
      name: 'unidad',
      component: () => import('../modules/Unidad/view/UnidadView.vue')
    },
  ]
};
