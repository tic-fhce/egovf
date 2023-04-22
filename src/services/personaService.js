import axios from "axios";

const personaUrl="http://200.7.161.114:8080/egovf/fhce/";
//const personaUrl="http://172.16.114.144:8083/fhce-egovf/";


export default class PersonaService{
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }
    getListaCiudadanos(){
        return axios.get(personaUrl+"listaPersona");
    }
    addPersona(persona){
        var info = persona._07fecha.split('-');
        var fecha= info[2] + '/' + info[1] + '/' + info[0];
        const aux={
            _01cif:0,
            _02ci:persona._02ci,
            _03complemento:persona._03complemento,
            _04nombre:persona._04nombre.charAt(0).toUpperCase() + persona._04nombre.slice(1),
            _05paterno:persona._05paterno.charAt(0).toUpperCase() + persona._05paterno.slice(1),
            _06materno:persona._06materno.charAt(0).toUpperCase() + persona._06materno.slice(1),
            _07fecha:fecha,
            _08sexo:persona._08sexo,
            _09cel:persona._09cel,
            _10correo:persona._10correo
        }
        return axios.post(personaUrl+"registrar",aux);
    }
    getPersona(cif){
        return axios.get(personaUrl+"getPerfil",{
            params: {
                cif: cif
            }});
    }
}