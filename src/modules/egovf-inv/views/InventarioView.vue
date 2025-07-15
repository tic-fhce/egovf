<template>
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb custom-breadcrumb">
    
    <li class="breadcrumb-item active" aria-current="page">
      Inventario >
    </li>
  </ol>
</nav>
    <CRow>
        <CCol :lg="3">
            <br/>
            <CCard>
                <CCardHeader class="headercolor text-center">Tipo de Equipos</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-list" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getTipo()">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :lg="3" v-for="tipo in listaTipo" :key="tipo.id">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">{{tipo.sigla}}</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" :icon="tipo.icono" class="menuicon"/> 
                    
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="primary" class="font" @click="getLista(tipo.idTipo)">Ingresar</CButton>
                </CCardFooter>
            </CCard>
        </CCol>


    </CRow>
    <br>
   <CRow>
       <CButton color="dark" class="font" @click="()=> this.$router.push('/atenciones')">Ver Atenciones</CButton> 
   </CRow> 
</template>
<script>

import InventarioService from '@/modules/egovf-inv/services/inventarioService';
export default {
    name:'InventarioView',
    components:{
    },
    data(){
        return {
            direcciones:["/at-tic","/cpu","/monitores","/impresora","/telefono","/ubicacion"],
            listaTipo:[],
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:'',
                foto:''
            }
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
        this.getInventario();
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
                this.usuario.foto = this.$cookies.get('foto');
            }
        },
        async getInventario(){// Funcion que regresa una lista de tipos de Empleados 
            await this.inventarioService.getTipo().then((response) =>{
                this.listaTipo = response.data;
            });
        },
        getTipo(){
            this.$router.push("/tipoEquipos");
        },
        getLista(id){
            this.$router.push({
                name: "ListaEquiposView",
                params: {
                    id:id
                },
            });
        },
    }
}
</script>
<style scoped>
.menuicon {
    width: 100px;  /* Ajusta el tamaño según necesites */
    height: 100px;
}
.font{
    background-color: #00222f;
    border-color: #00222f;
    color: white;

}

.font:hover{
    background-color: white;
    border-color: #00222f;
    color: #00222f;
    
}
</style>