import axios from "axios";
import { API_URL_EGOVF_USER } from "@/env";

const menuUrl = API_URL_EGOVF_USER;

export default class MenuService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  getMenu(cif) {
    console.log(menuUrl);
    return axios.get(menuUrl + "/getMenu", {
      params: {
        cif: cif,
      },
    });
  }
  getMenuModulo(cif, titulo) {
    return axios.get(menuUrl + "/getMenuModulo", {
      params: {
        cif: cif,
        titulo: titulo,
      },
    });
  }
  updateMenuUsuario(id, cif, idmenu, estado) {
    const menu = {
      id: id,
      _01cif: cif,
      _02idmenu: idmenu,
      _03estado: estado,
    };
    return axios.put(menuUrl + "/updateMenuUsuario", menu);
  }
  addMenuUsuario(cif, idmenu) {
    const menuUsuario = {
      _01cif: cif,
      _02idmenu: idmenu,
      _03estado: 1,
    };
    return axios.post(menuUrl + "/addMenuUsuario", menuUsuario);
  }
}
