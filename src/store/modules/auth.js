// 30 minutos en milisegundos (para producción)
//const SESSION_TIMEOUT = 30 * 60 * 1000
// Para testing: 30 segundos
import Swal from 'sweetalert2'

const ABSOLUTE_TIMEOUT = 30 * 60 * 1000

const state = {
    user: null,
    token: null,
    lastActivity: null,
    timeout: null,
    absoluteTimeout: null // 🔥 Nuevo timeout absoluto
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },

    SET_TOKEN(state, token) {
        state.token = token
    },

    SET_LAST_ACTIVITY(state) {
        state.lastActivity = Date.now()
    },

    SET_TIMEOUT(state, timeout) {
        state.timeout = timeout
    },

    CLEAR_TIMEOUT(state) {
        if (state.timeout) {
            clearTimeout(state.timeout)
            state.timeout = null
        }
    },

    CLEAR_AUTH(state) {
        state.user = null
        state.token = null
        state.lastActivity = null
    },

    SET_ABSOLUTE_TIMEOUT(state, timeout) {
        state.absoluteTimeout = timeout
    },

    CLEAR_ABSOLUTE_TIMEOUT(state) {
        if (state.absoluteTimeout) {
            clearTimeout(state.absoluteTimeout)
            state.absoluteTimeout = null
        }
    }
}

const actions = {
    initSessionTimeout({ commit }) {
        console.log('🟢 Iniciando timeout absoluto de 30 minutos')

        // 🔥 Limpiar timeouts existentes primero
        commit('CLEAR_TIMEOUT')
        commit('CLEAR_ABSOLUTE_TIMEOUT')

        commit('SET_LAST_ACTIVITY')

        // Timeout absoluto de 30 minutos
        const absoluteTimeout = setTimeout(() => {
            console.log('⏰ Timeout absoluto de 30 minutos alcanzado')
            this.dispatch('auth/logoutAuto')
        }, ABSOLUTE_TIMEOUT)

        commit('SET_ABSOLUTE_TIMEOUT', absoluteTimeout)
        console.log('⏰ Sesión expirará en 30 minutos exactos')
    },

    resetSessionTimeout({ commit, state }) {
        console.log('🔄 Reseteando timeout de inactividad (NO el absoluto)')

        if (state.absoluteTimeout) {
            console.log('🔄 Reseteando timeout por actividad')
            commit('CLEAR_TIMEOUT')
            commit('SET_LAST_ACTIVITY')

            const inactivityTimeout = setTimeout(() => {
                this.dispatch('auth/logoutAuto')
            }, ABSOLUTE_TIMEOUT)

            commit('SET_TIMEOUT', inactivityTimeout)
        }
    },

    logoutAuto({ dispatch }) {
        console.log('🔴 Cerrando sesión automáticamente')
        // 🔥 Usar completeCleanup en lugar de hacerlo manualmente
        dispatch('showSessionExpiredMessage')
        //dispatch('completeCleanup')
    },

    showSessionExpiredMessage({ commit, dispatch }) {
        // Puedes personalizar este mensaje con SweetAlert como usas en tu login
        //alert('Su sesión ha expirado por inactividad')
        commit('CLEAR_TIMEOUT')
        commit('CLEAR_ABSOLUTE_TIMEOUT')

        Swal.fire({
            title: "Sesión Expirada",
            text: "Su sesión ha expirado por inactividad",
            icon: "info",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch('completeCleanup')
            }
        })
    },
    completeCleanup({ commit }) {
        console.log('🧹 Ejecutando limpieza completa')

        // 1. Limpiar TODOS los timeouts primero
        commit('CLEAR_TIMEOUT')
        commit('CLEAR_ABSOLUTE_TIMEOUT')

        // 2. Limpiar cookies
        const cookiesToRemove = ['token', 'cif', 'correo', 'celular', 'pass']
        cookiesToRemove.forEach(cookie => {
            document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        })

        // 3. Limpiar store
        commit('CLEAR_AUTH')

        // 4. Forzar redirección con window.location (más efectivo)
        console.log('🔀 Redirigiendo al home')
        window.location.href = '/' // 🔥 Usar window.location en lugar de router
    },



    loginSuccess({ commit, dispatch }, { userData, token }) {
        commit('SET_USER', userData)
        commit('SET_TOKEN', token)
        commit('SET_LAST_ACTIVITY')
        dispatch('initSessionTimeout')
    }
}

const getters = {
    isAuthenticated: (state) => {
        console.log('🔐 Verificando autenticación en store:', !!state.token)
        return !!state.token
    },
    getTimeouts: (state) => {
        return {
            absoluteTimeout: state.absoluteTimeout,
            inactivityTimeout: state.timeout
        }
    },

    getUser: (state) => state.user,

    getToken: (state) => state.token
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}