<template>
  <div>
    <ComponenteSidebar :modulo="modulo"/>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <ComponenteHeader :cif="usuario.cif" :foto="usuario.foto"/>
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <ComponenteFooter />
    </div>
  </div>
</template>


<script>
// Importamos Servicios
//import MenuService from '@/services/usuario/menuService'
//import MenuService from '@/modules/egovf/services/menuService'
import ModuloService from '@/modules/egovf/services/moduloService'

// Importamos Herramientas
import { CContainer } from '@coreui/vue'
import ComponenteFooter from '@/components/Escritorio/ComponenteFooter.vue'
import ComponenteHeader from '@/components/Escritorio/ComponenteHeader.vue'
import ComponenteSidebar from '@/components/Escritorio/ComponenteSidebar.vue'

export default {
  name: 'EscritorioLayout',
  components: {
    ComponenteFooter,
    ComponenteHeader,
    ComponenteSidebar,
    CContainer
  },
  data(){
    return {
      titulo:'Escritorio',
      modulo:[],
      moduloService:null,
      usuario:{
        token:'',
        cif:0,
        correo:'',
        celular:'',
        pass:'',
        unidad:'',
        sigla:'',
        foto:''
      }
    }
  },
  created(){
    this.moduloService = new ModuloService();
  },
  mounted(){
    this.usuario.token=this.$cookies.get('token');
    this.usuario.cif = this.$cookies.get('cif');
    this.usuario.correo = this.$cookies.get('correo');
    this.usuario.celular = this.$cookies.get('celular');
    this.usuario.pass = this.$cookies.get('pass');       
    this.usuario.unidad = this.$cookies.get('unidad');
    this.usuario.sigla = this.$cookies.get('sigla');
    this.usuario.foto = this.$cookies.get('foto');

    this.moduloService.headersUsuario(this.usuario.token);
    
    this.getModuloCif();
  },
  methods:{
    async getModuloCif(){
      await this.moduloService.getModuloCif(this.usuario.cif).then((response) =>{
        this.modulo = response.data;
      });
      console.log(this.modulo);
    }
  }
}
</script>
