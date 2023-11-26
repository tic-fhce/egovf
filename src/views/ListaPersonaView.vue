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
                  <h3>Ciudadanos e-GOVF</h3>
                </div>
                <div class="col-md-6 text-end">
                  <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Opciones de los Ciudadanos</button>
                    <div class="dropdown-menu">
                      <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#personamodal">Agregar Ciudadano</a>
                      <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#obsModalAll">Agregar Observaciones</a>
                      <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#recordModal">Extraer Record</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="col-ms-12">
                <div class="table-responsive">
                  <table id="personaTabla" class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th><th>CIF</th><th>Datos</th><th>Contacto</th><th>Unidad</th><th>Operaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ciudadano in listaCiudadanos" :key="ciudadano.id">
                        <th scope="row">{{ciudadano.id}}</th>
                        <td>{{ciudadano._01cif}}</td>
                        <td>{{ciudadano._04nombre}} {{ciudadano._05paterno}} {{ciudadano._06materno}}<br>
                        {{ciudadano._02ci}} {{ciudadano._03complemento}}
                        </td>
                        <td>{{ciudadano._10correo}} <br>{{ciudadano._09cel}}</td>
                        <td>{{ ciudadano._10sigla }}<br> {{ ciudadano._08unidad }}</td>
                        <td><button class="btn btn-success btn-block" @click="perfil(ciudadano._01cif)">Perfil</button></td>
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

<!-- Modal  Ciudadano-->
<div class="modal fade" id="personamodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Nuevo Ciudadano</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" @click="registrarPersona()">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Obserbasiones-->
<div class="modal fade" id="obsModalAll" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Observaciones de Asistencia a los Ciudadanos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Obs - Para</label>
            <div class="col-sm-8">
              <select class="form-control" v-model="obsall.cif">
                <option value="1">Administrativo</option>
                <option value="2">Docente / Aux</option>
              </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">UID - OBS</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="obsall.uidobs">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Fecha de Inicio</label>
            <div class="col-sm-8">
                <input type="date" class="form-control" v-model="obsall.fechainicio">
            </div>
        </div>
        
        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Fecha Fin</label>
            <div class="col-sm-8">
                <input type="date" class="form-control" v-model="obsall.fechafin">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Detalle</label>
            <div class="col-sm-8">
                <textarea class="form-control" v-model="obsall.detalle"></textarea>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Tipo</label>
            <div class="col-sm-8">
                <select class="form-control" v-model="obsall.tipo">
                    <option value="Entrada M.">Entrada Mañana</option>
                    <option value="Salida M.">Salida Mañana</option>
                    <option value="Entrada T.">Entrada Tarde</option>
                    <option value="Salida T.">Salida Tarde</option>
                    <option value="continuo">Continuo</option>
                    <option value="comision">Comisión</option>
                    <option value="permiso">Permiso</option>
                    <option value="asueto">Asueto</option>
                </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Hora</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="obsall.hora">
            </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addObsAll()">Agregar Observaciones</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Record-->
<div class="modal fade" id="recordModal" tabindex="-1" aria-labelledby="recordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Creacion de Record</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="mb-3 row">
            <label for="gestiones" class="col-sm-4 col-form-label">Gestion</label>
            <div class="col-sm-8">
              <select class="form-control" v-model="record.gestion">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Mes</label>
            <div class="col-sm-8">
              <select class="form-control" v-model="record.mes">
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-4 col-form-label">Record</label>
            <div class="col-sm-8">
              <select class="form-control" v-model="record.tipo">
                <option value="1">Administrativo</option>
                <option value="2">Docente / Aux</option>
              </select>
            </div>
        </div>

        

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="getRecord()">Crear Record</button>
      </div>
    </div>
  </div>
</div>

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
    name:'ListaPersonaView',
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
          personaService:null,
          biometricoService:null,
          unidadService:null,
          listaCiudadanos:[],
          registro:[],
          listaUnidad:[],
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
          persona:{
            cif:0,
            ci:'',
            complemento:'',
            nombre:'',
            paterno:'',
            materno:'',
            fecha:'',
            sexo:'',
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
          },
          obsall:{
            cif:null,
            uidobs:'',
            fechainicio:'',
            fechafin:'',
            detalle:'',
            tipo:'Seleccionar Tipo',
            hora:'08:30'
          },
          record:{
            gestion:2023,
            mes:0,
            tipo:0
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
    },
    mounted(){
      this.getDatos();
      this.getListaCiudadanos();
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#personaTabla').DataTable();
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

            this.personaService= new PersonaService();
            this.personaService.headersUsuario(this.usuario.token);
        }
      },
      async getListaCiudadanos(){
        await this.personaService.getListaCiudadanos().then(response => {
          this.listaCiudadanos = response.data;
          this.tabla();
        });
      },
      perfil(cifAux){
        this.$router.push({
          name: "perfilCiudadano",
          params:{
            cifCiudadano: cifAux,
          }
        });
      },
      registrarPersona(){

        // funcion para el registro de un ciudadano
        this.personaFalse();
        if(this.persona.ci=='' || this.persona.complemento=='' || this.persona.nombre=='' || this.persona.fecha=='' || this.persona.sexo=='' || this.persona.cel=='' || this.persona.correo==''){
          this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los siguientes datos son incorrectos o no fueron llenados apropiadamente, verifique e intente nuevamente.',
          });
          if(this.persona.ci=='')
            this.errorpersona.ci=true;
          if(this.persona.complemento=='')
            this.errorpersona.complemento=true;
          if(this.persona.nombre=='')
            this.errorpersona.nombre=true;
          if(this.persona.fecha=='')
            this.errorpersona.fecha=true;
          if(this.persona.sexo=='')
            this.errorpersona.sexo=true;
          if(this.persona.cel=='' || this.persona.cel.length<7){
            this.errorpersona.cel=true;
          }
          if(this.persona.correo=='' || !this.persona.correo.includes('@')){
            this.errorpersona.correo=true;
          }
        }
        else{
          this.personaFalse();
          this.$swal.fire({
            title: 'Desea Registrar al Ciudadano',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: 'Cancelar'}).then((result) => {
            if (result.isConfirmed) {
              this.personaService.addPersona(this.persona).then(response=>{
                this.registro=response.data;
                var suma=this.registro[0]+this.registro[1]+this.registro[2];
                if(suma >0){
                  if(this.registro[0]==1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Cedula de Identidad ingresada ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente .'
                    });
                  }
                  if(this.registro[1]==1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Correo Electronico ingresado ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente.'
                    });
                  }
                  if(this.registro[2]==1){
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'La Numero de Celular ingresado ya existe, y le pertenece a otro ciudadano, verifique los datos e intente nuevamente .'
                    });
                  }
                }
                else{
                  if(response.status==200){
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
      async addObsAll(){
        await this.$swal.fire({
                title: 'Desea agregar las Observaciones de Asistencia a los Ciudadanos ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.addObsAll(this.obsall).then(response=>{
                        console.log(response.status);
                        if(response.status==200){
                            this.$swal.fire('Las Observaciones fueron Agregados a los Ciudadanos Corectamente', '', 'success');
                        }
                        else{
                            this.$swal.fire('Las Observaciones no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
      },
      getRecord(){
        this.$router.push({
          name: "record",
          params:{
            gestion: this.record.gestion,
            mes:this.record.mes,
            tipo:this.record.tipo
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