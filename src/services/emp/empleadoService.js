import axios from "axios";


const empleadoUrl="http://192.168.31.45:8095/fhce-egovf-emp/";

export default class EmpleadoService{
    
    //EMPLEADO MODULO
    getListaModulo(){
        return axios.get(empleadoUrl+"listar");
    }
    getListarEmpleadoModuloCif(cif){
        return axios.get(empleadoUrl+"listarEmpleadoModuloCif",{
            params: {
                cif: cif
            }
        });
    }
    getListarEmpleadoModulo(cif){
        return axios.get(empleadoUrl+"listarEmpleadoModulo",{
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
        return axios.post(empleadoUrl+"addEmpleadoModulo",moduloaux);
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

}