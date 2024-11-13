<script setup>
import { defineModel } from 'vue'

const isLogin = defineModel()

</script>

<template>
  <form action="" class="signup" v-if="!isLogin">
    <legend>Crea tu cuenta</legend>
    <label for="name">      
      <input type="text" placeholder="name" />
    </label>
    <label for="name">      
      <input type="text" placeholder="name" />
    </label>
    <button type="submit">Registrar</button>
    <button type="button" @click="() => { isLogin = true }">Iniciar sesion</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-white);
  width: 100%;
  position: absolute;
  padding: 2rem;
}

legend {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-white);
  text-transform: uppercase;
}

input {
  width: 100%;
  display: block;
  padding: .3rem;
  border: none;
  outline: none;
  border-radius: .2rem;
  background-color: var(--color-white);
}

.label {
  display: block;
}

button {
  font-size: 1rem;
  border-radius: .2rem;
  padding-block: .3rem;
  text-transform: capitalize;
  border: 0;
  background-color: var(--color-third);
  color: var(--color-white);
  font-weight: 700;
  transition: background .5s ease, color .5s ease;

  &:hover {
    background-color: var(--color-third-light);
  }
}

button[type="button"] {
  background-color: var(--color-secondary);

  &:hover {
    background-color: var(--color-secondary-light);
  }
}
</style>