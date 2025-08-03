<template>
    <div
      ref="zoomContainer"
      class="zoom-container"
      @wheel.prevent="onWheel"
      @mousedown="startDragging"
      @mousemove="onDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
    >
      <img
        :src="imagen"
        alt=""
        class="img-fluid"
        loading="lazy"
        :style="imgStyle"
      />
      <!-- Controles -->
      <div class="zoom-controls">
        <CButton @click.stop="zoomIn" color="light" size="sm">
          <CIcon icon="cil-plus" />
        </CButton>
        <CButton @click.stop="deactivateZoom" color="light" size="sm">
          <CIcon icon="cil-x" />
        </CButton>
      </div>
    </div>
</template>

<script>
export default {
  name:'ComponenteImagen',
  props:['imagen'],
  data() {
    return {
      scale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,

    }
  },
  computed: {
    imgStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
        cursor: this.scale > 1 ? 'grab' : 'default',
        transition: this.isDragging ? 'none' : 'transform 0.2s ease',
      };
    },
  },
  methods: {
    zoomIn() {
      this.scale = Math.min(this.scale + 0.2, 5);
    },
    resetZoom() {
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
    },
    deactivateZoom() {
      this.resetZoom();
    },
    onWheel(e) {
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      this.scale = Math.min(Math.max(this.scale + delta, 1), 5);
    },
    startDragging(e) {
      if (this.scale <= 1) return;
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    },
    onDragging(e) {
      if (!this.isDragging) return;
      this.translateX += (e.clientX - this.lastX) / this.scale;
      this.translateY += (e.clientY - this.lastY) / this.scale;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    },
    stopDragging() {
      this.isDragging = false;
    },
  }
}
</script>