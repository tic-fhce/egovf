<template>
  <ol class="breadcrumb custom-breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">
      {{ titulo }} >
    </li>
  </ol>
  <CRow>
    <CCol :lg="12">
      <br />
      <CCard>
        <CCardHeader class="headercolor text-center">
          {{titulo}} 
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
                          <CButton :aria-describedby="id" v-on="on" class="font" color="success"
                            size="sm" @click="getEventoDetalle(evento.id)">
                            <CIcon icon="cil-calendar" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Editar la Solicitud" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton v-if="evento.estado == 'En Espera'" :aria-describedby="id" v-on="on" class="font" color="warning"
                            size="sm" @click="getSolicitudEditar(evento.id)">
                            <CIcon icon="cil-pencil" />
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
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
  name: 'ListaEventosView',
  components: {
    ComponenteEvento
  },
  data() {
    return {
      titulo:'Eventos de la Unidad',
      sraService: null,
      egovfService: null,
      listaEventos: [],
      gestion:0,
      mes:0,
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
    this.getGestion();
    

  },
  computed: {
    checkSeleccion() {
      return (this.solicitud.responsable !== null);
    },
  },
  methods: {
    tabla() {
      this.$nextTick(() => {
        $('#eventoTabla').DataTable();
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

    async getEventoUnidad() { // Funcion que crea una lista de Ciudadanos
      const fech = this.gestion+"-"+this.mes; 
      await this.sraService.getEventoUnidad(this.usuario.sigla,fech).then(response => {
        this.listaEventos = response.data;
      });
      if (this.listaEventos.length == 0) {
        this.$swal.fire("No se encontraron Eventos", "", "info");
      }
      this.tabla();

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
                if (result)
                  this.listaEvento();
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
        name: 'ListaSolicitudesView',
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
    solicitudes(idEvento) {
      this.getEvento(idEvento);
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