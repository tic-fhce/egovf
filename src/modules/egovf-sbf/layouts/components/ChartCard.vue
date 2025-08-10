<template>
  <div
    :class="['chart-container bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md', $attrs.class]"
    role="img"
    :aria-label="`Chart for ${title}`"
    :aria-describedby="`desc-${chartId}`"
  >
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <div v-else>
      <canvas :ref="canvasRef" :id="chartId" />
      <div :id="`desc-${chartId}`" class="sr-only">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue';
import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

const props = defineProps<{
  canvasRef: Ref<HTMLCanvasElement | null>;
  chartId: string;
  title: string;
  description: string;
  config: ChartConfiguration;
}>();

const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(() => {
  if (props.canvasRef) {
    try {
      new Chart(props.canvasRef.value!, props.config);
      isLoading.value = false;
    } catch (err) {
      error.value = 'Failed to render chart';
      console.error('Chart initialization error:', err);
    }
  }
});

// Watch for config changes to update the chart
watch(() => props.config, (newConfig) => {
  if (props.canvasRef.value && !isLoading.value) {
    try {
      new Chart(props.canvasRef.value, newConfig);
    } catch (err) {
      error.value = 'Failed to update chart';
      console.error('Chart update error:', err);
    }
  }
}, { deep: true });
</script>

<style scoped>
@import '../../styles/tailwind.css';

.chart-container {
  position: relative;
  min-height: 300px;
  aspect-ratio: 4 / 3;
}

@media (min-width: 768px) {
  .chart-container {
    min-height: 350px;
  }
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>