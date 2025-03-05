<template>

    <CRow>
        <CCol :lg="3" class="text-center " v-for="l in listaTipo" :key="l.id">
            <br>
            <CCard>
                <CCardImage orientation="top" :src=l.imagen></CCardImage>
                <CCardBody>
                    {{ l.detalle }}
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getEmpleado(l.id)">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol> 
    </CRow>
</template>

<script>

import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';

export default {
    name:'TipoEmpleadoView',
    components:{
        
    },
    data(){
        return {
            titulo:'Tipo Empleado',
            empleadoService:null,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            },
            listaTipo:[]
        }
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    created(){
        this.empleadoService = new EmpleadoService();
    },
    mounted(){
        this.getDatos();
        this.getTipoEmpleado();
    },
    methods:{
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
            }
        },
        async getTipoEmpleado(){
            await this.empleadoService.getListaTipoEmpleado().then((response) =>{
                this.listaTipo = response.data;
            });
        },
        getEmpleado(id){
            this.$router.push({
                name: 'ListaEmpleadoView',
                params: {
                    id: id,
                }
            });

        }
    }
}
</script>
