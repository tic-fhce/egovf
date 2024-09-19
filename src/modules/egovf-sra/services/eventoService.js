import axios from "axios";

const egovfSraUrl = "http://localhost:8085/fhce-egovf-sra/";

export default class AmbienteService {
    getListaAmbiente() {
        return axios.get(egovfSraUrl + "ambiente/listar");
    }
}