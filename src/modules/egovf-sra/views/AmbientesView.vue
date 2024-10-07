<template>
    <TableUi :lista="dataTable" titulo="Lista de Ambientes" :opciones="true" nameModal="Agregar Ambiente" />
</template>

<script setup>
import TableUi from '../components/TableUI.vue'
//Datos de prueba
const dataTable = [
    { id: 1, Ambiente: 'Desarrollo', estado: 'Activo' },
    { id: 2, Ambiente: 'Pruebas', estado: 'Inactivo' },
    { id: 3, Ambiente: 'Producción', estado: 'Activo' },
]
console.log(dataTable)
</script>
<style scoped>
    @import '../styles/tailwind.css';
</style>