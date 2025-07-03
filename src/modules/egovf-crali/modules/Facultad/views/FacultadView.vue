<template>
  <div>
    <h3>Facultad</h3>
  </div>
</template>

<script lang="ts" setup>
console.log('Facultad')

interface Props {
  user: string;
}

defineProps<Props>();
</script>