<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" :titulo="titulo" />

    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">

            <div class="col-md-3 espace">
                <div class="card">
                    <div class="card-header headercolor">
                        Datos de conexión
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">CIF: {{ usuario.cif }}</li>
                            <li class="list-group-item">{{ usuario.unidad }}</li>
                            <li class="list-group-item">{{ usuario.sigla }}</li>
                            <li class="list-group-item"></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <router-link to="/perfil" class="btn btn-success btn-lg btn-block">Mi Perfil</router-link>
                    </div>
                </div>
            </div>

            <div class="col-md-3 text-center espace" v-for="sub in subMenu" :key="sub.id">
                <div class="card">
                    <div class="card-header headercolor">
                        {{ sub.obs }}
                    </div>
                    <div class="card-body">
                        <img :src="sub.imagen" class="tam">
                        <p>{{sub.titulo}}</p>
                    </div>
                    <div class="card-footer">
                        <router-link :to="sub.ruta" class="btn btn-success btn-block">{{sub.titulo}}</router-link>
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
            subMenu:[],
            titulo:'Escritorio',
            usuario:{
                cif:0,
                correo:'',
                celular:'',
                pass:'',
                menu:[],
                unidad:'',
                sigla:''
            }
        }
    },
    mounted(){
        //this.usuario.menu = this.$cookies.get('menu'); 

        this.usuario.menu.forEach(element => {
            element.subModel.forEach(e=> {
                this.subMenu.push(e);
            });
        });


        this.usuario.cif = this.$cookies.get('cif');
        this.usuario.correo = this.$cookies.get('correo');
        this.usuario.celular = this.$cookies.get('celular');
        this.usuario.pass = this.$cookies.get('pass');       
        this.usuario.unidad = this.$cookies.get('unidad');
        this.usuario.sigla = this.$cookies.get('sigla');
    },
    created(){
        this.usuario.menu = this.$cookies.get('menu'); 
    },
    beforeCreate(){ //antes de crear e ingresar verificamos la existencia del CIF
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