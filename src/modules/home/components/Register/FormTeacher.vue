<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { reactive } from 'vue'

const payload = reactive({
  ci: '',
  birthdate: '',
  password: '',
  confirm_password: '',
})

const numeric = helpers.regex(/^[1-9]+[0-9]*$/)

const rules = {
  ci: {
    required: helpers.withMessage('Este campo es requerido', required),
    minLength: helpers.withMessage('El campo debe tener minimo 4 caracteres', minLength(4)),
    maxLength: helpers.withMessage('El campo debe tener maximo 10 caracteres', maxLength(10)),
    numeric: helpers.withMessage('El campo debe ser numérico', numeric),
  },
  birthdate: {
    required: helpers.withMessage('Este campo es requerido', required),
  },
  password: {
    required: helpers.withMessage('Este campo es requerido', required),
  },
  confirm_password: {
    required: helpers.withMessage('Este campo es requerido', required),
  },
}

const v$ = useVuelidate(rules, payload)

const handleSubmit = async (event) => {
  event.preventDefault()
  const isValid = await v$.value.$validate()
  if(!isValid) {
    console.error('validation failed')
    return
  }
  console.log(payload)
}

</script>

<template>
  <h2>Crea una cuenta de Docente</h2>
  <form @submit="handleSubmit">
    <label for="ci">
      <input v-model="payload.ci" type="text" id="ci" name="ci" required placeholder=" ">
      <span>Cedula de Identidad</span>
      <div class="error">{{ v$?.ci?.$errors[0]?.$message }}</div>
    </label>
    <label class="calendar" for="calendar">
      <div class="date-wrapper">
        <input v-model="payload.birthdate" id="calendar" type="date" class="date-input">
      </div>
      <span class="span-calendar">Fecha de Nacimiento</span>
      <div class="error">{{ v$?.birthdate?.$errors[0]?.$message }}</div>
    </label>
    <div class="credentials__group">
      <label for="password">
        <input v-model="payload.password" type="password" id="password" name="password" required placeholder=" ">
        <span>Contraseña</span>
        <div class="error">{{ v$?.password?.$errors[0]?.$message }}</div>
      </label>
      <label for="password2">
        <input v-model="payload.confirm_password" type="password" id="password2" name="password2" required placeholder=" ">
        <span>Repetir Contraseña</span>
        <div class="error">{{ v$?.confirm_password?.$errors[0]?.$message }}</div>
      </label>
    </div>
    <button type="submit">Crear Cuenta</button>
  </form>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  flex-grow: 1;
  /* width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0; */
  color: blue;
  /* background: 0 0;
  margin: 0;
  opacity: 0; */
  pointer-events: auto;
}

.credentials {
  width: 100%;
  height: auto;
}

.credentials h2 {
  padding-bottom: .25rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  position: relative;
  width: fit-content;
  margin-bottom: 2.5rem;
}

.credentials h2::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: var(--color-third);
  bottom: -.5rem;
  left: 0;
  right: 0;
}

.credentials form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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

.credentials__group {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

@media (min-width: 480px) {
  .credentials__group {
    gap: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .credentials__group {
    gap: 1rem;
  }
}

.credentials__group label {
  flex-basis: 220px;
  flex-grow: 1;
}

div.error {
  color: red;
  position: absolute;
  display: inline-block;
  width: fit-content;
  height: 20px;
  bottom: -60%;
  right: 0;
  left: 0;
  width: 100%;
  font-size: .85rem;
  white-space: nowrap;
  /* Para que no exista saltos de linea */
  text-overflow: ellipsis;
  /* Para que el texto si sale de la caja sea ... */
  overflow: hidden;
  /* Para que el texto no se salga de la caja */
}

/* Para el input tipo date
Una pequeña guia pero lo adaptamos a nuestro estilo
https://francisco-marquez-job.medium.com/masterclasscss-estilar-un-input-date-sin-morir-en-el-intento-3bdad83d56a
*/


.calendar span {
  align-items: flex-start;
  top: -30% !important;
  transform: scale(0.8);
  left: 0%;
}

.date-wrapper {
  position: relative;
  background-color: red;
  width: minmax(300px, 100%);
  height: auto;
}

/* El input de fecha */
.date-input {
  min-width: fit-content;
  padding-right: 10px;
  z-index: 10;
  -webkit-appearance: none;
}

/* El icono del calendario */
.date-input::-webkit-calendar-picker-indicator {  
  position: absolute;
  right: 0;
  width: calc(100% - 14ch);
  height: 100%;
  cursor: pointer;
  z-index: 5;
  pointer-events: auto;
  opacity: 0;
  color: transparent;
}

</style>