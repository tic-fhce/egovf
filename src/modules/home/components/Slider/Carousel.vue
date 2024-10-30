<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, toRefs, onMounted, onUnmounted, defineProps } from 'vue'

import CarouselItem from './CarouselItem.vue'
import CarouselControls from './CarouselControls.vue'
import CarouselIndicators from './CarouselIndicators.vue'

//const props = defineProps(['slides'])
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    // eslint-disable-next-line vue/require-valid-default-prop
    default:[
      'https://picsum.photos/id/10/900/400',
      'https://picsum.photos/id/20/900/400',
      'https://picsum.photos/id/30/900/400',
      'https://picsum.photos/id/40/900/400',
      'https://picsum.photos/id/50/900/400',
    ]
  },
  controls: {
    type: Boolean,
    default: false
  },
  indicators: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 3000
  }
})

//const slides = toRef(props, 'slides')
const { slides,
  controls,
  indicators,
  interval } = toRefs(props)

const direction = ref('right')
const currentSlide = ref(0)


const prev = (index = -1) => {  
  startAnimation()
  direction.value = 'left';

  currentSlide.value =
      currentSlide.value > 0 ? currentSlide.value + index : slides.value.length - 1
}

const next = (index = 1) => {
  startAnimation()
  direction.value = 'right'

  currentSlide.value =
      currentSlide.value < slides.value.length - 1 ? currentSlide.value + index : 0
}


const switchSlide = (index) => {  
  const newIndex = index - currentSlide.value

  if (newIndex > 0) {
    next(newIndex)
  }else{
    prev(newIndex)
  }  
}


const intervalId = ref(null)

const startAnimation = () => {
  stopAnimation()
  intervalId.value = setInterval(() => {
    next()
  }, interval.value)
}

const stopAnimation = () => {
  clearInterval(intervalId.value)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})
</script>

<template>
  <div class="carousel">
    <CarouselItem
      v-for="(slide, index) in slides"
      :key="`item-${index}`"
      :slide="slide"
      :index="index"
      :current-slide="currentSlide"
      :direction="direction"
      @mouseenter="stopAnimation"
      @mouseout="startAnimation"
    />
    <CarouselControls 
      v-if="controls"
      @next="next" 
      @prev="prev" 
    />
    <CarouselIndicators 
      v-if="indicators"
      :total="slides.length" 
      :current-slide="currentSlide" 
      @switchSlide="switchSlide"
    />
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  min-height: 400px;
  max-width: 1000px;
  height: auto;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  background-color: rgb(45, 45, 45);
}
</style>

