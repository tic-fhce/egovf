<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor"></CCardHeader>
                <CCardBody>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th><th>Codigo</th><th>Caracteristicas</th><th>Red</th><th>Datos Actividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cpu in listaCpu" :key="cpu.idPc">
                                <td>{{ cpu.idPc }}</td>
                                <td>{{cpu.codigo}}</td>
                                <td>
                                    Sistema : {{ cpu.sistema }} <br>
                                    RAM : {{cpu.capacidad}} - {{ cpu.memorias }}<br>
                                    Micro Procesador : {{ cpu.micro }} de {{ cpu.micro_capacidad }}<br>
                                    Capasidad Disco : {{ cpu.disco }}<br>
                                    Tipo : {{ cpu.detalle }}<br>
                                    Fuente Pw : {{cpu.fuente  }}<br>
                                    Cortapico : {{ cpu.cortapico }} 
                                </td>
                                <td>
                                    Ip : {{ cpu.ip }}<br>
                                    Mascara : {{ cpu.dns }}<br>
                                    Segmento : {{ cpu.segmento }}<br>
                                    Mac : {{ cpu.mac }}<br>
                                    Switch : {{cpu.swit}}<br>
                                    Puerto : {{ cpu.puerto }}<br>
                                    Vlan : {{ cpu.vlan }} 
                                </td>
                                <td>
                                    Fecha de Adicion : {{ cpu.fecha_add }}<br>Fecha de Traspaso : {{ cpu.fecha_del }}<br>Estado : <CBadge color="success" v-if="cpu.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge>
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
    name:'CpuView',
    components:{
        
    },
    data(){
        return{
            inventarioService:null,
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
            listaCpu:[]
        }
    },
    mounted(){
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        //this.getCpuCif();
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
        tablaAtencion(){
            this.$nextTick(()=>{
                $('#atTabla').DataTable();
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
        async getCpuCif(){// funcion que trae una lista de cpus del empleado
            await this.inventarioService.getCpuCif(this.usuario.cif).then(response => {
                this.listaCpu = response.data;
            });
        },
    }
}

</script>
<style scoped>
@import 'datatables.net-dt';
</style>