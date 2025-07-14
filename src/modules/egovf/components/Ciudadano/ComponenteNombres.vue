<template>
    <CRow>
        <CCol :xs="12">
            <CWidgetStatsF color="dark" :padding="false" 
                :title="datos.nombre+' '+datos.apellido" 
                :value="'CIF : ' + datos.cif"
            >
                <template #icon>
                    <CIcon icon="cil-user" size="xl" />
                </template>
            </CWidgetStatsF>
        </CCol>
    </CRow>
</template>
<script>
export default {
    name:'ComponenteNombres',
    props:['datos']
}
</script>