import axios from "axios";

const usuario_api="";

export default class UsuarioService{
    getListaUsuario(){
        return axios.get(usuario_api+"listarUsuario");
    }

    getToken(login){
        return axios.post(usuario_api+"loginUsuario",login);
    }
    headersUsuario(token){
        axios.defaults.headers.common['Authorization']='Bearer '+token;
    }
    getPerfil(cif){
        return axios.get(usuario_api+"getPerfil",{
            params: {
                cif: cif
            }});
    }
    getUsuario(cif){
        return axios.get(usuario_api+"getUsuario",{
            params:{
                cif:cif
            }
        });
    }
    updatePersona(persona){
        console.log(persona);
        return axios.put(usuario_api+"updatePersona",persona);
    }
    updateUsuario(usuario){
        return axios.put(usuario_api+"updateUsuario",usuario);
    }
}