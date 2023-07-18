<template>
    <ComponenteMenuVue numero="1" />
    <div class="container">
        <div class="row margen">
        </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6 align-self-end text-end">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target=#personamodal>Agregar Ciudadano</button>
        </div>
      </div>
      <hr>
        <div class="row">
          <div class="col-ms-12">
            <table id="personaTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th><th>CIF</th><th>Datos</th><th>Celular</th><th>Correo</th><th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'

DataTable.use(DataTablesLib);

export default {
    name:'ListaMarcadoView',
    components:{
        ComponenteMenuVue
    },
    data(){
        return {
        }
    },
    created(){
        
    },
    mounted(){

    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
    }
}
</script>
<style scoped>
@import 'datatables.net-dt';
.margen{
    margin-top: 100px;
}
.color{
  background-color: brown;
}
</style>