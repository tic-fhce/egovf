<template>
  <ComponenteMenuVue cif="0"/>
      <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
              <form @submit.prevent="addObs()" enctype="multipart/form-data">
                <div class="mb-3 row">
                    <label for="archivo" class="col-sm-4 col-form-label">Documento</label>
                    <div class="col-sm-8">
                        <input type="file" ref="file" class="form-control" @change="selectFile()">
                    </div>
                </div>

                <div class="mb-3 row">
                    <button class="btn btn-primary" >Agregar Observaciones</button>
                </div>
              </form>

              
            </div>

            <div class="col-md-12">
              <QrcodeVue value="CIF: 200000000000 <br/> Minutos de Retraso : 7 min  Minutos Adelantados : 8 min"/>
            </div>
            
        </div>
      </div>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import UsuarioService from '@/services/usuarioServices';
import UploadService from '@/services/upload/uploadService';

import QrcodeVue from 'qrcode.vue';

export default {
  name:'AboutView',
  components:{
    ComponenteMenuVue,
    QrcodeVue
  },
  data(){
    return{
      usuarioService:null,
      uploadServices:null,
      usuarios:[]
    }
  },
  created(){
    this.usuarioService= new UsuarioService();
    this.uploadServices = new UploadService();
  },
  mounted(){
    //this.getUsuarios();
  },
  methods:{
    getUsuarios(){
      this.usuarioService.getListaUsuario().then(data=>{this.usuarios=data.data;})
    },
    selectFile(){
      this.archivo = this.$refs.file.files[0];
      console.log(this.archivo);
    },
    async addObs(){
            console.log('Subiendo archivo');
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            console.log("nombre ###############"+fromData.get.name);
            try{
                this.uploadServices.addImagen(fromData).then((response)=>{
                console.log(response.data);
            });
            }catch(err){
                console.log(err);
            }
    }
  }
  
}
</script>
