import axios from "axios";

const url='https://fhcevirtual.umsa.bo/egovf-img/';
//const url='http://172.16.14.91/img/';

export default class UploadService{
    getListarCifCero(){
        return axios.get("biometrico/listarCifCero");
    }
    addImagen(fromData){
        return axios.post(url+"upload.php",fromData);
    }
    getUrl(){
        return url+"imagenes/";
    }
    getImage(url){
        return axios.get(url,{
            headers: { "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "*"}
        });
    }
}