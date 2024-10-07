<template>
    <TableUi :lista="dataTable" titulo="Lista de eventos" opciones="true" nameModal="Agregar Evento" />    
</template>

<script setup>
import TableUi from '../components/TableUI.vue'

//datos de prueba 
const dataTable = [
    {
        _01cif: '123456789',
        _02cite: '123456789',
        _08estado: 'Activo',
        _10fecha_actual: '2021-09-01',
        _05fecha_reserva: '2021-09-01',
        _09hoja_ruta: '123456789',
        _07hora_fin: '12:00',
        _06hora_inicio: '10:00',
        _04referencia: 'Evento de prueba',
        _02id_ambiente: '1',
        _011tipo: 'Evento',
        nombre_evento: 'Evento de prueba',
    },
    {
        _01cif: '123456789',
        _02cite: '123456789',
        _08estado: 'Activo',
        _10fecha_actual: '2021-09-01',
        _05fecha_reserva: '2021-09-01',
        _09hoja_ruta: '123456789',
        _07hora_fin: '12:00',
        _06hora_inicio: '10:00',
        _04referencia: 'Evento de prueba',
        _02id_ambiente: '1',
        _011tipo: 'Evento',
        nombre_evento: 'Evento de prueba',
    }
];
</script>