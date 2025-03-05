import axios from "axios";

import { API_URL_EGOVF_USER } from "@/env";
const personaUrl = API_URL_EGOVF_USER;

export default class PersonaService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  addPersona(persona) {
    var info = persona.fecha.split("-");
    var fecha = info[2] + "/" + info[1] + "/" + info[0];
    const aux = {
      "cif": 0,
      "ci": persona.ci,
      "complemento": persona.complemento,
      "nombre":
        persona.nombre.charAt(0).toUpperCase() + persona.nombre.slice(1),
      "paterno":
        persona.paterno.charAt(0).toUpperCase() + persona.paterno.slice(1),
      "materno":
        persona.materno.charAt(0).toUpperCase() + persona.materno.slice(1),
      "fecha": fecha,
      "sexo": persona.sexo,
      "cel": persona.cel,
      "correo": persona.correo
    };
    return axios.post(personaUrl + "persona/addPersona", aux);
  }

  ////////////////


  getListaCiudadanos() {
    return axios.get(personaUrl + "listaPersona");
  }
  getListaPersonas() {
    return axios.get(personaUrl + "listaPersonas");
  }
  
  getPersona(cif) {
    return axios.get(personaUrl + "getPerfil", {
      params: {
        cif: cif,
      },
    });
  }
}
