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
  updateMenuUsuario(menu){
    const menuUsuarioDtoResponse = {
      "id":menu.id,
      "cif": menu.cif,
      "idmenu": menu.idMenu,
      "estado": menu.estado
    };
    return axios.put(menuUrl + "menu/updateMenuUsuario", menuUsuarioDtoResponse);
  }
  
}
