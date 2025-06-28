<template>
  <CFooter>
    <div>
      <RouterLink to="/crali" target="_blank">eGOVF</RouterLink>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} FHCE.</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="https://fhce.umsa.bo" target="_blank">UTIC</a>
    </div>
  </CFooter>
</template>

<script>

export default {
  name: 'ComponenteFooter',
}
</script>
