import axios from "axios";

//const personaUrl="https://stfhce.umsa.bo/egovf/fhce/";
//const personaUrl="http://192.168.31.45:8091/fhce-egovf/";
const personaUrl="http://172.16.114.157:8091/fhce-egovf/";


export default class PersonaService{
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }
    getListaCiudadanos(){
        return axios.get(personaUrl+"listaPersona");
    }
    getListaPersonas(){
        return axios.get(personaUrl+"listaPersonas");
    }
    addPersona(persona){
        var info = persona.fecha.split('-');
        var fecha= info[2] + '/' + info[1] + '/' + info[0];
        const aux={
            _01cif:0,
            _02ci:persona.ci,
            _03complemento:persona.complemento,
            _04nombre:persona.nombre.charAt(0).toUpperCase() + persona.nombre.slice(1),
            _05paterno:persona.paterno.charAt(0).toUpperCase() + persona.paterno.slice(1),
            _06materno:persona.materno.charAt(0).toUpperCase() + persona.materno.slice(1),
            _07fecha:fecha,
            _08sexo:persona.sexo,
            _09cel:persona.cel,
            _10correo:persona.correo
        }
        return axios.post(personaUrl+"addPersona",aux);
    }
    getPersona(cif){
        return axios.get(personaUrl+"getPerfil",{
            params: {
                cif: cif
            }});
    }
}