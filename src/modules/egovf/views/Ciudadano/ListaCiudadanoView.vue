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
                  <div class="d-flex align-items-center">
                    <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                    <label class="mb-0 fs-5 text-white">{{ titulo }}</label>
                  </div>
            </CCardHeader>
            <CCardBody>
                <div class="table-responsive">
                    <table id="personaTabla" class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Foto</th><th>CIF</th><th>Datos</th><th>Contacto</th><th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ciudadano in listaCiudadanos" :key="ciudadano.idPersona">
                                <td>
                                  <CImage :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+ciudadano.foto" width="70" height="70"/>
                                </td>
                                <td>{{ciudadano.cif}}</td>
                                <td>
                                  {{ciudadano.paterno}} {{ciudadano.materno}} {{ciudadano.nombre}}<br>
                                  <label class="fontabla">{{ciudadano.correo}}</label>
                                </td>
                                <td>{{ciudadano.celular}}</td>
                                <td><CButton class="font" color="success" @click="perfil(ciudadano.cif)" size="sm"><CIcon icon="cil-user" class="me-2"/>Perfil</CButton></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CCardBody>
        </CCard>
    </CCol>
  </CRow>


<!-- Modal  Ciudadano-->
<CModal size="lg" :visible="modalCiudadano" @close="clickModalCiudadano(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalCiudadano(false)">
        <CModalTitle>
          <h6> <CIcon icon="cil-user" size="xl"/> Perfil de Ciudadano</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :lg="4">
          <img :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+this.ciudadano.foto" class="img-fluid rounded-start" width="200" height="200">                           
        </CCol>
        <CCol :lg="8">
          <br>
          <h4 class="card-title">CIF : {{this.ciudadano.cif}}</h4>
          <CFormLabel for="nombre" class="col-md-4">Nombre : </CFormLabel>
          <CFormLabel for="nombre" class="col-md-8">{{this.ciudadano.nombre}}</CFormLabel>
          <br>
          <CFormLabel for="apellido" class="col-md-4">Apellidos : </CFormLabel>
          <CFormLabel for="apellido" class="col-md-8">{{this.ciudadano.apellido}} </CFormLabel>
          <hr>
          <ul>
            <li class="lista">Correo : {{this.ciudadano.correo}}</li>
            <li class="lista">Celular : {{this.ciudadano.celular}}</li>
            <li class="lista" v-if="this.ciudadano.sexo == 1">Sexo : Femenino</li>
            <li class="lista" v-else >Sexo : Masculino</li>
          </ul>
        </CCol>
      </CRow>
      <CRow v-if="this.empleado.cargo!==''">
        <hr>
        <CCol :lg="12">
          <CWidgetStatsB class="mb-3" :progress="{ color: esFechaPasada(this.empleado.salida),value:this.total}">
            <template #text>
              <CAlert :color="esFechaPasada(this.empleado.salida)" class="py-1 my-0 d-inline-block">
                  Valido Hasta : {{ this.empleado.salida }}
              </CAlert>
            </template>
            <template #title>
              <strong>{{ this.ciudadano.sigla }}</strong> | {{this.empleado.cargo}} | {{this.empleado.numero}}<br>
              {{ this.empleado.empleado }}
            </template>
            <template #value>{{this.ciudadano.unidad}}</template>
          </CWidgetStatsB>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalCiudadano(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>        
    </CModalFooter>
</CModal>
<!-- End Modal  Ciudadano-->

</template>


<script>

//Importamos Servicios
import EgovfService from '@/modules/egovf/services/egovfService';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ListaCiudadanoView',
    components:{

    },
    data(){
        return {
          titulo:'Lista de Ciudadanos',
          egovfService:null,
          empleadoService:null,
          listaCiudadanos:[],
          listaEmpleado:[],
          modalCiudadano:false,
          total:0,
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
          ciudadano:{
            cif:0,
            nombre:'',
            apellido:'',
            correo:'',
            celular:'',
            unidad:'',
            sigla:'',
            dependiente:'',
            foto:'',
            sexo:0
          },
          empleado:{
            empleado:'',
            fecha:'',
            salida:'',
            cargo:'',
            numero:'',
            gestion:''
          }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
      this.egovfService = new EgovfService();
      this.empleadoService = new EmpleadoService();
    },
    mounted(){
      this.getDatos(); // Llamamos los datos del Usuario
      this.getListaCiudadanoPublico(); // Funcion que debuelve una lista de ciudadanos 
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#personaTabla').DataTable();
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
            this.egovfService.headersUsuario(this.usuario.token);
        }
      },
      async getListaCiudadanoPublico(){ // Funcion que crea una lista de Ciudadanos 
        await this.egovfService.getListaCiudadanoPublico().then(response => {
          const ciudadanosOrdenados = response.data.sort((a, b) => 
            a.paterno.localeCompare(b.paterno)
          );
          this.listaCiudadanos = ciudadanosOrdenados;
          this.getEmpleados();
        });
      },
      async getEmpleados(){// Funcion que regresa una lista de Empleados del ModuloEMP 
        await this.empleadoService.getEmpleados().then((response) =>{
            this.listaEmpleado = response.data;
            this.tabla();
        });
      },
      perfil(cifAux){
        this.listaCiudadanos.forEach(ciudadano => {
          if(ciudadano.cif==cifAux){
            this.ciudadano.cif=ciudadano.cif;
            this.ciudadano.nombre = ciudadano.nombre;
            this.ciudadano.apellido = ciudadano.paterno+" "+ciudadano.materno;
            this.ciudadano.correo=ciudadano.correo;
            this.ciudadano.celular=ciudadano.celular;
            this.ciudadano.sexo=ciudadano.sexo;
            this.ciudadano.foto = ciudadano.foto;
            this.ciudadano.sigla = ciudadano.sigla;
            this.ciudadano.unidad=ciudadano.unidad;

            return true;
          }
        });
        this.empleado.cargo='';
        this.listaEmpleado.forEach(empleado => {
          if(empleado.cif==cifAux){
            this.empleado.empleado=empleado.empleado;
            this.empleado.fecha=empleado.fecha;
            this.empleado.salida=empleado.salida;
            this.empleado.cargo=empleado.cargo;
            this.empleado.numero=empleado.contratos[0].numero_contrato;
            this.empleado.gestion=empleado.contratos[0].gestion;
            this.calcularDiasRestantes(empleado.fecha,empleado.salida);
            return true;
          }
        });
        this.clickModalCiudadano(true);
      },
      clickModalCiudadano(ciudadano){//funcion para Visibilisar el modal
        this.modalCiudadano = ciudadano;
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