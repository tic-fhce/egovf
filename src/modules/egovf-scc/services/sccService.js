import axios from "axios";
import { API_URL_EGOVF_SCC } from "@env";
const msccUrl = API_URL_EGOVF_SCC;

export default class SccService {

  // Funcion que debuelve informacion del perfil de usuario registrado en el biometrico
  getPerfil(cif) {
    return axios.get(msccUrl + "biometrico/getPerfil", {
      params: {
        cif: cif,
      },
    });
  }
  getListarCifCero() {
    return axios.get(msccUrl + "biometrico/listarCifCero");
  }

  getHorario(gestion, cif) {
    return axios.get(msccUrl + "horario/getHorario", {
      params: {
        gestion: gestion,
        cif: cif
      },
    });
  }
  // Funcion que actualiza los datos del biomatrico con el usuario
  updateBiometrico(biometricoDtoResponse) {
    return axios.put(msccUrl + "biometrico/updateBiometrico", biometricoDtoResponse);
  }
  getAvisoAll() {
    return axios.get(msccUrl + "aviso/getAvisoAll");
  }
  //Avisos
  getAviso() {
    return axios.get(msccUrl + "aviso/getAviso");
  }
  getObsUsuario(cif, gestion, mes) {
    return axios.get(msccUrl + "obs/getObsUsuario", {
      params: {
        cif: cif,
        gestion: gestion,
        mes: mes
      },
    });
  }
  addObsEmpleado(obs) {
    // Funcion que permite registrar los datos de la observacion del propio empleado
    const obsDtoObj = {
      "id": 0,
      "cif": obs.cif,
      "sexo": 0,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.fechainicio.substring(0, 4),
      "mes": obs.fechainicio.substring(5, 7),
      "di": obs.fechainicio.substring(8, 10),
      "df": obs.fechafin.substring(8, 10),
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "horaEntrada": obs.horaEntrada,
      "hentrada": obs.horaEntrada.substring(0, 2),
      "mentrada": obs.horaEntrada.substring(3, 5),
      "horaSalida": obs.horaSalida,
      "hsalida": obs.horaSalida.substring(0, 2),
      "msalida": obs.horaSalida.substring(3, 5),
      "url": obs.url,
      "estado": 0
    };
    return axios.post(msccUrl + "obs/addObs", obsDtoObj);
  }
  updateObs(obs) {
    // Funcion que permite actualizar los datos de la observacion del propio empleado
    const obsDtoObj = {
      "id": obs.id,
      "idObs":obs.id,
      "cif": obs.cif,
      "sexo": obs.sexo,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.fechainicio.substring(0, 4),
      "mes": obs.fechainicio.substring(5, 7),
      "di": obs.fechainicio.substring(8, 10),
      "df": obs.fechafin.substring(8, 10),
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "horaEntrada": obs.horaEntrada,
      "hentrada": obs.horaEntrada.substring(0, 2),
      "mentrada": obs.horaEntrada.substring(3, 5),
      "horaSalida": obs.horaSalida,
      "hsalida": obs.horaSalida.substring(0, 2),
      "msalida": obs.horaSalida.substring(3, 5),
      "url": obs.url,
      "estado": 0
    };
    return axios.put(msccUrl + "obs/updateObs", obsDtoObj);
  }
  updateObsBio(obs) {
    // Funcion que permite actualizar los datos de la observacion del propio empleado
    const obsBioDtoResponse = {
      "id": obs.id,
      "cif": obs.cif,
      "idObs":obs.idObs,
      "horaEntrada": obs.horaEntrada,
      "horaSalida": obs.horaSalida,
      "hentrada": obs.hentrada,
      "hsalida": obs.hsalida,
      "mentrada": obs.mentrada,
      "msalida":obs.msalida,
      "estado":obs.estado
    };
    return axios.put(msccUrl + "obsbio/updateObsBio", obsBioDtoResponse);
  }
  updateObsEmpleado(obs) {
    // Funcion que permite actualizar los datos de la observacion del propio empleado
    const obsDtoObj = {
      "id": obs.id,
      "idObs":obs.idObs,
      "cif": obs.cif,
      "sexo":obs.sexo,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.fechainicio.substring(0, 4),
      "mes": obs.fechainicio.substring(5, 7),
      "di": obs.fechainicio.substring(8, 10),
      "df": obs.fechafin.substring(8, 10),
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "horaEntrada": obs.horaEntrada,
      "horaSalida": obs.horaSalida,
      "hentrada": obs.horaEntrada.substring(0, 2),
      "mentrada": obs.horaEntrada.substring(3, 5),
      "hsalida": obs.horaSalida.substring(0, 2),
      "msalida": obs.horaSalida.substring(3, 5),
      "url": obs.url,
      "estado": obs.estado
    };
    return axios.put(msccUrl + "obs/updateObsEmpleado", obsDtoObj);
  }

  getListaHorario(cif, gestion) {
    return axios.get(msccUrl + "horario/getListaHorario", {
      params: {
        cif: cif,
        gestion: gestion,
      },
    });
  }
  getReporteMes(reporte) {
    return axios.get(msccUrl + "marcado/reporteMes", {
      params: {
        cif: reporte.cif,
        gestion: reporte.gestion,
        mes: reporte.mes,
        di: reporte.di,
        df: reporte.df,
      },
    });
  }

  getReporteMesDia(reporte) {
    return axios.get(msccUrl + "marcado/reporteMesDia", {
      params: {
        cif: reporte.cif,
        gestion: reporte.gestion,
        mes: reporte.mes,
        di: reporte.di,
        df: reporte.df
      },
    });
  }

  // Funcion que permite registrar los horarios del usuario
  addHorario(horario) {
    const horarioDtoRequest={
      "cif": horario.cif,
      "fecha":horario.fecha,
      "salida":horario.salida,
      "tipo":horario.tipo,
      "lem":horario.lem,
      "lsm":horario.lsm,
      "let":horario.let,
      "lst":horario.lst,
      "mem":horario.mem,
      "msm":horario.msm,
      "met":horario.met,
      "mst":horario.mst,
      "miem":horario.miem,
      "mism":horario.mism,
      "miet":horario.miet,
      "mist":horario.mist,
      "jem":horario.jem,
      "jsm":horario.jsm,
      "jet":horario.jet,
      "jst":horario.jst,
      "vem":horario.vem,
      "vsm":horario.vsm,
      "vet":horario.vet,
      "vst":horario.vst,
      "sem":horario.sem,
      "ssm":horario.ssm,
      "set":horario.set,
      "sst":horario.sst,
      "dem":horario.dem,
      "dsm":horario.dsm,
      "det":horario.det,
      "dst":horario.dst
    }
    return axios.post(msccUrl + "horario/addHorario", horarioDtoRequest);
  }
  // Funcion que permite registrar los datos de la observacion de los usuarios
  addObs(obs) {
    const obsDtoObj = {
      "id": 0,
      "idObs":0,
      "cif": obs.cif,
      "sexo": 0,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.fechainicio.substring(0, 4),
      "mes": obs.fechainicio.substring(5, 7),
      "di": obs.fechainicio.substring(8, 10),
      "df": obs.fechafin.substring(8, 10),
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "horaEntrada": obs.horaEntrada,
      "hEntrada": obs.horaEntrada.substring(0, 2),
      "mEntrada": obs.horaEntrada.substring(3, 5),
      "horaSalida": obs.horaSalida,
      "hSalida": obs.horaSalida.substring(0, 2),
      "mSalida": obs.horaSalida.substring(3, 5),
      "url": obs.url,
      "estado": 1
    };
    return axios.post(msccUrl + "obs/addObs", obsDtoObj);
  }
  // Funcion que permite actualizar los datos de la observacion de los usuarios
  updateObs1(obs) {
    const obsDtoResponse = {
      "id": obs.id,
      "cif": obs.cif,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.gestion,
      "mes": obs.mes,
      "di": obs.di,
      "df": obs.df,
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "hora": obs.hora,
      "h": obs.h,
      "m": obs.m,
      "url": obs.url,
      "estado": obs.estado,
      "tipoId":obs.tipoId
    };
    return axios.put(msccUrl + "obs/updateObs", obsDtoResponse);
  }

  getListaObs(rgestion) {
    return axios.get(msccUrl + "obs/getListaObs",{
      params:{
        gestion:rgestion
      }
    });
  }
  getListaObsEmpleado(rgestion) {
    return axios.get(msccUrl + "obs/getListaObsEmpleado",{
      params:{
        gestion:rgestion
      }
    });
  }
  getListaObsEliminado() {
    return axios.get(msccUrl + "obs/getListaObsEliminado");
  }

  addObsAll(obs) {
    // Funcion que registra observaciones masibas
    const obsDtoObj = {
      "id": 0,
      "cif": obs.cif,
      "sexo": obs.sexo,
      "uidobs": obs.uidobs,
      "fechainicio": obs.fechainicio,
      "fechafin": obs.fechafin,
      "gestion": obs.fechainicio.substring(0, 4),
      "mes": obs.fechainicio.substring(5, 7),
      "di": obs.fechainicio.substring(8, 10),
      "df": obs.fechafin.substring(8, 10),
      "detalle": obs.detalle,
      "imagen": obs.imagen,
      "tipo": obs.tipo,
      "horaEntrada": obs.horaEntrada,
      "hEntrada": obs.horaEntrada.substring(0, 2),
      "mEntrada": obs.horaEntrada.substring(3, 5),
      "horaSalida": obs.horaSalida,
      "hSalida": obs.horaSalida.substring(0, 2),
      "mSalida": obs.horaSalida.substring(3, 5),
      "url": obs.url,
      "estado": 1
    };
    return axios.post(msccUrl + "obs/addObsAll", obsDtoObj);
  }

  //Services para el MODELO AVISO
  addAviso(aviso) {
    const avisoDtoRequest = {
      "titulo": aviso.titulo,
      "detalle": aviso.detalle,
      "icon": aviso.icon,
      "estado": 1
    };
    return axios.post(msccUrl + "aviso/addAviso", avisoDtoRequest);
  }

  updateAviso(aviso) {
    const avisoDtoResponse = {
      "id": aviso.id,
      "titulo": aviso.titulo,
      "detalle": aviso.detalle,
      "icon": aviso.icon,
      "estado": aviso.estado
    };
    return axios.put(msccUrl + "aviso/updateAviso", avisoDtoResponse);
  }
  getRecord(record) {
    return axios.get(msccUrl + "marcado/reporteTotal", {
      params: {
        gestion: record.gestion,
        mes: record.mes,
        tipo: record.tipo
      },
    });
  }

  //###############################################################################
  
  getListarBiometrico() {
    return axios.get(msccUrl + "biometrico/listarBiometrico");
  }

  // funcion getLbioemtrico debuelve una lista de personas registradas en el biometrico de acuerdo al parametro tipo
  getLBiometricoTipo(tipo) {
    return axios.get(msccUrl + "biometrico/listarBiometricoTipo", {
      params: {
        tipo: tipo,
      },
    });
  }
  
  updateBiometricoTipo(empleado, estado) {
    var tipo = 0;
    if (estado == 1) {
      tipo = empleado.tipoempleado_id;
    }
    const biometrico = {
      id: 0,
      _01user_id: 0,
      _02nombre: "",
      _03cif: empleado.cif,
      _04estado: 0,
      _05horario_id: 0,
      _06lugar: "",
      _07id_tipo: tipo,
      _08detalle: "",
      _09sexo: 0,
    };
    return axios.put(msccUrl + "biometrico/updateBiometricoTipo", biometrico);
  }
  
  
  
  
  
  getObs(cif, gestion, mes) {
    return axios.get(msccUrl + "obs/getObs", {
      params: {
        cif: cif,
        gestion: gestion,
        mes: mes,
      },
    });
  }
  estadoBiometrico(bio) {
    return axios.put(msccUrl + "biometrico/estadoBiometrico", bio);
  }
  updateTipo(cif, tipo) {
    //Servicio para cambiar el tipo de Empleado
    return axios.put(msccUrl + "biometrico/updateTipo", {
      params: {
        cif: cif,
        tipo: tipo,
      },
    });
  }
  
  
  // Services para el  MODELO EQUIPO
  getListaEquipo() {
    return axios.get(msccUrl + "equipo/listar");
  }
  addEquipo(equipo) {
    return axios.post(msccUrl + "equipo/addEquipo", equipo);
  }
  updateEquipo(equipo) {
    return axios.put(msccUrl + "equipo/updateEquipo", equipo);
  }
  
}
