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
                  <CDropdown variant="btn-group">
                    <CDropdownToggle color="dark" class="font border-0" size="sm">
                      <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>
                        <CButton @click="clickModalCiudadano(true)" size="sm">
                          <CIcon icon="cil-cloud-upload" size="lg" class="me-2" /> Agregar
                        </CButton>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="personaTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Foto</th><th>CIF</th><th>Datos</th><th>Contacto</th><th>Unidad</th><th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ciudadano in listaCiudadanos" :key="ciudadano.idPersona">
                                    <th scope="row">{{ciudadano.idPersona}}</th>
                                    <td><CAvatar :src="ciudadano.foto" size="md"/></td>
                                    <td>{{ciudadano.cif}}</td>
                                    <td>
                                      {{ciudadano.nombre}} {{ciudadano.paterno}} {{ciudadano.materno}}<br>
                                      {{ciudadano.ci}}<br>
                                      <label class="fontabla">{{ciudadano.correo}}</label>
                                    </td>
                                    <td>
                                       {{ciudadano.celular}}</td>
                                    <td>{{ ciudadano.sigla }}</td>
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
<CModal :visible="modalCiudadano" @close="clickModalCiudadano(false)">
  <form @submit.prevent="registrarCiudadano()">
    <CModalHeader class="headercolor" dismiss @close="clickModalCiudadano(false)">
        <CModalTitle>
          <h4> <CIcon icon="cil-user" size="xl"/> Agregar Nuevo Ciudadano</h4>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        
        <div class="mb-3 row">
            <label for="ci" class="col-6 col-form-label">
              <p> Celulda de Identidad.</p>
            </label>
            <div class="col-6">
              <input type="text" class="form-control" v-model="persona.ci" placeholder="Cedula de Identidad" @input="validarCI()" @keyup="botonesFuncion()" required="true">
              <p v-if="errorpersona.ci" style="color: green;">{{ errorCI }}</p>
              <p v-else style="color: red;">{{ errorCI }}</p>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="region" class="col-6 col-form-label">
              <p> Region Exp.</p>
            </label>
            <div class="col-6">
                <select class="form-control" v-model="persona.complemento" required="true">
                  <option>Seleccionar Region Expedida</option>
                  <option value="lp">La Paz</option>
                  <option value="sc">Santa Cruz</option>
                  <option value="cb">Cochabamba</option>
                  <option value="or">Oruro</option>
                  <option value="pt">Potosi</option>
                  <option value="tr">Tarija</option>
                  <option value="ch">Chuquisaca</option>
                  <option value="bn">Beni</option>
                  <option value="pd">Pando</option>
                </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="nombre" class="col-6 col-form-label">
              <p>Nombres.</p>
            </label>
            <div class="col-6">
              <input type="text" class="form-control" v-model="persona.nombre" placeholder="Nombres" required="true">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="paterno" class="col-6 col-form-label">A. Paterno.</label>
            <div class="col-6">
              <input type="text" class="form-control" v-model="persona.paterno" placeholder="Apellido Paterno">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="materno" class="col-6 col-form-label">A. Materno.</label>
            <div class="col-6">
              <input type="text" class="form-control" v-model="persona.materno" placeholder="Apellido Materno">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="fecha" class="col-6 col-form-label">
              <p>Fecha de Nacimiento.</p>
            </label>
            <div class="col-6">
              <input type="date" class="form-control" v-model="persona.fecha" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="sexo" class="col-6 col-form-label">
              <p>Sexo</p>
            </label>
            <div class="col-6">
              <select class="form-control" v-model="persona.sexo" required="true">
                <option>Seleccionar Sexo</option>
                <option value="1">Femenino</option>
                <option value="2">Masculino</option>
              </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="celular" class="col-6 col-form-label">
              <p>Celular.</p>
            </label>
            <div class="col-6">
              <input type="text" class="form-control" v-model="persona.cel" placeholder="Numero de Celular" @input="validarCelular()" @keyup="botonesFuncion()" required="true">
              <p v-if="errorpersona.cel" style="color: green;">{{ errorCelular }}</p>
              <p v-else style="color: red;">{{ errorCelular }}</p>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="correo" class="col-6 col-form-label">
              <p>E-mail.</p>
            </label>
            <div class="col-6">
              <input type="email" class="form-control" v-model="persona.correo" placeholder="Correo Electronico" @input="validarCorreo()" @keyup="botonesFuncion()" required="true">
              <p v-if="errorpersona.correo" style="color: green;">{{ errorCorreo }}</p>
              <p v-else style="color: red;">{{ errorCorreo }}</p>
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalCiudadano(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <button v-if="botones" class="btn btn-success font" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</button>
    </CModalFooter>
  </form>
</CModal>
<!-- End Modal  Ciudadano-->
</template>

<script>

//Importamos Servicios
import PersonaService from '@/modules/egovf/services/personaService';
import EgovfService from '@/modules/egovf/services/egovfService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ListaView',
    components:{

    },
    data(){
        return {
          titulo:'Lista de Ciudadanos',
          modalCiudadano:false,
          personaService:null,
          egovfService:null,
          listaCiudadanos:[],
          registro:[],
          listaUnidad:[],
          botones:false,
          usuario:{
            token:'',
            cif:'',
            correo:'',
            celular:'',
            pass:'',
            unidad:'',
            sigla:''
          },
          persona:{
            cif:0,
            ci:'',
            complemento:'Seleccionar Region Expedida',
            nombre:'',
            paterno:'',
            materno:'',
            fecha:'',
            sexo:'Seleccionar Sexo',
            cel:'',
            correo:''
          },
          errorCI: "",
          errorCorreo:"",
          errorCelular:"",
          errorpersona:{
            ci:false,
            complemento:false,
            cel:false,
            correo:false
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
      this.personaService = new PersonaService();
    },
    mounted(){
      this.getDatos(); // Llamamos los datos del Usuario
      this.getListarCiudadano(); // Funcion que debuelve una lista de ciudadanos 
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
            this.personaService.headersUsuario(this.usuario.token);
        }
      },
      async getListarCiudadano(){ // Funcion que crea una lista de Ciudadanos 
        await this.egovfService.getListaCiudadano().then(response => {
          this.listaCiudadanos = response.data;
          this.tabla();
        });
      },
      perfil(cifAux){
        this.$router.push({
          name: 'PerfilCiudadanoView',
          params:{
            cifCiudadano: cifAux
          }
        });
      },
      registrarCiudadano(){ // funcion para el registro de un ciudadano
        this.personaFalse();
        this.$swal.fire({
          title: 'Desea Registrar al Ciudadano',
          icon:'info',
          showDenyButton: true,
          confirmButtonText: 'Registrar',
          denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.personaService.addPersona(this.persona).then(response =>{
                console.log(response);
                
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
      validarCI() {
        const personaEncontrada = this.listaCiudadanos.find(
          (persona) => (persona.ci_com).toString() === this.persona.ci
        );
        if (personaEncontrada) {
          this.errorCI = "La Cédula de identidad ya Existe, revise en el sistema."; // Cédula válida
          this.errorpersona.ci=false;
        } else {
          this.errorCI = "La Cédula de Identidad es valida";
          this.errorpersona.ci=true;
        }
      },
      validarCelular() {
        const personaEncontrada = this.listaCiudadanos.find(
          (persona) => persona.celular === this.persona.cel
        );
        if (personaEncontrada) {
          this.errorCelular = "El Numero de Celular ya existe, verifique su estado en el sistema"; // Cédula válida
          this.errorpersona.cel=false;
        } else {
          this.errorCelular = "El Numero de Celular es valido";
          this.errorpersona.cel=true;
        }
      },
      validarCorreo() {
        const personaEncontrada = this.listaCiudadanos.find(
          (persona) => persona.correo === this.persona.correo
        );
        if (personaEncontrada) {
          this.errorCorreo = "El correo Electronico ya existe ingrese otro o verifique su existencia en el sistema."; // Cédula válida
          this.errorpersona.correo=false;
        } else {
          this.errorCorreo = "Correo electronico Valido";
          this.errorpersona.correo=true;
        }
      },
      personaFalse(){
        this.errorpersona.ci=false;
        this.errorpersona.complemento=false;
        this.errorpersona.cel=false;
        this.errorpersona.correo=false;
      },
      clickModalCiudadano(ciudadano){//funcion para Visibilisar el modal
        this.modalCiudadano = ciudadano;
      },
      botonesFuncion(){// Funcion que habilita los botnes para la actualizacion del pass
        if((this.errorpersona.ci) && (this.errorpersona.cel) && (this.errorpersona.correo))
          this.botones=true;
        else
          this.botones=false;
      }
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>