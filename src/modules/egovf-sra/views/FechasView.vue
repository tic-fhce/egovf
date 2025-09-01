<template>
    <div class="calendar-container">
        <FullCalendar :options="calendarOptions">
        </FullCalendar>
    </div>


<!-- Modal  Evento-->
<CModal :visible="modalEvento" @close="clickModalEvento(false)">
  <CForm @submit.prevent="addEvento()">
    <CModalHeader class="headercolor" dismiss @close="clickModalEvento(false)">
        <CModalTitle>
          <h6> <CIcon icon="cil-calendar" size="xl"/> Agregar Evento</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <CInputGroup class="mb-3">
            <CInputGroupText  as="label">Nombre del Evento</CInputGroupText>
            <CFormInput type="text" v-model="evento.nombre" placeholder="Nombre del Evento" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText  as="label">Detalle del Evento</CInputGroupText>
            <CFormTextarea  v-model="evento.detalle" required="true" rows="3"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText  as="label">Del</CInputGroupText>
            <CFormInput type="date" v-model="evento.fechaInicio" required="true"/>
            <CInputGroupText  as="label">Al</CInputGroupText>
            <CFormInput type="date" v-model="evento.fechaFin" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText  as="label">A partir de horas</CInputGroupText>
            <CFormSelect  v-model="evento.horaInicio" required="true">
                <option v-for="hora in generarRango(8, evento.tope)" :value="hora" :key="hora">
                    {{ hora }}:00
                </option>
            </CFormSelect>
            <CInputGroupText  as="label">hasta las</CInputGroupText>
            <CFormSelect  v-model="evento.horaFin" required="true">
                <option v-for="horaf in generarRango(9, (evento.tope+3))" :value="horaf" :key="horaf">
                    {{ horaf }}:00
                </option>
            </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText as="label">Afiche</CInputGroupText>
                <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"  @change="selectFile" :valid="fileValid" required="true"/>
                <CInputGroupText v-if="fileValid">
                    <CIcon icon="cil-check" class="text-success"/>
            </CInputGroupText>
        </CInputGroup>
            
        <CProgress v-if="uploading" :height="50" class="mb-3">
            <CProgressBar  :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'" animated >
                Espere un Momento ........... {{ uploadProgress }} %
            </CProgressBar>
        </CProgress>

    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalEvento(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
      <CButton type="submit" class="font" size="sm" color="success" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
    </CModalFooter>
  </CForm>
</CModal>
<!-- End Modal  Evento-->

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
        <CButton @click="downloadImg(eventoDetalle.url,eventoDetalle.imagen)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-download" class="me-2"/>Descargar Documento</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Detalles de Evento -->

</template>

<script>
// Importamos Componentes
import ComponenteEvento from '@/components/Evento/ComponenteEvento.vue';

//Importamos Eventos
import SraService from '@/modules/egovf-sra/services/sraService';
import UploadService from '@/services/upload/uploadService';

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    name:'FechasView',
    components:{
        FullCalendar,
        ComponenteEvento
    },
    props: {
        idAmbiente: { type: [Number, String], required: true }
    },
    data(){
        return {
            titulo:'Fechas Reservadas',
            sraService:null,
            listaEventos:[],
            modalEvento:false,
            modalEventoDetalle:false,
            modalInventario:false,
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
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
            evento:{
                nombre:'',
                detalle:'',
                fechaInicio:'',
                fechaFin:'',
                horaInicio:'',
                horaFin:'',
                estado:0,
                idAmbiente:0,
                imagen:'',
                cif:0,
                tope:0
            },
            archivo:null,
            fileValid: false,
            uploading: false,
            uploadProgress: 0,
            uploadService:null,
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
      this.uploadService = new UploadService();
    },
    mounted(){
        this.getDatos(); // Llamamos los datos del Usuario
        this.getEventos();
    },
    computed: {
 
    },
    methods:{
        tabla(){
            this.$nextTick(()=>{
            //$('#EventoTabla').DataTable();
            });
        },
        selectFile(event){// Funcion que permite cambiar los datos del archivo
            const fileInput = this.getSafeFileInput(event);
      
            if (!fileInput?.files?.length) {
                this.resetFileInput();
                return;
            }
            
            this.archivo = fileInput.files[0];
            
            if (!this.validateFile(this.archivo)) {
                this.resetFileInput();
                return;
            }
            this.fileValid = true;
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
        async getEventos(){
            await this.sraService.getListaEventoAmbiente(this.idAmbiente).then(response => {
                this.listaEventos = response.data;
                this.calendarOptions.events = this.listaEventos.map(evento =>({
                    id:evento.id,
                    title:evento.nombre,
                    start:evento.fechaInicio,
                    end:evento.fechaFin,
                    color:evento.colorCalendar
                }));
            });
        },
        async addEvento(){ //Funcion para registrar un evento
            this.uploading = true;
            this.uploadProgress = 0;
            try{
                const formData = new FormData();
                formData.append('archivo',this.archivo);
                const config = {
                    onUploadProgress: progressEvent => {
                        this.uploadProgress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                    }
                };
                const uploadResponse = await this.uploadService.addImagen(formData, config);
                if (uploadResponse.status !== 200) {
                    throw new Error('Error al subir archivo');
                }
                
                this.evento.imagen = uploadResponse.data.nombre;
                
                this.$swal.fire({
                    title: 'Deseas Agregar El evento ' + this.evento.nombre+' ??',
                    showDenyButton: true,
                    icon:'info',
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.sraService.addEvento(this.evento).then(response =>{
                            if(response.status == 201){
                                this.$swal.fire({
                                    title:'El evento fue creado correctamente',
                                    showDenyButton: true,
                                    titleText:'Recuerda que para ser aprobado, debes de mandar una solicitud a Decanato, Deseas Crear una Solicitud Ahora ????', 
                                    icon:'success',
                                    confirmButtonText: 'Aceptar',
                                    denyButtonText: 'Cancelar',
                                }).then((res)=>{
                                    if(res.isConfirmed){
                                        this.solicitudes(response.data.id);
                                    }
                                    else{
                                        location.reload();
                                    }
                                });
                            }
                            else{
                                this.$swal.fire('El Evento No pudo ser Registrado, Intentelo mas Tarde', ''+ response.status, 'error');
                            }
                        });
                            
                    } else if (result.isDenied) {
                        this.$swal.fire('Datos Cancelados', '', 'info');
                    }
                });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err,'', 'error');
            }finally {
                this.uploading = false;
                this.uploadProgress = 0;
            }
        },

        inventarioModal(idEvento){
            this.inventario.idEvento=idEvento;
            this.clickModalInventario(true);
        },

        clickModalEvento(Evento){//funcion para Visibilisar el modal
            this.modalEvento = Evento;
        },
        clickModalInventario(Inventario){//funcion para Visibilisar el modal
            this.modalInventario = Inventario;
        },

      //funciones para el calendario
        handleDateSelect(selectInfo) {
            var minDate = new Date();

            minDate.setDate(minDate.getDate() + 12);
            const selectedDate = selectInfo.start;
            const dayOfWeek = selectedDate.getDay();
            
            if (selectInfo.start < minDate) {
                this.$swal.fire({
                    title:'ERROR',
                    text:'Lo sentimos, pero solo puedes realizar tus eventos a partir del  '+minDate.toDateString(),
                    icon:'error'
                });
                return false;
            }

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                this.$swal.fire({
                    title:'Cuidado',
                    text:'Lo sentimos no puedes realizar eventos los dias Sabados y Domingos',
                    icon:'warning'
                });
                return false;
            }
            this.evento.tope=17;
            if(dayOfWeek === 5){
                this.evento.tope=14;
            }

            this.evento.fechaInicio=selectInfo.startStr;
            this.evento.fechaFin=selectInfo.startStr;

            this.evento.cif=this.usuario.cif;
            this.evento.idAmbiente=this.idAmbiente;
            this.clickModalEvento(true);
        },
        handleEventClick(clickInfo) {
            this.listaEventos.forEach(evento =>{
                if(evento.id == clickInfo.event.id){
                    this.eventoDetalle.id = evento.id;
                    this.eventoDetalle.nombre = evento.nombre;
                    this.eventoDetalle.detalle = evento.detalle;
                    this.eventoDetalle.fechaInicio = evento.fechaInicio;
                    this.eventoDetalle.fechaFin = evento.fechaFin;
                    this.eventoDetalle.horaInicio = evento.horaInicio+':00';
                    this.eventoDetalle.horaFin = evento.horaFin+':00';
                    this.eventoDetalle.estado = evento.estado;
                    this.eventoDetalle.ambiente = evento.ambiente;
                    this.eventoDetalle.imagen = evento.imagen;
                    this.eventoDetalle.url = 'https://fhcevirtual.umsa.bo/egovf-img/imagenes/'+evento.imagen;
                    this.eventoDetalle.fecha = evento.fecha;
                    this.eventoDetalle.fechaE = evento.fechaE;
                    this.eventoDetalle.color = evento.color;
                    return true;
                }
            });
            this.clickModalEventoDetalle(true);
        },
        clickModalEventoDetalle(Evento){//funcion para Visibilisar el modal
            this.modalEventoDetalle = Evento;
        },
        handleEvents(events) {
            console.log('Eventos actualizados:', events)
        },
        generarRango(inicio, fin) {
            return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
        },
     //funciones para validar el archivo a subir
        getSafeFileInput(event) {
        // Todas las formas posibles de obtener el input
            return (
                // CoreUI v4+ (recomendado)
                this.$refs.fileInput?.$refs?.input ||
                
                // Event target
                event?.target ||
                
                // CoreUI v3
                this.$refs.fileInput?.$el?.querySelector?.('input[type="file"]') ||
                
                // Último recurso
                document.getElementById('filedoc')
            );
        },
    
        validateFile(file) {
            const VALID_TYPES = ['image/jpeg', 'image/png'];
            return file && VALID_TYPES.includes(file.type);
        },
    
        resetFileInput() {
            this.archivo=null;
            this.fileValid = false;
            const input = this.getSafeFileInput();
            if (input) input.value = '';
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        solicitudes(idEvento){
            var vista ='ListaSolicitudesUsuarioView';
            if(this.usuario.sigla == 'UTIC' || this.usuario.sigla=='ADM'){
                vista='ListaSolicitudesView';
            }
            this.$router.push({
                name: vista,
                params:{
                    estado: 0,
                    idEvento: idEvento,
                    titulo:"Solicitudes En Espera"
                }
            });
        },

    }
}
</script>

<style scoped>
.calendar-container {
  flex-grow: 1;
  padding: 1em;
}
/* Cambiar color de TODO el texto del calendario */
:deep(.fc) {
  color: #2c3e50 !important; /* Color principal */
  font-family: 'Arial', sans-serif;
}

/* Texto de los días de la semana (Lun, Mar, Mié...) */
:deep(.fc-col-header-cell) {
  color: #000000 !important; /* Azul */
  font-weight: 600;
}

/* Texto de los números de días */
:deep(.fc-daygrid-day-number) {
  color: #2c3e50 !important; /* Gris oscuro */
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

