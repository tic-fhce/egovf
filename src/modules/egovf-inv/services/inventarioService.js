import axios from "axios";
import { API_URL_EGOVF_INV } from "@/env";
const inventarioUrl = API_URL_EGOVF_INV;
import { API_URL_EGOVF_USER } from "@/env";
const personaUrl = API_URL_EGOVF_USER;

export default class InventarioService {
  headersUsuario(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  //Servicios para CPU
  getTipo() {
    return axios.get(inventarioUrl + "tipo/getTipo");
  }
  addTipo(tipo) {
    const tipoDtoRequest = {
      "sigla":tipo.sigla,
      "nombre":tipo.nombre,
      "icono":tipo.icono,
      "detalle":tipo.detalle
    };
    return axios.post(inventarioUrl + "tipo/addTipo", tipoDtoRequest);
  }

  getEquipoTipo(id) {
    return axios.get(inventarioUrl + "equipo/porTipo", { params: { idTipo: id } });
  }
  ////////////// funciones corregidas



  //Servicios para CPU
  getCpuCif(cif) {
    return axios.get(inventarioUrl + "cpu/getCpuCif", {
      params: {
        cif: cif,
      },
    });
  }
  addCpu(pc) {
    const pcaux = {
      _01cif: pc.cif,
      _02codigo: pc.codigo,
      _03fuente: pc.fuente,
      _04memorias: pc.memoria,
      _05capacidad: pc.capacidad,
      _06micro: pc.micro,
      _07micro_capacidad: pc.microcapacidad,
      _08sistema: pc.sistema,
      _09disco: pc.disco,
      _10ip: pc.ip,
      _11mac: pc.mac,
      _12dns: pc.mascara,
      _13segmento: pc.segmento,
      _14cortapico: pc.cortapico,
      _15detalle: pc.detalle,
      _16switch: "",
      _17puerto: "",
      _18vlan: "",
      _19idubicacion: pc.ubicacion,
    };
    return axios.post(inventarioUrl + "cpu/addCpu", pcaux);
  }
  updateCpu(pc) {
    const pcaux = {
      id: pc.id,
      _01cif: pc.cif,
      _02codigo: pc.codigo,
      _03fuente: pc.fuente,
      _04memorias: pc.memoria,
      _05capacidad: pc.capacidad,
      _06micro: pc.micro,
      _07micro_capacidad: pc.microcapacidad,
      _08sistema: pc.sistema,
      _09disco: pc.disco,
      _10ip: pc.ip,
      _11mac: pc.mac,
      _12dns: pc.mascara,
      _13segmento: pc.segmento,
      _14cortapico: pc.cortapico,
      _15detalle: pc.detalle,
      _16switch: pc.switch,
      _17puerto: pc.puerto,
      _18vlan: pc.vlan,
      _19idubicacion: pc.ubicacion,
    };
    return axios.put(inventarioUrl + "cpu/updateCpu", pcaux);
  }
  //Servicios para el Monitor
  getMonitorCif(cif) {
    return axios.get(inventarioUrl + "monitor/getMonitorCif", {
      params: {
        cif: cif,
      },
    });
  }
  addMonitor(monitor) {
    const monitoraux = {
      _01cif: monitor.cif,
      _02codigo: monitor.codigo,
      _03marca: monitor.marca,
      _04pulgadas: monitor.pulgadas,
      _05tipo: monitor.tipo,
      _06idubicacion: monitor.ubicacion,
    };
    return axios.post(inventarioUrl + "monitor/addMonitor", monitoraux);
  }
  updateMonitor(monitor) {
    const monitoraux = {
      id: monitor.id,
      _01cif: monitor.cif,
      _02codigo: monitor.codigo,
      _03marca: monitor.marca,
      _04pulgadas: monitor.pulgadas,
      _05tipo: monitor.tipo,
      _06idubicacion: monitor.ubicacion,
    };
    return axios.put(inventarioUrl + "monitor/updateMonitor", monitoraux);
  }
  //Servicios para la Impresora
  addImpresora(impresora) {
    const impresoraaux = {
      _01cif: impresora.cif,
      _02codigo: impresora.codigo,
      _03marca: impresora.marca,
      _04modelo: impresora.modelo,
      _05detalle: impresora.detalle,
      _06idubicacion: impresora.ubicacion,
    };
    return axios.post(inventarioUrl + "impresora/addImpresora", impresoraaux);
  }
  getImpresoraCif(cif) {
    return axios.get(inventarioUrl + "impresora/getImpresoraCif", {
      params: {
        cif: cif,
      },
    });
  }
  updateImpresora(impresora) {
    const impresoraaux = {
      id: impresora.id,
      _01cif: impresora.cif,
      _02codigo: impresora.codigo,
      _03marca: impresora.marca,
      _04modelo: impresora.modelo,
      _05detalle: impresora.detalle,
      _06idubicacion: impresora.ubicacion,
    };
    return axios.put(inventarioUrl + "impresora/updateImpresora", impresoraaux);
  }
  //Servicio para Telefono
  addTelefono(telefono) {
    const telefonoaux = {
      _01cif: telefono.cif,
      _02codigo: telefono.codigo,
      _03marca: telefono.marca,
      _04ip: telefono.ip,
      _05interno: telefono.interno,
      _06idubicacion: telefono.ubicacion,
    };
    return axios.post(inventarioUrl + "telefono/addTelefono", telefonoaux);
  }
  getTelefonoCif(cif) {
    return axios.get(inventarioUrl + "telefono/getTelefonoCif", {
      params: {
        cif: cif,
      },
    });
  }
  updateTelefono(telefono) {
    const telefonoaux = {
      id: telefono.id,
      _01cif: telefono.cif,
      _02codigo: telefono.codigo,
      _03marca: telefono.marca,
      _04ip: telefono.ip,
      _05interno: telefono.interno,
      _06idubicacion: telefono.ubicacion,
    };
    return axios.put(inventarioUrl + "telefono/updateTelefono", telefonoaux);
  }
  // servicios para Ubicacion
  addUbicacion(ubicacion) {
    const ubicacionaux = {
      _01cif: ubicacion.cif,
      _02ambiente: ubicacion.ambiente,
      _03latitud: ubicacion.latitud,
      _04longitud: ubicacion.longitud,
    };
    return axios.post(inventarioUrl + "ubicacion/add", ubicacionaux);
  }
  // OBSERVAR
  getUbicacionCif(cif) {
    return axios.get(inventarioUrl + "ubicacion/getUbicacionCif", {
      params: {
        cif: cif,
      },
    });
  }
  updateUbicacion(ubicacion) {
    const ubicacionaux = {
      id: ubicacion.id,
      _01cif: ubicacion.cif,
      _02ambiente: ubicacion.ambiente,
      _03latitud: ubicacion.latitud,
      _04longitud: ubicacion.longitud,
    };
    return axios.put(inventarioUrl + "ubicacion/update", ubicacionaux);
  }
  

  getPerteneceCif(cif) {
    return axios.get(inventarioUrl + "pertenece/porCif", {
      params: {
        cif: cif,
      },
    });
  }
  getCaracteristica() {
    return axios.get(inventarioUrl + "caracteristica/getCaracteristica");
  }
  addAtencion(atencion) {
    const atencionaux = {
      _01cif: atencion.cif,
      _02codigo: atencion.codigo,
      _03fechasolicitud: "",
      _04horasolicitud: "",
      _05idtipo: atencion.tipo,
      _06idcaracteristica: atencion.caracteristica,
      _07especificacion: atencion.detalle,
      _08error: "",
      _09detalle: "",
      _10fechaatencion: "",
      _11horaatencion: "",
    };
    return axios.post(inventarioUrl + "atencion/addAtencion", atencionaux);
  }
  getAtencionCif(cif) {
    return axios.get(inventarioUrl + "atencion/getAtencionCif", {
      params: {
        cif: cif,
      },
    });
  }
  getAtencionEspera() {
    return axios.get(inventarioUrl + "atencion/getAtencionEspera");
  }
  updateAtencion(atencion) {
    const atencionaux = {
      id: atencion.id,
      _01cif: atencion.cif,
      _02codigo: atencion.codigo,
      _03fechasolicitud: "",
      _04horasolicitud: "",
      _05idtipo: atencion.idtipo,
      _06idcaracteristica: atencion.idcaracteristica,
      _07especificacion: atencion.especificacion,
      _08error: "",
      _09detalle: "",
      _10fechaatencion: "",
      _11horaatencion: "",
      _12estado: atencion.estado,
    };
    return axios.put(inventarioUrl + "atencion/updateAtencion", atencionaux);
  }
  updateRegistroAtencion(atencion) {
    const atencionaux = {
      id: atencion.idAtencion,
      _01cif: atencion.cif,
      _02codigo: atencion.codigo,
      _03fechasolicitud: atencion.fechasolicitud,
      _04horasolicitud: atencion.horasolicitud,
      _05idtipo: atencion.idTipo,
      _06idcaracteristica: atencion.idCaracteristica,
      _07especificacion: atencion.especificacion,
      _08error: atencion.error,
      _09detalle: atencion.detalle,
      _10fechaatencion: "",
      _11horaatencion: "",
      _12estado: 1,
    };
    return axios.put(
      inventarioUrl + "atencion/updateRegistroAtencion",
      atencionaux
    );
  }
  getListaEquipo(idtipo) {
    return axios.get(inventarioUrl + "equipo/getListaEquipo", {
      params: {
        id: idtipo,
      },
    });
  }
  // Nuevos servicios
  getPertenecePorEquipo(idEquipo) {
    return axios.get(inventarioUrl + "pertenece/porEquipo", {
      params: {
        idEquipo: idEquipo
      }
    });
  }

  getEquipoById(idEquipo) {
    return axios.get(inventarioUrl + "equipo/getEquipo/"+idEquipo);
  }

  getPersona(cif) {
      return axios.get(personaUrl + "persona/getPersona", {
        params: {
          cif: cif,
        },
      });
  }
  getAtencionesPorEquipoYCif(cif, idEquipo) {
    return axios.get(inventarioUrl + "solicitud/porEquipo" , {
      params: {
        idEquipo: idEquipo
      }
    });
  }

  getUbicacionesPorEquipo(idEquipo) {
    return axios.get(inventarioUrl + "ubicacion/activa", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  getRedPorEquipo(idEquipo) {
    return axios.get(inventarioUrl + "red/porEquipo", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  getSoftwarePorEquipo(idEquipo) {
    return axios.get(inventarioUrl + "software/porEquipo", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  añadirequipo(equipo) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'equipo/add', equipo, config);
  }
  añadiratencion(atencion) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'solicitud/add', atencion, config);
  }
  añadirPertenece(pertenece) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'pertenece/add', pertenece, config);
  }
  editarPertenece(pertenece, id) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: id
      }
    };
    return axios.put(inventarioUrl + 'pertenece/update', pertenece, config);
  }
  añadirSoftware(software) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'software/add', software, config);
  }
  añadirRed(red) {
    
    return axios.post(inventarioUrl + 'red/add', red);
  }
  añadirUbicacion(ubicacion) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'ubicacion/add', ubicacion, config);
  } 

  editarEquipo(equipo,id) {

    return axios.put(inventarioUrl + 'equipo/update', { params: { id:id }, data: equipo });
  }

  getSolicitudes() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.get(inventarioUrl + "solicitud/todas", config);
  }
  getSolicitudesAtendidas() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.get(inventarioUrl + "solicitud/lista-atendidas", config);
  }
  getSolicitudesEnEspera() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.get(inventarioUrl + "solicitud/lista-espera", config);
  } 
  desactivarUbicacion(idUbi) {
    const id = parseInt(idUbi);
    return axios.put(
      inventarioUrl + "ubicacion/cambiarEstado",
      {},
      {
        params: {
          id: id,
          estado: 0
        }
      }
    );
  }
  activarUbicacion(idUbi) {
    const id = parseInt(idUbi);
    return axios.put(
      inventarioUrl + "ubicacion/cambiarEstado",
      {},
      {
        params: {
          id: id,
          estado: 1
        }
      }
    );
  }
  gethistorialUbicaciones(idEquipo) {
    return axios.get(inventarioUrl + "ubicacion/historial", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  getRedActiva(idEquipo) {
    return axios.get(inventarioUrl + "red/activa", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  desactivarRed(idRed) {
    const id = parseInt(idRed);
    return axios.put(
      inventarioUrl + "red/cambiarEstado",
      {},
      {
        params: {
          id: id,
          estado: 0
        }
      }
    );
  }
  activarRed(idRed) {
    const id = parseInt(idRed);
    return axios.put(
      inventarioUrl + "red/cambiarEstado",
      {},
      {
        params: {
          id: id,
          estado: 1
        }
      }
    );
  }
  getHistorialRedes(idEquipo) {
    return axios.get(inventarioUrl + "red/historial", {
      params: {
        idEquipo: idEquipo
      }
    });
  }


  getSolicitudporEquipo(idEquipo) {
    return axios.get(inventarioUrl + "solicitud/porEquipo", {
      params: {
        idEquipo: idEquipo
      }
    });
  }
  añadirAtencion1(atencion) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'atencion/addAtencion', atencion, config);
  }
  añadirSolicitud(solicitud) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return axios.post(inventarioUrl + 'solicitud/add', solicitud, config);
  }
}
