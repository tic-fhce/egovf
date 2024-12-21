<script setup>
import { toRefs, defineProps, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'link'
  },
  title: {
    type: String,
    default: 'Modal Dialog',
    required: true
  }
})

const { type, title } = toRefs(props)
const dialogRef = ref()

const handleDialog = () => {
  dialogRef.value.showModal()
}

</script>

<template>
  <Teleport to="body">
    <dialog ref="dialogRef">
      <div class="content">
        <h1>Modal Dialog</h1>
        <p>Greetings, one and all!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ullam aspernatur at, deserunt beatae
          minima blanditiis ab aliquid nobis ex eligendi in sequi maxime, molestiae voluptatem labore magni nisi. Optio.
        </p>
        <button>Close dialog</button>
      </div>
    </dialog>
  </Teleport>
  <div>
    <button type="button" @click="handleDialog" class="link" v-if="type === 'link'">{{ title }}</button>
    <button type="button" @click="handleDialog" class="button" v-else>{{ title }}</button>
  </div>
</template>

<style scoped>
dialog {
  display: block;
  inset: 0;
  overflow: hidden;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.5);
}

dialog .content {
  position: relative;
  width: fit-content;
  height: auto;
}

dialog:not([open]) {
  pointer-events: none;
  opacity: 0;
}

dialog::backdrop {
  background-color: #00000060;
  backdrop-filter: blur(5px);
}

button.link {
  color: var(--color-gray);
  background-color: transparent;
  transition: color .5s ease;
  border: none;
  font-weight: 500;
  text-transform: underline;

  &:hover {
    color: var(--color-secondary-light);
  }
}

button.button {
  color: var(--color-white);
  background-color: var(--color-secondary);
  padding-inline: 2rem;
  padding-block: 1rem;
  transition: background .5s ease;
  border: none;
  font-weight: 500;
  border-radius: .5rem;

  &:hover {
    background-color: var(--color-secondary-light);
  }
}
</style>