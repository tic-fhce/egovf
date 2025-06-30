import axios from "axios";
import { API_URL_EGOVF_USER } from "@/env";
const menuUrl = API_URL_EGOVF_USER;
export default class MenuService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  getMenu(cif) {
    console.log(cif);
    return axios.get(menuUrl + "menu/getMenu", {
      params: {
        cif: cif,
      },
    });
  }
  getMenuModulo(cif, titulo) {
    return axios.get(menuUrl + "menu/getMenuModulo", {
      params: {
        cif: cif,
        titulo: titulo,
      },
    });
  }
  addMenuUsuario(cif, idmenu) {
    const menuUsuarioDtoRequest = {
      "cif": cif,
      "idmenu": idmenu,
      "estado": 1
    };
    return axios.post(menuUrl + "menu/addMenuUsuario", menuUsuarioDtoRequest);
  }
  /////////////////////////////////////////////////////////



  updateMenuUsuario(id, cif, idmenu, estado) {
    const menu = {
      id: id,
      _01cif: cif,
      _02idmenu: idmenu,
      _03estado: estado,
    };
    return axios.put(menuUrl + "updateMenuUsuario", menu);
  }
  
}
