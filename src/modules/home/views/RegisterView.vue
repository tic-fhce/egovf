<script setup>
import { defineAsyncComponent, ref, markRaw, onMounted, onBeforeUnmount, shallowRef } from 'vue';

const FormStudent = markRaw(defineAsyncComponent(() => import('../components/Register/FormStudent.vue')))
const FormTeacher = markRaw(defineAsyncComponent(() => import('../components/Register/FormTeacher.vue')))
const FormAdministrative = markRaw(defineAsyncComponent(() => import('../components/Register/FormAdministrative.vue')))
const FormOther = markRaw(defineAsyncComponent(() => import('../components/Register/FormOther.vue')))

import imgStudent from '@/assets/img/home/register/student.webp';
import imgTeacher from '@/assets/img/home/register/teacher.webp';
import imgAdministrative from '@/assets/img/home/register/administrative.webp';
import imgOther from '@/assets/img/home/register/other.webp';

const layoutForm = shallowRef([
  {
    cmp: FormStudent,
    name: 'Estudiante',
    img: imgStudent,
    selected: true
  },
  {
    cmp: FormTeacher,
    name: 'Docente',
    img: imgTeacher,
    selected: false
  },
  {
    cmp: FormAdministrative,
    name: 'Administrativo',
    img: imgAdministrative,
    selected: false
  },
  {
    cmp: FormOther,
    name: 'Persona Externa',
    img: imgOther,
    selected: false
  }
]);

const showDropdown = ref(false)

const handleForm = (newLayout, index) => {  
  const prevIndexSelected = layoutForm.value.findIndex(x => x.selected)

  // Si esque le da click al mismo layout entonces no hace nada
  if(newLayout.cmp == layoutForm.value[prevIndexSelected].cmp) {
    if (window.innerWidth < 480) {
      showDropdown.value = !showDropdown.value
    }
    return;
  }
  
  const newLayoutForm = [...layoutForm.value]
  newLayoutForm[prevIndexSelected].selected = false
  newLayoutForm[index].selected = true

  if (window.innerWidth < 480) {
    showDropdown.value = false
    setTimeout(() => {
      const selectedLayout = newLayoutForm[index]
      newLayoutForm.splice(index, 1)
      newLayoutForm.unshift(selectedLayout)
    }, 300);
  }

  layoutForm.value = newLayoutForm
}

const calcSizeWindow = () => {
  if (window.innerWidth > 480) {
    showDropdown.value = false
  }
  if (window.innerWidth < 480) {
    const newLayoutForm = [...layoutForm.value]
    const indexSelected = newLayoutForm.findIndex(x => x.selected)
    const selectedLayout = newLayoutForm[indexSelected]
    newLayoutForm.splice(indexSelected, 1)
    newLayoutForm.unshift(selectedLayout)
    layoutForm.value = newLayoutForm
  }
}

onMounted(() => {
  window.addEventListener('resize', calcSizeWindow)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcSizeWindow)
})

</script>

<template>
  <section class="register container">
    <aside class="options">
      <h2>Ingresar como:</h2>
      <ul :class="{ 'show': showDropdown }">
        <li v-for="(option, index) in layoutForm" :key="option.name" :class="{ 'selected': option.selected }"
          @click="handleForm(option, index)"
          :style="{ transform: `translateY(${(showDropdown ? index : 0) * 100}` + '%)' }">
          <img :src="option.img" :alt="`Image for ${option.name}`" />
          <h6>{{ option.name }}</h6>
        </li>
        <div class="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-6.387 5.21a1 1 0 0 0 -1.32 .083l-.083 .094a1 1 0 0 0 .083 1.32l2.292 2.293h-5.585l-.117 .007a1 1 0 0 0 .117 1.993h5.585l-2.292 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.074 -.104l.052 -.098l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z" />
          </svg>
        </div>
      </ul>
    </aside>
    <div class="credentials">
      <!-- <component :is="layoutForm[0].cmp" /> -->
      <component :is="layoutForm.find(x => x.selected).cmp" />
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

.options img {
  width: 100%;
  height: auto;
  max-width: 50px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
}

.options h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.options ul {
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: wrap;
  margin-bottom: 0;
  color: var(--color-white);
  z-index: 20;

  height: 65px;
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
  color: var(--color-white);
  position: absolute;
  inset: 0;
  background-color: var(--color-white);
  color: var(--color-gray-dark);
  transition: background .3s ease-in-out,
    color .3s ease-in-out,
    transform .3s ease-in-out;
  z-index: 20;
}

.options ul li:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.options ul .arrow {
  z-index: 10;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  pointer-events: none;
  transition: transform .3s ease;
}

.options ul.show .arrow {
  transform: rotate(90deg);
}

.options ul li:nth-child(n) {
  z-index: 9;
}

.options ul li span {
  font-weight: 500;
  color: var(--color-gray-dark);
}

.options ul li.selected {
  background-color: var(--color-primary);
  color: var(--color-white);
  z-index: 10;
}

.credentials {
  flex-grow: 1;
}

@media (min-width: 480px) {
  .options ul {
    max-height: auto;
    height: auto;
  }

  .options ul li {
    max-width: 50%;
    position: relative;
    transform: translateY(0%) !important;
  }

  .options .arrow {
    display: none;
    opacity: 0;
  }

}

@media (min-width: 768px) {
  .register {
    flex-direction: row;
    gap: 2rem;
  }

  .options {
    max-width: 35%;
  }

  .options ul li {
    max-width: 100%;
  }
}
</style>