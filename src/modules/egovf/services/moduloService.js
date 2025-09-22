import axios from "axios";
import { API_URL_EGOVF_USER } from "@/env";
const moduloUrl = API_URL_EGOVF_USER;

export default class ModuloService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  getModulos(cif) {
    return axios.get(moduloUrl + "modulo/getModulos", {
      params: {
        cif: cif,
      },
    });
  }
  getModuloMenu(cif,idModulo){
    return axios.get(moduloUrl + "modulo/getModuloMenu", {
      params: {
        cif: cif,
        idModulo:idModulo
      },
    });
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
      "estado": 1,
      "quien":modulo.quien
    };
    return axios.post(moduloUrl + "modulo/addModulo", moduloUsuarioDtoRequest);
  }
  actualizarModulo(cif, id) {
    const moduloUsuarioDtoResponse = {
      "id":0,
      "cif":cif,
      "id_modulo":id,
      "estado":0,
      "quien":0,
      "fecha":"",
      "fechamodificacion":""
    };
    return axios.put(moduloUrl + "modulo/updateModulo",moduloUsuarioDtoResponse);
  }
  updateEliminarModuloEmpleado(cif, quien) {
    const moduloUsuarioDtoResponse = {
      "id":0,
      "cif":cif,
      "id_modulo":4,
      "estado":0,
      "quien":quien,
      "fecha":"",
      "fechamodificacion":""
    };
    return axios.put(moduloUrl + "modulo/updateModuloUsuario",moduloUsuarioDtoResponse);
  }
}
