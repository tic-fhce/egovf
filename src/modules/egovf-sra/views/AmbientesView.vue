<template>
    <TableUi :lista="dataTable" titulo="Lista de Ambientes" :opciones="false" />
</template>

<script setup>
import TableUi from '../components/TableUI.vue'
//Datos de prueba
const dataTable = [
    { id: 1, ambiente: 'Desarrollo', estado: 'Activo' },
    { id: 2, ambiente: 'Pruebas', estado: 'Inactivo' },
    { id: 3, ambiente: 'Producción', estado: 'Activo' },
]
console.log(dataTable)
</script>
<style scoped>
    @import '../styles/tailwind.css';
</style>