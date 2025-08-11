<template>
  <CRow>
    <CCol :lg="6">
        <h3><strong>{{ eventoDetalle.nombre }}</strong></h3>
      <br>
      <CAlert :color="eventoDetalle.color">{{eventoDetalle.estado}}</CAlert>
      <CWidgetStatsB class="mb-3" :progress="{ color:eventoDetalle.color, value: 100}">
        <template #text>
          {{ eventoDetalle.detalle }}<br>
          <strong>Fecha: </strong> {{ eventoDetalle.fechaInicio }} <br>
          <strong>Horas: </strong> De 
          <span class="small text-medium-emphasis">{{ eventoDetalle.horaInicio }}</span> a 
          <span class="small text-medium-emphasis">{{ eventoDetalle.horaFin }}</span> 
        </template>
        <template #title><strong>{{ formatearFecha(eventoDetalle.fechaInicio) }}</strong> De <span class="small text-medium-emphasis">{{ eventoDetalle.horaInicio }}</span> a <span class="small text-medium-emphasis">{{ eventoDetalle.horaFin }}</span></template>
        <template #value>LUGAR : {{ eventoDetalle.ambiente }}</template>
      </CWidgetStatsB>
    </CCol>
    <CCol :lg="6">
      <img  :src="eventoDetalle.url" alt="" class="img-fluid" />
    </CCol>
  </CRow>

</template>
<script>

export default {
  name:'ComponenteEvento',
  props:['eventoDetalle'],
  components: {

  },
  methods:{
        formatearFecha(fechaStr) {
        // Dividir la fecha en día, mes y año
        const [anio, mes, dia] = fechaStr.split('-').map(Number);
        
        // Crear objeto Date (los meses en JS son 0-indexados, por eso mes - 1)
        const fecha = new Date(anio, mes - 1, dia);
        
        // Verificar si la fecha es válida
        if (isNaN(fecha.getTime())) {
            throw new Error('Fecha inválida');
        }

        // Opciones para formatear la fecha
        const opciones = { 
            weekday: 'long',   // "lunes"
            day: 'numeric',    // "20"
            month: 'long',     // "enero"
            year: 'numeric'    // "2025"
        };

        // Formatear según la configuración regional (español)
        return fecha.toLocaleDateString('es-ES', opciones);
        }
    }
}
</script>