<script setup>
import { toRefs, defineProps, ref, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'link'
  },
  title: {
    type: String,
    default: 'Modal Dialog',
    required: true
  }
})

const { type, title } = toRefs(props)
const dialogRef = ref()
const open = ref(false)

const credential = ref('')
const isValidCredential = ref(false)
const isError = ref('')
const isLoading = ref(false)

const handleDialog = () => {  
  if (!dialogRef.value.open) {
    dialogRef.value.showModal()
    open.value = true
  } else {
    dialogRef.value.close()
    open.value = false    
  }
}

const handleSubmit = async () => {
  console.log('Enviado')
  try {
    isLoading.value = true
    const res = await fetch('https://reqres.in/api/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "email": "eve.holt@reqres.in",
        "password": "pistol"
      })
      // body: JSON.stringify({
      //   "email": "sydney@fife"
      // })
    })

    if (!res.ok) throw new Error('Error al conectar con el servidor ')

    const data = await res.json()
    console.log(data)
    isValidCredential.value = true

  } catch (error) {
    console.error(error)
    isError.value = error.message
    // setTimeout(() => {
    //   handleDialog()
    // }, 2000)
  } finally {
    isLoading.value = false
  }
}

watch(open, () => {
  credential.value = ''
  isError.value = ''
  isValidCredential.value = false
})

</script>

<template>
  <Teleport to="body">
    <dialog ref="dialogRef">
      <form @submit.prevent="handleSubmit">
        <header>
          <h3>Recupera tu cuenta</h3>
          <svg @click="handleDialog" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </header>
        <div class="content">
          <div class="error" v-if="isError !== ''">
            <div class="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
              </svg>
            </div>
            <div class="message">
              {{ isError }}
            </div>
          </div>
          <p>Ingresa tu correo electrónico para poder recuperar tu contraseña.</p>
          <input v-model="credential" class="credential" type="email" placeholder="Correo electrónico registrado" required>
          <input v-if="isValidCredential" v-model="code" type="number" placeholder="Ingresa el código enviado a tu correo" required>
        </div>
        <footer>
          <button type="button" @click="handleDialog">Cerrar</button>
          <button 
            :disabled="isLoading"
            type="submit"
          >
            {{ isLoading ? 'Enviando...' : 'Enviar'  }}
          </button>
        </footer>
      </form>
    </dialog>
  </Teleport>
  <div>
    <button type="button" @click="handleDialog" class="link" v-if="type === 'link'">{{ title }}</button>
    <button type="button" @click="handleDialog" class="button" v-else>{{ title }}</button>
  </div>
</template>

<style scoped>
dialog {
  display: block;
  position: fixed;
  margin-inline: auto;
  top: -100%;
  z-index: 100;
  border: 0;
  border-radius: .5rem;
  box-shadow: 10px 10px 50px var(--color-black);
  transition: all .3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  width: clamp(350px, 40%, 500px);
}

dialog[open] {
  top: 20%;
  opacity: 1;
  pointer-events: auto;
}

dialog::backdrop {
  background-color: #00000060;
  backdrop-filter: blur(5px);
}

dialog header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray-light);
}

dialog header h3 {
  margin-bottom: 0;
}

dialog .content {
  padding: 1rem;
}

dialog .content input {
  width: 100%;
  padding: .5rem;
  border-radius: .5rem;
  outline: 0;
  border: 1px solid var(--color-gray-light)
}

dialog .content input.credential {
  margin-bottom: .5rem;
}

dialog .content .error {
  display: flex;
  align-items: center;
  border: 1px solid rgb(219, 45, 45);
  background-color: rgb(219, 45, 45);
  margin-block: .5rem;
  min-height: 2.5rem;
  height: auto;
}

dialog .content .error .icon {
  background-color: rgb(219, 45, 45);
  color: var(--color-white);
  height: 100%;
  width: 2rem;
  padding-inline: 1rem;
  display: grid;
  place-content: center;
}

dialog .content .error .message {
  padding: .5rem;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background-color: var(--color-white);
}

dialog footer {
  padding: 1rem;
  border-top: 1px solid var(--color-gray-light);
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
}

dialog footer button {
  padding-inline: 1rem;
  padding-block: .5rem;
  border-radius: .5rem;
  border: 0;
  outline: 0;
}

dialog footer button:first-child {
  background-color: var(--color-gray);
  color: var(--color-white);
}

dialog footer button:last-child {
  background-color: var(--color-primary);
  color: var(--color-white);
}

dialog svg {
  cursor: pointer;
}

/* dialog:not([open]) {
  pointer-events: none;
  opacity: 0;
} */


button.link {
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

button.button {
  color: var(--color-white);
  background-color: var(--color-secondary);
  padding-inline: 2rem;
  padding-block: 1rem;
  transition: background .5s ease;
  border: none;
  font-weight: 500;
  border-radius: .5rem;

  &:hover {
    background-color: var(--color-secondary-light);
  }
}
</style>