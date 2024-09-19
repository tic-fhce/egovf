<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6">{{ titulo }}</CCol>
                        <CCol :lg="6" class="text-end">
                            <CButton v-if="opciones" @click="clickModalCiudadano(true)" color="success" class="font" size="sm"><CIcon icon="cil-cloud-upload" class="me-2"/>Agregar</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div class="table-responsive">
                        <table id="personaTabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th v-for="(key, index) in Object.keys(lista[0])" :key="index">{{ key }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ambiente in lista" :key="ambiente.id">
                                    <td v-for="(value, keyIndex) in Object.values(ambiente)" :class="verEstado(keyIndex,ambiente)" :key="keyIndex">{{ value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script setup>

const props = defineProps({
    titulo: String,
    lista: Object,
    opciones: Boolean,
    listaOpciones: Array,
})

const verEstado = (keyIndex, ambiente) => {
    const keys = Object.keys(ambiente);
    if (keys[keyIndex] === 'estado') {
        return ambiente.estado === 'Activo' ? ' text-success fw-bolder' : ' text-danger fw-bolder';
    }
}

console.log(props.titulo);
</script>