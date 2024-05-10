import axios from "axios";

//const eventoUrl="https://stfhce.umsa.bo/fhce-egovf-even/";
//const eventoUrl="http://192.168.31.45:8085/fhce-egovf-even/";
const eventoUrl="http://172.16.114.157:8085/fhce-egovf-even/";


export default class EventoService{

    getListaEvento(){
        return axios.get(eventoUrl+"evento/listar");
    }
    getListaAmbiente(){
        return axios.get(eventoUrl+"ambiente/listar");
    }
    getListaMisEventos(cif){
        return axios.get(eventoUrl+"evento/listarCif",cif);
    }
    registrarUnidad(unidad){
        const auxUnidad={
            _01unidad:unidad.unidad.charAt(0).toUpperCase() + unidad.unidad.slice(1).toLowerCase(),
            _02dependiente:unidad.dependiente.charAt(0).toUpperCase()+unidad.dependiente.slice(1).toLowerCase(),
            _03sigla:unidad.sigla.toUpperCase(),
            _04telefono:unidad.telefono,
            _05correo:unidad.correo
        }
        return axios.post(eventoUrl+"unidad/agregar",auxUnidad);
    }
    registrarPertenece(usuario,unidad){
        var today = new Date();
        const auxPertenece = {
            _01id_unidad:unidad.id,
            _02cif:usuario._01cif,
            _03fecha:today.toLocaleDateString('en-US'),
            _04estado:true
        }
        return axios.post(eventoUrl+"pertenece/agregar",auxPertenece);
    }
    
}