import { computed, inject } from 'vue'
import { Rol } from '../modules/users/services/userService';

// interface UserData {
//   token: string;
//   cif: number;
//   correo: string;
//   celular: string;
//   pass: string;
//   unidad: string;
//   sigla: string;
//   foto: string;
//   rol: Rol
// }

export function useCookies() {
  const $cookies = inject('$cookies') as { set: (key: string, value: string) => void }

  // Método para almacenar los datos del usuario en las cookies
  const setUserRolCookies = (rol: Rol): void => {
    if ($cookies) {
      // $cookies.set('token', data.token)
      // $cookies.set('cif', String(data.cif)) // Aseguramos que el cif sea un string
      // $cookies.set('correo', data.correo)
      // $cookies.set('celular', data.celular)
      // $cookies.set('pass', data.pass)
      // $cookies.set('unidad', data.unidad)
      // $cookies.set('sigla', data.sigla)
      // $cookies.set('foto', data.foto)
      $cookies.set('rol', rol)
    }
  }

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() ?? '');
    return null;
  }
  const isSuperAdmin = computed(() => {
    const rol = getCookie('rol');
    return rol ? rol.includes(Rol.superAdmin) : false; 
  });
  const isAdmin = computed(() => {
    const rol = getCookie('rol');
    return rol ? rol.includes(Rol.admin) : false; // Verifica que rol no sea null
  });
  const isLector = computed(() => {
    const rol = getCookie('rol');
    return rol ? rol.includes(Rol.lector) : false; // Verifica que rol no sea null
  });

  return {
    setUserRolCookies,
    getCookie,
    isSuperAdmin,
    isAdmin,
    isLector,
    cif: computed(() => Number(getCookie('cif')) ),
  }
}
