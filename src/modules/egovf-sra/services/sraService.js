import axios from "axios";
import { API_URL_EGOVF_SRA} from "@env";
const sraUrl = API_URL_EGOVF_SRA;

export default class SraService {

    getListaAmbiente() {
        return axios.get(sraUrl + "ambiente/getListaAmbiente");
    }
    addAmbiente(ambiente) {
        const ambienteDtoRequest = {
            "nombre": ambiente.nombre,
            "direccion": ambiente.direccion,
            "capacidad": ambiente.capacidad
        };
        return axios.post(sraUrl + "ambiente/addAmbiente", ambienteDtoRequest);
    }
    //SERVICES SERVICIO
    getListaServicio(idAmbiente) {
        return axios.get(sraUrl + "servicio/getListaServicio",{
            params:{
                idambiente:idAmbiente
            }
        });
    }
    addServicio(servicio) {
        const servicioDtoRequest = {
            "nombre": servicio.nombre,
            "detalle": servicio.detalle,
            "idAmbiente": servicio.idAmbiente
        };
        return axios.post(sraUrl + "servicio/addServicio", servicioDtoRequest);
    }
    //SERVICES INVENTARIO
    addInventario(inventario) {
        const invenatrioDtoRequest = {
            "nombre": inventario.nombre,
            "cantidad": inventario.cantidad,
            "codigo": inventario.codigo,
            "idServicio":inventario.idServicio
        };
        return axios.post(sraUrl + "inventario/addInventario", invenatrioDtoRequest);
    }

    //SERVICES EVENTO

    addEvento(evento) {
        const eventoDtoRequest = {
            "nombre":evento.nombre,
            "detalle":evento.detalle,
            "fechaInicio":evento.fechaInicio,
            "fechaFin":evento.fechaFin,
            "horaInicio":evento.horaInicio,
            "horaFin":evento.horaFin,
            "estado":0,
            "idAmbiente":evento.idAmbiente,
            "imagen":evento.imagen,
            "cif":evento.cif,
        };
        return axios.post(sraUrl + "evento/addEvento", eventoDtoRequest);
    }

    getListaEventoAmbiente(idAmbiente) {
        const ahora = new Date();

        // Obtener el año actual
        const year = ahora.getFullYear();

        return axios.get(sraUrl + "evento/getListaEventoAmbiente",{
            params:{
                gestion:year,
                idAmbiente:idAmbiente
            }
        });
    }

}