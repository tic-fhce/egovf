<template>
  <CRow>
    <CCol :xs="12" class="text-center">
      <img :src="logo" width="70%">
    </CCol>
  </CRow>
</template>
  
<script>
  import logo from '@/assets/img/logobtic.png'
  export default {
      name:'EscritorioViewVue',
      components:{
      },
      data(){
        return{
          titulo:'Escritorio',
          logo
        }
      }
  }
  </script>