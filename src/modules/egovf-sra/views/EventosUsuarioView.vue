<template>

  
  <CRow>
      <CCol :lg="6" v-for="evento in listaEventos" :key="evento.id">
          <CCard class="mb-3" >
              <CRow class="g-0">
                  <CCol :md="4">
                      <CCardImage class="rounded-0" :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/'+evento.imagen" />
                  </CCol>
                  <CCol :md="8">
                      <CCardBody>
                          <CCardTitle>{{formatearFecha(evento.fechaInicio)}}</CCardTitle>
                          <CCardText>{{ evento.nombre }}</CCardText>
                          <CCardText><small class="text-body-secondary">De horas {{ evento.horaInicio }}:00 a {{ evento.horaFin }}:00</small></CCardText>
                          <CAlert :color="evento.color">{{evento.estado}}</CAlert>
                          <CButton :color="evento.color" class="font" size="sm" @click="getEventoDetalle(evento.id)">Ver Evento</CButton>
                      </CCardBody>
                  </CCol>
              </CRow>
          </CCard>
      </CCol>
  </CRow>

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

export default {
    name:'EventosUsuarioView',
    components:{
      ComponenteEvento
    },
    data(){
        return {
          sraService:null,
          listaEventos:[],
          listaAmbiente:[],
          modalEventoDetalle:false,
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
        let loadingAlert = null;
        try{
          loadingAlert = this.$swal.fire({
          title: 'Cargando Eventos',
          html: 'Procesando datos, por favor espere...',
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading();
          }
        });
        this.$nprogress.start();

        const response = await this.sraService.getListaEventos(); 
        this.listaEventos = response.data;

        this.$swal.close();

        // Mostrar éxito
        this.$swal.fire({
          icon: 'success',
          title: '¡Completado!',
          text: `Se procesaron ${this.listaEventos .length} Eventos`,
          timer: 2000,
          showConfirmButton: false
        });

        }catch(error){
          if (loadingAlert) {
          this.$swal.close();
        }

        // Mostrar error
        this.$swal.fire({
          icon: 'error',
          title: 'Error en la carga',
          text: error.message || 'Ocurrió un error al procesar los datos',
          confirmButtonText: 'Reintentar'
        });

        }finally{
          this.$nprogress.done();
        }
       
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
.imagen-fija {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
</style>