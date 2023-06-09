<template>
    <!--Inventario CPU-->
    <div class="row">
        <div class="card col-md-12">
            <div class="row">    
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Computadoras</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#agregarPcModal><span class="material-icons">&#xe145;</span>Agregar</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-hover" id="printMarcado">
                        <thead>
                            <tr>
                                <th>#</th><th>Codigo</th><th>CPU</th><th>Sistema Operativo</th><th>LAN</th><th>Obs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lpc in listapc" :key="lpc.id">
                                <td>{{ lpc.id }}</td><td>{{lpc._02codigo}}</td>
                                <td>Micro : {{ lpc._06micro }} - {{lpc._07micro_capacidad}}<br>
                                    RAM : {{ lpc._05capacidad }} - {{ lpc._04memorias }}<br>
                                    HHDD : {{ lpc._09disco }} <br>
                                    Fuente: {{ lpc._03fuente }}

                                </td>
                                <td>{{lpc._08sistema}}</td>
                                <td>IP : {{ lpc._10ip }} <br>
                                    DNS : {{ lpc._12dns }}<br>
                                    RED : {{lpc._13segmento}}<br>
                                    MAC : {{ lpc._11mac }}
                                </td>
                                <td>Tipo: {{lpc._15detalle}}<br>
                                    Cortapico: {{ lpc._14cortapico }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="card-footer"></div>                
            </div>
        </div>
    </div>
    <!--Inventario CPU-->

    <!--Inventario Monitores-->
    <br>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Perifericos Visuales</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#agregarMonitorModal><span class="material-icons">&#xe145;</span>Agregar</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-hover" id="printMarcado">
                        <thead>
                            <tr>
                                <th>#</th><th>Codigo</th><th>Marca</th><th>Dimenciones</th><th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lmonitor in listamonitor" :key="lmonitor.id">
                                <td>{{ lmonitor.id }}</td><td>{{lmonitor._02codigo}}</td><td>{{ lmonitor._03marca }}</td><td>{{ lmonitor._04pulgadas }}</td><td>{{ lmonitor._05tipo }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
    <!--Inventario Monitores -->

    <!--Inventario Impresoras-->
    <br>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">    
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Impresoras</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#agregarImpresoraModal><span class="material-icons">&#xe145;</span>Agregar</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-hover" id="printMarcado">
                        <thead>
                            <tr>
                                <th>#</th><th>Codigo</th><th>Marca</th><th>Modelo</th><th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="limpresora in listaimpresora" :key="limpresora.id">
                                <td>{{ limpresora.id }}</td><td>{{limpresora._02codigo}}</td><td>{{ limpresora._03marca }}</td><td>{{limpresora._04modelo}}</td><td>{{ limpresora._05detalle }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
    <!--Inventario Impresoras-->
            
    <!--Inventario Telefonos-->
    <br>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Telefonos</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#agregarTelefonoModal><span class="material-icons">&#xe145;</span>Agregar</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-hover" id="printMarcado">
                        <thead>
                            <tr>
                                <th>#</th><th>Codigo</th><th>Marca</th><th>IP</th><th>Numero</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ltelefono in listatelefono" :key="ltelefono.id">
                                <td>{{ltelefono.id}}</td><td>{{ltelefono._02codigo}}</td><td>{{ltelefono._03marca}}</td><td>{{ ltelefono._04ip }}</td><td>{{ ltelefono._05interno }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="card-footer"></div>
            </div>
            
        </div>
    </div>
    <!--Inventario Telefonos-->

<!-- Modal  Pc-->
<div class="modal fade" id="agregarPcModal" tabindex="-1" aria-labelledby="pcModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Computadora</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Codigo</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.codigo">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Fuente de Poder</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.fuente">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Memorias RAM</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.memoria">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Capacidad RAM</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.capacidadram">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Micro Procesador</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.micro">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Capacidad Micro Procesador</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.capacidadmicro">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Sistema Operativo</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="pc.sistema">
                    <option value="Windows XP">Windows XP</option>
                    <option value="Windows 7">Windows 7</option>
                    <option value="Windows Vista">Windows Vista</option>
                    <option value="Windows 8">Windows 8</option>
                    <option value="Windows 10">Windows 10</option>
                    <option value="Windows 11">Windows 11</option>
                    <option value="Linux">Linux</option>
                    <option value="Mac Os">Mac Os</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Capacidad Disco Duro</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.disco">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Direccion IP</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.ip">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">MAC ADDRESS</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.mac">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">DNS</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.dns">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Segmento de Red</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pc.segmento">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Cortapico</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="pc.cortapico">
                    <option value="Buen Estado">Buen Estado</option>
                    <option value="Estado Intermedio">Estado Intermedio</option>
                    <option value="Mal Estado">Mal Estado</option>
                    <option value="Reconstruido">Reconstruido</option>
                    <option value="Coneccion Directa">Coneccion Directa</option>
                </select>
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Tipo</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="pc.detalle">
                    <option value="PC">PC de Escritorio</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Only One">Only One</option>
                </select>
            </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addPc()">Agregar PC </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Monitor-->
<div class="modal fade" id="agregarMonitorModal" tabindex="-1" aria-labelledby="monitorModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Periferico Visual</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Codigo</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="monitor.codigo">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Marca</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="monitor.marca">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Tamaño</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="monitor.pulgadas">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Tipo de Periferico</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="monitor.tipo">
                    <option value="Monitor">Monitor</option>
                    <option value="TV">TV</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addMonitor()">Agregar </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Impresora-->
<div class="modal fade" id="agregarImpresoraModal" tabindex="-1" aria-labelledby="ImpresoraModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Impresora</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Codigo</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="impresora.codigo">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Marca</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="impresora.marca">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Modelo</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="impresora.modelo">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Detalle</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="impresora.detalle">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addImpresora()">Agregar Impresora </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  Telefono-->
<div class="modal fade" id="agregarTelefonoModal" tabindex="-1" aria-labelledby="TelefonoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Telefono</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Codigo</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="telefono.codigo">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Marca</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="telefono.marca">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">IP</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="telefono.ip">
            </div>
        </div>

        <div class="mb-3 row">    
            <label for="datos" class="col-sm-6 col-form-label">Numero</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="telefono.interno">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addTelefono()">Agregar Telefono </button>
      </div>
    </div>
  </div>
</div>


</template>

<script>
    import InventarioService from '@/services/inventarioService';
    export default{
        name:'ComponenteInventarioVue',
        props:['persona'],
        data(){
            return{
                inventarioService:null,
                getPB:true,
                listapc:[],
                listamonitor:[],
                listaimpresora:[],
                listatelefono:[],
                usuario:{
                    token:'',
                    cif:'',
                    correo:'',
                    celular:'',
                    pass:'',
                    menu:[]
                },
                pc:{
                    cif:0,
                    codigo:'',
                    fuente:'',
                    memoria:1,
                    capacidadram:0,
                    micro:'',
                    capacidadmicro:'',
                    sistema:'',
                    disco:'',
                    ip:'',
                    mac:'',
                    dns:'',
                    segmento:'',
                    cortapico:'',
                    detalle:''
                },
                monitor:{
                    cif:0,
                    codigo:'',
                    marca:'',
                    pulgadas:1,
                    tipo:''
                },
                impresora:{
                    cif:0,
                    codigo:'',
                    marca:'',
                    modelo:'',
                    detalle:''
                },
                telefono:{
                    cif:0,
                    codigo:'',
                    marca:'',
                    ip:'',
                    interno:''
                }
            }
        },
        created(){
            this.inventarioService=new InventarioService();
        },
        updated(){
            if(this.persona._01cif>0 && this.getPB)
            {
                this.getDatosMenu();
                this.getListarPc();
                this.getListarMonitor();
                this.getListarImpresora();
                this.getListarTelefono();
                this.getPB=false;
            }
        },
        methods:{
            async getDatosMenu(){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.menu=this.$cookies.get('menu');
            },
            async getListarPc(){
                await this.inventarioService.getListarPc(this.persona._01cif).then((response) =>{
                    this.listapc=response.data;
                });
            },
            async getListarMonitor(){
                await this.inventarioService.getListarMonitor(this.persona._01cif).then((response) =>{
                    this.listamonitor=response.data;
                });
            },
            async getListarImpresora(){
                await this.inventarioService.getListarImpresora(this.persona._01cif).then((response) =>{
                    this.listaimpresora=response.data;
                });
            },
            async getListarTelefono(){
                await this.inventarioService.getListarTelefono(this.persona._01cif).then((response) =>{
                    this.listatelefono=response.data;
                });
            },
            async addPc(){
                this.pc.cif=this.persona._01cif;
                await this.$swal.fire({
                    title : 'Desea Agregar la Computadora al Ciudadano ?',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.inventarioService.addPc(this.pc).then(response=>{
                            if(response.status==200){
                                this.$swal.fire('Equipo Agregado al Inventario Correctamente', '', 'success');
                                location.reload();
                            }
                            else{
                                this.$swal.fire('El Equipo No pudo ser Registrado  Error'+ response.status, '', 'error');
                            }
                        });
                        
                    } else if (result.isDenied) {
                        this.$swal.fire('Registro Cancelado', '', 'info');
                    }
                });
            },
            async addMonitor(){
                this.monitor.cif=this.persona._01cif;
                await this.$swal.fire({
                    title : 'Desea Agregar el Periferico Visual al Ciudadano ?',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.inventarioService.addMonitor(this.monitor).then(response=>{
                            if(response.status==200){
                                this.$swal.fire('Equipo Agregado al Inventario Correctamente', '', 'success');
                                location.reload();
                            }
                            else{
                                this.$swal.fire('El Equipo No pudo ser Registrado  Error'+ response.status, '', 'error');
                            }
                        });
                        
                    } else if (result.isDenied) {
                        this.$swal.fire('Registro Cancelado', '', 'info');
                    }
                });
            },
            async addImpresora(){
                this.impresora.cif=this.persona._01cif;
                await this.$swal.fire({
                    title : 'Desea Agregar el Periferico Visual al Ciudadano ?',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.inventarioService.addImpresora(this.impresora).then(response=>{
                            if(response.status==200){
                                this.$swal.fire('Equipo Agregado al Inventario Correctamente', '', 'success');
                                location.reload();
                            }
                            else{
                                this.$swal.fire('El Equipo No pudo ser Registrado  Error'+ response.status, '', 'error');
                            }
                        });
                        
                    } else if (result.isDenied) {
                        this.$swal.fire('Registro Cancelado', '', 'info');
                    }
                });
            },
            async addTelefono(){
                this.telefono.cif=this.persona._01cif;
                await this.$swal.fire({
                    title : 'Desea Agregar el Periferico Visual al Ciudadano ?',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.inventarioService.addTelefono(this.telefono).then(response=>{
                            if(response.status==200){
                                this.$swal.fire('Equipo Agregado al Inventario Correctamente', '', 'success');
                                location.reload();
                            }
                            else{
                                this.$swal.fire('El Equipo No pudo ser Registrado  Error'+ response.status, '', 'error');
                            }
                        });
                        
                    } else if (result.isDenied) {
                        this.$swal.fire('Registro Cancelado', '', 'info');
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