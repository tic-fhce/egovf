<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { reactive } from 'vue';
import RegisterService from '../../services/RegisterService';

/**
 * Sin contraseñas******
 * Estudiante
  * Matricula - CI
  * Docente
  * CI - Fecha de nacimiento
  * Administrativo
  * CI - Fecha de nacimiento
  * Otros
  * email - phone - nombre - paterno - materno
 */
const payload = reactive({
  ci: '',
  mat: '',
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
  mat: {
    required: helpers.withMessage('Este campo es requerido', required),
    minLength: helpers.withMessage('El campo debe tener minimo 4 caracteres', minLength(4)),
    maxLength: helpers.withMessage('El campo debe tener maximo 10 caracteres', maxLength(10)),
    numeric: helpers.withMessage('El campo debe ser numérico', numeric),
  },
  password: {
    required: helpers.withMessage('Este campo es requerido', required),
  },
  confirm_password: {
    required: helpers.withMessage('Este campo es requerido', required),
  },
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

  try {
    const res = await RegisterService.postRegister({ payload })
    console.log(res)
  }catch(error) {
    console.error(error)
    alert('Error al registrar')
  }

}

</script>

<template>
  <h2>Crea una cuenta de Estudiante</h2>
  <form @submit="handleSubmit">
    <label for="ci">
      <input v-model="payload.ci" type="text" id="ci" name="ci" required placeholder="">
      <span>Cedula de Identidad</span>
      <div class="error">{{ v$?.ci?.$errors[0]?.$message }}</div>
    </label>
    <label for="mat">
      <input v-model="payload.mat" type="text" id="mat" name="mat" required placeholder=" ">
      <span>Matricula</span>
      <div class="error">{{ v$?.mat?.$errors[0]?.$message }}</div>
    </label>
    <div class="credentials__group">
      <label for="password">
        <input v-model="payload.password" type="password" id="password" required name="password" placeholder=" ">
        <span>Contraseña</span>
        <div class="error">{{ v$?.password?.$errors[0]?.$message }}</div>
      </label>
      <label for="password2">
        <input v-model="payload.confirm_password" type="password" id="password2" required name="password2"
          placeholder=" ">
        <span>Repetir Contraseña</span>
        <div class="error">{{ v$?.confirm_password?.$errors[0]?.$message }}</div>
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
</style>