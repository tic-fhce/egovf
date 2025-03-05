<script setup>
import { toRefs, computed, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['mouseenter', 'mouseout'])

const props = defineProps(['slide', 'index', 'currentSlide', 'direction'])

const { slide, 
  index, 
  currentSlide, 
  direction } = toRefs(props)

  const transitionEffect = computed(() => {
    return direction.value === 'right' ? 'slide-in' : 'slide-out'
  })

  //console.log(slide.value)

</script>

<template>
  <Transition :name="transitionEffect">
    <figure
      v-show="index === currentSlide"
      @mouseenter="() => { emit('mouseenter') }"
      @mouseout="emit('mouseout')"
    >
      <img
        :src="slide.urlImage"
        :alt="`Imagen numero ${index}`"        
      />    
      <figcaption>
        <span>{{ slide.tag }}</span>
        <h2>{{ slide.title }}</h2>        
      </figcaption>
    </figure>    
  </Transition>
</template>

<style scoped>
figure {
  width: 100%;
  height: 100%;
  position: absolute;
}

figure:hover figcaption {
  transform: translateY(0);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

figcaption {
  position: absolute;
  inset: 0;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(to top, var(--color-secondary), transparent);
  pointer-events: none;

  transform: translateY(100%);
  transition: transform .3s ease-in-out;
}

figcaption span {
  font-size: 1.2rem;
  text-transform: uppercase;
}

figcaption h2 {
  text-align: center;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  font-weight: 700; 
  text-wrap: pretty;
  padding-inline: 10px;
}

/* Aqui es a donde tiene que llegar */
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: transform 0.5s ease-in-out;
  transform: translateX(0%);
}
/*RIGHT*/
/* Aqui es cuando entra */
.slide-in-enter-from {
  transform: translateX(-100%);
}
/* Aqui es cuando sale */
.slide-in-leave-to {
  transform: translateX(100%);
}
/*LEFT*/
/* Aqui es cuando entra */
.slide-out-enter-from {
  transform: translateX(100%);
}
/* Aqui es cuando sale */
.slide-out-leave-to {
  transform: translateX(-100%);
}
</style>
