<template>
  <ComponenteMenuVue cif="0"/>
      <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
              
            </div>
            
        </div>
      </div>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import UsuarioService from '@/services/usuarioServices';
export default {
  name:'AboutView',
  usuarioService:null,
  data(){
    return{
      usuarios:[]
    }
  },
  created(){
    this.usuarioService= new UsuarioService();
  },
  mounted(){
    this.getUsuarios();
  },
  methods:{
    getUsuarios(){
      this.usuarioService.getListaUsuario().then(data=>{this.usuarios=data.data;})
    }
  },
  components:{
    ComponenteMenuVue
  }
}
</script>
