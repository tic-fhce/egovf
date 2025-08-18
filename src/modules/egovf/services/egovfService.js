import axios from "axios";
import { API_URL_EGOVF_USER } from "@env";
const egovfUrl = API_URL_EGOVF_USER;

export default class EgovfService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  getEgovf(cif) {
    return axios.get(egovfUrl + "ciudadano/getEgovf", {
      params: {
        cif: cif,
      },
    });
  }
  getListaCiudadano() {
    return axios.get(egovfUrl + "ciudadano/getListaCiudadano");
  }
  getListaCiudadanoPublico() {
    return axios.get(egovfUrl + "ciudadano/getListaCiudadanoPublico");
  }
  getListaEmpleado() {
    //Servicio que retorna una lista de Ciudadanos que son empleados
    return axios.get(egovfUrl + "ciudadano/getListaEmpleado");
  }
  getListaResponsable() {
    //Servicio que retorna una lista de Ciudadanos para ser responsables en una actividad 
    return axios.get(egovfUrl + "ciudadano/getListaResponsable");
  }
}
