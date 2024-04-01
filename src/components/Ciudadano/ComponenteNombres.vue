<template>
    <div class="mb-3 row">
        <h4 class="card-title">CIF : {{datos.cif}}</h4>
    </div>
    <div class="mb-3 row">
        <label for="nombre" class="col-4">Nombre : </label>
        <label for="nombre" class="col-8">{{datos.nombre}}</label>
    </div>
    <div class="mb-3 row">
        <label for="apellido" class="col-4">Apellidos : </label>
        <label for="nombre" class="col-8">{{datos.apellido}}</label>
    </div>
</template>
<script>
export default {
    name:'ComponenteNombres',
    props:['datos']
}
</script>