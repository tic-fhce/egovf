<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">
                <div class="card-header headercolor">
                    <div class="row">
                        <div class=" col col-md-6 col-sm-6">
                            <h3>Modulos Del Ciudadano</h3>
                        </div>
                        <div class=" col col-md-6 col-sm-6 text-end">
                            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target=#moduloModal><span class="material-icons">&#xe145;</span>Modulo</a>
                        </div>
                    </div>
                </div><!--End Card Header-->
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 text-center espace" v-for="l in listaModuloCif" :key="l.id">
                            <div class="card">
                                <div class="card-header headercolor">
                                    {{ l._01nombre }}
                                </div>
                                <div class="card-body">
                                    <img src="../assets/reporte.jpg" class="tam">
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-success" @click="getModulo(l._02ruta)">{{ l._01nombre}}</button>
                                </div>
                            </div>
                        </div>
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
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addModulo()">Agregar Modulo </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ModuloService from '@/services/moduloService';

export default {
    name:'ComponenteModulosVue',
    props:['cif'],
    data(){
        return{
            moduloService:null,
            listaModulo:[],
            listaModuloCif:[],
            id_modulo:0,
            getPB:true,
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
            modulo:{
                cif:0,
                idmodulo:0
            }
        };
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.moduloService = new ModuloService();
    },
    mounted(){
        this.getDatos();
        this.getListaModuloAll();
    },
    updated(){
        if(this.cif>0 && this.getPB)
        {
            this.getListarModuloCif();
            this.getPB=false;
        }
    },
    methods:{
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
                
                this.moduloService.headersUsuario(this.usuario.token);
            }
        },
        async getListaModuloAll(){
            await this.moduloService.getListaModulo().then((response)=>{
                this.listaModulo=response.data;
            });
        },
        async getListarModuloCif(){
            await this.moduloService.getListarModuloCif(this.cif).then((response)=>{
                this.listaModuloCif=response.data;
            });
        },
        async addModulo(){
            this.modulo.cif=this.cif;
            this.modulo.idmodulo=this.id_modulo;
            await this.$swal.fire({
                title: 'Desea Agregar el Modulo al Ciudadano ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.moduloService.addModulo(this.modulo).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('El Modulo fue Agregado al Ciudadano Corectamente', '', 'success').then((res)=>{
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
        getModulo(ruta){
            this.$router.push({
                name: ruta,
                params:{
                    cifCiudadano: this.cif,
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