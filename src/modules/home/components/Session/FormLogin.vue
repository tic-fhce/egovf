<script setup>
import { defineModel, ref } from 'vue'

const textForm = {
  ma: 'Ingrese su Matricula',
  em: 'Ingrese su Correo Electronico',
  po: 'Ingrese su Telefono',
  ci: 'Ingrese su Cedula',
  cif: 'Ingrese su CIF'
}

const valuesForm = {
  ma: { name: 'matricula', placeholder: 'Matricula Universitaria' },
  em: { name: 'correo', placeholder: 'Correo Electronico' },
  po: { name: 'celular', placeholder: 'Numero de Celular' },
  ci: { name: 'ci', placeholder: 'Complemento C.I.' },
  cif: { name: 'cif', placeholder: 'Ingrese su Codigo de Identificacion Facultativa' }
}

const isLogin = defineModel()

const method = ref('ma')

const login = (e) => {
  e.preventDefault()
  console.log(Object.fromEntries(new FormData(e.target).entries()))
}

</script>

<template>
  <form class="signin" v-if="isLogin" @submit="login">
    <legend>Inicia Sesion
      <h2> {{ textForm[method] }} </h2>
    </legend>
    <label for="name">
      <select class="method" name="method" id="method" v-model="method">
        <option value="ma" selected>Matricula</option>
        <option value="em">Correo electronico</option>
        <option value="po">Telefono</option>
        <option value="ci">Cedula</option>
        <option value="cif">CIF</option>
      </select>
    </label>
    <label for="credential" v-if="method">
      <input 
        :name="valuesForm[method].name" 
        :placeholder="valuesForm[method].placeholder"
        type="text" 
        required 
        :class="{ 'ext-active': method == 'ci' }"
      />
      <select class="ext" name="ext" id="ext" v-if="method == 'ci'">
        <option value="lp">lp</option>
        <option value="sc">sc</option>
        <option value="cb">cb</option>
        <option value="or">or</option>
        <option value="pt">pt</option>
        <option value="tr">tr</option>
        <option value="ch">ch</option>
        <option value="bn">bn</option>
        <option value="pd">pd</option>
      </select>
    </label>
    <label for="password">
      <input name="pass" type="password" placeholder="Contraseña" />
    </label>
    <button type="submit">Ingresar</button>
    <button type="button" @click="() => { isLogin = false }">Crear cuenta</button>
  </form>
</template>

<style scoped>
h2 {
  font-weight: normal;
  font-size: 1rem;
  text-align: center;
  text-transform: none;
  color: var(--color-third);
  line-height: 1;
  margin-bottom: 0;
}

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

input,
select.method {
  width: 100%;
  display: block;
  padding: .3rem;
  border: none;
  outline: none;
  border-radius: .2rem;
  background-color: var(--color-white);
}

select.method {
  background-color: var(--color-secondary-light);
  color: var(--color-white);
}

option {
  background-color: var(--color-white);
  color: var(--color-gray-dark);
}

select.method:focus,
input:focus {
  box-shadow: 0 0 10px var(--color-third);
}

label {
  display: flex;
}

select.ext {
  background-color: var(--color-white);
  color: var(--color-gray-dark);
  border-radius: 0 .2rem .2rem 0;
  border: none;
  border-left: 1px solid var(--color-gray-dark);
}

select.ext:focus {
  box-shadow: 0 0 10px var(--color-third);
}

.ext-active {
  border-radius: .2rem 0 0 .2rem;
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