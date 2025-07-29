<template>
  <div class="mb-4">
    <label :for="id" class="form-label">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      class="form-control"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string | number
  label: string
  options: { value: string | number; label: string }[]
  required?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const id = `select-${Math.random().toString(36).slice(2)}`

// Nueva función para manejar el cambio
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  if (target) {
    const value = target.value;
    emit('update:modelValue', value);
  }
}
</script>