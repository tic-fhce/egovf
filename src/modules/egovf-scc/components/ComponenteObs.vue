<template>
  <CRow>
    <CCol :lg="6">
      <ComponenteNombres :datos="obsDetalle.datos" />
      <br>
      <CAlert :color="obsDetalle.forma.color">{{obsDetalle.forma.estado}}</CAlert>
      <CWidgetStatsB class="mb-3" :progress="{ color:obsDetalle.forma.color, value: 100}">
        <template #text>
          {{ obsDetalle.detalle }}<br>
          <strong>Tipo de Obs. :</strong> {{ obsDetalle.tipo }}<br> 
          <strong>Fechas: </strong> {{ obsDetalle.fechainicio }} | {{ obsDetalle.fechafin }}<br>
          <strong>Horas: </strong> 
          <span class="small text-medium-emphasis">{{ obsDetalle.horaEntrada }}</span> | 
          <span class="small text-medium-emphasis">{{ obsDetalle.horaSalida }}</span> 
        </template>
        <template #title><strong>ID:</strong> {{ obsDetalle.id }} | <strong>IDOBS : </strong> {{ obsDetalle.idObs }} | <strong>TIPO :</strong> {{ obsDetalle.idtipo }}</template>
        <template #value>UID: {{ obsDetalle.uidobs }}</template>
      </CWidgetStatsB>
    </CCol>
    <CCol :lg="6">
      <ComponenteImagen :imagen = "obsDetalle.url"/>
    </CCol>
  </CRow>

</template>
<script>

//Importamos Componentes
import ComponenteNombres from "@/modules/egovf/components/Ciudadano/ComponenteNombres.vue";
import ComponenteImagen from "@/components/Imagen/ComponenteImagen.vue";
export default {
  name:'ComponenteObs',
  props:['obsDetalle'],
  components: {
      ComponenteNombres,
      ComponenteImagen
  }
}
</script>