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
      path: '/libros',
      name: 'libros',
      component: () => import('../modules/libros/LibrosView.vue')
    },
    {
      path: '/prestamos',
      name: 'prestamos',
      component: () => import('../modules/users/UserPrestamos.vue')
    },
    {
      path: '/facultad',
      name: 'facultad',
      component: () => import('../modules/Facultad/views/FacultadView.vue')
    },
  ]
};
