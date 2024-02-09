import axios from "axios";

const url='http://192.168.31.47/img/';

export default class UploadService{
    getListarCifCero(){
        return axios.get("biometrico/listarCifCero");
    }
    addImagen(fromData){
        return axios.post(url+"upload.php",fromData);
    }
    getUrl(){
        return url+"ima/";
    }
}