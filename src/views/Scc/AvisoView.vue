<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6">{{ titulo }}</CCol>
                        <CCol :lg="6" class="text-end">
                            <CButton @click="clickModalAviso(true)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="equipoTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Titulo</th><th>Detalle</th><th>Estado</th><th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="aviso in listaAvisos" :key="aviso.id">
                                    <th scope="row">{{aviso.id}}</th>
                                    <td>{{aviso._01titulo}}</td>
                                    <td>{{ aviso._02detalle }}</td>
                                    <td>{{ aviso._03icon }}<br>
                                        <CBadge v-if="aviso._04estado == 1" color="success" >Activo</CBadge>
                                        <CBadge v-else color="warning" >Inactivo</CBadge>
                                    </td>
                                    <td><CButton class="font" color="success" @click="avisoSelect(aviso.id)" size="sm"><CIcon icon="cil-pencil" class="me-2"/></CButton></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Add Aviso-->
<CModal :visible="modalAviso" @close="clickModalAviso(false)">
    <form @submit.prevent="addAviso()">
        <CModalHeader class="headercolor" dismiss @close="clickModalAviso(false)">
            <CModalTitle>
                <h5>Agregar Nuevo Aviso</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
            <div class="mb-3 row">
                <label for="detalle" class="col-4">Titulo</label>
                <div class="col-8">
                <input type="text" class="form-control" v-model="aviso.titulo" placeholder="Titulo del Aviso a colocar" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="lugar" class="col-4">Detalle</label>
                <div class="col-8">
                    <textarea class="form-control" cols="30" rows="5" v-model="aviso.detalle" required="true"></textarea>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4">Icono</label>
                <div class="col-8">
                    <select class="form-control" v-model="aviso.icon" required="true">
                        <option value="info">Informacion</option>
                        <option value="error">Error</option>
                        <option value="success">Completo</option>
                        <option value="warning">Incompleto</option>
                    </select>
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalAviso(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal  Add Equipo-->

<!-- Modal  Update Aviso-->
<CModal :visible="modalAvisoUpdate" @close="clickModalAvisoUpdate(false)">
    <form @submit.prevent="updateAviso()">
        <CModalHeader class="headercolor" dismiss @close="clickModalAvisoUpdate(false)">
            <CModalTitle>
                <h5>Actualizar Aviso</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
            <div class="mb-3 row">
                <label for="detalle" class="col-4">Titulo</label>
                <div class="col-8">
                <input type="text" class="form-control" v-model="avisoUpdate.titulo" placeholder="Titulo del Aviso a colocar" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="lugar" class="col-4">Detalle</label>
                <div class="col-8">
                    <textarea class="form-control" cols="30" rows="5" v-model="avisoUpdate.detalle" required="true"></textarea>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4">Icono</label>
                <div class="col-8">
                    <select class="form-control" v-model="avisoUpdate.icon" required="true">
                        <option value="info">Informacion</option>
                        <option value="error">Error</option>
                        <option value="success">Completo</option>
                        <option value="warning">Incompleto</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="codigo" class="col-4">Estado</label>
                <div class="col-8">
                    <select class="form-control" v-model="avisoUpdate.estado" required="true">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalAvisoUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
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
    name:'AvisoView',
    components:{

    },
    data(){
        return {
          titulo:'Avisos Modulo SCC',
          modalAviso:false,
          modalAvisoUpdate:false,
          sccService:null,
          listaAvisos:[],
          usuario:{
            token:'',
            cif:'',
            correo:'',
            celular:'',
            pass:'',
            unidad:'',
            sigla:''
          },
          aviso:{
            titulo:'',
            detalle:'',
            icon:'',
            estado:0,
          },
          avisoUpdate:{
            id:0,
            titulo:'',
            detalle:'',
            icon:'',
            estado:0,
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
      this.getAvisoAll(); // Funcion que debuelve una lista de Equipos Biometricos 
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
      async getAvisoAll(){ // Funcion que crea una lista de Avisos 
        await this.sccService.getAvisoAll().then(response => {
          this.listaAvisos = response.data;
        });
        this.tabla();
      },
      addAviso(){ // funcion para el registro de un Aviso
        this.$swal.fire({
            title: 'Desea Registrar El Aviso',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText:'Cancelar'}).then((result)=>{
                if(result.isConfirmed){
                    this.sccService.addAviso(this.aviso).then((response) =>{
                        if(response.status == 200){
                            this.$swal.fire('Aviso Registrado Corectamente', '', 'success').then((result) => {
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
      updateAviso(){ // funcion para actualizar un Aviso
        this.$swal.fire({
            title: 'Desea Actualizar El Aviso',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Actualizar',
            denyButtonText:'Cancelar'}).then((result)=>{
                if(result.isConfirmed){
                    this.sccService.updateAviso(this.avisoUpdate).then((response) =>{
                        if(response.status == 200){
                            this.$swal.fire('Aviso Actualizado Corectamente', '', 'success').then((result) => {
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
      avisoSelect(id){
        this.listaAvisos.forEach(aviso => {
            if(aviso.id == id){
                this.avisoUpdate.id = aviso.id;
                this.avisoUpdate.titulo = aviso._01titulo;
                this.avisoUpdate.detalle = aviso._02detalle;
                this.avisoUpdate.icon = aviso._03icon;
                this.avisoUpdate.estado = aviso._04estado;
            }
        });
        this.clickModalAvisoUpdate(true);  
      },
      clickModalAviso(m){//funcion para Visibilisar el modal
        this.modalAviso = m;
      },
      clickModalAvisoUpdate(m){//funcion para Visibilisar el modal
        this.modalAvisoUpdate = m;
      }
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>