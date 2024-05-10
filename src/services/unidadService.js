import axios from "axios";

//const unidadUrl="https://stfhce.umsa.bo/fhce-egovf-uni/";
//const unidadUrl="http://192.168.31.45:8094/fhce-egovf-uni/";
const unidadUrl="http://172.16.114.157:8094/fhce-egovf-uni/";


export default class UnidadService{

    getListaUnidad(){
        return axios.get(unidadUrl+"unidad/listar");
    }
    registrarUnidad(unidad){
        const auxUnidad={
            _01unidad:unidad.unidad.charAt(0).toUpperCase() + unidad.unidad.slice(1).toLowerCase(),
            _02dependiente:unidad.dependiente.charAt(0).toUpperCase()+unidad.dependiente.slice(1).toLowerCase(),
            _03sigla:unidad.sigla.toUpperCase(),
            _04telefono:unidad.telefono,
            _05correo:unidad.correo
        }
        return axios.post(unidadUrl+"unidad/agregar",auxUnidad);
    }
    registrarPertenece(usuario,unidad){//Servicio para registrar la pertenencia del usuario con la unidad 
        var today = new Date();
        const auxPertenece = {
            _01id_unidad:unidad.id,
            _02cif:usuario.cif,
            _03fecha:today.toLocaleDateString('en-US'),
            _04estado:true
        }
        return axios.post(unidadUrl+"pertenece/agregar",auxPertenece);
    }
    
}