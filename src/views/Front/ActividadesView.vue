<template>
    <CRow :xs="{ cols: 1, gutter: 4}" :md="{ cols:2 }">
        <CCol xs>
            <CCard style="width: 18rem">
  <CCardImage orientation="top" src="https://fhcevirtual.umsa.bo/egovf-img/imagenes/202508211755745564.jpeg" />
  <CCardBody>
    <CCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CCardText>
  </CCardBody>
</CCard>
</CCol><CCol xs>
<CCard style="width: 18rem">
  <CCardImage orientation="top" src="https://fhcevirtual.umsa.bo/egovf-img/imagenes/202508211755745029.jpeg" />
  <CCardBody>
    <CCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CCardText>
  </CCardBody>
</CCard>

        </CCol>



    </CRow>
  

    <FooterComponent />

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

import FooterComponent from '@/modules/egovf/sections/home/Footer/FooterComponent.vue';

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';

export default {
    name:'ActividadesView',
    components:{
      ComponenteEvento,
      FooterComponent
    },
    data(){
        return {
          sraService:null,
          listaEventos:[],
          modalEventoDetalle:false,
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

    },
    created(){
      this.sraService = new SraService();
    },
    mounted(){
        this.getDatos(); // Llamamos los datos del Usuario
        this.getListaEventos();
    },
    methods:{
      
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
      async getListaEventos(){ // Funcion que crea una lista de Eventos 
        await this.sraService.getListaEventos().then(response => {
            this.listaEventos = response.data;
        });
        //this.progreso();
      },
      progreso(){
        this.listaSolicitudes.forEach(solicitud =>{
          solicitud.color = this.esFechaPasada(solicitud.evento.fechaInicio);
          solicitud.total = this.calcularDiasRestantes(this.cambioFecha(),solicitud.evento.fechaInicio);

        });
      },


      async getEvento(){ 


      },

      getEventoDetalle(id){
        this.listaEventos.forEach(evento =>{
            if(evento.id == id){
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
        if (!fechaSalida) return 0;
            
        if (fechaActual >= fechaSalida) return 100;

        const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
        const progreso = (diasPasados / diasTotales) * 100;
        return parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
      },
      cambio(fechaOriginal){
        fechaOriginal = fechaOriginal.split(" ")[0];
        const fechaStr = fechaOriginal.replace(/\//g, "-");
        const [dia, mes, año] = fechaStr.split("-");
        const fechaFormateada = `${año}-${mes}-${dia}`;
        return(this.formatearFecha(fechaFormateada));
      },
      cambioFecha(){
        const primerDia = new Date();
        const año = primerDia.getFullYear();
        const mes = String(primerDia.getMonth() + 1).padStart(2, '0');
        const primerDiaFormateado = `${año}-${mes}-01`;
        return(primerDiaFormateado);
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
      
      clickModalEventoDetalle(evento){
        this.modalEventoDetalle=evento;
      }
    }
}
</script>

<style scoped>


</style>