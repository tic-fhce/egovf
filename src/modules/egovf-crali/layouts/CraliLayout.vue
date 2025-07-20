<template>
  <div>
    <ComponenteSidebar :modulo="modulo" />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <ComponenteHeader :cif="usuario.cif" :foto="usuario.foto" />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <ComponenteFooter />
    </div>
  </div>
</template>


<script lang="ts" setup>
import ModuloService from '@/modules/egovf/services/moduloService'

// Importamos Herramientas
import { CContainer } from '@coreui/vue'
import ComponenteFooter from '@/components/Escritorio/ComponenteFooter.vue'
import ComponenteHeader from '@/components/Escritorio/ComponenteHeader.vue'
import ComponenteSidebar from '@/components/Escritorio/ComponenteSidebar.vue'
import { onMounted, ref } from 'vue'
import { getUserRol } from '../modules/users/services/userService'
import { useCookies } from '../utils/cookiesManager';

interface Usuario {
  token: string;
  cif: number;
  correo: string;
  celular: string;
  pass: string;
  unidad: string;
  sigla: string;
  foto: string;
}

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  importancia: number;
  menuDtoObj: Array<{
    id: number;
    titulo: string;
    ruta: string;
    icono: string;
    idModulo: number;
  }>;
}


const moduloService = new ModuloService()
const { setUserRolCookies, getCookie } = useCookies()
const usuario = ref<Usuario>({
  token: '',
  cif: 0,
  correo: '',
  celular: '',
  pass: '',
  unidad: '',
  sigla: '',
  foto: ''
})


const modulo = ref<Modulo[]>([
  {
    id: 1,
    titulo: 'Biblioteca',
    descripcion: 'Módulo principal de biblioteca',
    icono: 'cil-folder-open',
    importancia: 1,
    menuDtoObj: [
      { id: 1, titulo: 'Biblioteca', ruta: '/biblioteca', icono: 'icon', idModulo: 1 },
      { id: 2, titulo: 'Libros', ruta: '/libros', icono: 'icon', idModulo: 1 }
    ]
  },
  {
    id: 2,
    titulo: 'Usuarios',
    descripcion: 'Módulo principal de Usuarios',
    icono: 'cil-clipboard',
    importancia: 1,
    menuDtoObj: [
      { id: 1, titulo: 'Usuarios', ruta: '/usuarios', icono: 'icon', idModulo: 1 },
      { id: 2, titulo: 'Lectores', ruta: '/lectores', icono: 'icon', idModulo: 1 }
    ]
  },
  {
    id: 3,
    titulo: 'UNIDAD',
    descripcion: 'Módulo de unidad',
    icono: 'cil-clipboard',
    importancia: 1,
    menuDtoObj: [
      { id: 1, titulo: 'Unidad', ruta: '/unidad', icono: 'icon', idModulo: 1 },
      { id: 2, titulo: 'Facultad', ruta: '/facultad', icono: 'icon', idModulo: 1 }
    ]
  },
  {
    id: 4,
    titulo: 'Prestamos',
    descripcion: 'Módulo de historial',
    icono: 'cil-clipboard',
    importancia: 1,
    menuDtoObj: [
      { id: 1, titulo: 'Prestamos', ruta: '/prestamos', icono: 'icon', idModulo: 1 }
    ]
  }
])

onMounted(async () => {
  try {
    usuario.value.token = getCookie('token') || '';
    usuario.value.cif = Number(getCookie('cif')) || 0;
    usuario.value.correo = getCookie('correo') || '';
    usuario.value.celular = getCookie('celular') || '';
    usuario.value.pass = getCookie('pass') || '';
    usuario.value.unidad = getCookie('unidad') || '';
    usuario.value.sigla = getCookie('sigla') || '';
    usuario.value.foto = getCookie('foto') || '';

    if (!usuario.value.token) {
      throw new Error("El token de usuario no está disponible.");
    }

    moduloService.headersUsuario(usuario.value.token);

    if (!usuario.value.cif) {
      throw new Error("El 'cif' del usuario no es válido.");
    }

    const rol = await getUserRol(usuario.value.cif);

    setUserRolCookies(rol);
  } catch (error) {
    console.error("Error al inicializar el usuario:", error);
  }
});

// const getModuloCif = async () => {
//   try {
//     const response = await moduloService.getModuloCif(usuario.value.cif)
//     console.log({ response })
//     modulo.value = response.data
//   } catch (error) {
//     console.error('Error al obtener los módulos:', error)
//   }
// }

</script>
