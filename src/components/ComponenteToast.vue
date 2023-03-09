<template>
    <div class="toast-header text-white" :class="toast.tipo">
        <i class="material-icons-toast" :class="toast.icono"></i>
        <strong class="me-auto">{{toast.titulo}}</strong>
        <small>{{toast.subtitulo}}</small>
        <button type="button" class="btn-close" @click="$emit('hide')" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
        {{toast.mensage}}
    </div>

        
</template>
<script>
export default {
    name:'ComponenteToastVue',
    emits:['hide'],
    props:{
        toast:{
            type:Object,
            default:function(){
                return {
                    titulo:'',
                    mensage:'',
                    show:'',
                    time:'',
                    tipo:'',
                    icono:'',
                    subtitulo:''
                }
            }
        }
    }
}
</script>