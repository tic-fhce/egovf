<template>
    <CContainer class="margen">
        <ComponenteEvento :eventoDetalle="eventoDetalle" />
    </CContainer>

    <FooterComponent />
</template>

<script>

// Importamos Componentes
import ComponenteEvento from '@/components/Evento/ComponenteEvento.vue';
import FooterComponent from '@/modules/egovf/sections/home/Footer/FooterComponent.vue';

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';

export default {
    name: 'EventoView',
    components: {
        ComponenteEvento,
        FooterComponent
    },
    props: {
        idEvento: { type: [Number, String], required: true }
    },
    data() {
        return {
            sraService: null,
            fecha: '',
            eventoDetalle: {
                id: '',
                nombre: '',
                detalle: '',
                fechaInicio: '',
                fechaFin: '',
                horaInicio: '',
                horaFin: '',
                estado: 0,
                ambiente: '',
                imagen: '',
                url: '',
                fecha: '',
                fechaE: '',
                color: 'success'
            },

        }
    },
    beforeCreate() {

    },
    created() {
        this.sraService = new SraService();
    },
    mounted() {
        this.getEvento();
    },
    methods: {

        async getEvento() { // Funcion que crea una lista de Eventos 
            await this.sraService.getEvento(this.idEvento).then(response => {
                this.eventoDetalle = response.data;

            });
            if (this.eventoDetalle.estado == "Aprobado") {
                this.eventoDetalle.estado = "Evento Confirmado";
            }
            else {
                this.eventoDetalle.estado = "Evento Por Confirmar";
            }
            this.eventoDetalle.url = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/' + this.eventoDetalle.imagen;
            this.eventoDetalle.horaInicio = this.eventoDetalle.horaInicio + ':00';
            this.eventoDetalle.horaFin = this.eventoDetalle.horaFin + ':00';
        }

    }
}
</script>

<style scoped>
.margen {
    margin-top: 5em;
    padding: 0px 50px;
}
</style>