import axios from "axios";

//const msccUrl="https://stfhce.umsa.bo/fhce-egovf-scc/";
const msccUrl="http://192.168.31.45:8092/fhce-egovf-scc/";


export default class SccService{
    getListarCifCero(){
        return axios.get(msccUrl+"biometrico/listarCifCero");
    }
    getListarBiometrico(){
        return axios.get(msccUrl+"biometrico/listarBiometrico");
    }

    // funcion getLbioemtrico debuelve una lista de personas registradas en el biometrico de acuerdo al parametro tipo
    getLBiometricoTipo(tipo){
        return axios.get(msccUrl+"biometrico/listarBiometricoTipo",{
            params:{
                tipo:tipo
            }
        });
    }
    // Funcion que actualiza los datos del biomatrico con el usuario
    updateBiometrico(biometrico){
        return axios.put(msccUrl+"biometrico/agregarBiometrico",biometrico);
    }
    // Funcion que debuelve informacion del perfil de usuario registrado en el biometrico
    getPerfil(cif){
        return axios.get(msccUrl+"biometrico/getPerfil",{
            params: {
                cif: cif
            }});
    }
    // Funcion que permite registrar los horarios del usuario
    addHorario(horario){
        return axios.post(msccUrl+"horario/addHorario",horario);
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
            _15url:obs.url,
            _16estado:1
        };
        return axios.post(msccUrl+"obs/agregarObs",obsaux);
    }
    // Funcion que permite actualizar los datos de la observacion de los usuarios
    updateObs(obs){
        const obsaux={
            id: obs.id,
            _01cif:obs.cif,
            _02uidobs:obs.uidobs,
            _03fechainicio:obs.fechainicio,
            _04fechafin:obs.fechafin,
            _05gestion:obs.gestion,
            _06mes:obs.mes,
            _07di:obs.di,
            _08df:obs.df,
            _09detalle:obs.detalle,
            _10imagen:obs.imagen,
            _11tipo:obs.tipo,
            _12hora:obs.hora,
            _13h:obs.h,
            _14m:obs.m,
            _15url:obs.url,
            _16estado:obs.estado
        };
        return axios.put(msccUrl+"obs/updateObs",obsaux);
    }
    addObsEmpleado(obs){// Funcion que permite registrar los datos de la observacion del propio empleado
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
            _15url:obs.url,
            _16estado:0
        };
        return axios.post(msccUrl+"obs/agregarObs",obsaux);
    }
    updateObsEmpleado(obs){// Funcion que permite actualizar los datos de la observacion del propio empleado
        const obsaux={
            id:obs.id,
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
            _15url:obs.url,
            _16estado:0
        };
        return axios.put(msccUrl+"obs/updateObs",obsaux);
    }
    addObsAll(obs){ // Funcion que registra observaciones masibas
        const obsaux={
            id:0,
            cif:obs.cif,
            sexo:obs.sexo,
            uidobs:obs.uidobs,
            fechainicio:obs.fechainicio,
            fechafin:obs.fechafin,
            gestion:obs.fechainicio.substring(0, 4),
            mes:obs.fechainicio.substring(5,7),
            di:obs.fechainicio.substring(8,10),
            df:obs.fechafin.substring(8,10),
            detalle:obs.detalle,
            imagen:obs.imagen,
            tipo:obs.tipo,
            hora:obs.hora,
            h:obs.hora.substring(0,2),
            m:obs.hora.substring(3,5),
            url:obs.url,
            estado:1

        };
        return axios.post(msccUrl+"obs/addObsAll",obsaux);
    }
    getObs(cif,gestion,mes){
        return axios.get(msccUrl+"obs/getObs",{
            params:{
                cif:cif,
                gestion:gestion,
                mes:mes
            }
        });
    }
    getObsUsuario(cif,gestion,mes){
        return axios.get(msccUrl+"obs/getObsUsuario",{
            params:{
                cif:cif,
                gestion:gestion,
                mes:mes
            }
        });
    }
    getListaObs(){
        return axios.get(msccUrl+"obs/getListaObs");
    }
    getReporteMes(reporte){
        return axios.get(msccUrl+"marcado/reporteMes",{
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
        return axios.get(msccUrl+"marcado/reporteMesDia",{
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
        return axios.get(msccUrl+"marcado/reporteTotal",{
            params:{
                gestion:record.gestion,
                mes:record.mes,
                tipo:record.tipo
            }
        });
    }
    estadoBiometrico(bio){
        console.log(bio);
        return axios.put(msccUrl+"biometrico/estadoBiometrico",bio);
    }
    updateTipo(cif,tipo){//Servicio para cambiar el tipo de Empleado 
        return axios.put(msccUrl+"biometrico/updateTipo",{
            params:{
                cif:cif,
                tipo:tipo
            }
        });
    }
    getHorario(id_horario,cif){
        return axios.get(msccUrl+"horario/getHorario",{
            params:{
                id_horario:id_horario,
                cif:cif
            }
        });
    }
    getListaHorario(cif,gestion){
        return axios.get(msccUrl+"horario/getListaHorario",{
            params:{
                cif:cif,
                gestion:gestion
            }
        });
    }
    // Services para el  MODELO EQUIPO
    getListaEquipo(){
        return axios.get(msccUrl+"equipo/listar");
    }
    addEquipo(equipo){
        return axios.post(msccUrl+"equipo/addEquipo",equipo);
    }
    updateEquipo(equipo){
        return axios.put(msccUrl+"equipo/updateEquipo",equipo);
    }
}