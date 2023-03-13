import axios from "axios";

const controlUrl="http://192.168.31.45:8082/fhce-egovf-scc/";

export default class BiometricoService{
    getListarCifCero(){
        return axios.get(controlUrl+"biometrico/listarCifCero");
    }
    updateBiometrico(biometrico){
        console.log('datos del biometrico');
        console.log(biometrico);
        return axios.put(controlUrl+"biometrico/agregarBiometrico",biometrico);
    }
    getPerfil(cif){
        return axios.get(controlUrl+"biometrico/getPerfil",{
            params: {
                cif: cif
            }});
    }
    addHorario(horario){
        console.log(horario);
        return axios.post(controlUrl+"horario/addHorario",horario);
    }
    getHorario(id_horario,cif){
        return axios.get(controlUrl+"horario/getHorario",{
            params:{
                id_horario:id_horario,
                cif:cif
            }
        });
    }
    getReporteMes(reporte){
        console.log(reporte);
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
        console.log(reporte);
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