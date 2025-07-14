<template>
  <div class="mb-4">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :required="required"
      :accept="accept"
      :min="min"
      :placeholder="placeholder"
      class="form-control"
      @input="handleInput"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string | number
  label: string
  type: string
  required?: boolean
  accept?: string
  min?: string | number
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', event: Event): void
}>()

const id = `input-${Math.random().toString(36).slice(2)}`

// Manejo de eventos
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

const handleChange = (event: Event) => {
  emit('change', event);
}
</script>