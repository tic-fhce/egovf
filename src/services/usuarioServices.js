import axios from "axios";

//const usuario_api="http://172.16.114.144:8093/fhce-egovf/";
const usuario_api="http://192.168.31.45:8080/fhce-egovf/";

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
        return axios.put(usuario_api+"updatePersona",persona);
    }
    updateUsuario(usuario){
        return axios.put(usuario_api+"updateUsuario",usuario);
    }
    updatePass(usuario){
        return axios.put(usuario_api+"updatePass",usuario);
    }
    updatePassAdmin(usuario){
        return axios.put(usuario_api+"updatePassAdmin",usuario);
    }
    updateUnidad(usuario,unidad){
        const auxUsuario={
            id:usuario.id,
            _01cif:usuario._01cif,
            _02matricula:usuario._02matricula,
            _03ci:usuario._03ci,
            _04complemento:usuario._04complemento,
            _05correo:usuario._05correo,
            _06celular:usuario._06celular,
            _07pass:usuario._07pass,
            _08unidad:unidad.unidad,
            _09dependiente:unidad.dependiente,
            _10sigla:unidad.sigla
        }
        return axios.put(usuario_api+"updateUsuario",auxUsuario);
    }
}