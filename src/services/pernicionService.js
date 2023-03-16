import axios from "axios";

const pernicionUrl="http://192.168.31.45:8080/fhce-egovf/";

export default class PernicionService{
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }
    getListarMenu(){
        return axios.get(pernicionUrl+"getListarMenu");
    }
    getListarPernicion(cif){
        console.log("cif en Pernicion listar "+cif);
        return axios.get(pernicionUrl+"getListarPernicion",{
            params: {
                cif: cif
            }});
    }
    
}