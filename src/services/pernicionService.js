import axios from "axios";


//const pernicionUrl="https://stfhce.umsa.bo/egovf/fhce/";
//const pernicionUrl="http://192.168.31.45:8091/fhce-egovf/";
const pernicionUrl="http://172.16.14.91:8091/fhce-egovf/";


export default class PernicionService{
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }
    getListarMenu(){
        return axios.get(pernicionUrl+"getListarMenu");
    }
    getListarPernicion(cif){
        return axios.get(pernicionUrl+"getListarPernicion",{
            params: {
                cif: cif
            }});
    }
    addPernicion(pernicion){
        const pernicionaux={
            _01cif:pernicion.cif,
            _02id_menu:pernicion.id_menu,
            _03fecha:new Date().toLocaleDateString(),
            _04estado:1
        };
        return axios.post(pernicionUrl+"agregarPernicion",pernicionaux);
    }
    
}