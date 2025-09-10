<template>

  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
          <CCol :lg="6">
            <div class="align-items-center">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
            </div>
          </CCol>
          <CCol :lg="6" class="text-end">
          </CCol>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="solicitudTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>HR</th>
                  <th>Cite</th>
                  <th>Evento</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="solicitud in listaSolicitudes" :key="solicitud.idSolicitud">
                  <td>{{ solicitud.idSolicitud }}</td>
                  <td>
                    <CAlert :color="solicitud.evento.color">{{ solicitud.hojaRuta }}</CAlert>
                  </td>
                  <td>
                    {{ solicitud.cite }}
                    <div class="small text-medium-emphasis">
                      {{ solicitud.fecha }}
                    </div>
                    <CProgress>
                      <CProgressBar :key="solicitud.idSolicitud" :color="solicitud.color" :value="solicitud.total">{{
                        solicitud.total }} %</CProgressBar>
                    </CProgress>
                  </td>
                  <td>
                    {{ solicitud.evento.nombre }}
                    <div class="small text-medium-emphasis">
                      {{ solicitud.ambiente }}<br>
                      {{ formatearFecha(solicitud.evento.fechaInicio) }} | {{ solicitud.evento.horaInicio }}:00
                    </div>
                  </td>
                  <td>
                    <CButtonGroup role="group">
                      <CTooltip content="Generar Solicitud de Evento" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton v-if="estado == 405" :aria-describedby="id" v-on="on" class="font" color="success"
                            size="sm" @click="solicitudes(solicitud.evento.id)">
                            <CIcon icon="cil-pencil" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Ver Detalle de la Solicitud" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton v-if="estado != 405" :aria-describedby="id" v-on="on" class="font" color="success"
                            size="sm" @click="getSolicitud(solicitud.idSolicitud)">
                            <CIcon icon="cil-featured-playlist" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Ver Evento" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton :aria-describedby="id" v-on="on" class="font" color="info" size="sm"
                            @click="getEventoDetalle(solicitud.evento.id)">
                            <CIcon icon="cil-calendar" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Editar la Solicitud" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton v-if="estado == 0" :aria-describedby="id" v-on="on" class="font" color="warning"
                            size="sm" @click="getSolicitudEditar(solicitud.idSolicitud)">
                            <CIcon icon="cil-pencil" />
                          </CButton>
                        </template>
                      </CTooltip>
                    </CButtonGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Solicitud-->
  <CModal size="lg" :visible="modalSolicitud" @close="clickModalSolicitud(false)">
    <CForm @submit.prevent="addSolicitud()">
      <CModalHeader class="headercolor" dismiss @close="clickModalSolicitud(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-clipboard" size="xl" /> Crear Solicitud
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success" class="text-end">Ref. {{ evento.nombre }}</CAlert>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormTextarea v-model="solicitud.detalle" required="true" rows="6"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CTooltip v-for="servicio in evento.servicios" :key="servicio.id" :content="servicio.detalle"
            placement="bottom">
            <template #toggler="{ on }">
              <CFormCheck inline type="radio" name="servicio" :label="servicio.nombre" :value="String(servicio.id)"
                v-on="on" required="true" @click="checkServicio(servicio.detalle, servicio.id)" />
            </template>
          </CTooltip>
        </CInputGroup>
        <hr>
        <div id="app">
          <h4>Responsable</h4>
          <v-select v-model="solicitud.responsable" :options="listaResponsable" label="nombre" :filterable="true"
            placeholder="Buscar responsable...">
            <template #option="{ nombre, ci }">
              <strong>{{ nombre }} </strong>
              <small class="text-muted"> - {{ ci }}</small>
            </template>
          </v-select>
        </div>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalSolicitud(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton v-if="checkSeleccion" type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Solicitud-->

  <!-- Modal Editar Solicitud-->
  <CModal size="lg" :visible="modalSolicitudEditar" @close="clickModalSolicitudEditar(false)">
    <CForm @submit.prevent="updateSolicitud()">
      <CModalHeader class="headercolor" dismiss @close="clickModalSolicitudEditar(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-clipboard" size="xl" /> Editar Solicitud
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success" class="text-end">Ref. {{ solicitudEditar.evento.nombre }}</CAlert>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormTextarea v-model="solicitudEditar.detalle" required="true" rows="6"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CTooltip v-for="servicio in solicitudEditar.evento.servicios" :key="servicio.id" :content="servicio.detalle"
            placement="bottom">
            <template #toggler="{ on }">
              <CFormCheck inline type="radio" name="servicio" :label="servicio.nombre" :value="String(servicio.id)"
                v-on="on" required="true" @click="checkServicioEditar(servicio.detalle, servicio.id)" />
            </template>
          </CTooltip>
        </CInputGroup>
        <hr>
        <div id="app">
          <h4>Responsable</h4>
          <v-select v-model="solicitudEditar.responsable" :options="listaResponsable" label="nombre" :filterable="true"
            placeholder="Buscar responsable...">
            <template #option="{ nombre, ci }">
              <strong>{{ nombre }} </strong>
              <small class="text-muted"> - {{ ci }}</small>
            </template>
          </v-select>
        </div>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalSolicitudEditar(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Actualizar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Editar Solicitud-->

  <!-- Modal Aprobar Solicitud-->
  <CModal :visible="modalSolicitudAprobar" @close="clickModalSolicitudAprobar(false)">
    <CForm @submit.prevent="updateSolicitudAprobar()">
      <CModalHeader class="headercolor" dismiss @close="clickModalSolicitudAprobar(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-clipboard" size="xl" /> Aprobar Solicitud
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success" class="text-end">Ref. {{ solicitudEditar.evento.nombre }}</CAlert>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Hoja de Ruta</CInputGroupText>
          <CFormInput v-model="solicitudEditar.hojaRuta" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <br>
          <div>
            {{ solicitudEditar.detalle }} ......
          </div>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalSolicitudAprobar(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-check-alt" class="me-2" />Aprobar Solicitud
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Editar Solicitud-->


  <!-- Modal  Detalle Solicitud-->
  <CModal size="lg" :visible="modalSolicitudDetalle" @close="clickModalSolicitudDetalle(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalSolicitudDetalle(false)">
      <CModalTitle>
        <h6>
          <CIcon icon="cil-clipboard" size="xl" /> Detalle Solicitud
        </h6>
      </CModalTitle>
    </CModalHeader>

    <CModalBody>
      <div class="text-end">
        <label>{{ solicitudDetalle.cite }}</label><br>
        <label>La Paz, {{ solicitudDetalle.fecha }}</label>
      </div>

      <div>
        <label>M. SC. ORLANDO VÍCTOR HUANCA RODRÍGUEZ</label><br>
        <label><strong>DECANO</strong></label><br>
        <label><strong>FACULTAD DE HUMANIDADES Y CIENCIAS DE LA EDUCACIÓN</strong></label><br><br>
        <label>Presente:</label><br>
      </div>

      <div class="oculto">
        <QrcodeVue :value="sms" :size="size" level="H" ref="qr" />
      </div>

      <div class="text-end">
        <label><u><strong>REF.: Evento "{{ solicitudDetalle.evento.nombre }}"</strong></u></label>
      </div>
      <br>
      <div>
        {{ solicitudDetalle.detalle }} {{ solicitudDetalle.servicio }}.
      </div>
      <br>
      <div>
        {{ solicitudDetalle.responsable.detalle }}
      </div>

    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalSolicitudDetalle(false)" color="danger" class="font" size="sm">
        <CIcon icon="cil-x" class="me-2" />Cancelar
      </CButton>
      <CButton @click="pdf()" class="font" size="sm" color="success">
        <CIcon icon="cil-cloud-download" class="me-2" />Descargar Solicitud
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- End Modal Detalle Solicitud-->

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

//Importamos Herramientas 
import QrcodeVue from 'qrcode.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';
import jsPDF from 'jspdf';

DataTable.use(DataTablesLib);

export default {
  name: 'ListaSolicitudesView',
  props: {
    estado: { type: [Number, String], required: true },
    idEvento: { type: [Number, String], required: true },
    titulo: { type: String, required: true },
  },
  components: {
    ComponenteEvento,
    QrcodeVue
  },
  data() {
    return {
      sraService: null,
      egovfService: null,
      listaSolicitudes: [],
      listaResponsable: [],
      modalSolicitud: false,
      modalSolicitudDetalle: false,
      modalSolicitudEditar: false,
      modalSolicitudAprobar: false,
      modalEventoDetalle: false,
      sms: '',
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
      solicitud: {
        idServicio: null,
        detalle: '',
        old: '',
        responsable: null,
        idEvento: 0
      },
      solicitudEditar: {
        id: 0,
        cite: '',
        fecha: '',
        idEvento: 0,
        idServicio: 0,
        hojaRuta: 0,
        responsable: null,
        detalle: '',
        old: '',
        gestion: 0,
        evento: null
      },
      evento: {
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
        color: '',
        servicios: []
      },
      showButton: false,
      solicitudDetalle: {
        idSolicitud: 0,
        cite: '',
        fecha: '',
        detalle: '',
        servicio: '',
        evento: null,
        responsable: {
          detalle: '',
          nombre: '',
          celular: '',
          ci: ''
        }
      },
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
    this.getSolicitudes();
    if (this.idEvento > 0) {
      this.getEvento(this.idEvento);
    }

  },
  computed: {
    checkSeleccion() {
      return (this.solicitud.responsable !== null);
    },
  },
  methods: {
    tabla() {
      this.$nextTick(() => {
        $('#solicitudTabla').DataTable();
      });
    },
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
    async getSolicitudes() { // Funcion que crea una lista de Solicitudes Aprobadas 
      this.egovfService.headersUsuario(this.usuario.token);
      if (this.estado == 405) { // preguntamos si es estado 405 evento sin solicitud
        //cargamos las listas de Eventos que no tienen Solicitudes
        await this.sraService.getSolicitudesEventosUnidad(this.usuario.sigla).then(response => {
          this.listaSolicitudes = response.data;
        });
      }
      else {//cargamos las solicitudes 
        await this.sraService.getSolicitudesUnidad(this.estado,this.usuario.sigla).then(response => {
          this.listaSolicitudes = response.data;
        });
      }

      this.progreso();
    },
    progreso() {
      this.listaSolicitudes.forEach(solicitud => {
        solicitud.color = this.esFechaPasada(solicitud.evento.fechaInicio);
        solicitud.total = this.calcularDiasRestantes(this.cambioFecha(), solicitud.evento.fechaInicio);

      });
      this.tabla();
      this.getListaResponsable();
    },

    async getListaResponsable() { // Funcion que crea una lista de Ciudadanos 
      await this.egovfService.getListaResponsable().then(response => {
        this.listaResponsable = response.data;
      });
    },

    async getEvento(idEvento) { // Funcion que crea una lista de Ciudadanos 
      await this.sraService.getEvento(idEvento).then(response => {
        this.evento = response.data;

        this.solicitud.detalle = "A tiempo de saludarle y desearle éxitos en sus funciones, me dirijo a su autoridad con el fin de solicitar la reserva del " + this.evento.ambiente + ", con el fin de realizar el evento " + this.evento.nombre + " ("+ this.usuario.unidad.toUpperCase() +")"+", mismo que será llevado a cabo el día " + this.formatearFecha(this.evento.fechaInicio) + " de " + this.evento.horaInicio + ":00  a " + this.evento.horaFin + ":00 horas, para lo cual requerimos:"
        this.solicitud.old = this.solicitud.detalle;
        this.solicitud.idEvento = idEvento;
        this.clickModalSolicitud(true);
      });

    },
    checkServicio(requerimiento, id) {
      this.solicitud.detalle = this.solicitud.old + "\n\n" + requerimiento;
      this.solicitud.idServicio = id;
    },

    checkServicioEditar(requerimiento, id) {
      this.solicitudEditar.detalle = this.solicitudEditar.old + "\n\n" + requerimiento;
      this.solicitudEditar.idServicio = id;
    },
    addSolicitud() { // funcion para el registro de un ciudadano
      this.$swal.fire({
        title: 'Desea Registrar la Solicitud para el evento ' + this.evento.nombre + "??",
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.addSolicitud(this.solicitud).then(response => {
            if (response.status == 201) {
              this.$swal.fire('Solicitud Registrada Correctamente', '', 'success').then((result) => {
                if (result){
                  location.reload();
                  this.listaEvento();
                }
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
    updateSolicitud() { // funcion para el registro de un ciudadano
      this.$swal.fire({
        title: 'Desea Actualizar la Solicitud del evento ' + this.evento.nombre + "??",
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.updateSolicitud(this.solicitudEditar).then(response => {
            if (response.status == 200) {
              this.$swal.fire('Solicitud Actualizada Correctamente', '', 'success').then((result) => {
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
    updateSolicitudAprobar() { // funcion para Aprobar la solicitud
      this.$swal.fire({
        title: 'Desea Aprobar la Solicitud del evento ' + this.evento.nombre + "??",
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Aprobar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.updateSolicitud(this.solicitudEditar).then(response => {
            if (response.status == 200) {
              this.$swal.fire('Solicitud Aprobada Correctamente', '', 'success').then((result) => {
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
    updateSolicitudCancelar(id) {
      this.solicitudEditar.id = id;
      this.solicitudEditar.cite = "";
      this.solicitudEditar.fecha = "";
      this.solicitudEditar.idEvento = 0;
      this.solicitudEditar.evento = null;
      this.solicitudEditar.idServicio = "";
      this.solicitudEditar.hojaRuta = "cancelado";
      this.solicitudEditar.responsable = 0;
      this.solicitudEditar.detalle = "";
      this.solicitudEditar.old = "";
      this.solicitudEditar.gestion = 0;

      this.$swal.fire({
        title: 'Desea Cancelar la Solicitud del Evento ' + this.evento.nombre + "??",
        icon: 'error',
        showDenyButton: true,
        confirmButtonText: 'Aprobar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.updateSolicitud(this.solicitudEditar).then(response => {
            if (response.status == 200) {
              this.$swal.fire('Solicitud Cancelada Correctamente', 'La Solicitud y el Evento fueron cancelados Corectamente', 'success').then((result) => {
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
    servicio(idAmbiente) {
      this.$router.push({
        name: 'ListaServiciosView',
        params: {
          ambiente: idAmbiente
        }
      });
    },

    fechas(idAmbiente) {
      this.$router.push({
        name: 'FechasView',
        params: {
          ambiente: idAmbiente
        }
      });
    },
    getSolicitud(id) {
      this.listaSolicitudes.forEach(solicitud => {
        if (solicitud.idSolicitud == id) {
          this.solicitudDetalle.idSolicitud = solicitud.idSolicitud;
          this.solicitudDetalle.evento = solicitud.evento;
          this.solicitudDetalle.cite = solicitud.cite;
          this.solicitudDetalle.fecha = this.cambio(solicitud.fecha);
          this.solicitudDetalle.detalle = solicitud.detalle;
          this.solicitudDetalle.servicio = solicitud.servicio;
          this.listaResponsable.forEach(responsable => {
            if (responsable.cif == solicitud.cifResponsable) {
              this.solicitudDetalle.responsable.detalle = "Para tal motivo el responsable del evento es " + responsable.nombre + ", con cedula de identidad " + responsable.ci + " y celular :" + responsable.celular;
              this.solicitudDetalle.responsable.nombre = responsable.nombre;
              this.solicitudDetalle.responsable.celular = responsable.celular;
              this.solicitudDetalle.responsable.ci = responsable.ci;
              return true;
            }
          });

          return true;
        }

      });
      this.sms = "http://192.168.31.34:8080/evento/" + this.solicitudDetalle.evento.id;
      this.clickModalSolicitudDetalle(true);

    },
    getEventoDetalle(id) {
      this.listaSolicitudes.forEach(solicitud => {
        if (solicitud.evento.id == id) {
          this.eventoDetalle.id = solicitud.evento.id;
          this.eventoDetalle.nombre = solicitud.evento.nombre;
          this.eventoDetalle.detalle = solicitud.evento.detalle;
          this.eventoDetalle.fechaInicio = solicitud.evento.fechaInicio;
          this.eventoDetalle.fechaFin = solicitud.evento.fechaFin;
          this.eventoDetalle.horaInicio = solicitud.evento.horaInicio + ':00';
          this.eventoDetalle.horaFin = solicitud.evento.horaFin + ':00';
          this.eventoDetalle.estado = solicitud.evento.estado;
          this.eventoDetalle.ambiente = solicitud.evento.ambiente;
          this.eventoDetalle.imagen = solicitud.evento.imagen;
          this.eventoDetalle.url = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/' + solicitud.evento.imagen;
          this.eventoDetalle.fecha = solicitud.evento.fecha;
          this.eventoDetalle.fechaE = solicitud.evento.fechaE;
          this.eventoDetalle.color = solicitud.evento.color;
          return true;
        }
      });
      this.clickModalEventoDetalle(true);
    },
    getSolicitudEditar(id) {
      this.selectSolicitud(id);
      this.clickModalSolicitudEditar(true);
    },
    getSolicitudAprobar(id) {
      this.selectSolicitud(id);
      this.solicitudEditar.hojaRuta = "";
      this.clickModalSolicitudAprobar(true);

    },

    selectSolicitud(id) {
      this.listaSolicitudes.forEach(solicitud => {
        if (solicitud.idSolicitud == id) {
          this.solicitudEditar.id = solicitud.idSolicitud;
          this.solicitudEditar.cite = solicitud.cite;
          this.solicitudEditar.fecha = solicitud.fecha;
          this.solicitudEditar.idEvento = solicitud.evento.id;
          this.solicitudEditar.evento = solicitud.evento;

          this.solicitudEditar.idServicio = solicitud.idServicio;
          this.solicitudEditar.hojaRuta = solicitud.hojaRuta;
          this.listaResponsable.forEach(responsable => {
            if (responsable.cif == solicitud.cifResponsable) {
              this.solicitudEditar.responsable = responsable;
              return true;
            }
          });

          this.solicitudEditar.detalle = solicitud.detalle + "\n\n" + solicitud.servicio;
          this.solicitudEditar.old = solicitud.detalle;
          this.solicitudEditar.gestion = solicitud.gestion;
          return true;
        }
      });
    },
    listaEvento() {
      this.$router.push({
        name: 'ListaSolicitudesUsuarioView',
        params: {
          idEvento: 0
        }
      });
    },
    esFechaPasada(fechaSalida) {
      if (!fechaSalida) return 'warning';

      const fechaTermino = new Date(fechaSalida);
      const hoy = new Date();

      // Normalizar fechas (ignorar horas)
      fechaTermino.setHours(0, 0, 0, 0);
      hoy.setHours(0, 0, 0, 0);

      return fechaTermino < hoy ? 'danger' : 'success';
    },
    calcularDiasRestantes(fi, fs) {
      const fechaInicio = new Date(fi);
      const fechaSalida = new Date(fs);
      const diasTotales = Math.floor((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));
      const fechaActual = new Date();
      if (!fechaSalida) return 0;

      if (fechaActual >= fechaSalida) return 100;

      const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
      const progreso = (diasPasados / diasTotales) * 100;
      return parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
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
    clickModalSolicitud(solicitud) {//funcion para Visibilisar el modal de registro
      if (!solicitud) {
        this.listaEvento();
      }
      this.modalSolicitud = solicitud;
    },
    clickModalSolicitudDetalle(solicitud) {//funcion para Visibilisar el modal de detalle
      this.modalSolicitudDetalle = solicitud;
    },
    clickModalEventoDetalle(evento) {
      this.modalEventoDetalle = evento;
    },
    clickModalSolicitudEditar(solicitud) {
      this.modalSolicitudEditar = solicitud;
    },
    clickModalSolicitudAprobar(solicitud) {
      this.modalSolicitudAprobar = solicitud;
    },
    pdf() { //Funcion que Constuye el PDF de la solicitud

      const fecha = new Date();

      const doc = new jsPDF('p', 'mm', 'letter');

      const contentHtml = this.$refs.qr.$el;
      const qr = contentHtml.toDataURL("image/jpeg", 0.8);

      //const doc = new jsPDF('p','mm','legal');
      doc.setFont('times');
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(this.solicitudDetalle.cite, (200), 45, { align: "right" });
      //doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(this.solicitudDetalle.fecha, (200), 50, { align: "right" });
      doc.setFontSize(6);
      doc.text("Fecha de Impresión : " + fecha, 200, 53, { align: "right" });

      doc.setFontSize(10);
      doc.text("Sr.:", 20, 70, { align: "left" });

      doc.text("M. SC. ORLANDO VÍCTOR HUANCA RODRÍGUEZ", 20, 80, { align: "left" });
      doc.setFont(undefined, 'bold');
      doc.text("DECANO", 20, 85, { align: "left" });
      doc.text("FACULTAD DE HUMANIDADES Y CIENCIAS DE LA EDUCACIÓN", 20, 90, { align: "left" });

      doc.addImage(qr, 'JPEG', 170, 70, 30, 30);

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text("Presente:", 20, 100, { align: "left" });

      doc.setFont(undefined, 'bold');
      doc.text("REF.: Evento  "+`"${this.solicitudDetalle.evento.nombre}"`, 200, 110, { align: "right" });

      doc.setFont(undefined, 'normal');

      const lineHeight = 5; // Espacio entre líneas (interlineado)
      const maxWidth = 180;
      // Dividir el texto en líneas
      const lineas = doc.splitTextToSize(this.solicitudDetalle.detalle + "\n\n" + this.solicitudDetalle.servicio + "\n\n" + this.solicitudDetalle.responsable.detalle + "\n\nCon este grato motivo saludo a usted con las consideraciones más distinguidas y esperando una respuesta.", maxWidth);

      // Escribir cada línea con interlineado
      let y = 120; // Posición inicial Y
      lineas.forEach((linea) => {
        doc.text(linea, 20, y, { align: "justify", maxWidth: 180 });
        y += lineHeight; // Aumenta la posición Y para la siguiente línea
      });

      doc.text(this.solicitudDetalle.responsable.nombre, (215 / 4), y + 25, { align: "center" });
      doc.text("C.I. : " + this.solicitudDetalle.responsable.ci, (215 / 4), y + 30, { align: "center" });
      doc.text("Celular : " + this.solicitudDetalle.responsable.celular, (215 / 4), y + 35, { align: "center" });

      doc.text("Vo. Bo.", (162), y + 25, { align: "center" });


      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.text("Universidad del Bicentenario de Bolivia", (215 / 2), y + 50, { align: "center" });
      doc.text("(1825-2025)", (215 / 2), y + 55, { align: "center" });

      const name = this.solicitudDetalle.cite.replace(/\//g, "");
      doc.save(name + '.pdf');
    },
    solicitudes(idEvento) {
      this.getEvento(idEvento);
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