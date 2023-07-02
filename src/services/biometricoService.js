import axios from "axios";

//const controlUrl="http://172.16.114.144:8094/fhce-egovf-scc/";
const controlUrl="http://192.168.31.45:8082/fhce-egovf-scc/";


export default class BiometricoService{
    getListarCifCero(){
        return axios.get(controlUrl+"biometrico/listarCifCero");
    }
    updateBiometrico(biometrico){
        return axios.put(controlUrl+"biometrico/agregarBiometrico",biometrico);
    }
    getPerfil(cif){
        return axios.get(controlUrl+"biometrico/getPerfil",{
            params: {
                cif: cif
            }});
    }
    addHorario(horario){
        return axios.post(controlUrl+"horario/addHorario",horario);
    }
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
            _10imagen:'Ninguna',
            _11tipo:obs.tipo,
            _12hora:obs.hora,
            _13h:obs.hora.substring(0,2),
            _14m:obs.hora.substring(3,5)

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
    getObs(cif){
        const fecha = new Date();
        const gestion = fecha.getFullYear();
        return axios.get(controlUrl+"obs/getObsPerfil",{
            params:{
                cif:cif,
                gestion:gestion
            }
        });
    }
    getReporteMes(reporte){
        return axios.get(controlUrl+"marcado/reporteMes",{
            params:{
                id_horario:reporte.id_horario,
                cif:reporte.cif,
                gestion:reporte.gestion,
                mes:reporte.mes
            }
        });
    }
    getReporteMesDia(reporte){
        return axios.get(controlUrl+"marcado/reporteMesDia",{
            params:{
                id_horario:reporte.id_horario,
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

    /*addPersona(persona){
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
        console.log(aux);
        return axios.post(personaUrl+"registrar",aux);
    }
    getPersona(cif){
        return axios.get(personaUrl+"getPerfil",{
            params: {
                cif: cif
            }});
    }*/
}