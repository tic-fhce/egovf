import axios from "axios";

//const inventarioUrl="https://stfhce.umsa.bo/fhce-egovf-inv/";
const inventarioUrl="http://192.168.31.45:8093/fhce-egovf-inv/";

export default class InventarioService{
    //Servicios para CPU
    getCpuCif(cif){
        return axios.get(inventarioUrl+"cpu/getCpuCif",{
            params: {
                cif: cif
            }
        });
    }
    addCpu(pc){
        const pcaux={
            _01cif:pc.cif,
            _02codigo:pc.codigo,
            _03fuente:pc.fuente,
            _04memorias:pc.memoria,
            _05capacidad:pc.capacidad,
            _06micro:pc.micro,
            _07micro_capacidad:pc.microcapacidad,
            _08sistema:pc.sistema,
            _09disco:pc.disco,
            _10ip:pc.ip,
            _11mac:pc.mac,
            _12dns:pc.mascara,
            _13segmento:pc.segmento,
            _14cortapico:pc.cortapico,
            _15detalle:pc.detalle,
            _16switch:'',
            _17puerto:'',
            _18vlan:'',
            _19idubicacion:pc.ubicacion
        }
        return axios.post(inventarioUrl+"cpu/addCpu",pcaux);
    }
    updateCpu(pc){
        const pcaux={
            id:pc.id,
            _01cif:pc.cif,
            _02codigo:pc.codigo,
            _03fuente:pc.fuente,
            _04memorias:pc.memoria,
            _05capacidad:pc.capacidad,
            _06micro:pc.micro,
            _07micro_capacidad:pc.microcapacidad,
            _08sistema:pc.sistema,
            _09disco:pc.disco,
            _10ip:pc.ip,
            _11mac:pc.mac,
            _12dns:pc.mascara,
            _13segmento:pc.segmento,
            _14cortapico:pc.cortapico,
            _15detalle:pc.detalle,
            _16switch:pc.switch,
            _17puerto:pc.puerto,
            _18vlan:pc.vlan,
            _19idubicacion:pc.ubicacion
        }
        return axios.put(inventarioUrl+"cpu/updateCpu",pcaux);
    }
    //Servicios para el Monitor
    getMonitorCif(cif){
        return axios.get(inventarioUrl+"monitor/getMonitorCif",{
            params: {
                cif: cif
            }
        });
    }
    addMonitor(monitor){
        const monitoraux={
            _01cif:monitor.cif,
            _02codigo:monitor.codigo,
            _03marca:monitor.marca,
            _04pulgadas:monitor.pulgadas,
            _05tipo:monitor.tipo,
            _06idubicacion:monitor.ubicacion
        }
        return axios.post(inventarioUrl+"monitor/addMonitor",monitoraux);
    }
    updateMonitor(monitor){
        const monitoraux={
            id:monitor.id,
            _01cif:monitor.cif,
            _02codigo:monitor.codigo,
            _03marca:monitor.marca,
            _04pulgadas:monitor.pulgadas,
            _05tipo:monitor.tipo,
            _06idubicacion:monitor.ubicacion
        }
        return axios.put(inventarioUrl+"monitor/updateMonitor",monitoraux);
    }
    //Servicios para la Impresora
    addImpresora(impresora){
        const impresoraaux={
            _01cif:impresora.cif,
            _02codigo:impresora.codigo,
            _03marca:impresora.marca,
            _04modelo:impresora.modelo,
            _05detalle:impresora.detalle,
            _06idubicacion:impresora.ubicacion
        }
        return axios.post(inventarioUrl+"impresora/addImpresora",impresoraaux);
    }
    getImpresoraCif(cif){
        return axios.get(inventarioUrl+"impresora/getImpresoraCif",{
            params: {
                cif: cif
            }
        });
    }
    updateImpresora(impresora){
        const impresoraaux={
            id:impresora.id,
            _01cif:impresora.cif,
            _02codigo:impresora.codigo,
            _03marca:impresora.marca,
            _04modelo:impresora.modelo,
            _05detalle:impresora.detalle,
            _06idubicacion:impresora.ubicacion
        }
        return axios.put(inventarioUrl+"impresora/updateImpresora",impresoraaux);
    }
    //Servicio para Telefono
    addTelefono(telefono){
        const telefonoaux={
            _01cif:telefono.cif,
            _02codigo:telefono.codigo,
            _03marca:telefono.marca,
            _04ip:telefono.ip,
            _05interno:telefono.interno,
            _06idubicacion:telefono.ubicacion
        }
        return axios.post(inventarioUrl+"telefono/addTelefono",telefonoaux);
    }
    getTelefonoCif(cif){
        return axios.get(inventarioUrl+"telefono/getTelefonoCif",{
            params: {
                cif: cif
            }
        });
    }
    updateTelefono(telefono){
        const telefonoaux={
            id:telefono.id,
            _01cif:telefono.cif,
            _02codigo:telefono.codigo,
            _03marca:telefono.marca,
            _04ip:telefono.ip,
            _05interno:telefono.interno,
            _06idubicacion:telefono.ubicacion
        }
        return axios.put(inventarioUrl+"telefono/updateTelefono",telefonoaux);
    }
    // servicios para Ubicacion
    addUbicacion(ubicacion){
        const ubicacionaux = {
            _01cif:ubicacion.cif,
            _02ambiente:ubicacion.ambiente,
            _03latitud:ubicacion.latitud,
            _04longitud:ubicacion.longitud
        }
        return axios.post(inventarioUrl+"ubicacion/addUbicacion",ubicacionaux);
    }
    getUbicacionCif(cif){
        return axios.get(inventarioUrl+"ubicacion/getUbicacionCif",{
            params: {
                cif: cif
            }
        });
    }
    updateUbicacion(ubicacion){
        const ubicacionaux = {
            id: ubicacion.id,
            _01cif:ubicacion.cif,
            _02ambiente:ubicacion.ambiente,
            _03latitud:ubicacion.latitud,
            _04longitud:ubicacion.longitud
        }
        return axios.put(inventarioUrl+"ubicacion/updateUbicacion",ubicacionaux);
    }
    //Servicios para el Servicio
    getTipo(){
        return axios.get(inventarioUrl+"tipo/getTipo");
    }
    getPerteneceCif(cif){
        return axios.get(inventarioUrl+"pertenece/getPerteneceCif",{
            params: {
                cif: cif
            }
        });
    }
}