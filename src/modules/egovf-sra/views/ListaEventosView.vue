<template>

  <CRow>
    <CCol :lg="12">
      <br />
      <CCard>
        <CCardHeader class="headercolor text-center">
          {{ titulo }}
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :lg="4">
              <CInputGroup class="mb-3">
                <CInputGroupText as="label">Gestion</CInputGroupText>
                <CFormSelect v-model="gestion" :model-value="String(gestion)"
                  @update:model-value="gestion = Number($event)" required="true">
                  <option v-for="y in listaGestion" :key="y" :value="y">{{ y }}</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>

            <CCol :lg="4">
              <CInputGroup class="mb-3">
                <CInputGroupText as="label">Mes</CInputGroupText>
                <CFormSelect v-model="mes" :model-value="String(mes)" required="true">
                  <option v-for="mes in listaMes" :key="mes.m" :value="mes.m">{{ mes.mes }}</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>

            <CCol :lg="4" class="text-center">
              <CButton color="success" class="font" size="sm" @click="getEventoUnidad()">
                <CIcon icon="cil-calendar"></CIcon> Cargar Eventos
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter class="table-responsive">
          <table id="eventoTabla" class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Evento</th>
                <th>Ambiente</th>
                <th>Detalle</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evento in listaEventos" :key="evento.id">
                <th scope="row">{{ evento.id }} </th>
                <td>{{ evento.nombre }} </td>
                <td>
                  <div>{{ evento.ambiente }}</div>
                  <div class="small text-medium-emphasis">
                    Dias : <span>{{ evento.fechaInicio }}</span> | {{ evento.fechaFin }}
                  </div>
                  <div class="small text-medium-emphasis">
                    Horas : <span>{{ evento.horaInicio }}:00 </span> | {{ evento.horaFin }}:00
                  </div>

                  <CAlert :color="evento.color">{{ evento.estado }}</CAlert>
                </td>
                <td>
                  {{ evento.detalle }}
                </td>
                <td>
                  <CButtonGroup role="group">

                    <CTooltip content="Ver Detalle del Evento" placement="bottom">
                      <template #toggler="{ id, on }">
                        <CButton :aria-describedby="id" v-on="on" class="font" color="success" size="sm"
                          @click="getEventoDetalle(evento.id)">
                          <CIcon icon="cil-calendar" />
                        </CButton>
                      </template>
                    </CTooltip>
                    <CTooltip content="Editar Evento" placement="bottom">
                      <template #toggler="{ id, on }">
                        <CButton v-if="evento.estado == 'En Espera'" :aria-describedby="id" v-on="on" class="font"
                          color="warning" size="sm" @click="getEvento(evento.id)">
                          <CIcon icon="cil-pencil" />
                        </CButton>
                      </template>
                    </CTooltip>
                    <CTooltip content="Cambiar Afiche del Evento" placement="bottom">
                      <template #toggler="{ id, on }">
                        <CButton v-if="evento.estado == 'En Espera'" :aria-describedby="id" v-on="on" class="font"
                          color="warning" size="sm" @click="getEvento(evento.id)">
                          <CIcon icon="cil-pen-alt" />
                        </CButton>
                      </template>
                    </CTooltip>
                  </CButtonGroup>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Evento-->
  <CModal size="lg" :visible="modalEvento" @close="clickModalEvento(false)">
    <CForm @submit.prevent="updateEvento()">
      <CModalHeader class="headercolor" dismiss @close="clickModalEvento(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-calendar" size="xl" /> Editar Evento
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Nombre del Evento</CInputGroupText>
          <CFormInput type="text" v-model="eventoEditar.nombre" placeholder="Nombre del Evento" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle del Evento</CInputGroupText>
          <CFormTextarea v-model="eventoEditar.detalle" required="true" rows="3"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Del</CInputGroupText>
          <CFormInput type="date" v-model="eventoEditar.fechaInicio" required="true" disabled />
          <CInputGroupText as="label">Al</CInputGroupText>
          <CFormInput type="date" v-model="eventoEditar.fechaFin" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">A partir de horas</CInputGroupText>
          <CFormSelect v-model="eventoEditar.horaInicio" required="true">
            <option value="">Seleccionar Hora </option>
            <option v-for="hora in generarRango(8, eventoEditar.tope)" :value="hora" :key="hora">
              {{ hora }}:00
            </option>
          </CFormSelect>
          <CInputGroupText as="label">hasta las</CInputGroupText>
          <CFormSelect v-model="eventoEditar.horaFin" required="true">
            <option v-for="horaf in generarRango(9, eventoEditar.tope + 3)" :value="horaf" :key="horaf">
              {{ horaf }}:00
            </option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalEvento(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Actualizar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Evento-->


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

// Importamos Componentes
import ComponenteEvento from '@/components/Evento/ComponenteEvento.vue';

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';
import EgovfService from '@/modules/egovf/services/egovfService';

export default {
  name: 'ListaEventosView',
  components: {
    ComponenteEvento
  },
  data() {
    return {
      titulo: 'Eventos de la Unidad',
      sraService: null,
      egovfService: null,
      listaEventos: [],
      gestion: 0,
      mes: 0,
      modalEventoDetalle: false,
      modalEvento: false,
      usuario: {
        token: '',
        cif: '',
        correo: '',
        celular: '',
        pass: '',
        unidad: '',
        sigla: '',
        foto: ''
      },
      listaGestion: [],
      listaMes: [
        { m: "01", mes: "Enero" },
        { m: "02", mes: "Febrero" },
        { m: "03", mes: "Marzo" },
        { m: "04", mes: "Abril" },
        { m: "05", mes: "Mayo" },
        { m: "06", mes: "Junio" },
        { m: "07", mes: "Julio" },
        { m: "08", mes: "Agosto" },
        { m: "09", mes: "Septiembre" },
        { m: "10", mes: "Octubre" },
        { m: "11", mes: "Noviembre" },
        { m: "12", mes: "Diciembre" },
      ],
      showButton: false,
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
      eventoEditar: {
        id: 0,
        nombre: '',
        detalle: '',
        fechaInicio: '',
        fechaFin: '',
        horaInicio: '',
        horaFin: '',
        estado: 0,
        idAmbiente: 0,
        imagen: '',
        cif: 0,
        unidad: '',
        fecha:'',
        fechaE:'',
        tope:17
      }
    }
  },
  beforeCreate() {
    if (this.$cookies.get('cif') == null) {
      this.$router.push('/');
    }
  },
  created() {
    this.sraService = new SraService();
    this.egovfService = new EgovfService();
  },
  mounted() {
    //this.idEvento = this.$route.params.idEvento; //resivimos el cif del ciudadano
    this.getDatos(); // Llamamos los datos del Usuario
    this.getGestion();


  },
  computed: {
    checkSeleccion() {
      return (this.solicitud.responsable !== null);
    },
  },
  methods: {
    getDatos() {// Funcion que guarda los datos del Usuario en la View
      if (this.$cookies.get('cif') != null) {
        this.usuario.token = this.$cookies.get('token');
        this.usuario.cif = this.$cookies.get('cif');
        this.usuario.correo = this.$cookies.get('correo');
        this.usuario.celular = this.$cookies.get('celular');
        this.usuario.pass = this.$cookies.get('pass');
        this.usuario.unidad = this.$cookies.get('unidad');
        this.usuario.sigla = this.$cookies.get('sigla');
        this.usuario.foto = this.$cookies.get("foto");
      }
    },

    async getListaResponsable() { // Funcion que crea una lista de Ciudadanos 
      await this.egovfService.getListaResponsable().then(response => {
        this.listaResponsable = response.data;
      });
    },

    async getEventoUnidad() { // Funcion que crea una lista de Eventos Deacuerdo al Usuario
      const fech = this.gestion + "-" + this.mes;
      await this.sraService.getEventoUnidad(this.usuario.sigla, fech).then(response => {
        this.listaEventos = response.data;
      });
      if (this.listaEventos.length == 0) {
        this.$swal.fire("No se encontraron Eventos", "", "info");
      }

    },

    updateEvento() { // funcion para el registro de un ciudadano
      this.$swal.fire({
        title: 'Desea Actualizar la el Evento ' + this.eventoEditar.nombre + "??",
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.updateEvento(this.eventoEditar).then(response => {
            if (response.status == 200) {
              this.$swal.fire('Evento Actualizado Correctamente', '', 'success').then((result) => {
                if (result)
                  location.reload();
              });
            }
            else {
              this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
            }
          });
        } else if (result.isDenied) {
          this.$swal.fire('Datos Cancelados', '', 'info');
        }
      });
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
    getEvento(id) {
      this.listaEventos.forEach(evento => {
        if (evento.id == id) {
          this.eventoEditar.id = evento.id;
          this.eventoEditar.nombre = evento.nombre;
          this.eventoEditar.detalle = evento.detalle;
          this.eventoEditar.fechaInicio = evento.fechaInicio;
          this.eventoEditar.fechaFin = evento.fechaFin;
          this.eventoEditar.horaInicio = evento.horaInicio;
          this.eventoEditar.horaFin = evento.horaFin;
          this.eventoEditar.estado = evento.estado;
          this.eventoEditar.imagen = evento.imagen;
          this.eventoEditar.fecha = evento.fecha;
          this.eventoEditar.fechaE = evento.fechaE;
          this.eventoEditar.idAmbiente = evento.idAmbiente;
          this.eventoEditar.cif = this.usuario.cif;
          this.eventoEditar.unidad = this.usuario.sigla;
          return true;
        }
      });
      this.clickModalEvento(true);
    },
    clickModalEventoDetalle(evento) {
      this.modalEventoDetalle = evento;
    },
    clickModalEvento(evento) {
      this.modalEvento = evento;
    },
    getGestion() {
      // funcion que crea una lista de gestiones desde el 2021
      // revisado
      var lgestion = [];
      const fecha = new Date();
      this.obsgestion = fecha.getFullYear();
      for (var i = 2021; i <= this.obsgestion; i++) {
        lgestion.push(i);
      }
      this.listaGestion = lgestion;
      //this.reporteMes.gestion = this.obsgestion;
      //this.reporteMes.mes = fecha.getMonth();
    },
    generarRango(inicio, fin) {
      return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
    },
  }
}
</script>
<style scoped>
@import 'datatables.net-dt';
@import 'vue-select/dist/vue-select.css';

#app {
  max-width: 100%;
  margin: 1em auto;
}

.oculto {
  display: none;
}
</style>