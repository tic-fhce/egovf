function fechaActual() {
    const date = new Date();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const a = date.getFullYear();
    return (a + "-" + mes + "-" + dia);
}
function esFechaPasada(fechaSalida) {
    if (!fechaSalida) return 'warning';

    const fechaTermino = new Date(fechaSalida);
    const hoy = new Date();

    // Normalizar fechas (ignorar horas)
    fechaTermino.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return fechaTermino < hoy ? 'danger' : 'success';
}

function calcularDiasRestantes(fi, fs) {
    const fechaInicio = new Date(fi);
    const fechaSalida = new Date(fs);
    const diasTotales = Math.floor((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));
    const fechaActual = new Date();
    if (!fechaSalida) this.total = 0;

    if (fechaActual >= fechaSalida) {
        return 100;
    }
    else {
        const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
        const progreso = (diasPasados / diasTotales) * 100;
        return parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
    }
}
function getGestion() { // funcion que crea una lista de gestiones desde el 2021
    var lgestion = [];
    const fecha = new Date();
    var rgestion = fecha.getFullYear();
    var gestion = rgestion;
    var mes = fecha.getMonth();
    for (var i = 2021; i <= rgestion; i++) {
        lgestion.push(i);
    }
    return {
        gestion,
        mes,
        lgestion
    };
}
function tipoOpciones() {
    var lista = [
        { value: '', label: 'Seleccione una opción', disabled: true },
        { value: 'Entrada M.', label: 'Entrada Mañana' },
        { value: 'Salida M.', label: 'Salida Mañana' },
        { value: 'Entrada T.', label: 'Entrada Tarde' },
        { value: 'Salida T.', label: 'Salida Tarde' },
        { value: 'continuo', label: 'Continuo' },
        { value: 'continuoingreso', label: 'Continuo e Ingreso' },
        { value: 'horas', label: 'Horas de Servicio' },
        { value: 'extraordinario', label: 'Horario Extraordinario' },
        { value: 'comision', label: 'Comisión' },
        { value: 'permiso', label: 'Permiso' },
        { value: 'asueto', label: 'Asueto' }
    ];
    return lista;
}
function listaMes() {
    var lista = [{ m: "01", mes: "Enero" }, { m: "02", mes: "Febrero" }, { m: "03", mes: "Marzo" }, { m: "04", mes: "Abril" }, { m: "05", mes: "Mayo" }, { m: "06", mes: "Junio" }, { m: "07", mes: "Julio" }, { m: "08", mes: "Agosto" }, { m: "09", mes: "Septiembre" }, { m: "10", mes: "Octubre" }, { m: "11", mes: "Noviembre" }, { m: "12", mes: "Diciembre" }];
    return lista;

}
function validateFile(file) {
    const VALID_TYPES = ['image/jpeg', 'image/png'];
    return file && VALID_TYPES.includes(file.type);
}

function getObsHora(tipoSeleccionado) {
    var horaEntrada = '08:30';
    var horaSalida = '18:00';
    const tipoConfig = {
        'Entrada M.': { horaEntrada: '08:30' },
        'Salida M.': { horaSalida: '12:30' },
        'Entrada T.': { horaEntrada: '14:30' },
        'Salida T.': { horaSalida: '18:30' },
        'continuo': { horaSalida: '16:30' },
        'continuoingreso': { horaEntrada: '08:30', horaSalida: '16:30' },
        'asueto': { horaEntrada: '08:30' },
        'horas': { horaEntrada: '08:30' },
        'extraordinario': { horaEntrada: '08:30' },
        'comision': { horaEntrada: '08:30' },
        'permiso': { horaEntrada: '08:30' }

    };

    const config = tipoConfig[tipoSeleccionado];
    if (!config) return;

    if (config.horaEntrada) horaEntrada = config.horaEntrada;
    if (config.horaSalida) horaSalida = config.horaSalida;
    return { horaEntrada, horaSalida };
}

function sumaRetraso(listaReporte) { //Funcion que suma los retrasos y los minutos de salida adelantada
    let sum = 0;
    let res = 0;
    let sin = 0;
    listaReporte.forEach(element => {
        // Verificar si hay retraso o "Sin Marcar"
        const tieneRetraso = element.retraso.some(valor => valor > 0);
        const tieneSinMarcar = element.hora.includes("Sin Marcar");

        if (tieneRetraso || tieneSinMarcar) {
            sin += 1;
        }
        // Sumar retrasos según índice par o impar
        element.retraso.forEach((valor, i) => {
            if (i % 2 === 0) {
                sum += parseInt(valor, 10);
            } else {
                res += parseInt(valor, 10);
            }
        });
    });

    return {
        sum,
        res,
        sin
    }
}

function getMes(mes) {// Funcion para colocar el Mes en formato Literal
    if (mes == 1) { return 'Enero'; }
    if (mes == 2) { return 'Febrero'; }
    if (mes == 3) { return 'Marzo'; }
    if (mes == 4) { return 'Abril'; }
    if (mes == 5) { return 'Mayo'; }
    if (mes == 6) { return 'Junio'; }
    if (mes == 7) { return 'Julio'; }
    if (mes == 8) { return 'Agosto'; }
    if (mes == 9) { return 'Septiembre'; }
    if (mes == 10) { return 'Octubre'; }
    if (mes == 11) { return 'Noviembre'; }
    if (mes == 12) { return 'Diciembre'; }
}


export default {
    fechaActual,
    esFechaPasada,
    calcularDiasRestantes,
    getGestion,
    tipoOpciones,
    listaMes,
    validateFile,
    getObsHora,
    sumaRetraso,
    getMes
}