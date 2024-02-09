<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <!--Cabecera del Modulo empleados-->
                <div class="card-header headercolor">
                    <div class="row">

                        <nav class="navbar navbar-expand-lg navbar-dark">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="#">Modulos Del Empleado</a> 

                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#memp" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div v-if="verificado > 0" class="collapse navbar-collapse" id="memp">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Opciones
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#moduloModal">Agregar Modulo</a></li>
                                                <li><hr class="dropdown-divider"></li>
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#contratoModal">Agregar Contrato</a></li>
                                                
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <!--End Cabecera del Modulo empleados-->

                <div class="card-body">
                    <div class="row">
                        <!-- Datos del Empleado-->
                        <div class="col-md-12 table-responsive">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Tipo : {{ empleado.empleado }}</td>
                                        <td>Ingreso : {{ empleado.fecha }}</td>
                                        <td>Salida : {{ empleado.salida }}</td>
                                        <td>Estado :
                                            <button v-if="empleado.estado==1" class="badge bg-success" style="width: 6rem;" >Activo</button>
                                            <button v-else class="badge bg-danger" style="width: 6rem;">Inactivo</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Datos del Empleado-->

                        <!-- Verificador del modulo de Empleados-->
                        <div v-if="verificado === 0" class="col-md-12 text-center">
                            <div class="card">
                                <div class="card-header headercolor">
                                    Verificar Modulo Emp
                                </div>
                                <div class="card-body">
                                    <div class="mb-3 row">
                                        <label for="datos" class="col-sm-6 col-form-label">Tipo de Empleado</label>
                                        <div class="col-sm-6">
                                            <select v-model="id_tipoEmpleado" class="form-control">
                                                <option v-for="lte in listaTipoEmpleado" :value="lte.id" :key="lte.id">{{lte._01detalle}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-success" @click="addEmpleado()">Verificar Modulo</button>
                                </div>
                            </div>
                        </div>
                        <!-- End Verificador del modulo de Empleados-->

                        <!-- Modulos del Empleado-->
                        <div class="col-md-12">
                            <div class="col-md-2 text-center espace" v-for="l in listaModuloCif" :key="l.id">
                                <div class="card">
                                    <div class="card-header headercolor">{{ l._01nombre }}</div>
                                    <div class="card-body">
                                        <img src="../assets/reporte.jpg" class="tam">
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn btn-success" @click="getModulo(l._02ruta)">{{ l._01nombre}}</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <!-- End Modulos del Empleado-->

                        <!-- Contratos del Empleado-->
                        <div class="col-md-12 table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th><th>N° Contrato</th><th>Fechas</th><th>Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="contrato in contratos" :key="contrato.id">
                                        <td>{{ contrato.id }}</td>
                                        <td>
                                            {{ contrato.numeroContrato}}<br>
                                            {{ contrato.servicio }}<br>
                                            {{ contrato.unidad }}
                                        </td>
                                        <td>
                                            <strong>Fecha Inicio: </strong>{{ contrato.inicio }}<br>
                                            <strong>Fecha Fin: </strong> {{ contrato.fin }}<br>
                                            <strong>Gestion: </strong>{{ contrato.gestion }}
                                        </td>
                                        <td>{{ contrato.detalle }}</td>
                                    </tr>
                                            
                                </tbody>
                                <tfoot>
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                        <!--End Contratos del Empleado-->
                    </div>
                </div><!--End Card Body-->
            </div>
        </div>
    </div>

<!-- Modal  Modulos-->
<div class="modal fade" id="moduloModal" tabindex="-1" aria-labelledby="moduloModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Modulos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Modulo</label>
            <div class="col-sm-6">
                <select v-model="id_modulo" class="form-control">
                    <option v-for="lm in listaModulo" :value="lm.id" :key="lm.id">{{lm._01nombre}}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addEmpleadoModulo()">Agregar Modulo </button>
      </div>
    </div>
  </div>
</div>
<!--END Modal Modulos-->

<!-- Modal  Contrato-->
<div class="modal fade" id="contratoModal" tabindex="-1" aria-labelledby="moduloModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Contrato</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">
            <label for="numero" class="col-sm-6 col-form-label">Numero de Contrato</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="contrato.numerocontrato" placeholder="Numero de contrato" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="servicio" class="col-sm-6 col-form-label">Servicios prestados</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="contrato.servicio" placeholder="Servicios Prestados" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Unidad </label>
            <div class="col-sm-6">
                <select v-model="contrato.unidad" class="form-control">
                    <option v-for="unidad in listaUnidades" :value="unidad._01unidad" :key="unidad.id">{{unidad._01unidad}}</option>
                </select>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="inicio" class="col-sm-6 col-form-label">Fecha de Inicio</label>
            <div class="col-sm-6">
                <input type="date" class="form-control" v-model="contrato.inicio" placeholder="Inicio" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="fin" class="col-sm-6 col-form-label">Fecha de Conclucion </label>
            <div class="col-sm-6">
                <input type="date" class="form-control" v-model="contrato.fin" placeholder="fin" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="detalle" class="col-sm-6 col-form-label">Detalle</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="contrato.detalle" placeholder="Detalle del Contrato" required="true">
            </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addContrato()">Agregar Contrato </button>
      </div>
    </div>
  </div>
</div>
<!--END Modal Contrato-->


</template>

<script>
// Declaramos los Servicios
import UsuarioService from '@/services/usuarioServices';
import EmpleadoService from '@/services/emp/empleadoService';
import UnidadService from '@/services/unidadService';

// End

export default {
    name:'ComponenteMEmpVue',
    props:['emp'],
    data(){
        return{
            empleadoService:null,
            unidadService:null,
            usuarioService:null,
            verificado:0,
            listaModulo:[],
            listaModuloCif:[],
            listaTipoEmpleado:[],
            listaUnidades:[],
            id_modulo:0,
            id_tipoEmpleado:0,
            contratos:[],
            getPB:true,
            empleado:{
                id:0,
                cif:0,
                empleado:'',
                tipoempleado_id:0,
                fecha:'',
                estado:0,
                salida:'',
                contratos:[]
            },
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
            empleado_modulo:{
                cif:0,
                id_modulo:0
            },
            contrato:{
                cif:0,
                id:0,
                numerocontrato:'',
                servicio:'',
                unidad:'',
                inicio:'',
                fin:'',
                gestion:0,
                detalle:''
            },
            unidad:{
                id:0,
                unidad:'',
                dependencia:'',
                sigla:''
            },
            egovf:{
                idPersona:0,
                nombre:'',
                paterno:'',
                materno:'',
                fecha:'',
                sexo:0,
                idUsuario:0,
                cif:0,
                matricula:0,
                ci:'',
                ci_com:0,
                complemento:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                dependiente:'',
                sigla:'',
            }
        };
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.empleadoService = new EmpleadoService();
        this.unidadService = new UnidadService();
        this.usuarioService = new UsuarioService();
    },
    mounted(){
        this.getDatos();
        this.getListaTipoEmpleado();
        this.getListaUnidades();
    },
    updated(){
        this.egovf = this.emp;
        if(this.egovf.cif>0 && this.getPB)
        {
            this.getEmpleado();
            this.getListarEmpleadoModulo();
            this.getListarEmpleadoModuloCif();
            this.getPB=false;
        }
    },
    methods:{
        // Funcion par arecuperar informacion del Usuaario de las Cokkies
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
        //Funcion para listar las Undiades 
        async getListaUnidades(){
            await this.unidadService.getListaUnidad().then((response)=>{
                this.listaUnidades=response.data;
            });

        },
        //Funcion para listar Los Datos del empleado
        async getEmpleado(){
            await this.empleadoService.getEmpleado(this.egovf.cif).then((response)=>{
                this.empleado = response.data;
                this.verificado = this.empleado.id;
                this.contratos = this.empleado.contratos;
            });
        },
        // Funcion para listar El tipo de Empleado para la Verificacion
        async getListaTipoEmpleado(){
            await this.empleadoService.getListaTipoEmpleado().then((response)=>{
                this.listaTipoEmpleado = response.data;
            });
        },
        // Funcion para listar los Modulos para el Empleado
        async getListarEmpleadoModulo(){
            await this.empleadoService.getListarEmpleadoModulo(this.egovf.cif).then((response)=>{
                this.listaModulo=response.data;
            });
        },
        // Funcion que lista los Modulos del Empleado
        async getListarEmpleadoModuloCif(){
            await this.empleadoService.getListarEmpleadoModuloCif(this.egovf.cif).then((response)=>{
                this.listaModuloCif=response.data;
            });
        },
        // Funcion para registrar al Empleado con el tipo de empleado
        async addEmpleado(){
            await this.$swal.fire({
                title: 'Desea Verificar el Modulo del Empleado ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.empleadoService.addEmpleado(this.egovf.cif,this.id_tipoEmpleado).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Se Verifico al tipo de empleado Corectamente', '', 'success').then((res)=>{
                                if(res)
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
        // Funcion para registrar al Empleado en un Modulo
        async addEmpleadoModulo(){
            this.empleado_modulo.cif=this.egovf.cif;
            this.empleado_modulo.id_modulo=this.id_modulo;
            await this.$swal.fire({
                title: 'Desea Agregar el Modulo al Empleado ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.empleadoService.addEmpleadoModulo(this.empleado_modulo).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('El Modulo fue Agregado al Empleado Corectamente', '', 'success').then((res)=>{
                                if(res)
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
        // Funcion para Agregar Un contrato Al empelado 
        async addContrato(){
            this.usuarioService.headersUsuario(this.usuario.token);
            this.listaUnidades.forEach(element => {
                if(element._01unidad == this.contrato.unidad){
                    this.unidad.id = element.id; 
                    this.unidad.unidad = element._01unidad;
                    this.unidad.dependiente = element._02dependiente;
                    this.unidad.sigla = element._03sigla;
                    return false;
                }
            });
            this.contrato.cif = this.egovf.cif;
            this.contrato.id = this.empleado.id;
            await this.$swal.fire({
                title: 'Desea Agregar Contrato al Empleado ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.empleadoService.addContrato(this.contrato).then(response=>{
                        if(response.status == 200){
                            this.usuarioService.updateUnidad(this.egovf,this.unidad).then((respon)=>{
                                if(respon.status == 200){
                                    this.unidadService.registrarPertenece(this.egovf,this.unidad).then((res)=>{
                                        if(res.status == 200){
                                            this.$swal.fire('El Comtrato fue Agregado al Empleado Corectamente', '', 'success').then((r)=>{
                                                if(r)
                                                    location.reload();
                                            });
                                        }
                                        else{
                                            this.$swal.fire('Los Datos de Unidad no fueron Guardados Error'+ response.status, '', 'error');
                                        }

                                    });

                                }
                                else{
                                    this.$swal.fire('Los Datos del Usuario No fueron Actualizados'+ response.status, '', 'error');
                                }

                            });
                            
                        }
                        else{
                            this.$swal.fire('Los Datos del Contrato no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });           
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        // Funcion para ingresar a otros modulos del Empleado
        getModulo(ruta){
            this.$router.push({
                name: ruta,
                params:{
                    cifCiudadano: this.egovf.cif,
                }
            });
        }
    }
}
</script>

<style scoped>
.material-icons{
    
    color: white;
    font-size: 1em;
    border-top: 0ch;
    border-bottom: 0ch;
}
</style>