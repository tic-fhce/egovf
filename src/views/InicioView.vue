<template>
    <ComponenteMenuVue numero="1" />
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <div class="row">
            <div v-for="i in 10" :key="i" class="col-sm-4 mb-4">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <span class="material-icons-round">&#xe9ba;</span>
                        </div>
                        <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">Card title {{i}}</h5>
                            <p class="card-text">lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text d-grid gap-2"><button class="btn btn-success">Ingresar</button></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue'
export default {
    name:'InicioView',
    data(){
        return {
            
        }
    },
    components:{
        ComponenteMenuVue
    },
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}

</style>