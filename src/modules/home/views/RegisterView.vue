<script setup>
import { defineAsyncComponent, ref, markRaw, onMounted, onBeforeUnmount, onBeforeUpdate, onUpdated } from 'vue';

const FormStudent = markRaw(defineAsyncComponent(() => import('../components/Register/FormStudent.vue')))
const FormTeacher = markRaw(defineAsyncComponent(() => import('../components/Register/FormTeacher.vue')))
const FormAdministrative = markRaw(defineAsyncComponent(() => import('../components/Register/FormAdministrative.vue')))
const FormOther = markRaw(defineAsyncComponent(() => import('../components/Register/FormOther.vue')))

import imgStudent from '@/assets/img/home/register/student.png';
import imgTeacher from '@/assets/img/home/register/teacher.png';
import imgAdministrative from '@/assets/img/home/register/administrative.png';
import imgOther from '@/assets/img/home/register/other.png';

const layoutForm = ref([
  {
    cmp: FormStudent,
    name: 'student',
    img: imgStudent,
    selected: true
  },
  {
    cmp: FormTeacher,
    name: 'teacher',
    img: imgTeacher,
    selected: false
  },
  {
    cmp: FormAdministrative,
    name: 'administrative',
    img: imgAdministrative,
    selected: false
  },
  {
    cmp: FormOther,
    name: 'other',
    img: imgOther,
    selected: false
  }
]);

const showDropdown = ref(false)

const handleForm = (newLayout, index) => {

  // TODO: ver si refactorizar ya que siempre hace esta busqueda para ver si cambiar o no el form
  const prevIndex = layoutForm.value.findIndex(x => x.selected)

  if (newLayout.cmp == layoutForm.value[prevIndex].cmp) {
    console.log('entra aqui');

    if (window.innerWidth < 480) {
      console.log('luego aqui');

      showDropdown.value = !showDropdown.value

      const selectedLayout = layoutForm.value[prevIndex]
      const copyLayout = JSON.parse(JSON.stringify(layoutForm.value))

      copyLayout.splice(prevIndex, 1)

      const newLayoutForm = [selectedLayout, ...copyLayout]
      layoutForm.value = newLayoutForm

      // const prev = layoutForm.value[0]

      // layoutForm.value[0] = newLayout
      // layoutForm.value[prevIndex] = prev

    }
    return
  }

  if (window.innerWidth < 480) showDropdown.value = false

  console.log('Llego aqui');

  if (window.innerWidth < 480) {
    console.log('aqui peto');

    // layoutForm.value[index] = layoutForm.value[prevIndex]

    // layoutForm.value[index].selected = false

    // layoutForm.value[prevIndex] = newLayout
    // layoutForm.value[prevIndex].selected = true
    const selectedLayout = JSON.parse(JSON.stringify(newLayout))
    selectedLayout.selected = true
    const copyLayout = JSON.parse(JSON.stringify(layoutForm.value))
    copyLayout.splice(prevIndex, 1)

    console.log(newLayout);
    console.log(selectedLayout);
    console.log(copyLayout);
    
    
    

    const newLayoutForm = [selectedLayout, ...copyLayout]
    console.log(newLayoutForm);
    
    layoutForm.value = newLayoutForm
  } else {
    layoutForm.value[prevIndex].selected = false
    layoutForm.value[index].selected = true
  }

}

const calcSizeWindow = () => {
  if (window.innerWidth > 480) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', calcSizeWindow)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calcSizeWindow)
})

onBeforeUpdate(() => {
  console.log('beforeUpdate')

})

onUpdated(() => {
  console.log('updated')
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

.options ul {
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: wrap;
  color: var(--color-white);

  height: 65px;
  width: 100%;
}

.options ul li {
  display: flex;
  align-items: center;
  gap: .5rem;
  /* border-radius: .5rem; */
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
  transition: all 2s ease;
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