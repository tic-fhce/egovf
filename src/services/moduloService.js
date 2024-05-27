import axios from "axios";


//const moduloUrl="https://stfhce.umsa.bo/egovf/fhce/";
const moduloUrl="http://192.168.31.45:8091/fhce-egovf/";
//const moduloUrl="http://172.16.14.91:8091/fhce-egovf/";

export default class ModuloService{

    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }

    getListaModulo(){
        return axios.get(moduloUrl+"listarAll");
    }
    getListarModuloCif(cif){
        return axios.get(moduloUrl+"listarModuloCif",{
            params: {
                cif: cif
            }
        });
    }
    addModulo(modulo){
        const moduloaux={
            _01cif:modulo.cif,
            _02id_modulo:modulo.idmodulo,
            _03estado:1
        }
        return axios.post(moduloUrl+"moduloUsuario/agregarModulo",moduloaux);
    }
    updateModuloUsuario(cif,modulo,estado){
        const moduloUsuario ={
            id:0,
            _01cif:cif,
            _02id_modulo:modulo,
            _03estado:estado
        }
        return axios.put(moduloUrl+"moduloUsuario/updateModuloUsuario",moduloUsuario);
    }
}