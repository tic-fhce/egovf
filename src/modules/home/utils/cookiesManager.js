import { inject } from "vue";

export function useCookies() {

  const $cookies = inject('$cookies')

  const setUserCookies = (data) => {
    $cookies.set('token', data.token);
    $cookies.set('cif', data.cif);
    $cookies.set('correo', data.correo);
    $cookies.set('celular', data.celular);
    $cookies.set('pass', data.pass);
    $cookies.set('unidad', data.unidad);
    $cookies.set('sigla', data.sigla);
    $cookies.set('foto', data.foto);
    $cookies.set('titulo', 'Escritorio');
  }

  return {
    setUserCookies
  }

}