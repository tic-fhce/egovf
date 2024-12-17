<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';

const payload = reactive({
  ci: '',
  mat: '',
  password: '',
  confirm_password: '',
})

const rules = {
  ci: { required },
}

const v$ = useVuelidate(rules, payload)

// Función para validar el formulario
const handleSubmit = async (event) => {
  event.preventDefault()
  const isValid = await v$.value.$validate()
  if (!isValid) {
    console.error('validation failed')
    return
  }
  console.log(payload)

}

</script>

<template>
  <form @submit="handleSubmit">
    <h2>Crea una cuenta de Estudiante</h2>
    {{ payload }}
    <label for="ci">
      <input v-model="payload.ci" type="text" id="ci" name="ci" required placeholder="">
      <span>Cedula de Identidad</span>
      <div class="error">{{  v$?.ci?.$errors[0]?.$message  }}</div>
    </label>
    <label for="mat">
      <input v-model="payload.mat" type="text" id="mat" name="mat" required placeholder=" ">
      <span>Matricula</span>
    </label>
    <div class="credentials__password">
      <label for="password">
        <input v-model="payload.password" type="password" id="password" required name="password" placeholder=" ">
        <span>Contraseña</span>
      </label>
      <label for="password2">
        <input v-model="payload.confirm_password" type="password" id="password2" required name="password2" placeholder=" ">
        <span>Repetir Contraseña</span>
      </label>
    </div>
    <button type="submit">Crear Cuenta</button>
  </form>
</template>

<style scoped>
.credentials {
  width: 100%;
  height: auto;
}

.credentials form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.credentials form h2 {
  padding-bottom: .25rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  position: relative;
  width: fit-content;
}

.credentials form h2::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: var(--color-third);
  bottom: -.5rem;
  left: 0;
  right: 0;
}

.credentials form label {
  width: 100%;
  border-bottom: 1px solid var(--color-gray-dark);
  position: relative;
  padding-block: .5rem;
  cursor: text;
}

.credentials form input {
  width: 100%;
  border: 0;
  outline: 0;
}

.credentials form label span {
  position: absolute;
  display: inline-block;
  height: fit-content;
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all .3s ease;
  transform-origin: left top;
}

.credentials form input:focus~span,
.credentials form input:valid~span,
.credentials form input:not(:placeholder-shown)~span {
  align-items: flex-start;
  top: -40%;
  transform: scale(0.8);
  left: 0%;
}


.credentials form button {
  width: 100%;
  padding: .5rem;
  border: 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: .5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .5s ease;
}

.credentials form button:hover {
  background-color: var(--color-secondary);
}

.credentials__password {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.credentials__password label {
  flex-basis: 220px;
  flex-grow: 1;
}

div.error {
  color: red;
  position: absolute;
  display: inline-block;
  height: fit-content;
  width: fit-content;
  top: -40%;
  right: 0;
  font-size: .85rem;
}
</style>