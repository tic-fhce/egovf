import axios from "axios";

//const empleadoUrl="https://stfhce.umsa.bo/fhce-egovf-emp/";
const empleadoUrl="http://192.168.31.45:8095/fhce-egovf-emp/";

export default class EmpleadoService{
    
    //EMPLEADO MODULO
    getListaModulo(){
        return axios.get(empleadoUrl+"modulo/listar");
    }
    getListarEmpleadoModuloCif(cif){
        return axios.get(empleadoUrl+"modulo/listarEmpleadoModuloCif",{
            params: {
                cif: cif
            }
        });
    }
    getListarEmpleadoModulo(cif){
        return axios.get(empleadoUrl+"modulo/listarEmpleadoModulo",{
            params: {
                cif: cif
            }
        });
    }
    addEmpleadoModulo(modulo){
        const moduloaux={
            _01cif:modulo.cif,
            _02id_modulo:modulo.id_modulo,
            _03estado:1
        };
        return axios.post(empleadoUrl+"empmodulo/addEmpleadoModulo",moduloaux);
    }
    addEmpleado(cif,tipo){
        const fecha=new Date();
        const empleadoaux={
            _01cif:cif,
            _02tipo_empleado_id:tipo,
            _03fecha: fecha.toLocaleDateString('en-CA'),
            _04estado:1,
            _05salida:'Actualidad'
        };
        return axios.post(empleadoUrl+"empleado/addEmpleado",empleadoaux);
    }
    updateEstado(empleado,estado){
        const fecha = new Date();
        const empleadoaux = {
            id:empleado.id,
            _01cif:empleado.cif,
            _02tipo_empleado_id:empleado.tipoempleado_id,
            _03fecha: empleado.fecha,
            _04estado:estado,
            _05salida:fecha.toLocaleDateString('en-CA'),
        };
        return axios.put(empleadoUrl+"empleado/updateEmpleado",empleadoaux);
    }
    addContrato(contrato){
        const fecha = new Date();
        let numero = contrato.numerocontrato;
        const contratoaux={
            _01cif:contrato.cif,
            _02empleado_id:contrato.id,
            _03numero_contrato:numero.toUpperCase(),
            _04servicio:contrato.servicio,
            _05unidad:contrato.unidad,
            _06inicio:contrato.inicio,
            _07fin:contrato.fin,
            _08gestion:fecha.getFullYear(),
            _09detalle:contrato.detalle
        };
        return axios.post(empleadoUrl+"contrato/addContrato",contratoaux);
    }
    setContrato(contrato){
        let numero = contrato.numerocontrato;
        const contratoaux={
            id : contrato.id,
            _01cif:contrato.cif,
            _02empleado_id:contrato.empleado,
            _03numero_contrato:numero.toUpperCase(),
            _04servicio:contrato.servicio,
            _05unidad:contrato.unidad,
            _06inicio:contrato.inicio,
            _07fin:contrato.fin,
            _08gestion:contrato.gestion,
            _09detalle:contrato.detalle
        };
        return axios.put(empleadoUrl+"contrato/actualizarContrato",contratoaux);
    }
    getEmpleado(cif){
        return axios.get(empleadoUrl+"empleado/getEmpleado",{
            params: {
                cif: cif
            }
        });
    }
    getListaTipoEmpleado(){
        return axios.get(empleadoUrl+"tipo/listar");
    }
    getListaEmpleadoTipo(tipo){
        return axios.get(empleadoUrl+"empleado/listarTipo",{
            params: {
                tipo: tipo
            }
        });
    }
    getTipoEmpleado(id){// Servicio quer debuelbe el Detalle del Empleado {Docente, Admisnitrativo, ect} de ModuloEmp tipoempleado
        return axios.get(empleadoUrl+"tipo/getTipoEmpleado",{
            params:{
                id:id
            }
        });
    }
    getListaEmpleado(tipo){ // Funcion que regresa una lista de empleados de acuerdo a su tipo
        return axios.get(empleadoUrl+"empleado/getListaEmpleado",{
            params:{
                tipo:tipo
            }
        });
    }

}