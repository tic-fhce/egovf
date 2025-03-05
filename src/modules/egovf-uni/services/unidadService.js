import axios from "axios";

import { API_URL_EGOVF_UNI } from "@/env";
const unidadUrl = API_URL_EGOVF_UNI;

export default class UnidadService {
  getUnidades() {
    return axios.get(unidadUrl + "unidad/getUnidades");
  }
  
  registrarUnidad(unidad) {
    const auxUnidad = {
      _01unidad:
        unidad.unidad.charAt(0).toUpperCase() +
        unidad.unidad.slice(1).toLowerCase(),
      _02dependiente:
        unidad.dependiente.charAt(0).toUpperCase() +
        unidad.dependiente.slice(1).toLowerCase(),
      _03sigla: unidad.sigla.toUpperCase(),
      _04telefono: unidad.telefono,
      _05correo: unidad.correo,
    };
    return axios.post(unidadUrl + "unidad/agregar", auxUnidad);
  }
  addPertenece(usuario, unidad) {
    //Servicio para registrar la pertenencia del usuario con la unidad
    var today = new Date();
    const perteneceDtoRequest = {
      "id_unidad": unidad.id,
      "cif": usuario.cif,
      "fecha": today.toLocaleDateString("en-US"),
      "estado": true,
      "gestion":today.getFullYear()
    };
    return axios.post(unidadUrl + "pertenece/addPertenece", perteneceDtoRequest);
  }
}
