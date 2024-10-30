<script setup>
import { ref } from 'vue'

import Carousel from '../../../components/Slider/Carousel.vue';

import img1 from '@/assets/img/portfolio/fullsize/1.jpg';
import img2 from '@/assets/img/portfolio/fullsize/2.jpg';
import img3 from '@/assets/img/portfolio/fullsize/3.jpg';
import img4 from '@/assets/img/portfolio/fullsize/4.jpg';
import img5 from '@/assets/img/portfolio/fullsize/5.jpg';
import img6 from '@/assets/img/portfolio/fullsize/6.jpg';

// const slides = ref([
//   'https://picsum.photos/id/1/900/400',
//   'https://picsum.photos/id/2/900/400',
//   'https://picsum.photos/id/3/900/400',
//   'https://picsum.photos/id/4/900/400',
//   'https://picsum.photos/id/5/900/400',
// ])

//const slides = ref([img1, img2, img3, img4, img5, img6]);

const slides = ref([
{
  urlImage: img1,
  tag: 'Modulo SCC',
  title: 'Modulo de Control de Personal'
},
{
  urlImage: img2,
  tag: 'Modulo 3i',
  title: 'Modulo de Inventario Inteligente'
},
{
  urlImage: img3,
  tag: 'Modulo RDA',
  title: 'Modulo de Reserva de Ambientes'
},
{
  urlImage: img4,
  tag: 'Dockers',
  title: 'Servicios y Sistemas Dockerizados'
},
{
  urlImage: img5,
  tag: 'Modulo CDA',
  title: 'Modulo de Certificados Digitales Automaticos'
},
{
  urlImage: img6,
  tag: 'Sistemas',
  title: 'Sistemas Interoperables e Integrados'
}
]);

</script>

<template>  
  <section class="">
    <Carousel 
      :slides="slides" 
      :controls="true" 
      :indicators="true"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
}
</style>
