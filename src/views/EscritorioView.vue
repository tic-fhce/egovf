<template>
    <ComponenteMenuVue numero="1" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            
        </div>
    </div>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
export default {
    name:'EscritorioView',
    data(){
        return {
            usuario:{
                cif:'',
                correo:'',
                celular:'',
                pass:''
            }
        }
    },
    components:{
        ComponenteMenuVue
    },
    computed:{
        
    },
    created(){
        
        this.usuario.cif=this.$cookies.get('cif');
        this.usuario.correo=this.$cookies.get('correo');
        this.usuario.celular=this.$cookies.get('celular');
        this.usuario.pass=this.$cookies.get('pass');
    },
    beforeCreate(){
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