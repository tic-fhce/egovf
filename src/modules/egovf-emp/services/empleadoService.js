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

  getListaModulo() {
    return axios.get(empleadoUrl + "modulo/listar");
  }

  addEmpleadoModulo(modulo) {
    const empleadoModuloDtoRequest = {
      "cif": modulo.cif,
      "id_modulo": modulo.id_modulo,
      "estado": 1
    };
    return axios.post(empleadoUrl + "empmodulo/addEmpleadoModulo", empleadoModuloDtoRequest);
  }
  
  updateEmpleadoEliminar(empleado) {
    const empleadoDtoResponse = {
      "id": empleado.id,
      "cif": empleado.cif,
      "tipo_empleado_id": 0,
      "fecha": empleado.fecha,
      "estado": 0,
      "salida": empleado.salida
    };
    return axios.put(empleadoUrl + "empleado/updateEmpleado", empleadoDtoResponse);
  }
  
  ////////////////////////////////
  
  
  

  
  getListaEmpleadoTipo(tipo) {
    return axios.get(empleadoUrl + "empleado/listarTipo", {
      params: {
        tipo: tipo,
      },
    });
  }
  
  
}
