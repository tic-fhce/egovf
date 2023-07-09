<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />

    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div class="card col-md-12">
                <div class="row">
                    <div class="card-header headercolor">
                        <div class="row">
                            <div class="col-md-6">
                                <h3>Escritorio</h3>
                            </div>
                            <div class="col-md-6">
                                <ul>
                                    <li>Unidad : {{ usuario.unidad }}</li>
                                    <li>Sigla : {{ usuario.sigla }}</li>
                                    <li>Usuario: {{ usuario.correo }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2 espace" v-for="sub in subMenu" :key="sub.id">
                                <div class="card" style="width: 10rem;">
                                    <img src="../assets/reporte.jpg" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">{{ sub.obs }}</p>
                                        <router-link :to="sub.ruta" class="btn btn-success btn-lg">{{sub.titulo}}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <ComponenteFooter/>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooter from '@/components/ComponenteFooter.vue';
export default {
    name:'EscritorioView',
    components:{
        ComponenteMenuVue,
        ComponenteFooter
    },
    data(){
        return {
            usuario:{
                cif:0,
                correo:'',
                celular:'',
                pass:'',
                menu:[],
                unidad:'',
                sigla:''
            },
            subMenu:[]
        }
    },
    computed:{
        
    },
    created(){
        this.usuario.cif=this.$cookies.get('cif');
        this.usuario.correo=this.$cookies.get('correo');
        this.usuario.celular=this.$cookies.get('celular');
        this.usuario.pass=this.$cookies.get('pass');
        this.usuario.menu=this.$cookies.get('menu');        
        this.usuario.unidad = this.$cookies.get('unidad');
        this.usuario.sigla = this.$cookies.get('sigla');

        this.usuario.menu.forEach(element => {
            element.subModel.forEach(e=> {
                this.subMenu.push(e);
            });
        });
        
    },
    beforeCreate(){ //antes de crear e ingresar verificamos la existencia del CIF
        console.log(this.$cookies.get('cif'));
        if(this.$cookies.get('cif')==0){
            this.$router.push('/');
        } 
    },
    methods:{
        alerta(){
            this.$swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>