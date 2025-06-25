export const craliRoutes = {
  path: '/crali',
  name: 'crali',
  // beforeEnter: [
  //   isAuthenticatedGuard,
  //   isAdminGuard,
  // ],
  redirect: { name: 'crali-dashboard' },
  // component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'crali-dashboard',
      component: () => import('../modules/admin/views/DashboardView.vue'),
    },
    // {
    //   path: 'products',
    //   name: 'admin-products',
    //   component: () => import('@/modules/admin/views/ProductsView.vue'),
    // },
    // {
    //   path: 'products/:productId',
    //   name: 'admin-product',
    //   props: true,
    //   component: () => import('@/modules/admin/views/ProductView.vue'),
    // },
    // {
    //   path: 'users',
    //   name: 'admin-users',
    //   component: () => import('@/modules/admin/views/UsersView.vue'),
    // },
  ]
}