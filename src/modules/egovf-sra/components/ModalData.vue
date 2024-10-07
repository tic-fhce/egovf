<template>
    <CModal :visible="active">
        <CModalHeader class="headercolor" dismiss>
            <CModalTitle>
                <h5> {{ name }}</h5>
            </CModalTitle>
        </CModalHeader>
        <div v-if="name==='Agregar Ambiente'">
            <ModalAddAmbiente/>
        </div> 
        <div v-if="name==='Agregar Evento'">
            <ModalAddEventos/>
        </div>
</CModal>
</template>

<script setup>
import ModalAddAmbiente from './ModalAddAmbiente.vue';
import ModalAddEventos from './ModalAddEventos.vue';

    const props = defineProps({
        active:Boolean,
        name:String,
    })

    console.log(props.active);
</script>
