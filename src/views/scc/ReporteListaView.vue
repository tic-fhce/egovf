<template>
  <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />

  <div class="container">
      <div class="row margen">
      </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="card col-md-12">
        <div class="row">
          <div class="card-header headercolor">
            <div class="row text-center">
                <h3>Personal {{ titulo }}</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="col-ms-12">
              <div class="table-responsive">
                <table id="personalTabla" class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th><th>CIF</th><th>Datos</th><th>Contacto</th><th>Unidad</th><th>Operaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="person in listaPersonal" :key="person.id">
                      <th scope="row">{{person.id}}</th>
                      <td>{{person.cif}}</td>
                      <td>{{person.nombre}}<br>
                      {{person.ci}} 
                      </td>
                      <td>{{ person.correo}}<br>{{person.celular}}</td>
                      <td>{{ person.sigla }}<br>{{ person.unidad }}</td>
                      <td><button class="btn btn-success btn-block" @click="personalBiometrico(person.cif)">Reporte</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ComponenteFooterVue/>

</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import PersonaService from '@/services/personaService';
import BiometricoService from '@/services/biometricoService';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
  name:'ReporteListaView',
  components:{
      ComponenteMenuVue,
      ComponenteFooterVue
  },
  data(){
      return {
        tipo:0,
        titulo:'',
        personaService:null,
        biometricoService:null,
        listaCiudadanos:[],
        listaBiometrico:[],
        listaPersonal:null,
        usuario:{
          token:'',
          cif:'',
          correo:'',
          celular:'',
          pass:'',
          menu:[],
          unidad:'',
          sigla:''
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
    this.personaService= new PersonaService();
  },
  mounted(){
    this.tipo = this.$route.params.tipo;
    if(this.tipo==1){
      this.titulo='Administrativo'
    }
    if(this.tipo==2){
      this.titulo='Docente'
    }
    if(this.tipo==3){
      this.titulo='Auxiliar'
    }
    this.getDatos();
  },
  methods:{
    tabla(){
      this.$nextTick(()=>{
        $('#personalTabla').DataTable();
      });
    },
    getDatos(){
      if(this.$cookies.get('cif')!=null){
          this.usuario.token=this.$cookies.get('token');
          this.usuario.cif=this.$cookies.get('cif');
          this.usuario.correo=this.$cookies.get('correo');
          this.usuario.celular=this.$cookies.get('celular');
          this.usuario.pass=this.$cookies.get('pass');
          this.usuario.menu=this.$cookies.get('menu');
          this.usuario.unidad = this.$cookies.get('unidad');
          this.usuario.sigla = this.$cookies.get('sigla');

          this.personaService.headersUsuario(this.usuario.token);
          this.getListaPersonas();
      }
      else{
        this.$router.push('/');
      }
    },
    async getListaPersonas(){
      await this.personaService.getListaCiudadanos().then(response => {
          this.listaCiudadanos = response.data;
      });
      this.getListaPersonal();
    },
    // getListaPersonal contruye una lista con el los usuarios y los biometricos
    async getListaPersonal(){
      // traemos la lista de ciudadanos registrados en el biometrico de acuerdo al tipo
      await this.biometricoService.getLBiometricoTipo(this.tipo).then(response =>{
        this.listaBiometrico=response.data;
      });

      var auxid=1;
      this.listaPersonal=[];
      this.listaBiometrico.forEach(cif => {
        this.listaCiudadanos.forEach(persona => {
          var biometrico={
            id:0,
            cif:0,
            ci:'',
            nombre:'',
            celular:'',
            correo:'',
            sigla:'',
            unidad:''
          };
          if(persona._01cif == cif._03cif){
            biometrico.id=auxid;
            biometrico.cif=persona._01cif;
            biometrico.ci=persona._02ci+' '+persona._03complemento;
            biometrico.nombre=persona._04nombre+' '+persona._05paterno+' '+persona._06materno;
            biometrico.celular=persona._09cel;
            biometrico.correo=persona._10correo;
            biometrico.sigla=persona._10sigla;
            biometrico.unidad=persona._08unidad;
            auxid=auxid+1;
            this.listaPersonal.push(biometrico);
            return false;
          }
          return true;
        });
      });
      this.tabla();
    },
    personalBiometrico(cifAux){
      this.$router.push({
        name: "moduloscc",
        params:{
          cifCiudadano: cifAux,
        }
      });
    }
  }
}
</script>
<style scoped>
@import 'datatables.net-dt';
.margen{
  margin-top: 100px;
}
</style>