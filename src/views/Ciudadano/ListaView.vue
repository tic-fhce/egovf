<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6">{{ titulo }}</CCol>
                        <CCol :lg="6" class="text-end">
                            <CButton @click="clickModalCiudadano(true)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
                        </CCol>
                    </CRow>
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
    <CModalHeader class="headercolor" dismiss @close="clickModalCiudadano(false)">
        <CModalTitle>
            <h5>Agregar Nuevo Ciudadano</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        
        <div class="mb-3 row">
            <label for="ci" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.ci==false"> Celulda de Identidad.</p>
              <p class="text-danger" v-if="errorpersona.ci"> Celulda de Identidad.</p>
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="persona.ci" placeholder="Cedula de Identidad" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="region" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.complemento==false">Region Exp.</p>
              <p class="text-danger" v-if="errorpersona.complemento"> Region Exp.</p>
            </label>
            <div class="col-sm-6">
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
            <label for="nombre" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.nombre==false">Nombres.</p>
              <p class="text-danger" v-if="errorpersona.nombre">Nombres.</p>
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="persona.nombre" placeholder="Nombres" required="true">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="paterno" class="col-sm-6 col-form-label">A. Paterno.</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="persona.paterno" placeholder="Apellido Paterno">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="materno" class="col-sm-6 col-form-label">A. Materno.</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="persona.materno" placeholder="Apellido Materno">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="fecha" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.fecha==false">Fecha de Nacimiento.</p>
              <p class="text-danger" v-if="errorpersona.fecha">Fecha de Nacimiento.</p>
            </label>
            <div class="col-sm-6">
              <input type="date" class="form-control" v-model="persona.fecha" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="sexo" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.sexo==false">Sexo</p>
              <p class="text-danger" v-if="errorpersona.sexo">Sexo</p>
            </label>
            <div class="col-sm-6">
              <select class="form-control" v-model="persona.sexo" required="true">
                <option>Seleccionar Sexo</option>
                <option value="1">Femenino</option>
                <option value="2">Masculino</option>
              </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.cel==false">Celular.</p>
              <p class="text-danger" v-if="errorpersona.cel">Celular.</p>
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="persona.cel" placeholder="Numero de Celular" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="correo" class="col-sm-6 col-form-label">
              <p v-if="errorpersona.correo==false">E-mail.</p>
              <p class="text-danger" v-if="errorpersona.correo">E-mail.</p>
            </label>
            <div class="col-sm-6">
              <input type="email" class="form-control" v-model="persona.correo" placeholder="Correo Electronico" required="true">
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalCiudadano(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="registrarCiudadano()" color="success" class="font"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal  Ciudadano-->
</template>

<script>

//Importamos Servicios
import PersonaService from '@/services/personaService';
import BiometricoService from '@/services/biometricoService';
import EgovfService from '@/services/egovf/egovfService';

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
          biometricoService:null,
          egovfService:null,
          listaCiudadanos:[],
          registro:[],
          listaUnidad:[],
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
          errorpersona:{
            ci:false,
            complemento:false,
            nombre:false,
            paterno:false,
            materno:false,
            fecha:false,
            sexo:false,
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
      this.biometricoService = new BiometricoService();
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

            this.egovfService.headersUsuario(this.usuario.token);
            this.personaService.headersUsuario(this.usuario.token);
        }
      },
      async getListarCiudadano(){ // Funcion que crea una lista de Ciudadanos 
        await this.egovfService.getListarCiudadano().then(response => {
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
        if(this.persona.ci == '' || this.persona.complemento == 'Seleccionar Region Expedida' || this.persona.nombre == '' || this.persona.fecha == '' || this.persona.sexo == 'Seleccionar Sexo' || this.persona.cel == '' || this.persona.correo == ''){
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Los siguientes datos son incorrectos o no fueron llenados apropiadamente, verifique e intente nuevamente.',
          });
          
          if(this.persona.ci == '')
            this.errorpersona.ci = true;
          if(this.persona.complemento == 'Seleccionar Region Expedida')
            this.errorpersona.complemento = true;
          if(this.persona.nombre == '')
            this.errorpersona.nombre = true;
          if(this.persona.fecha == '')
            this.errorpersona.fecha = true;
          if(this.persona.sexo == 'Seleccionar Sexo')
            this.errorpersona.sexo = true;
          if(this.persona.cel == '' || this.persona.cel.length < 7)
            this.errorpersona.cel = true;
          if(this.persona.correo == '' || !this.persona.correo.includes('@'))
            this.errorpersona.correo = true;
        }
        else{
          this.personaFalse();
          this.$swal.fire({
            title: 'Desea Registrar al Ciudadano',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.personaService.addPersona(this.persona).then(response =>{
                this.registro = response.data;
                var suma = this.registro[0]+this.registro[1]+this.registro[2];
                if(suma >0){
                  if(this.registro[0] == 1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Cedula de Identidad ingresada ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente .'
                    });
                  }
                  if(this.registro[1] == 1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Correo Electronico ingresado ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente.'
                    });
                  }
                  if(this.registro[2] == 1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Numero de Celular ingresado ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente .'
                    });
                  }
                }
                else{
                  if(response.status == 200){
                    this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
                      if(result)
                        location.reload();
                    });
                  }
                  else{
                    this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                  }
                }
              });
            } else if (result.isDenied) {
              this.$swal.fire('Datos Cancelados', '', 'info');
            }
          });
        }
      },
      personaFalse(){
        this.errorpersona.ci=false,
        this.errorpersona.complemento=false,
        this.errorpersona.nombre=false,
        this.errorpersona.paterno=false,
        this.errorpersona.materno=false,
        this.errorpersona.fecha=false,
        this.errorpersona.sexo=false,
        this.errorpersona.cel=false,
        this.errorpersona.correo=false
      },
      clickModalCiudadano(ciudadano){//funcion para Visibilisar el modal
        this.modalCiudadano = ciudadano;
      }
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>