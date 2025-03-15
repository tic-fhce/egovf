import axios from "axios";
import { API_URL_EGOVF_EMP } from "@env";

const empleadoUrl = API_URL_EGOVF_EMP;

export default class EmpleadoService {
  //EMPLEADO MODULO

  getEmpleado(cif) {
    return axios.get(empleadoUrl + "empleado/getEmpleado", {
      params: {
        cif: cif,
      },
    });
  }
  getListaTipoEmpleado() {
    return axios.get(empleadoUrl + "tipo/listar");
  }
  getListarEmpleadoModuloCif(cif) {
    return axios.get(empleadoUrl + "modulo/getListarEmpleadoModuloCif", {
      params: {
        cif: cif,
      },
    });
  }
  getListarEmpleadoModulo(cif) {
    return axios.get(empleadoUrl + "modulo/getListarEmpleadoModulo", {
      params: {
        cif: cif,
      },
    });
  }
  addContrato(contrato) {
    const fecha = new Date();
    let numero = contrato.numerocontrato;
    const contratoDtoRequest = {
      "cif": contrato.cif,
      "numero_contrato": numero.toUpperCase(),
      "servicio": contrato.servicio,
      "unidad": contrato.unidad,
      "inicio": contrato.inicio,
      "fin":contrato.fin,
      "gestion": fecha.getFullYear(),
      "detalle": contrato.detalle,
      "idTipoEmpleado": contrato.idTipoEmpleado
    };
    console.log(contratoDtoRequest);
    return axios.post(empleadoUrl + "contrato/addContrato", contratoDtoRequest);
  }
  updateContrato(contrato) {
    let numero = contrato.numerocontrato;
    const contratoDtoResponse = {
      "id": contrato.id,
      "cif": contrato.cif,
      "numero_contrato": numero.toUpperCase(),
      "servicio": contrato.servicio,
      "unidad": contrato.unidad,
      "inicio": contrato.inicio,
      "fin": contrato.fin,
      "gestion": contrato.gestion,
      "detalle": contrato.detalle,
      "idTipoEmpleado":contrato.idTipoEmpleado
    };
    return axios.put(empleadoUrl + "contrato/updateContrato", contratoDtoResponse);
  }
  getTipoEmpleado(id) {
    // Servicio quer debuelbe el Detalle del Empleado {Docente, Admisnitrativo, ect} de ModuloEmp tipoempleado
    return axios.get(empleadoUrl + "tipo/getTipoEmpleado", {
      params: {
        id: id,
      },
    });
  }
  getListaEmpleado(tipo) {
    // Funcion que regresa una lista de empleados de acuerdo a su tipo
    return axios.get(empleadoUrl + "empleado/getListaEmpleado", {
      params: {
        tipo: tipo,
      },
    });
  }

  ////////////////////////////////
  getListaModulo() {
    return axios.get(empleadoUrl + "modulo/listar");
  }
  
  
  addEmpleadoModulo(modulo) {
    const moduloaux = {
      _01cif: modulo.cif,
      _02id_modulo: modulo.id_modulo,
      _03estado: 1,
    };
    return axios.post(empleadoUrl + "empmodulo/addEmpleadoModulo", moduloaux);
  }
  
  updateEstado(empleado, estado) {
    const fecha = new Date();
    const empleadoaux = {
      id: empleado.id,
      _01cif: empleado.cif,
      _02tipo_empleado_id: empleado.tipoempleado_id,
      _03fecha: empleado.fecha,
      _04estado: estado,
      _05salida: fecha.toLocaleDateString("en-CA"),
    };
    return axios.put(empleadoUrl + "empleado/updateEmpleado", empleadoaux);
  }
  
  getListaEmpleadoTipo(tipo) {
    return axios.get(empleadoUrl + "empleado/listarTipo", {
      params: {
        tipo: tipo,
      },
    });
  }
  
  
}
