import axios from "axios";

//const usuario_api="https://stfhce.umsa.bo/egovf/fhce/";
const usuario_api="http://172.16.14.91:8091/fhce-egovf/";

export default class UsuarioService{
    getListaUsuario(){
        return axios.get(usuario_api+"listarUsuario");
    }

    getToken(payload){

        var login={
            "id":payload.id,
            "_01cif":payload.cif,
            "_02matricula":payload.matricula,
            "_03ci":payload.ci,
            "_04complemento":payload.complemento,
            "_05correo":payload.correo,
            "_06celular":payload.celular,
            "_07pass":payload.pass
        };
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
    updatePersona(egovf){//Servicio que actualiza los datos del Ciudadano
        const persona ={
            id:egovf.idPersona,
            _01cif:egovf.cif,
            _02ci:egovf.ci_com,
            _03complemento:egovf.complemento,
            _04nombre:egovf.nombre,
            _05paterno:egovf.paterno,
            _06materno:egovf.materno,
            _07fecha:egovf.fecha,
            _08sexo:egovf.sexo,
            _09cel:egovf.celular,
            _10correo:egovf.correo
        }
        return axios.put(usuario_api+"updatePersona",persona);
    }
    updateUsuario(egovf){//servicio para actualizar los datos del Usuario
        const usuario={
            id:egovf.idUsuario,
            _01cif:egovf.cif,
            _02matricula:egovf.matricula,
            _03ci:egovf.ci_com,
            _04complemento:egovf.complemento,
            _05correo:egovf.correo,
            _06celular:egovf.celular,
            _07pass:egovf.pass,
            _08unidad:egovf.unidad,
            _09dependiente:egovf.dependiente,
            _10sigla:egovf.sigla,
            _11foto:egovf.foto,
            _12empleado:egovf.empleado

        }
        return axios.put(usuario_api+"updateUsuario",usuario);
    }
    updatePass(pass){
        return axios.put(usuario_api+"updatePass",pass);
    }
    updatePassAdmin(pass){//servicio para actualizar la contraceña del ciudadano
        return axios.put(usuario_api+"updatePassAdmin",pass);
    }
    updateUnidad(egovf,unidad){
        const auxUsuario={
            id:egovf.idUsuario,
            _01cif:egovf.cif,
            _02matricula:egovf.matricula,
            _03ci:egovf.ci_com,
            _04complemento:egovf.complemento,
            _05correo:egovf.correo,
            _06celular:egovf.celular,
            _07pass:egovf.pass,
            _08unidad:unidad.unidad,
            _09dependiente:unidad.dependiente,
            _10sigla:unidad.sigla,
            _11foto:egovf.foto,
            _12empleado:egovf.idPersona

        }
        return axios.put(usuario_api+"updateUsuario",auxUsuario);
    }
    addPerfil(cif){
        const menu={
            _01cif:cif,
            _02idmenu:6, // id de la tabla menu
            _03estado:1
        }
        return axios.post(usuario_api+"menu/addPerfil",menu);
    }
}