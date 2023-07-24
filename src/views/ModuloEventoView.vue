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
                  <h3>Eventos e-GOVF</h3>
                </div>
                <div class="col-md-6 align-self-end text-end">
                  <button class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target=#eventomodal><span class="material-icons">&#xe145;</span>Crear Evento</button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="col-ms-12">
                <div class="table-responsive">
                  <table id="eventoTabla" class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th><th>Cite</th><th>Fecha</th><th>Estado</th><th></th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="evento in listaEvento" :key="evento.id">
                        <th scope="row">{{evento.id}}</th>
                        <td>{{evento._02cite}}</td>
                        <td>{{evento._04fecha_reserva}}</td>
                        <td>{{evento._13estado}}</td>
                        <td>hola</td>
                        <td>hola</td>
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

<!-- Modal  Evento-->
<div class="modal fade" id="eventomodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Reservar Ambiente para Evento</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="ambiente" class="col-sm-2 col-form-label">
              <p v-if="errorevento.ambiente==false">Ambiente.</p>
              <p class="text-danger" v-if="errorevento.ambiente">Ambiente.</p>
            </label>
            <div class="col-sm-10">
              <select v-model="evento.ambiente" class="form-control">
                <option v-for="lista in listaAmbiente" :value="lista.id" :key="lista.id">{{lista.nombre}}</option>
              </select>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="referencia" class="col-sm-2 col-form-label">
              <p v-if="errorevento.referencia==false">Referencia.</p>
              <p class="text-danger" v-if="errorevento.referencia">Referencia.</p>
            </label>
            <div class="col-sm-10">
                <input type="text" class="form-control" v-model="evento.referencia" placeholder="Referencia" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="detalle" class="col-sm-2 col-form-label">
              <p v-if="errorevento.referencia==false">Detalle.</p>
              <p class="text-danger" v-if="errorevento.referencia">Detalle.</p>
            </label>
            <div class="col-sm-10">
                <textarea  cols="30" rows="5" class="form-control" v-model="evento.detalle"></textarea>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="fecha" class="col-sm-2 col-form-label">
              <p v-if="errorevento.referencia==false">Fecha.</p>
              <p class="text-danger" v-if="errorevento.referencia">Fecha.</p>
            </label>
            <div class="col-sm-3">
              <input type="date" class="form-control" v-model="evento.fecha" required="true">
            </div>
            <div class="col-sm-7">
              <div class="alert alert-warning"></div>
            </div>

        </div>

        <div class="mb-3 row">
          <label for="fecha" class="col-sm-2 col-form-label">
              <p v-if="errorevento.referencia==false">A Horas.</p>
              <p class="text-danger" v-if="errorevento.referencia">A Horas.</p>
            </label>
            <div class="col-sm-2">
              <input type="time" class="form-control" v-model="evento.horai" required="true">
            </div>
            <label for="fecha" class="col-sm-1 col-form-label">
              <p v-if="errorevento.referencia==false">Hasta.</p>
              <p class="text-danger" v-if="errorevento.referencia">Hasta. </p>
            </label>
            <div class="col-sm-2">
              <input type="time" class="form-control" v-model="evento.horaf" required="true">
            </div>
        </div>

        <div class="mb-3 row">
          <div class="col-sm-12 text-center">
            <h3>Requerimientos</h3>
          </div>
        </div>
        <div class="mb-3 row">
            <div class="col-sm-3">
              <div class="form-check">
                <input type="radio" class="form-check-input" name="micro" id="r1"><label for="r1" class="form-check-label"> 1 Microfono</label>
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" name="micro" id="r2"><label for="r2" class="form-check-label"> 2 Microfonos</label>
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" name="micro" id="r3"><label for="r3" class="form-check-label"> 3 Microfonos</label>
              </div>
            </div>
            <div class="col-sm-9">
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check1"><label for="check1" class="form-check-label"> </label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check2"><label for="check2" class="form-check-label"> Proyector (Precentacion de Diapositivas)</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check3"><label for="check3" class="form-check-label"> Proyector (Presentacion de Videos Peliculas, Cortos, etc.)</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check4"><label for="check4" class="form-check-label"> Red de comunicacion Facultativa (Transmicion en Redes Solciales).</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check5"><label for="check5" class="form-check-label"> Internet (Lap Top Organizadores del Evento).</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check6"><label for="check6" class="form-check-label"> WIFI (Costo Unico)</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  id="check6"><label for="check6" class="form-check-label"> Video Conferencia (Google Meet)</label>
              </div>
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
import EventoService from '@/services/eventoService';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ModuloEventoView',
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
          eventoService:null,
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
          evento:{
            cif:0,
            cite:0,
            referencia:'',
            fecha:'',
            horai:'09:00',
            horaf:'15:00',
            detalle:'',
            ambiente:0,
            sking:''
          },
          errorevento:{
            referencia:false,
            fecha:false,
            horai:false,
            horaf:false,
            detalle:false,
            ambiente:false,
            sking:false
          },
          listaEvento:[],
          listaAmbiente:[]
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
      this.eventoService= new EventoService();
    },
    mounted(){
      this.getDatosEvento();
      this.getListaEvento();
      this.getListaAmbiente();
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#eventoTabla').DataTable();
        });
      },
      getDatosEvento(){
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
      async getListaEvento(){
        await this.eventoService.getListaEvento().then(response => {
            this.listaEvento = response.data;
            this.tabla();
        });
      },
      async getListaAmbiente(){
        await this.eventoService.getListaAmbiente().then(response => {
            this.listaAmbiente = response.data;
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
      eventoFalse(){
        this.errorevento.cif=false,
        this.errorevento.cite=false,
        this.errorevento.referencia=false,
        this.errorevento.fecha=false,
        this.errorevento.horai=false,
        this.errorevento.horaf=false,
        this.errorevento.detalle=false,
        this.errorevento.ambiente=false,
        this.errorevento.sking=false
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