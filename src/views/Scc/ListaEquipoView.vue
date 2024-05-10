<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6">{{ titulo }}</CCol>
                        <CCol :lg="6" class="text-end">
                            <CButton @click="clickModalEquipo(true)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="equipoTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Lugar</th><th>Detalle</th><th>Estado</th><th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="equipo in listaEquipo" :key="equipo.id">
                                    <th scope="row">{{equipo.id}}</th>
                                    <td>{{equipo.detalle}}</td>
                                    <td>
                                        <strong>Lugar : </strong>{{equipo.lugar}}<br>
                                        <strong>Ip : </strong>{{equipo.ip}}<br>
                                        <strong>Puerto : </strong>{{equipo.puerto}}<br>
                                        <strong>MAC : </strong>{{equipo.mac}}
                                    </td>
                                    <td>
                                        <strong>Codigo : </strong>{{equipo.codigo}} <br>
                                        <CBadge v-if="equipo.estado == 1" color="success" >Activo</CBadge>
                                        <CBadge v-else color="warning" >Inactivo</CBadge>
                                    </td>
                                    <td><CButton class="font" color="success" @click="equipoSelect(equipo.id)" size="sm"><CIcon icon="cil-devices" class="me-2"/>Equipo</CButton></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Add Equipo-->
<CModal :visible="modalEquipo" @close="clickModalEquipo(false)">
    <form @submit.prevent="addEquipo()">
        <CModalHeader class="headercolor" dismiss @close="clickModalEquipo(false)">
            <CModalTitle>
                <h5>Agregar Nuevo Equipo Biometrico</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
            <div class="mb-3 row">
                <label for="detalle" class="col-4">Detalle</label>
                <div class="col-8">
                <input type="text" class="form-control" v-model="equipo.detalle" placeholder="Nombre del lugar donde se encuentra el Equipo Biometrico" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="lugar" class="col-4">Lugar</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipo.lugar" placeholder="Iniciales del lugar donde se encuentra el Equipo Biometrico" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipo.ip" placeholder="192.168.0.1" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="puerto" class="col-4">Puerto</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipo.puerto" placeholder="0000" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="mac" class="col-4">MAC</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipo.mac" placeholder="ab:cd:ef:12:34" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="codigo" class="col-4">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipo.codigo" required="true" placeholder="Codigo de inventario del equipo">
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalEquipo(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal  Add Equipo-->

<!-- Modal  Update Equipo-->
<CModal :visible="modalEquipoUpdate" @close="clickModalEquipoUpdate(false)">
    <form @submit.prevent="updateEquipo()">
        <CModalHeader class="headercolor" dismiss @close="clickModalEquipoUpdate(false)">
            <CModalTitle>
                <h5>Actualizar Equipo Biometrico</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
            <div class="mb-3 row">
                <label for="detalle" class="col-4">Detalle</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.detalle" placeholder="Nombre del lugar donde se encuentra el Equipo Biometrico" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="lugar" class="col-4">Lugar</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.lugar" placeholder="Iniciales del lugar donde se encuentra el Equipo Biometrico" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.ip" placeholder="192.168.0.1" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="puerto" class="col-4">Puerto</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.puerto" placeholder="0000" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="mac" class="col-4">MAC</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.mac" placeholder="ab:cd:ef:12:34" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="codigo" class="col-4">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="equipoUpdate.codigo" required="true" placeholder="Codigo de inventario del equipo">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="codigo" class="col-4">Estado</label>
                <div class="col-8">
                    <select class="form-control" v-model="equipoUpdate.estado" required="true">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalEquipoUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-cloud-upload" class="me-2"/>Actualizar</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal  Update Equipo-->
</template>

<script>

//Importamos Servicios
import SccService from '@/services/scc/sccService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
    name:'ListaEquipoView',
    components:{

    },
    data(){
        return {
          titulo:'Lista de Equipos Biometricos',
          modalEquipo:false,
          modalEquipoUpdate:false,
          sccService:null,
          listaEquipo:[],
          usuario:{
            token:'',
            cif:'',
            correo:'',
            celular:'',
            pass:'',
            unidad:'',
            sigla:''
          },
          equipo:{
            detalle:'',
            lugar:'',
            ip:'',
            puerto:'',
            mac:'',
            codigo:''
          },
          equipoUpdate:{
            id:0,
            detalle:'',
            lugar:'',
            ip:'',
            puerto:'',
            mac:'',
            codigo:'',
            estado:0
          }
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
      this.sccService = new SccService();
    },
    mounted(){
      this.getDatos(); // Llamamos los datos del Usuario
      this.getListaEquipo(); // Funcion que debuelve una lista de Equipos Biometricos 
    },
    methods:{
      tabla(){
        this.$nextTick(()=>{
          $('#equipoTabla').DataTable();
        });
      },
      getDatos(){// Funcion que guarda los datos del Usuario en la View
        if(this.$cookies.get('cif')!=null){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');
        }
      },
      async getListaEquipo(){ // Funcion que crea una lista de Equipos Biometricos 
        await this.sccService.getListaEquipo().then(response => {
          this.listaEquipo = response.data;
        });
        this.tabla();
      },
      addEquipo(){ // funcion para el registro de un Equipo
        this.$swal.fire({
            title: 'Desea Registrar El equipo',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText:'Cancelar'}).then((result)=>{
                if(result.isConfirmed){
                    this.sccService.addEquipo(this.equipo).then((response) =>{
                        if(response.status == 200){
                            this.$swal.fire('Equipo Registrado Corectamente', '', 'success').then((result) => {
                                if(result)
                                    location.reload();
                                }
                            );
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                }
            });
      },
      updateEquipo(){ // funcion para actualizar un Equipo
        this.$swal.fire({
            title: 'Desea Actualizar El equipo',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Actualizar',
            denyButtonText:'Cancelar'}).then((result)=>{
                if(result.isConfirmed){
                    this.sccService.updateEquipo(this.equipoUpdate).then((response) =>{
                        if(response.status == 200){
                            this.$swal.fire('Equipo Actualizado Corectamente', '', 'success').then((result) => {
                                if(result)
                                    location.reload();
                                }
                            );
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                }
            }
        );
      },
      equipoSelect(id){
        this.listaEquipo.forEach(eqp => {
            if(eqp.id == id){
                this.equipoUpdate = eqp;
            }
        });
        this.clickModalEquipoUpdate(true);  
      },
      clickModalEquipo(m){//funcion para Visibilisar el modal
        this.modalEquipo = m;
      },
      clickModalEquipoUpdate(m){//funcion para Visibilisar el modal
        this.modalEquipoUpdate = m;
      }
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>