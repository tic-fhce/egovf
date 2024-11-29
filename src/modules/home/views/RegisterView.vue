<script setup>
import { defineAsyncComponent, ref, shallowRef } from 'vue';

import FormStudent from '../components/Register/FormStudent.vue';
const FormTeacher = defineAsyncComponent(() => import('../components/Register/FormTeacher.vue'))
const FormAdministrative = defineAsyncComponent(() => import('../components/Register/FormAdministrative.vue'))
const FormOther = defineAsyncComponent(() => import('../components/Register/FormOther.vue'))

const layoutForm = shallowRef(FormStudent)
const selectedForm = ref('student')

const handleForm = (cmp, opt) => {
  layoutForm.value = cmp
  selectedForm.value = opt
}

</script>

<template>
  <section class="register container">
    <aside class="options">
      <h2>Ingresar como:</h2>
      <ul>
        <li :class="{ 'selected' : (selectedForm === 'student') }" @click="handleForm(FormStudent, 'student')">
          <img src="@/assets/img/home/register/student.png" alt="student">
          <h6 href="">Estudiante</h6>
        </li>
        <li :class="{ 'selected' : (selectedForm === 'teacher') }" @click="handleForm(FormTeacher, 'teacher')">
          <img src="@/assets/img/home/register/teacher.png" alt="teacher">
          <h6 href="">Docente</h6>
        </li>
        <li :class="{ 'selected' : (selectedForm === 'administrative') }" @click="handleForm(FormAdministrative, 'administrative')">
          <img src="@/assets/img/home/register/administrative.png" alt="administrative">
          <h6 href="">Administrativo</h6>
        </li>
        <li :class="{ 'selected' : (selectedForm === 'other') }" @click="handleForm(FormOther, 'other')">
          <img src="@/assets/img/home/register/other.png" alt="other">
          <h6 href="">Persona no vinculada</h6>
        </li>
      </ul>
    </aside>
    <div class="credentials">
      <component :is="layoutForm" />
    </div>
    <br><br><br><br><br>
  </section>
</template>

<style scoped>
.register {
  margin-top: calc(65px + 1rem);
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.options img{
  width: 100%;
  height: auto;
  max-width: 50px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
}

.options ul {
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: wrap;
  
  min-height: 65px;
  width: 100%;
}
.options ul li {
  display: flex;
  align-items: center;
  gap: .5rem;
  border-radius: .5rem;
  padding: .5rem;
  cursor: pointer;
  height: 65px;
  flex-grow: 1;
  width: 100%;
}

.options ul li span {
  font-weight: 500;
  color: var(--color-gray-dark);
}

.options ul li.selected {
  background-color: var(--color-primary);
  color: var(--color-white);
  transition: all .3s ease;
  transform: translateY(0);
}

.credentials {
  flex-grow: 1;
}

@media (min-width: 480px) {
  .options li {
    max-width: 50%;
  }
}

@media (min-width: 768px) {
  .register {
    flex-direction: row;
    gap: 2rem;
  }

  .options {
    width: 35%;
  }
  .options li {
    max-width: 100%;
  }
}

</style>