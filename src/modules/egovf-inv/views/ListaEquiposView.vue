<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor"></CCardHeader>
                <CCardBody>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th><th>Codigo</th><th>Mac - Serie</th><th>Detalle</th><th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="equipo in listaEquipo" :key="equipo.id">
                                <td>{{ equipo.id }}</td>
                                <td>{{equipo.codigo}}</td>
                                <td>{{ equipomacserie }}</td>
                                <td>{{equipo.detalle}}</td>
                                <td>

                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

//Importamos Servicios
import InventarioService from '@/modules/egovf-inv/services/inventarioService';
//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';
DataTable.use(DataTablesLib);

export default {
    name:'ListaEquiposView',
    components:{
        
    },
    data(){
        return{
            inventarioService:null,
            idEquipo:0,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:'',
                foto:''
            },
            listaEquipo:[]
        }
    },
    mounted(){
        this.idEquipo = this.$route.params.id; 
        this.getDatos();
        this.getEquipoTipo();
    },
    created(){
        //Creamos los Sercicios
        this.inventarioService = new InventarioService();
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
        tablaEquipos(){
            this.$nextTick(()=>{
                $('#equipoTabla').DataTable();
            });
        },
        getDatos(){
            //cargamos datos del Usuario
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get('foto');
            }
        },
        async getEquipoTipo(){// funcion que trae una lista de cpus del empleado
            await this.inventarioService.getEquipoTipo(this.idEquipo).then(response => {
                this.listaEquipo = response.data;
            });
        },
    }
}

</script>
<style scoped>
@import 'datatables.net-dt';
</style>