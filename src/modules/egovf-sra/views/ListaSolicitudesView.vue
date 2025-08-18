<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
            {{ titulo }} >
        </li>
        </ol>
    </nav>
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
                                    <th>#</th><th>HR</th><th>Cite</th><th>Evento</th><th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="solicitud in listaSolicitudes" :key="solicitud.idSolicitud">
                                    <td>{{solicitud.idSolicitud}}</td>
                                    <td>{{solicitud.hojaRuta}}</td>
                                    <td>
                                      {{solicitud.cite}}
                                      <div class="small text-medium-emphasis">
                                        {{solicitud.fecha}}
                                      </div>
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
                                        <CTooltip content="Ver Detalle de la Solicitud" placement="bottom">
                                        <template #toggler="{ id, on }">
                                            <CButton :aria-describedby="id" v-on="on" class="font" color="success" size="sm" @click="getSolicitud(solicitud.idSolicitud)"><CIcon icon="cil-featured-playlist"/></CButton>
                                        </template>
                                        </CTooltip>
                                        <CTooltip content="Ver Evento" placement="bottom">
                                        <template #toggler="{ id, on }">
                                            <CButton :aria-describedby="id" v-on="on" class="font" color="info" size="sm" @click="getEventoDetalle(solicitud.evento.id)"><CIcon icon="cil-calendar"/></CButton>
                                        </template>
                                        </CTooltip>
                                        <CTooltip content="Editar la Solicitud" placement="bottom">
                                        <template #toggler="{ id, on }">
                                            <CButton :aria-describedby="id" v-on="on" class="font" color="warning" size="sm" @click="getSolicitudEditar(solicitud.idSolicitud)"><CIcon icon="cil-pencil"/></CButton>
                                        </template>
                                        </CTooltip>
                                        <CTooltip content="Aprobar Evento y Solicitud" placement="bottom">
                                        <template #toggler="{ id, on }">
                                            <CButton :aria-describedby="id" v-on="on" class="font" color="dark" size="sm" @click="fechas(solicitud.idSolicitud)"><CIcon icon="cil-check-alt"/></CButton>
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
                    <h6> <CIcon icon="cil-clipboard" size="xl"/> Crear Solicitud</h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CAlert color="success" class="text-end">Ref. {{evento.nombre}}</CAlert>

                <CInputGroup class="mb-3">
                    <CInputGroupText  as="label">Detalle</CInputGroupText>
                    <CFormTextarea  v-model="solicitud.detalle" required="true" rows="6"> </CFormTextarea>
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CTooltip
                    v-for="servicio in evento.servicios"
                    :key="servicio.id"
                    :content="servicio.detalle"
                    placement="bottom"
                  >
                    <template #toggler="{ on }">
                      <CFormCheck 
                        inline
                        type="radio" 
                        name="servicio" 
                        :label="servicio.nombre"
                        :value="String(servicio.id)"
                        v-on="on" 
                        required="true"
                        @click="checkServicio(servicio.detalle,servicio.id)"
                      />
                    </template>
                  </CTooltip>
                </CInputGroup>
                <hr>
                <div id="app">
                  <h4>Responsable</h4>
                  <v-select
                    v-model="solicitud.responsable"
                    :options="listaResponsable"
                    label="nombre"
                    :filterable="true"
                    placeholder="Buscar responsable..."
                  >
                    <template #option="{ nombre, ci }">
                      <strong>{{ nombre }} </strong>
                      <small class="text-muted"> - {{ ci }}</small>
                    </template>
                  </v-select>
                </div>
                  
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalSolicitud(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
                <CButton v-if="checkSeleccion" type="submit" class="font" size="sm" color="success" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Solicitud-->

    <!-- Modal Editar Solicitud-->
    <CModal size="lg" :visible="modalSolicitudEditar" @close="clickModalSolicitudEditar(false)">
        <CForm @submit.prevent="updateSolicitud()">
            <CModalHeader class="headercolor" dismiss @close="clickModalSolicitudEditar(false)">
                <CModalTitle>
                    <h6> <CIcon icon="cil-clipboard" size="xl"/> Editar Solicitud</h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CAlert color="success" class="text-end">Ref. {{solicitudEditar.evento.nombre}}</CAlert>

                <CInputGroup class="mb-3">
                    <CInputGroupText  as="label">Detalle</CInputGroupText>
                    <CFormTextarea  v-model="solicitudEditar.detalle" required="true" rows="6"> </CFormTextarea>
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CTooltip
                    v-for="servicio in solicitudEditar.evento.servicios"
                    :key="servicio.id"
                    :content="servicio.detalle"
                    placement="bottom"
                  >
                    <template #toggler="{ on }">
                      <CFormCheck 
                        inline
                        type="radio" 
                        name="servicio" 
                        :label="servicio.nombre"
                        :value="String(servicio.id)"
                        v-on="on" 
                        required="true"
                        @click="checkServicioEditar(servicio.detalle,servicio.id)"
                      />
                    </template>
                  </CTooltip>
                </CInputGroup>
                <hr>
                <div id="app">
                  <h4>Responsable</h4>
                  <v-select
                    v-model="solicitudEditar.responsable"
                    :options="listaResponsable"
                    label="nombre"
                    :filterable="true"
                    placeholder="Buscar responsable..."
                  >
                    <template #option="{ nombre, ci }">
                      <strong>{{ nombre }} </strong>
                      <small class="text-muted"> - {{ ci }}</small>
                    </template>
                  </v-select>
                </div>
                  
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalSolicitudEditar(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
                <CButton type="submit" class="font" size="sm" color="success" ><CIcon icon="cil-cloud-upload" class="me-2"/>Actualizar</CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Editar Solicitud-->

    <!-- Modal  Detalle Solicitud-->
    <CModal size="lg" :visible="modalSolicitudDetalle" @close="clickModalSolicitudDetalle(false)">
      <CModalHeader class="headercolor" dismiss @close="clickModalSolicitudDetalle(false)">
          <CModalTitle>
              <h6> <CIcon icon="cil-clipboard" size="xl"/> Detalle Solicitud</h6>
          </CModalTitle>
      </CModalHeader>

        <CModalBody>
          <div class="text-end">
            <label >{{solicitudDetalle.cite}}</label><br>
            <label >La Paz, {{solicitudDetalle.fecha}}</label>
          </div>

          <div>
            <label>M. SC. ORLANDO VÍCTOR HUANCA RODRÍGUEZ</label><br>
            <label><strong>DECANO</strong></label><br>
            <label><strong>FACULTAD DE HUMANIDADES Y CIENCIAS DE LA EDUCACIÓN</strong></label><br><br>
            <label>Presente:</label><br>
          </div>

          <div class="text-end">
            <label><u><strong>REF.: {{ solicitudDetalle.evento.nombre }}</strong></u></label>
          </div>
          <br>
          <div>
            {{ solicitudDetalle.detalle }} {{solicitudDetalle.servicio}}.
          </div>
          <br>
          <div>
            {{ solicitudDetalle.responsable }}
          </div>
          
        </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalSolicitudDetalle(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
                <CButton @click="pdf()" class="font" size="sm" color="success" ><CIcon icon="cil-cloud-download" class="me-2"/>Descargar Solicitud</CButton>
            </CModalFooter>
    </CModal>
    <!-- End Modal Detalle Solicitud-->

  <!-- Modal  Detalles de Evento-->
  <CModal size="lg" :visible="modalEventoDetalle" @close="clickModalEventoDetalle(false)">
      <CModalHeader class="headercolor" dismiss @close="clickModalEventoDetalle(false)">
          <CModalTitle>
              <h6><CIcon icon="cil-featured-playlist" size="lg" class="me-2"/>Detalles del Evento</h6>
          </CModalTitle>
      </CModalHeader>
      <CModalBody>
          <ComponenteEvento :eventoDetalle="eventoDetalle"/>
      </CModalBody>
      <CModalFooter>
          <CButton @click="clickModalEventoDetalle(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
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
import jsPDF from 'jspdf';

DataTable.use(DataTablesLib);

export default {
    name:'ListaSolicitudesView',
    components:{
      ComponenteEvento
    },
    data(){
        return {
          titulo:'Lista de Solicitudes',
          sraService:null,
          egovfService:null,
          listaSolicitudes:[],
          listaResponsable:[],
          modalSolicitud:false,
          modalSolicitudDetalle:false,
          modalSolicitudEditar:false,
          modalEventoDetalle:false,
          idEvento:0,
          usuario:{
            token:'',
            cif:'',
            correo:'',
            celular:'',
            pass:'',
            unidad:'',
            sigla:'',
            foto:''
          },
          solicitud:{
            idServicio:null,
            detalle:'',
            old:'',
            responsable:null,
            idEvento:0
          },
          solicitudEditar:{
            id:0,
            cite:'',
            fecha:'',
            idEvento:0,
            idServicio:0,
            hojaRuta:0,
            responsable:null,
            detalle:'',
            old:'',
            gestion:0,
            evento:null
          },
          evento:{
            id:'',
            nombre:'',
            detalle:'',
            fechaInicio:'',
            fechaFin:'',
            horaInicio:'',
            horaFin:'',
            estado:0,
            ambiente:'',
            imagen:'',
            url:'',
            fecha:'',
            fechaE:'',
            color:'',
            servicios:[]
          },
          showButton:false,
          solicitudDetalle:{
            idSolicitud:0,
            cite:'',
            fecha:'',
            detalle:'',
            servicio:'',
            responsable:'',
            evento:null
          },
          eventoDetalle:{
            id:'',
            nombre:'',
            detalle:'',
            fechaInicio:'',
            fechaFin:'',
            horaInicio:'',
            horaFin:'',
            estado:0,
            ambiente:'',
            imagen:'',
            url:'',
            fecha:'',
            fechaE:'',
            color:''
          },
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
      this.sraService = new SraService();
      this.egovfService = new EgovfService();
    },
    mounted(){
        this.idEvento = this.$route.params.idEvento; //resivimos el cif del ciudadano
        this.getDatos(); // Llamamos los datos del Usuario
        this.getSolicitudes();
        if(this.idEvento>0){
            this.getEvento();
        }
    },
    computed:{
      checkSeleccion() {
        return(this.solicitud.responsable !== null);
      },
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#solicitudTabla').DataTable();
        });
      },
      getDatos(){// Funcion que guarda los datos del Usuario en la View
        if(this.$cookies.get('cif')!=null){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');
            this.usuario.foto = this.$cookies.get("foto");
        }
      },
      async getSolicitudes(){ // Funcion que crea una lista de Ciudadanos 
        this.egovfService.headersUsuario(this.usuario.token);
        await this.sraService.getSolicitudes().then(response => {
          this.listaSolicitudes = response.data;
          this.tabla();
          this.getListaResponsable();
        });
      },

      async getListaResponsable(){ // Funcion que crea una lista de Ciudadanos 
        await this.egovfService.getListaResponsable().then(response => {
          this.listaResponsable = response.data;
        });
      },

      async getEvento(){ // Funcion que crea una lista de Ciudadanos 
        await this.sraService.getEvento(this.idEvento).then(response => {
          this.evento = response.data;

          this.solicitud.detalle="A tiempo de saludarle y desearle éxitos en sus funciones, me dirijo a su autoridad con el fin de solicitar la reserva del "+this.evento.ambiente +", con el fin de realizar el evento "+this.evento.nombre+", mismo que será llevado a cabo el dia "+this.formatearFecha(this.evento.fechaInicio)+" de "+ this.evento.horaInicio+":00  a "+ this.evento.horaFin +":00 horas, para lo cual requerimos:"
          this.solicitud.old = this.solicitud.detalle;
          this.solicitud.idEvento = this.idEvento;
          this.clickModalSolicitud(true);
        });

      },
      checkServicio(requerimiento,id){
        this.solicitud.detalle = this.solicitud.old+"\n\n"+requerimiento;
        this.solicitud.idServicio= id;
      },

      checkServicioEditar(requerimiento,id){
        this.solicitudEditar.detalle = this.solicitudEditar.old+"\n\n"+requerimiento;
        this.solicitudEditar.idServicio= id;
      },
      addSolicitud(){ // funcion para el registro de un ciudadano
        this.$swal.fire({
          title: 'Desea Registrar la Solicitud para el evento '+this.evento.nombre+"??",
          icon:'info',
          showDenyButton: true,
          confirmButtonText: 'Registrar',
          denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.sraService.addSolicitud(this.solicitud).then(response =>{
                if(response.status==201){
                  this.$swal.fire('Solicitud Registrada Correctamente', '', 'success').then((result) => {
                    if(result)
                      this.listaEvento();
                  });
                }  
                else{
                  this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                }
              });
            } else if (result.isDenied) {
              this.$swal.fire('Datos Cancelados', '', 'info');
            }
          });
      },
      updateSolicitud(){ // funcion para el registro de un ciudadano
        this.$swal.fire({
          title: 'Desea Actualizar la Solicitud del evento '+this.evento.nombre+"??",
          icon:'info',
          showDenyButton: true,
          confirmButtonText: 'Registrar',
          denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.sraService.updateSolicitud(this.solicitudEditar).then(response =>{
                if(response.status==200){
                  this.$swal.fire('Solicitud Actualizada Correctamente', '', 'success').then((result) => {
                    if(result)
                      location.reload();
                  });
                }  
                else{
                  this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                }
              });
            } else if (result.isDenied) {
              this.$swal.fire('Datos Cancelados', '', 'info');
            }
          });
      },
      servicio(idAmbiente){
        this.$router.push({
          name: 'ListaServiciosView',
          params:{
            ambiente: idAmbiente
          }
        });
      },

      fechas(idAmbiente){
        this.$router.push({
          name: 'FechasView',
          params:{
            ambiente: idAmbiente
          }
        });
      },
      getSolicitud(id){
        this.listaSolicitudes.forEach(solicitud =>{
          if(solicitud.idSolicitud==id){
            this.solicitudDetalle.idSolicitud= solicitud.idSolicitud;
            this.solicitudDetalle.evento = solicitud.evento;
            this.solicitudDetalle.cite= solicitud.cite;
            this.solicitudDetalle.fecha = this.cambio(solicitud.fecha);
            this.solicitudDetalle.detalle = solicitud.detalle;  
            this.solicitudDetalle.servicio = solicitud.servicio;
            this.listaResponsable.forEach(responsable=>{
              if(responsable.cif == solicitud.cifResponsable){
                this.solicitudDetalle.responsable = "Para tal motivo el responsable del evento es "+responsable.nombre +", con cedula de identidad "+responsable.ci +" y celular :"+responsable.celular;
                return true;
              }
            });
            
            return true;
          }

        });
        this.clickModalSolicitudDetalle(true);

      },
      getEventoDetalle(id){
        this.listaSolicitudes.forEach(solicitud =>{
            if(solicitud.evento.id == id){
                this.eventoDetalle.id = solicitud.evento.id;
                this.eventoDetalle.nombre = solicitud.evento.nombre;
                this.eventoDetalle.detalle = solicitud.evento.detalle;
                this.eventoDetalle.fechaInicio = solicitud.evento.fechaInicio;
                this.eventoDetalle.fechaFin = solicitud.evento.fechaFin;
                this.eventoDetalle.horaInicio = solicitud.evento.horaInicio+':00';
                this.eventoDetalle.horaFin = solicitud.evento.horaFin+':00';
                this.eventoDetalle.estado = solicitud.evento.estado;
                this.eventoDetalle.ambiente = solicitud.evento.ambiente;
                this.eventoDetalle.imagen = solicitud.evento.imagen;
                this.eventoDetalle.url = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/'+solicitud.evento.imagen;
                this.eventoDetalle.fecha = solicitud.evento.fecha;
                this.eventoDetalle.fechaE = solicitud.evento.fechaE;
                this.eventoDetalle.color = solicitud.evento.color;
                return true;
            }
          });
          this.clickModalEventoDetalle(true);
      },
      getSolicitudEditar(id){
        
        this.listaSolicitudes.forEach(solicitud =>{
          if(solicitud.idSolicitud==id){
            this.solicitudEditar.id = solicitud.idSolicitud;
            this.solicitudEditar.cite = solicitud.cite;
            this.solicitudEditar.fecha = solicitud.fecha;
            this.solicitudEditar.idEvento = solicitud.evento.id;
            this.solicitudEditar.evento = solicitud.evento;
            
            this.solicitudEditar.idServicio = solicitud.idServicio;
            this.solicitudEditar.hojaRuta = solicitud.hojaRuta;
            this.listaResponsable.forEach(responsable =>{
              if(responsable.cif==solicitud.cifResponsable){
                this.solicitudEditar.responsable = responsable;
                return true;
              }
            });
          
            this.solicitudEditar.detalle = solicitud.detalle +"\n\n"+solicitud.servicio;
            this.solicitudEditar.old = solicitud.detalle;
            this.solicitudEditar.gestion = solicitud.gestion;            
            return true;
          }

        });
        this.clickModalSolicitudEditar(true);

      },
      listaEvento(){
        this.$router.push({
          name: 'ListaSolicitudesView',
          params:{
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
      calcularDiasRestantes(fi,fs) {
        const fechaInicio = new Date(fi);
        const fechaSalida = new Date(fs);
        const diasTotales = Math.floor((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));
        const fechaActual = new Date();
        if (!fechaSalida) this.total = 0;
        
        if (fechaActual >= fechaSalida) {
          this.total =100;
        }
        else{
          const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
          const progreso = (diasPasados / diasTotales) * 100;
          this.total = parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
        }
      },
      cambio(fechaOriginal){
        fechaOriginal = fechaOriginal.split(" ")[0];
        const fechaStr = fechaOriginal.replace(/\//g, "-");
        const [dia, mes, año] = fechaStr.split("-");
        const fechaFormateada = `${año}-${mes}-${dia}`;
        return(this.formatearFecha(fechaFormateada));
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
      clickModalSolicitud(solicitud){//funcion para Visibilisar el modal de registro
        if(!solicitud){
            this.listaEvento();
        }
        this.modalSolicitud = solicitud;
      },
      clickModalSolicitudDetalle(solicitud){//funcion para Visibilisar el modal de detalle
        this.modalSolicitudDetalle = solicitud;
      },
      clickModalEventoDetalle(evento){
        this.modalEventoDetalle=evento;
      },
      clickModalSolicitudEditar(solicitud){
        this.modalSolicitudEditar = solicitud;
      },
      pdf(){ //Funcion que Constuye el PDF de la solicitud
            
            //const fecha = new Date();
            const doc = new jsPDF('p','mm','letter');
            
            //const doc = new jsPDF('p','mm','legal');
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text(this.solicitudDetalle.cite,(200),45,{align:"right"});
            //doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(this.solicitudDetalle.fecha,(200),50,{align:"right"});
            
            doc.text("Sr.:",20,80,{align:"left"});

            doc.text("M. SC. ORLANDO VÍCTOR HUANCA RODRÍGUEZ",20,90,{align:"left"});
            doc.setFont(undefined, 'bold');
            doc.text("DECANO",20,95,{align:"left"});
            doc.text("FACULTAD DE HUMANIDADES Y CIENCIAS DE LA EDUCACIÓN",20,100,{align:"left"});
            doc.setFont(undefined, 'normal');
            doc.text("Presente:",20,105,{align:"left"});

            doc.setFont(undefined, 'bold');
            doc.text("REF.: "+this.solicitudDetalle.evento.nombre,200,120,{align:"right"});

            doc.setFont(undefined, 'normal');

            const lineHeight = 8; // Espacio entre líneas (interlineado)
            const maxWidth = 180;
            // Dividir el texto en líneas
            const lineas = doc.splitTextToSize(this.solicitudDetalle.detalle+"\n"+this.solicitudDetalle.servicio+"\n"+this.solicitudDetalle.responsable+"\n\nCon este grato motivo saludo a usted con las consideraciones más distinguidas y esperando una respuesta.", maxWidth);

            // Escribir cada línea con interlineado
            let y = 140; // Posición inicial Y
            lineas.forEach((linea) => {
              doc.text(linea, 20, y, { align: "justify", maxWidth :180 });
              y += lineHeight; // Aumenta la posición Y para la siguiente línea
            });

            

            


            

            /*doc.setFontSize(15);
            doc.text("Datos de Personales :",20,40);
            
            doc.setFontSize(10);

            img.src = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+this.reporte.persona.foto;
            doc.addImage(img,'JPEG', 20,47,30,30);

            doc.text("CIF : "+this.reporte.cif,52,50);
            doc.text("Nombre : "+this.reporte.persona.nombre,52,55);
            doc.text("Apellidos : "+this.reporte.persona.paterno+" "+this.reporte.persona.materno,52,60);
            doc.text("Celular : "+this.reporte.persona.celular,52,65);
            doc.text("Unidad : "+this.reporte.sigla,52,70);
            doc.text("ID app : "+this.reporte.persona.id,120,50);
            doc.text("C.I. : "+this.reporte.persona.ci,120,55);
            doc.text("Correo : "+this.reporte.persona.correo,120,60);
            doc.setFontSize(15);
            
            doc.text("Retraso  : "+this.totalretraso+" min.",120,70);
            doc.text("Salida Anticipada : "+this.totalanticipado+" min.",120,80);
            doc.setFontSize(6);
            doc.text("Fecha de Imprecion : "+fecha,120,86);
            doc.setFontSize(10);
            var finalY=95;
            
            if(this.reporte.cif != 20903198600){
                doc.text("Lic. Jaime A. Montecinos Marquez",(215/4),finalY+25,{align:"center"});
                doc.text("Responsable Unidad TIC.",(215/4),finalY+30,{align:"center"});

                doc.text("Vo. Bo.",(162),finalY+25,{align:"center"});
                doc.text("Inmediato Superior",(162),finalY+30,{align:"center"});
            }
            else{
                doc.text("Vo. Bo.",(215/2),finalY+25,{align:"center"});
                doc.text("Inmediato Superior",(215/2),finalY+30,{align:"center"});
            }

            finalY = finalY+45;
            autoTable(doc, {
                theme:'striped',
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printDatos',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            finalY = finalY+10;
            autoTable(doc, {
                startY:finalY,
                margin: {left:20 },
                styles:{fontSize:8},
                html:'#printHorario',
                showFoot: 'lastPage'
            });
            finalY = doc.lastAutoTable.finalY;
            doc.setFontSize(15);
            doc.text("Reporte de Asistencia del mes de " + this.mes +" del "+this.reporte.gestion,(215/2),finalY+10,{align:"center"});
            autoTable(doc, {
                startY:finalY+15,
                margin: {left:15 },
                styles:{fontSize:7.5},
                html:'#printMarcado',
                showFoot: 'lastPage'
            });*/
            const name = this.solicitudDetalle.cite.replace(/\//g, "");
            doc.save(name+'.pdf');
        }
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
</style>