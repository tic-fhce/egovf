import axios from "axios";

import { API_URL_EGOVF } from "@/env";
import { API_URL_EGOVF_USER } from "@/env";
const usuario_api = API_URL_EGOVF;
const usuario_user = API_URL_EGOVF_USER;
export default class UsuarioService{

  getToken(payload){
      var login={
          "id":payload.id,
          "cif":payload.cif,
          "matricula":payload.matricula,
          "ci":payload.ci,
          "complemento":payload.complemento,
          "correo":payload.correo,
          "celular":payload.celular,
          "pass":payload.pass
      };
      
      return axios.post(usuario_api+"login",login);
  }
  headersUsuario(token){
      axios.defaults.headers.common['Authorization']='Bearer '+token;
  }
  getPerfil(cif) {
      return axios.get(usuario_api + "getPerfil", {
        params: {
          cif: cif,
        },
      });
  }
  getUsuario(cif) {
      return axios.get(usuario_api + "getUsuario", {
        params: {
          cif: cif,
        },
      });
  }
  updatePersona(egovf) {
      //Servicio que actualiza los datos del Ciudadano
      const persona = {
        "id": egovf.idPersona,
        "cif": egovf.cif,
        "ci": egovf.ci_com,
        "complemento": egovf.complemento,
        "nombre": egovf.nombre,
        "paterno": egovf.paterno,
        "materno": egovf.materno,
        "fecha": egovf.fecha,
        "sexo": egovf.sexo,
        "cel": egovf.celular,
        "correo": egovf.correo
      };
      return axios.put(usuario_user + "persona/updatePersona", persona);
  }
  updateUsuario(egovf) {
    //corregido funcionando
      //servicio para actualizar los datos del Usuario
      const usuario = {
        "id": egovf.idUsuario,
        "cif": egovf.cif,
        "matricula": egovf.matricula,
        "ci": egovf.ci_com,
        "complemento": egovf.complemento,
        "correo": egovf.correo,
        "celular": egovf.celular,
        "pass": egovf.pass,
        "unidad": egovf.unidad,
        "dependiente": egovf.dependiente,
        "sigla": egovf.sigla,
        "foto": egovf.foto,
        "empleado": egovf.empleado,
      };
      return axios.put(usuario_user + "usuario/updateUsuario", usuario);
  }
  updatePass(pass) {
      return axios.put(usuario_user + "usuario/updatePass", pass);
  }
  updatePassAdmin(pass) {
    //servicio para actualizar la contraceña del ciudadano
    return axios.put(usuario_user + "usuario/updatePassAdmin", pass);
  }
  updateUnidad(egovf, unidad) {
    const usuarioDtoResponse = {
      "id": egovf.idUsuario,
      "cif": egovf.cif,
      "matricula": egovf.matricula,
      "ci": egovf.ci_com,
      "complemento": egovf.complemento,
      "correo": egovf.correo,
      "celular": egovf.celular,
      "pass": egovf.pass,
      "unidad": unidad.unidad,
      "dependiente": unidad.dependiente,
      "sigla": unidad.sigla,
      "foto": egovf.foto,
      "empleado": egovf.idPersona
    };
    return axios.put(usuario_user + "usuario/updateUsuario", usuarioDtoResponse);
  }
}