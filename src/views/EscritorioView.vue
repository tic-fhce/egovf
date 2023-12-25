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
                                
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4 espace" style="width: 18rem;">
                                <div class="card">
                                    <h4 class="text-center">Datos de conexión</h4>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">CIF: {{ usuario.cif }}</li>
                                            <li class="list-group-item">{{ usuario.unidad }}</li>
                                            <li class="list-group-item">{{ usuario.sigla }}</li>
                                            <li class="list-group-item"></li>
                                        </ul>
                                        <router-link to="/perfil" class="btn btn-success btn-lg btn-block">Mi Perfil</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 espace" v-for="sub in subMenu" :key="sub.id">
                                <div class="card" style="width: 10rem;">
                                    <img :src="sub.imagen" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">{{ sub.obs }}</p>
                                        <router-link :to="sub.ruta" class="btn btn-success btn-block">{{sub.titulo}}</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 espace">
                                <div class="card" style="width: 10rem;">
                                    <img src="../assets/unidad.jpg" class="card-img-top">
                                    <div class="card-body text-center">
                                        <p class="card-text ">Unidades Academicas</p>
                                        <router-link to="/moduloUsuarioUnidad" class="btn btn-success btn-block">Unidades</router-link>
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
    mounted(){
        this.usuario.menu=this.$cookies.get('menu'); 

        this.usuario.menu.forEach(element => {
            element.subModel.forEach(e=> {
                this.subMenu.push(e);
            });
        });


        this.usuario.cif=this.$cookies.get('cif');
        this.usuario.correo=this.$cookies.get('correo');
        this.usuario.celular=this.$cookies.get('celular');
        this.usuario.pass=this.$cookies.get('pass');       
        this.usuario.unidad = this.$cookies.get('unidad');
        this.usuario.sigla = this.$cookies.get('sigla');
    },
    created(){
        
    },
    beforeCreate(){ //antes de crear e ingresar verificamos la existencia del CIF
        console.log(this.$cookies.get('cif'));
        if(this.$cookies.get('cif')==0){
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>