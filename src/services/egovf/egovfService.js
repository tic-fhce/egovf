import axios from "axios";

//const personaUrl="http://172.16.114.157:8091/fhce-egovf/";
const egovfUrl="http://192.168.31.45:8091/fhce-egovf/";


export default class EgovfService{
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }

    getEgovf(cif){
        return axios.get(egovfUrl+"getEgovf",{
            params: {
                cif: cif
            }});
    }
    getListarCiudadano(){
        return axios.get(egovfUrl+"listarCiudadano");
    }
}