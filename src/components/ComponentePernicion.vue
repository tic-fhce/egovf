<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Pernicions del Usuario</h3>
                        </div>
                        <div class=" col col-md-3 col-sm-3">
                            
                        </div>
                        <div class="col col-md-3 col-sm-3">
                            <a href="#" class="form-control btn btn-primary" data-bs-toggle="modal" data-bs-target=#agregarPermisoModal><span class="material-icons">&#xe145;</span>Agregar Pernicions</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-hover" id="printMarcado">
                    <thead>
                        <tr>
                            <th>#</th><th>Titulo</th><th>Ruta</th><th>Nivel</th><th>Subnivel</th><th>Obs</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pmenu in pernicionsmenu" :key="pmenu.id">
                            <td>{{pmenu.id}}</td><td>{{pmenu._01titulo}}</td><td>{{pmenu._02ruta}}</td><td>{{pmenu._03nivel}}</td><td>{{pmenu._04subnivel}}</td><td>{{pmenu._05obs}}</td><td></td>
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

    <!-- Modal  Biometrico-->
<div class="modal fade" id="agregarPermisoModal" tabindex="-1" aria-labelledby="permisoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agregar Pernicions</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Confirmar CIF</label>
            <div class="col-sm-6">
                <input type="text"  class="form-control" v-model="pernicion.cif">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Perbicions del Menu</label>
            <div class="col-sm-6">
                <select v-model="pernicion.id_menu" class="form-control" >
                    <option v-for="lm in listamenu" :key="lm.id" :value="lm.id">{{ lm._03nivel }} {{ lm._01titulo }}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addPernicion()">Agregar Permiso </button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
    import PernicionService from '@/services/pernicionService';
    export default{
        name:'ComponentePernicionVue',
        props:['persona'],
        data(){
            return{
                prenicionService:null,
                getPB:true,
                pernicionsmenu:[],
                listamenu:[],
                usuario:{
                    token:'',
                    cif:'',
                    correo:'',
                    celular:'',
                    pass:'',
                    menun:[]
                },
                pernicion:{
                    cif:0,
                    id_menu:0,
                    fecha:'',
                    estado:1
                }
            }
        },
        created(){
            this.pernicionService= new PernicionService();
        },
        updated(){
            if(this.persona._01cif>0 && this.getPB)
            {
                this.getDatosMenu();
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

                // Creamos datos de Usuario
                
                this.pernicionService.headersUsuario(this.usuario.token);
                await this.pernicionService.getListarMenu().then((response) =>{
                    this.listamenu=response.data;
                });

                // creamos los datos del Ciudadano
                
                this.pernicionService.getListarPernicion(this.persona._01cif).then((response) =>{
                    this.pernicionsmenu=response.data;
                });
                
            },
            async addPernicion(){
                await this.$swal.fire({
                    title : 'Desea Agregar el Pernicion al Ciudadano ? ',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.pernicionService.addPernicion(this.pernicion).then(response=>{
                            if(response.status==200){
                                this.$swal.fire('Permisos Agregados al Ciudadano Corectamente', '', 'success');
                                location.reload();
                            }
                            else{
                                this.$swal.fire('Los Permisos no fueron Guardados Error'+ response.status, '', 'error');
                            }
                        });
                        
                    } else if (result.isDenied) {
                        this.$swal.fire('Permisos Cancelados', '', 'info');
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