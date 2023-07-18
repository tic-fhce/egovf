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
              <div class="row">
                <div class="col-md-12 text-center">
                  <h3>Unidades Academicas e-GOVF</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="col-ms-12">
                <div class="table-responsive">
                  <table id="unidadTabla" class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th><th>Unidad</th><th>Dependiente</th><th>Sigla</th><th>Telefono</th><th>Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="unidad in listaUnidad" :key="unidad.id">
                        <th scope="row">{{unidad.id}}</th>
                        <td>{{unidad._01unidad}}</td>
                        <td>{{unidad._02dependiente}}</td>
                        <td>{{unidad._03sigla}}</td>
                        <td>{{unidad._04telefono}}</td>
                        <td>{{unidad._05correo}}</td>
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
import UnidadService from '@/services/unidadService';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ModuloUnidadUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
          unidadService:null,
          usuario:{
            token:'',
            cif:'',
            correo:'',
            celular:'',
            pass:'',
            menu:[],
            unidad:'',
            sigla:''
          },
          listaUnidad:[]
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
      this.unidadService= new UnidadService();
    },
    mounted(){
      this.getDatos();
      this.getListaUnidad();
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#unidadTabla').DataTable();
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
        }
      },
      async getListaUnidad(){
        await this.unidadService.getListaUnidad().then(response => {
            this.listaUnidad = response.data;
            this.tabla();
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
.color{
  background-color: brown;
}
.material-icons{
    
    color: white;
    font-size: 1em;
    border-top: 0ch;
    border-bottom: 0ch;
}
</style>