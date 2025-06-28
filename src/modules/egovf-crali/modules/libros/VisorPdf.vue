<template>
  <div>
    <!-- Embed PDF con parámetro para abrir página 1 o todo -->
    <embed
      :src="pdfUrl"
      type="application/pdf"
      width="100%"
      height="600px"
    />
  </div>
</template>

<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
}
</script>
