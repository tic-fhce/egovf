<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            
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
                menu:[]
            }
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