<template>
  <div
    v-if="show"
    :class="['inline-flex items-center rounded-lg px-2 py-1.5 text-white duration-100 focus:outline-none', bgColor, hoverColor]"
    @click="onClick"
  >
    <component :is="icon" class="w-6 h-6" />
  </div>
</template>

<script setup>
defineProps({
  icon: Object,
  onClick: Function,
  bgColor: {
    type: String,
    default: 'bg-gray-400',
  },
  hoverColor: {
    type: String,
    default: 'hover:bg-gray-500',
  },
  show: {
    type: Boolean,
    default: true,
  }
});
</script>
