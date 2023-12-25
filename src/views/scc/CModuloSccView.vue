<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />

    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="card col-md-12">
                <div class="row">
                    <div class="card-header headercolor">
                        <div class="row">
                            <div class="col-md-6">
                                <h3>Modulo Scc</h3>
                            </div>
                            <div class="col-md-6 text-end">
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Opciones Modulo Scc</button>
                                    <div class="dropdown-menu">
                                        <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#obsModalAll">Agregar Observaciones</a>
                                        <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#recordModal">Extraer Record</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="container">
                        <div class="row">

                            <div class="col-md-4 bloques">
                                <div class="card" style="width: 13rem;">
                                    <img src="../../assets/trabajo.jpg" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">Personal Administrativo</p>
                                        <button class="btn btn-success btn-block" @click="getModuloReporte(1)">Personal Admin</button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 bloques">
                                <div class="card" style="width: 13rem;">
                                    <img src="../../assets/docente.jpg" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">Personal Docente</p>
                                        <button class="btn btn-success btn-block" @click="getModuloReporte(2)">Personal Docente</button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 bloques">
                                <div class="card" style="width: 13rem;">
                                    <img src="../../assets//auxiliar.jpg" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">Personal Auxiliar</p>
                                        <button class="btn btn-success btn-block" @click="getModuloReporte(3)">Personal Auxiliar</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <ComponenteFooter/>

<!-- Modal  Obserbasiones-->
<div class="modal fade" id="obsModalAll" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headercolor">
                <h5 class="modal-title">Agregar Observaciones de Asistencia</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="mb-3 row">
                    <label for="datos" class="col-sm-4 col-form-label">Obs - Para</label>
                    <div class="col-sm-8">
                        <select class="form-control" v-model="obsall.cif">
                        <option value="1">Administrativo</option>
                        <option value="2">Docente</option>
                        <option value="3">Auxiliar</option>
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
                        <option value="2">Docente</option>
                        <option value="3">Auxiliar</option>
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
//componenetes
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooter from '@/components/ComponenteFooter.vue';

// Servicios
import BiometricoService from '@/services/biometricoService';

export default {
    name:'CModuloSccView',
    components:{
        ComponenteMenuVue,
        ComponenteFooter
    },
    data(){
        return {
            biometricoService:null,
            usuario:{
                cif:0,
                correo:'',
                celular:'',
                pass:'',
                menu:[],
                unidad:'',
                sigla:''
            },
            subMenu:[],
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
    created(){
        this.biometricoService = new BiometricoService();
    },
    beforeCreate(){ //antes de crear e ingresar verificamos la existencia del CIF
        console.log(this.$cookies.get('cif'));
        if(this.$cookies.get('cif')==0){
            this.$router.push('/');
        }
    },
    mounted(){
      this.getDatos();
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
        }
        else{
            this.$router.push('/');
        }
      },
      getModuloReporte(tipo){
        this.$router.push({
          name: "mReporteLista",
          params:{
            tipo: tipo,
          }
        });
      },
      async addObsAll(){
        await this.$swal.fire({
                title: 'Desea agregar las Observaciones de Asistencia ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.addObsAll(this.obsall).then(response=>{
                        console.log(response.status);
                        if(response.status==200){
                            this.$swal.fire('Las Observaciones fueron Agregados Corectamente', '', 'success');
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
.margen{
    margin-top: 100px;
}
</style>