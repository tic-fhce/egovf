<template>
    <div class="col-md-12 headercolor fixed-top">
        <p>FHCE-UTIC</p>    
        <p>#{{ titulo }}</p>
    </div>
</template>
<script>

export default {
    name:'ComponenteBarraVue',
    props:['titulo'],
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.posicion{
    
    position:absolute;
}

</style>