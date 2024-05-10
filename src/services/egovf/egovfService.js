import axios from "axios";

//const egovfUrl="https://stfhce.umsa.bo/egovf/fhce/";
//const egovfUrl="http://192.168.31.45:8091/fhce-egovf/";
const egovfUrl="http://172.16.14.91:8091/fhce-egovf/";


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
    getListaEmpleado(){//Servicio que retorna una lista de Ciudadanos que son empleados 
        return axios.get(egovfUrl+"getListaEmpleado");
    }
}