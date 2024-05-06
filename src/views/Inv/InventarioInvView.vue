<template>

    <CRow>
        <CCol :lg="2" class="text-center " v-for="l in listaTipo" :key="l.id">
            <br>
            <CCard>
                <CCardBody>
                    <CIcon :icon="l._03icono" size="xxl"></CIcon><br>
                    {{ l._01sigla }}
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getLista(l.id)">{{ l._01sigla}}</CButton>
                </CCardFooter>
            </CCard>
        </CCol> 
    </CRow>
</template>

<script>
import InventarioService from '@/services/inv/inventarioService';

export default {
    name:'InventarioInvView',
    components:{
        
    },
    data(){
        return {
            titulo:'Tipo Empleado',
            inventarioService:null,
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
        this.inventarioService = new InventarioService();
    },
    mounted(){
        this.getDatos();
        this.getListaTipo();
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
        async getListaTipo(){
            await this.inventarioService.getTipo().then((response) =>{
                this.listaTipo = response.data;
            });
        },
        getLista(id){
            this.$router.push({
                name: 'ListaInventarioView',
                params: {
                    idtipo: id,
                }
            });
        }
    }
}
</script>
