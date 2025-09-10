export default {
    mounted() {
        //console.log('🎯 Mixin sessionTimeout MONTADO')
        this.setupActivityListeners()

        // 🔥 Iniciar timeout si está autenticado
        if (this.$store.getters['auth/isAuthenticated']) {
            //console.log('✅ Usuario autenticado - Iniciando timeout')
            this.$store.dispatch('auth/initSessionTimeout')
        }
    },

    beforeDestroy() {
        console.log('🗑️ Mixin sessionTimeout DESTRUIDO')
        this.removeActivityListeners()
    },

    methods: {
        setupActivityListeners() {
            //console.log('🖱️ Configurando event listeners de actividad')
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

            events.forEach(event => {
                window.addEventListener(event, this.resetSessionTimeout)
            })
        },

        removeActivityListeners() {
            console.log('🧹 Limpiando event listeners')
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

            events.forEach(event => {
                window.removeEventListener(event, this.resetSessionTimeout)
            })
        },

        resetSessionTimeout() {
            if (this.$store && this.$store.getters && this.$store.dispatch) {
                const isAuthenticated = this.$store.getters['auth/isAuthenticated']

                if (isAuthenticated) {
                    //console.log('⚡ Actividad detectada - Reseteando timeout')
                    this.$store.dispatch('auth/resetSessionTimeout')
                }
            }
        }
    }
}