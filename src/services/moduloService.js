import axios from "axios";


//const moduloUrl="http://172.16.114.144:8093/fhce-egovf/";
const moduloUrl="http://172.16.114.157:8091/fhce-egovf/";

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
            _02id_modulo:modulo.idmodulo
        }
        return axios.post(moduloUrl+"agregarModulo",moduloaux);
    }
}