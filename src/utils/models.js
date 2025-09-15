const usuarioModel = {
    token: '',
    cif: '',
    correo: '',
    celular: '',
    pass: '',
    unidad: '',
    sigla: '',
    foto: ''
}

const datosModel = {
    cif: 0,
    nombre: '',
    apellido: ''
}


//modelo del Detalle de la Observacion
const obsDetalleModel = {
    id: 0,
    idObs: 0,
    cif: 0,
    sexo: 0,
    uidobs: "",
    fechainicio: "",
    fechafin: "",
    gestion: 0,
    mes: 0,
    di: 0,
    df: 0,
    detalle: "",
    imagen: "",
    tipo: "",
    horaEntrada: "",
    hentrada: "",
    mentrada: "",
    horaSalida: "",
    hsalida: "",
    msalida: "",
    url: "",
    estado: 0,
    idtipo: "PRIVADO",
    datos: {
        cif: 0,
        nombre: "",
        apellido: "",
    },
    forma: {
        color: '',
        estado: ''
    }
}

const horarioPerfilModel = (cif = 0) => {
    return {
        id: 0,
        cif: cif,
        lem: "08:30",
        lsm: "12:30",
        let: "14:30",
        lst: "18:30",
        mem: "08:30",
        msm: "12:30",
        met: "14:30",
        mst: "18:30",
        miem: "08:30",
        mism: "12:30",
        miet: "14:30",
        mist: "18:30",
        jem: "08:30",
        jsm: "12:30",
        jet: "14:30",
        jst: "18:30",
        vem: "08:30",
        vsm: "12:30",
        vet: "14:30",
        vst: "18:30",
        sem: "08:30",
        ssm: "12:30",
        set: "14:30",
        sst: "18:30",
        dem: "08:30",
        dsm: "12:30",
        det: "14:30",
        dst: "18:30"
    }

}

const horarioModel = {
    cif: 0,
    fecha: "",
    salida: "",
    tipo: 0,
    lem: "08:30",
    lsm: "12:30",
    let: "14:30",
    lst: "18:30",
    mem: "08:30",
    msm: "12:30",
    met: "14:30",
    mst: "18:30",
    miem: "08:30",
    mism: "12:30",
    miet: "14:30",
    mist: "18:30",
    jem: "08:30",
    jsm: "12:30",
    jet: "14:30",
    jst: "18:30",
    vem: "08:30",
    vsm: "12:30",
    vet: "14:30",
    vst: "18:30",
    sem: "08:30",
    ssm: "12:30",
    set: "14:30",
    sst: "18:30",
    dem: "08:30",
    dsm: "12:30",
    det: "14:30",
    dst: "18:30"
}

const egovfModel = {
    idPersona: 0,
    nombre: "",
    paterno: "",
    materno: "",
    fecha: "",
    sexo: 0,
    idUsuario: 0,
    cif: 0,
    matricula: 0,
    ci: "",
    ci_com: 0,
    complemento: "",
    correo: "",
    celular: "",
    pass: "",
    unidad: "",
    dependiente: "",
    sigla: "",
    foto: ""
}

const obsModel = {
    cif: null,
    uidobs: "",
    fechainicio: "",
    fechafin: "",
    detalle: "",
    imagen: "",
    tipo: "Seleccionar Tipo",
    horaEntrada: "08:30",
    horaSalida: "16:30",
    url: "",
    sexo: ""
}



const biometricoModel = {
    id: null,
    user_id: 0,
    nombre: "",
    cif: 0,
    estado: 0,
    horario: 0,
    lugar: "",
    id_tipo: 0,
    detalle: "",
    sexo: 0
}
const reporteMesModel = {
    id_horario: "",
    cif: "",
    gestion: 2023,
    mes: 1,
    di: 0,
    df: 0
}

const empleadoModel = {
    id: 0,
    cif: 0,
    empleado: "",
    tipoempleado_id: 0,
    fecha: "",
    estado: 0,
    salida: "",
    contratos: []
}

const reporteModel = {
    cif: 0,
    sigla: "",
    gestion: 0,
    mes: 0,
    di: 0,
    df: 0,
    listaPerfil: [],
    listaHorario: [],
    persona: {
        id: null,
        ci: "",
        nombre: "",
        paterno: "",
        materno: "",
        celular: "",
        correo: "",
        foto: ""
    }
}

export default {
    usuarioModel,
    egovfModel,
    obsDetalleModel,
    horarioPerfilModel,
    horarioModel,
    obsModel,
    biometricoModel,
    reporteMesModel,
    empleadoModel,
    reporteModel,
    datosModel 
}