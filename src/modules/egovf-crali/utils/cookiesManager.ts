import { inject } from 'vue'
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

  return {
    setUserRolCookies
  }
}
