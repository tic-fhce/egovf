<script setup>
import { ref } from 'vue';

const isLogin = ref(true)

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="logo">
        <img src="/logotic.png" alt="Logo tic umsa">
      </div>
      <div class="credentials">
      <Transition>
        <form action="" class="signin" v-if="isLogin">
          <legend>Inicia Sesion</legend>
          <label for="name">
            <input type="text" placeholder="name" />
          </label>
          <label for="name">
            <input type="text" placeholder="lastname" />
          </label>
          <button type="submit">Enviar</button>
          <button type="button" @click="() => { isLogin = false }">Crear cuenta</button>
        </form>
      </Transition>
        <Transition>
          <form action="" class="signup" v-if="!isLogin">
            <legend>Crea tu cuenta</legend>
            <label for="name">
              Phone:
              <input type="text" placeholder="name" />
            </label>
            <button type="submit">Enviar</button>
            <button type="button" @click="() => { isLogin = true }">Iniciar sesion</button>
          </form>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--color-white);
  width: clamp(300px, 100%, 700px);
  flex-wrap: wrap;
  height: auto;
  box-shadow: 50px 50px 50px rgba(0, 0, 0, 0.2);
}

.wrapper .logo {
  max-width: 300px;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-white);
}

.wrapper img {
  height: auto;
  width: 100%;
  flex-basis: 100%;
  max-width: 200px;
  height: auto;
  padding-block: 1rem;
}

.wrapper .credentials {
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 300px;
  flex-grow: 1;
  height: 100%;
  min-height: 400px;
  position: relative;
}

.wrapper .signup {}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-white);
  width: 100%;
  position:absolute;  
  padding: 1.5rem;
}

legend {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 900;
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
    background-color: var(--color-secondary);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>