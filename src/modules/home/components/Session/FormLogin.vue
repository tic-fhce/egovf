<script setup>
import UsuarioService from '@/services/usuarioServices.js';
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useCookies } from '../../utils/cookiesManager';
import Swal from 'sweetalert2'
import ModalDialog from '../ForgotPassword/ModalDialog.vue';

const userService = new UsuarioService()

const form = ref(null)

const router = useRouter()

const { setUserCookies } = useCookies()

const textForm = {
  1: 'Ingrese su CIF',
  2: 'Ingrese su Matricula',
  3: 'Ingrese su Cedula',
  4: 'Ingrese su Correo Electronico',
  5: 'Ingrese su Telefono',
}

const valuesForm = {
  1: { name: 'cif', placeholder: 'Codigo de Identificacion Facultativa', inputType: 'number' },
  2: { name: 'matricula', placeholder: 'Matricula Universitaria', inputType: 'number' },
  3: { name: 'ci', placeholder: 'Complemento C.I.', inputType: 'number' },
  4: { name: 'correo', placeholder: 'Correo Electronico', inputType: 'email' },
  5: { name: 'celular', placeholder: 'Numero de Celular', inputType: 'number' },
}

const method = ref(4) // principal method to be called is method 4 email

const login = async (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target).entries())
  // console.log(data)
  try {            
    const res = await userService.getToken(data)
        
    if (res.data == "") {
      throw {
        title: 'Credenciales Incorrectas',
        text: 'Los datos Ingresados son Incorrectos, verifique e intente Nuevamente, o comuníquese con el administrador.'
      }
    }  
    
    userService.headersUsuario(res.data.token);
    setUserCookies(res.data)
    router.push('/egovf')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error?.title ?? 'Servidor no encontrado',
      text: error?.text ?? 'El servidor no está respondiendo, comuniquese con el administrador.',
      // footer: '<a href="https://svfhce.umsa.bo">Porque pasa esto?</a>'
    })
  }
}

watch(method, async () => {
  const nameInput = valuesForm[method.value].name
  await nextTick();
  form.value[`${nameInput}`].value = '';
  form.value.pass.value = '';
})

</script>

<template>
  <form class="signin" @submit="login" id="form" ref="form">
    <legend>Inicia Sesion
      <h2> {{ textForm[method] }} </h2>
    </legend>
    <label for="name">
      <select class="method" name="id" id="method" v-model="method">
        <option value="1">CIF</option>
        <option value="2" selected>Matricula</option>
        <option value="3">Cedula</option>
        <option value="4">Correo electronico</option>
        <option value="5">Telefono</option>
      </select>
    </label>
    <label for="credential" v-if="method">
      <input :name="valuesForm[method].name" :placeholder="valuesForm[method].placeholder" :type="valuesForm[method].inputType" required
        :class="{ 'ext-active': method == 3 }" />
      <select class="ext" name="complemento" id="complemento" v-if="method == 3">
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
      <input id="password" name="pass" type="password" placeholder="Contraseña" />
    </label>
    <button type="submit">Ingresar</button>
    <div class="options">
      <button type="button" @click="() => { router.push('/register') }">Crear cuenta</button>
      <!-- <button type="button">¿Olvidaste tu contraseña?</button> -->
      <ModalDialog type="link" title="¿Olvidaste tu contraseña?" />
    </div>
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

option:first-child {
  border-radius: 0;
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

button[type="submit"] {
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

.options {
  display: flex;
  justify-content: space-between;
}

button[type="button"] {
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
</style>