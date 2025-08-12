<template>
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb custom-breadcrumb">
    
    <li class="breadcrumb-item active" aria-current="page">
      Inventario
        >
    </li>
  </ol>
</nav>
    <CRow>
        <CCol>
            <CCard>
                <CCardHeader class="headercolor text-center">Todos mis Equipos</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-list" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="success" class="font" @click="getTipo()">Ver Todos</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol>
            <CCard>
                <CCardHeader class="headercolor text-center">Mis Atenciones</CCardHeader>
                <CCardBody class="text-center">
                    <CIcon customClassName="nav-icon" icon="cil-bell" class="menuicon"/> 
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="primary" class="font" @click="getAtenciones()">Ver Atenciones</CButton>
                </CCardFooter>
            </CCard>
        </CCol>

    </CRow>
    <br>
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
            },
            cifCiudadano: null
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
    methods: {
        irCiudadano(cifCiudadano){
          this.$router.push({
              name: "PerfilCiudadanoView",
              params: {
                  cifCiudadano:cifCiudadano
              },
          });
        },
        getDatos() {
            
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
            this.cifCiudadano = this.usuario.cif;
        },
        async getInventario(){// Funcion que regresa una lista de tipos de Empleados 
            await this.inventarioService.getTipo().then((response) =>{
                this.listaTipo = response.data;
            });
        },
        getTipo(){
            this.$router.push({
                name: "TodosEquipoView",
                params: {
                    cifCiudadano: this.cifCiudadano,
                    sw: 1
                },
            });
        },
        getAtenciones(){
            this.$router.push({
                name: "AtencionesporCifView",
                params: {
                    cifCiudadano: this.cifCiudadano,
                    sw: 1
                },
            });
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
.breadcrumb-link {
    text-decoration: none;
    color: #00222f;
    font-weight: 500;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    cursor: pointer;
  }
  .breadcrumb-link:hover {
    color: white;
    text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
  }

  .breadcrumb-item + .breadcrumb-item::before {
    color: #bbb;
  }
  
</style>