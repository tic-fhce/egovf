import store from '@/store'

export const authGuard = (to, from, next) => {
  console.log('🛣️ Navegando:', from.path, '→', to.path)
  
  const requiresAuth = to.meta.requiresAuth // Asume que tus rutas protegidas tienen esta meta
  const isAuthenticated = store.getters['auth/isAuthenticated']
  
  //console.log('🔐 Verificación:', { requiresAuth, isAuthenticated })
  
  if (requiresAuth && !isAuthenticated) {
    // Ruta protegida pero no autenticado
    //console.log('❌ Acceso denegado - Redirigiendo a login')
    next('/home')
  } else if (requiresAuth && isAuthenticated) {
    // Ruta protegida y autenticado - Asegurar timeout
    //console.log('✅ Acceso permitido - Verificando timeout')
    
    if (!store.state.auth.absoluteTimeout) {
      //console.log('⏰ Reactivando timeout en ruta protegida')
      store.dispatch('auth/initSessionTimeout')
    }
    next()
  } else {
    // Ruta pública
    next()
  }
}

// Opcional: Guard para afterEach si lo necesitas
export const afterNavigation = (to, from) => {
  console.log('✅ Navegación completada:', from.path, '→', to.path)
}