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
      {
        urlImage: 'https://picsum.photos/id/1/900/400',
        tag: 'tag1',
        title: 'title1'
      },
      {
        urlImage: 'https://picsum.photos/id/2/900/400',
        tag: 'tag2',
        title: 'title2'
      },
      {
        urlImage: 'https://picsum.photos/id/3/900/400',
        tag: 'tag3',
        title: 'title3'
      },
      {
        urlImage: 'https://picsum.photos/id/4/900/400',
        tag: 'tag4',
        title: 'title4'
      },
      {
        urlImage: 'https://picsum.photos/id/5/900/400',
        tag: 'tag5',
        title: 'title5'
      },
      {
        urlImage: 'https://picsum.photos/id/6/900/400',
        tag: 'tag6',
        title: 'title6'
      }
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

