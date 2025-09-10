<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'
import SessionTimeoutMixin from '@/mixins/sessionTimeout'

export default {
  name: 'App',
  mixins: [SessionTimeoutMixin],

  computed: {
    layout() {
      return this.$route.meta.layout || 'div'
    }
  },
  watch: {
    '$route.path': {
      handler(newPath, oldPath) {
        console.log('🛣️ Cambio de ruta:', oldPath, '→', newPath)

        // 🔥 Solo limpiar timeouts si va al home Y estaba autenticado
        if (newPath === '/' && this.$store.getters['auth/isAuthenticated']) {
          //console.log('🏠 Navegando al home desde sesión activa - Limpiando timeouts')
          this.$store.commit('auth/CLEAR_TIMEOUT')
          this.$store.commit('auth/CLEAR_ABSOLUTE_TIMEOUT')
        }

        // 🔥 Reiniciar timeout si navega a rutas protegidas
        if (newPath !== '/' && this.$store.getters['auth/isAuthenticated']) {
          //console.log('🔐 Navegando a ruta protegida - Verificando timeout')
          // Verificar si el timeout está activo, si no, iniciarlo
          if (!this.$store.state.auth.absoluteTimeout) {
            //console.log('⏰ Timeout no activo - Reiniciando')
            this.initSessionTimeout()
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('auth', ['initSessionTimeout', 'loginSuccess']),

    restoreSessionFromCookies() {
      const token = this.$cookies?.get('token')
      const userData = this.$cookies?.get('user')

      if (token && !this.$store.getters['auth/isAuthenticated']) {
        try {
          const user = userData ? JSON.parse(userData) : null
          this.loginSuccess({ userData: user, token: token })
        } catch (error) {
          console.error('Error restaurando sesión desde cookies:', error)
        }
      }
    }
  },
  mounted() {
    // Restaurar sesión al cargar la app
    this.restoreSessionFromCookies()
  }
}
</script>

<style lang="scss">
@import "styles/style";
</style>
