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
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="dark" class="font border-0" size="sm">
                    <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CButton @click="clickModalAmbiente(true)" size="sm">
                        <CIcon icon="cil-cloud-upload" size="lg" class="me-2" /> Agregar
                      </CButton>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CCardHeader>
            <CCardBody>
                <div class="table-responsive">
                    <table id="ambienteTabla" class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th><th>Nombre</th><th>Direccion</th><th>Capacidad</th><th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ambiente in listaAmbientes" :key="ambiente.id">
                                <td>
                                  {{ambiente.id}}
                                </td>
                                <td>{{ambiente.nombre}}</td>
                                <td>
                                  {{ambiente.direccion}} 
                                </td>
                                <td>{{ambiente.capacidad}}</td>
                                <td>
                                  <CButtonGroup role="group">
                                    <CTooltip content="Servicios Prestados del Ambiente" placement="bottom">
                                      <template #toggler="{ id, on }">
                                        <CButton :aria-describedby="id" v-on="on" class="font" color="success" size="sm" @click="servicio(ambiente.id)"><CIcon icon="cil-note-add"/></CButton>
                                      </template>
                                    </CTooltip>
                                    <CTooltip content="Fechas Disponibles Para el Ambiente" placement="bottom">
                                      <template #toggler="{ id, on }">
                                        <CButton :aria-describedby="id" v-on="on" class="font" color="dark" size="sm" @click="fechas(ambiente.id)"><CIcon icon="cil-calendar"/></CButton>
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


<!-- Modal  Ciudadano-->
<CModal :visible="modalAmbiente" @close="clickModalAmbiente(false)">
  <CForm @submit.prevent="addAmbiente()">
    <CModalHeader class="headercolor" dismiss @close="clickModalAmbiente(false)">
        <CModalTitle>
          <h6> <CIcon icon="cil-bank" size="xl"/> Agregar Ambiente</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText  as="label">Nombre </CInputGroupText>
        <CFormInput type="text" v-model="ambiente.nombre" placeholder="Nombre del Ambiente" required="true"/>
      </CInputGroup>

      <CInputGroup class="mb-3">
        <CInputGroupText  as="label">Direccion </CInputGroupText>
        <CFormInput type="text" v-model="ambiente.direccion" placeholder="Drireccion del Ambiente" required="true"/>
      </CInputGroup>

      <CInputGroup class="mb-3">
        <CInputGroupText  as="label">Capacidad </CInputGroupText>
        <CFormInput type="text" v-model="ambiente.capacidad" placeholder="Capacidad del Ambiente" required="true"/>
      </CInputGroup>

    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalAmbiente(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
      <CButton type="submit" class="font" size="sm" color="success" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
    </CModalFooter>
  </CForm>
</CModal>
<!-- End Modal  Ciudadano-->

</template>


<script>

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ListaAmbientesView',
    components:{

    },
    data(){
        return {
          titulo:'Lista de Ambientes',
          sraService:null,
          listaAmbientes:[],
          modalAmbiente:false,
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
          ambiente:{
            nombre:'',
            direccion:'',
            capacidad:''
          }
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
      this.getListaAmbiente();
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#ambienteTabla').DataTable();
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
      async getListaAmbiente(){ // Funcion que crea una lista de Ciudadanos 
        await this.sraService.getListaAmbiente().then(response => {
          this.listaAmbientes = response.data;
          this.tabla();
        });
      },

      addAmbiente(){ // funcion para el registro de un ciudadano
        this.$swal.fire({
          title: 'Desea Registrar el Ambiente',
          icon:'info',
          showDenyButton: true,
          confirmButtonText: 'Registrar',
          denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.sraService.addAmbiente(this.ambiente).then(response =>{
                if(response.status==201){
                  this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
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

      clickModalAmbiente(ambiente){//funcion para Visibilisar el modal
        this.modalAmbiente = ambiente;
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
      }
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';

</style>