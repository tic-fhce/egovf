<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="pdf-modal-overlay"
      @click.self="onClose"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdfModalTitle"
    >
      <div class="pdf-modal-content" tabindex="0">
        <header class="pdf-modal-header">
          <h5 id="pdfModalTitle" class="pdf-modal-title">Visualizador PDF</h5>
          <button
            class="pdf-modal-close"
            aria-label="Cerrar modal"
            @click="onClose"
          >
            ×
          </button>
        </header>
        <section class="pdf-modal-body">
          <iframe
            v-if="pdfUrl"
            :src="pdfUrl"
            width="100%"
            height="100%"
            type="application/pdf"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            frameborder="0"
          ></iframe>
          <p v-else class="no-pdf-msg">No se encontró PDF disponible.</p>
        </section>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  pdfUrl: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => {
  emit('close')
}
</script>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pdf-modal-content {
  background: #fff;
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  outline: none;
}

.pdf-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

.pdf-modal-title {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.pdf-modal-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  color: #333;
  transition: color 0.2s ease-in-out;
}
.pdf-modal-close:hover {
  color: #d33;
}

.pdf-modal-body {
  flex-grow: 1;
  overflow: hidden;
}

.no-pdf-msg {
  padding: 1rem;
  text-align: center;
  color: #555;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
