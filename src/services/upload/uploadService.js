import axios from "axios";
import { API_URL_EGOVF_IMG } from "@env";
const url = API_URL_EGOVF_IMG;
//const url='http://172.16.14.91/img/';

export default class UploadService {
  getListarCifCero() {
    return axios.get("biometrico/listarCifCero");
  }
  addImagen(fromData) {
    return axios.post(url + "upload.php", fromData);
  }
  getUrl() {
    return url + "imagenes/";
  }
  getImage(url) {
    return axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }
}
