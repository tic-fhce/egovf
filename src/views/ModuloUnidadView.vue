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
                <div class="col-md-6">
                  <h3>Unidades Academicas e-GOVF</h3>
                </div>
                <div class="col-md-6 align-self-end text-end">
                  <button class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target=#unidadmodal><span class="material-icons">&#xe145;</span>Unidad</button>
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

<!-- Modal  Unidad-->
<div class="modal fade" id="unidadmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Nueva Undiad</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="unidad" class="col-sm-6 col-form-label">
              <p v-if="errorunidad.unidad==false">Unidad.</p>
              <p class="text-danger" v-if="errorunidad.unidad">Unidad.</p>
            </label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="unidad.unidad" placeholder="Unidad Facultativa" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="dependiente" class="col-sm-6 col-form-label">
              <p v-if="errorunidad.dependiente==false">Unidad de Dependencia.</p>
              <p class="text-danger" v-if="errorunidad.dependiente">Unidad de Dependencia</p>
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="unidad.dependiente" placeholder="Unidad De Dependencia" required="true">
            </div>
        </div>

        <div class="mb-3 row">
          <label for="sigla" class="col-sm-6 col-form-label">
            <p v-if="errorunidad.sigla==false">Sigla.</p>
            <p class="text-danger" v-if="errorunidad.sigla">Sigla.</p>
          </label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="unidad.sigla" placeholder="Sigla de la Unidad" required="true">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="telefono" class="col-sm-6 col-form-label">
            <p v-if="errorunidad.telefono==false">Telefono.</p>
            <p class="text-danger" v-if="errorunidad.telefono">Telefono.</p>
          </label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="unidad.telefono" placeholder="Telefono de la Unidad" required="true">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="correo" class="col-sm-6 col-form-label">
            <p v-if="errorunidad.correo==false">Correo.</p>
            <p class="text-danger" v-if="errorunidad.correo">Correo.</p>
          </label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="unidad.correo" placeholder="Correo de la Unidad" required="true">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" @click="registrarUnidad()">Guardar</button>
      </div>
    </div>
  </div>
</div>
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
    name:'ModuloUnidadView',
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
          unidad:{
            unidad:'',
            dependiente:'',
            sigla:'',
            telefono:'',
            correo:''
          },
          errorunidad:{
            unidad:false,
            dependiente:false,
            sigla:false,
            telefono:false,
            correo:false,
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
      },
      registrarUnidad(){
        // funcion para el registro de una unidad
        this.unidadFalse();
        if(this.unidad.unidad == '' || this.unidad.dependiente == '' || this.unidad.sigla == '' || this.unidad.telefono == '' || this.unidad.correo == ''){
          this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los siguientes datos son incorrectos o no fueron llenados apropiadamente, verifique e intente nuevamente.',
          });
          if(this.unidad.unidad == '')
            this.errorunidad.unidad = true;
          if(this.unidad.dependiente == '')
            this.errorunidad.dependiente = true;
          if(this.unidad.sigla == '')
            this.errorunidad.sigla = true;
          if(this.unidad.telefono == '')
            this.errorunidad.telefono=true;
          if(this.unidad.correo == '')
            this.errorunidad.correo = true;
        }
        else{
          this.unidadFalse();
          this.$swal.fire({
            title: 'Desea Registrar La Unidad',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.unidadService.registrarUnidad(this.unidad).then(response=>{
                if(response.status==200){
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
        }
      },
      unidadFalse(){
        this.errorunidad.unidad=false,
        this.errorunidad.dependiente=false,
        this.errorunidad.sigla=false,
        this.errorunidad.telefono=false,
        this.errorunidad.correo=false
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