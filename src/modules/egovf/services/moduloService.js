import axios from "axios";
import { API_URL_EGOVF_USER } from "@/env";
const moduloUrl = API_URL_EGOVF_USER;

export default class ModuloService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  getModulos() {
    return axios.get(moduloUrl + "modulo/getModulos");
  }
  getModuloCif(cif) {
    // correcto funcionando
    return axios.get(moduloUrl + "modulo/getModuloCif", {
      params: {
        cif: cif,
      },
    });
  }
  getModuloCifEmpleado(cif){
    // correcto funcionando
    return axios.get(moduloUrl + "modulo/getModuloCifEmpleado", {
      params: {
        cif: cif,
      },
    });
  }
  addModulo(modulo) {
    //correcto funcionando
    const moduloUsuarioDtoRequest = {
      "cif": modulo.cif,
      "id_modulo": modulo.idmodulo,
      "estado": 1
    };
    return axios.post(moduloUrl + "modulo/addModulo", moduloUsuarioDtoRequest);
  }
  updateModuloUsuario(cif, modulo, estado) {
    const moduloUsuario = {
      id: 0,
      _01cif: cif,
      _02id_modulo: modulo,
      _03estado: estado,
    };
    return axios.put(
      moduloUrl + "moduloUsuario/updateModuloUsuario",
      moduloUsuario
    );
  }
}
