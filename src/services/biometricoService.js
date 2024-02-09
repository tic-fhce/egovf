import axios from "axios";

//const controlUrl="http://172.16.114.157:8092/fhce-egovf-scc/";
const controlUrl="http://192.168.31.45:8092/fhce-egovf-scc/";


export default class BiometricoService{
    getListarCifCero(){
        return axios.get(controlUrl+"biometrico/listarCifCero");
    }
    getListarBiometrico(){
        return axios.get(controlUrl+"biometrico/listarBiometrico");
    }

    // funcion getLbioemtrico debuelve una lista de personas registradas en el biometrico de acuerdo al parametro tipo
    getLBiometricoTipo(tipo){
        return axios.get(controlUrl+"biometrico/listarBiometricoTipo",{
            params:{
                tipo:tipo
            }
        });
    }
    // Funcion que actualiza los datos del biomatrico con el usuario
    updateBiometrico(biometrico){
        return axios.put(controlUrl+"biometrico/agregarBiometrico",biometrico);
    }
    // Funcion que debuelve informacion del perfil de usuario registrado en el biometrico
    getPerfil(cif){
        return axios.get(controlUrl+"biometrico/getPerfil",{
            params: {
                cif: cif
            }});
    }
    // Funcion que permite registrar los horarios del usuario
    addHorario(horario){
        return axios.post(controlUrl+"horario/addHorario",horario);
    }
    // Funcion que permite registrar los datos de la observacion de los usuarios
    addObs(obs){
        const obsaux={
            _01cif:obs.cif,
            _02uidobs:obs.uidobs,
            _03fechainicio:obs.fechainicio,
            _04fechafin:obs.fechafin,
            _05gestion:obs.fechainicio.substring(0, 4),
            _06mes:obs.fechainicio.substring(5,7),
            _07di:obs.fechainicio.substring(8,10),
            _08df:obs.fechafin.substring(8,10),
            _09detalle:obs.detalle,
            _10imagen:obs.imagen,
            _11tipo:obs.tipo,
            _12hora:obs.hora,
            _13h:obs.hora.substring(0,2),
            _14m:obs.hora.substring(3,5),
            _15url:obs.url

        };
        return axios.post(controlUrl+"obs/agregarObs",obsaux);
    }
    addObsAll(obs){
        const obsaux={
            _01cif:obs.cif,
            _02uidobs:obs.uidobs,
            _03fechainicio:obs.fechainicio,
            _04fechafin:obs.fechafin,
            _05gestion:obs.fechainicio.substring(0, 4),
            _06mes:obs.fechainicio.substring(5,7),
            _07di:obs.fechainicio.substring(8,10),
            _08df:obs.fechafin.substring(8,10),
            _09detalle:obs.detalle,
            _10imagen:'Ninguna',
            _11tipo:obs.tipo,
            _12hora:obs.hora,
            _13h:obs.hora.substring(0,2),
            _14m:obs.hora.substring(3,5)

        };
        return axios.post(controlUrl+"obs/agregarObsAll",obsaux);
    }
    getHorario(id_horario,cif){
        return axios.get(controlUrl+"horario/getHorario",{
            params:{
                id_horario:id_horario,
                cif:cif
            }
        });
    }
    getListaHorario(cif,gestion){
        return axios.get(controlUrl+"horario/getListaHorario",{
            params:{
                cif:cif,
                gestion:gestion
            }
        });
    }
    getObs(cif,gestion,mes){
        return axios.get(controlUrl+"obs/getObs",{
            params:{
                cif:cif,
                gestion:gestion,
                mes:mes
            }
        });
    }
    getReporteMes(reporte){
        return axios.get(controlUrl+"marcado/reporteMes",{
            params:{
                cif:reporte.cif,
                gestion:reporte.gestion,
                mes:reporte.mes,
                di:reporte.di,
                df:reporte.df
             }
        });
    }
    getReporteMesDia(reporte){
        return axios.get(controlUrl+"marcado/reporteMesDia",{
            params:{
                cif:reporte.cif,
                gestion:reporte.gestion,
                mes:reporte.mes,
                di:reporte.di,
                df:reporte.df
            }
        });
    }
    getRecord(record){
        return axios.get(controlUrl+"marcado/reporteTotal",{
            params:{
                gestion:record.gestion,
                mes:record.mes,
                tipo:record.tipo
            }
        });
    }
    estadoBiometrico(bio){
        console.log(bio);
        return axios.put(controlUrl+"biometrico/estadoBiometrico",bio);
    }
}