<template>
  <CContainer>
    <CRow class="margen">
      <CCol :lg="6">
        <Carousel v-bind="carouselConfig">
          <Slide v-for="evento in listaEventos" :key="evento.id">
            <CCard class="mb-3">
              <CCardImage class="rounded-0" :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/' + evento.imagen" />
              <CCardImageOverlay>
                <div class="titulo">
                  <CCardTitle>{{ formatearFecha(evento.fechaInicio) }}</CCardTitle>
                  <CCardText>{{ evento.nombre }}</CCardText>
                  <CCardText><small>De horas {{ evento.horaInicio }}:00 a {{ evento.horaFin }}:00</small></CCardText>
                </div>
                <br>
                <CAlert :color="evento.color">{{ evento.estado }}</CAlert>
                <CButton :color="evento.color" class="font" size="sm" @click="getEventoDetalle(evento.id)">Ver Evento
                </CButton>
              </CCardImageOverlay>
            </CCard>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>

      </CCol>
      <CCol :lg="6">
        <div class="calendar-container">
          <FullCalendar :options="calendarOptions">
          </FullCalendar>
        </div>
      </CCol>
    </CRow>
  </CContainer>

  <ComponenteInfo />
  <FooterComponent />


  <!-- Modal  Detalles de Evento-->
  <CModal size="lg" :visible="modalEventoDetalle" @close="clickModalEventoDetalle(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalEventoDetalle(false)">
      <CModalTitle>
        <h6>
          <CIcon icon="cil-featured-playlist" size="lg" class="me-2" />Detalles del Evento
        </h6>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <ComponenteEvento :eventoDetalle="eventoDetalle" />
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalEventoDetalle(false)" color="danger" class="font" size="sm">
        <CIcon icon="cil-x" class="me-2" />Cancelar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- END Modal  Detalles de Evento -->
</template>
<script>
//Import Componentes
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import ComponenteEvento from '@/components/Evento/ComponenteEvento.vue';
import ComponenteInfo from '@/components/Evento/ComponenteInfo.vue';
import FooterComponent from '@/modules/egovf/sections/home/Footer/FooterComponent.vue';

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'ActividadesView',
  components: {
    ComponenteEvento,
    FooterComponent,
    Carousel,
    Slide,
    Navigation,
    FullCalendar,
    ComponenteInfo
  },
  data() {
    return {
      sraService: null,
      listaEventos: [],
      modalEventoDetalle: false,
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
        color: ''
      },
      carouselConfig: {
        height: 500,
        itemsToShow: 2,
        wrapAround: true,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today'
        },
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista'
        },
        buttonIcons: {
          prev: 'chevron-left',
          next: 'chevron-right',
          prevYear: 'chevron-double-left',
          nextYear: 'chevron-double-right'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        locale: 'es',
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: []
      },
    }
  },
  beforeCreate() {

  },
  created() {
    this.sraService = new SraService();
  },
  mounted() {
    this.getListaEventos();
  },
  methods: {

    async getListaEventos() { // Funcion que crea una lista de Eventos 
      await this.sraService.getListaEventos().then(response => {
        this.listaEventos = response.data;
      });
      this.listaEventos.forEach(evento => {
        if (evento.estado == "Aprobado") {
          evento.estado = "Evento Confirmado";
        }
        else {
          evento.estado = "Evento Por Confirmar";
        }
      });
      this.calendarOptions.events = this.listaEventos.map(evento => ({
        id: evento.id,
        title: evento.nombre,
        start: evento.fechaInicio,
        end: evento.fechaFin,
        color: evento.colorCalendar
      }));
      //this.progreso();
    },
    getEventoDetalle(id) {
      this.listaEventos.forEach(evento => {
        if (evento.id == id) {
          this.eventoDetalle.id = evento.id;
          this.eventoDetalle.nombre = evento.nombre;
          this.eventoDetalle.detalle = evento.detalle;
          this.eventoDetalle.fechaInicio = evento.fechaInicio;
          this.eventoDetalle.fechaFin = evento.fechaFin;
          this.eventoDetalle.horaInicio = evento.horaInicio + ':00';
          this.eventoDetalle.horaFin = evento.horaFin + ':00';
          this.eventoDetalle.estado = evento.estado;
          this.eventoDetalle.ambiente = evento.ambiente;
          this.eventoDetalle.imagen = evento.imagen;
          this.eventoDetalle.url = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/' + evento.imagen;
          this.eventoDetalle.fecha = evento.fecha;
          this.eventoDetalle.fechaE = evento.fechaE;
          this.eventoDetalle.color = evento.color;
          return true;
        }
      });
      this.clickModalEventoDetalle(true);
    },
    cambio(fechaOriginal) {
      fechaOriginal = fechaOriginal.split(" ")[0];
      const fechaStr = fechaOriginal.replace(/\//g, "-");
      const [dia, mes, año] = fechaStr.split("-");
      const fechaFormateada = `${año}-${mes}-${dia}`;
      return (this.formatearFecha(fechaFormateada));
    },
    cambioFecha() {
      const primerDia = new Date();
      const año = primerDia.getFullYear();
      const mes = String(primerDia.getMonth() + 1).padStart(2, '0');
      const primerDiaFormateado = `${año}-${mes}-01`;
      return (primerDiaFormateado);
    },
    formatearFecha(fechaStr) {

      // Dividir la fecha en día, mes y año
      const [anio, mes, dia] = fechaStr.split('-').map(Number);

      // Crear objeto Date (los meses en JS son 0-indexados, por eso mes - 1)
      const fecha = new Date(anio, mes - 1, dia);

      // Verificar si la fecha es válida
      if (isNaN(fecha.getTime())) {
        throw new Error('Fecha inválida');
      }

      // Opciones para formatear la fecha
      const opciones = {
        weekday: 'long',   // "lunes"
        day: 'numeric',    // "20"
        month: 'long',     // "enero"
        year: 'numeric'    // "2025"
      };

      // Formatear según la configuración regional (español)
      return fecha.toLocaleDateString('es-ES', opciones);
    },
    clickModalEventoDetalle(evento) {
      this.modalEventoDetalle = evento;
    },
    handleEventClick(clickInfo) {
      this.getEventoDetalle(clickInfo.event.id);
    },
    handleDateSelect(selectInfo) {
      var minDate = new Date();

      minDate.setDate(minDate.getDate() + 12);
      const selectedDate = selectInfo.start;
      const dayOfWeek = selectedDate.getDay();

      if (selectInfo.start < minDate) {
        this.$swal.fire({
          title: 'ERROR',
          text: 'Lo sentimos, pero solo puedes realizar tus eventos a partir del  ' + minDate.toDateString(),
          icon: 'error',
          showCloseButton: true
        });
        return false;
      }

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        this.$swal.fire({
          title: 'Cuidado',
          text: 'Lo sentimos no puedes realizar eventos los dias Sabados y Domingos',
          icon: 'warning',
          showCloseButton: true
        });
        return false;
      }

      this.$swal.fire({
        title: 'Te Informamos Que: ',
        text: 'Para realizar la reserva de tu evento, debes de acudir a la Dirección de tu Carrera o a la Unidad a la que perteneces, previamente o acudir personalmente a la Administración Facultativa, ubicada en la Casa Marcelo Quiroga Santa Cruz, Av. 6 de Agosto N.º 2118, entre calles Aspiazu y Guachalla.',
        icon: 'info',
        showCloseButton: true
      });
    },
  }
}
</script>

<style scoped>
.margen {
  margin-top: 5em;
}

.seccion {
  background-color: #8080803b;
}

.titulo {
  background-color: rgba(15, 15, 15, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 15px;
}

:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;

  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next~.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}

.calendar-container {
  flex-grow: 1;
  padding: 1em;
}

/* Cambiar color de TODO el texto del calendario */
:deep(.fc) {
  color: #2c3e50 !important;
  /* Color principal */
  font-family: 'Arial', sans-serif;
}

/* Texto de los días de la semana (Lun, Mar, Mié...) */
:deep(.fc-col-header-cell) {
  color: #000000 !important;
  /* Azul */
  font-weight: 600;
}

/* Texto de los números de días */
:deep(.fc-daygrid-day-number) {
  color: #2c3e50 !important;
  /* Gris oscuro */
  font-weight: 500;
  font-size: 1.1rem;
}

:deep(.fc a) {
  text-decoration: none !important;
}

/* Toolbar text */
:deep(.fc-toolbar-chunk) {
  color: #7f8c8d !important;
}
</style>