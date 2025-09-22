<!--Observaciones del usuario
muestra una lista de las obserbaciones deacuerdo a la gestion y el mes seleccionado permite realiza :
- Visualizar
- Registrar
- Editar
- Eliminar
 -->
<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <CRow>
                        <CCol :lg="6">
                            <div class="align-items-center">
                                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
                            </div>
                        </CCol>
                        <CCol :lg="6" class="text-end">
                            <CDropdown variant="btn-group">
                                <CDropdownToggle color="dark" class="font border-0 shadow-sm" size="sm">
                                    <CIcon icon="cil-menu" class="me-2 text-success" />Opciones
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem>
                                        <CButton @click="clickModalObs(true)" size="sm">
                                            <CIcon icon="cil-plus" class="me-2" /> Agregar Observaciones
                                        </CButton>
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="4">
                            <CInputGroup class="mb-3">
                                <CInputGroupText as="label">Gestion</CInputGroupText>
                                <CFormSelect v-model="obsgestion" :model-value="String(obsgestion)"
                                    @update:model-value="obsgestion = Number($event)" required="true">
                                    <option v-for="y in listaGestion" :key="y" :value="y">{{ y }}</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>

                        <CCol :lg="4">
                            <CInputGroup class="mb-3">
                                <CInputGroupText as="label">Mes</CInputGroupText>
                                <CFormSelect v-model="obsmes" :model-value="String(obsmes)" required="true">
                                    <option v-for="mes in listaMes" :key="mes.m" :value="mes.m">{{ mes.mes }}</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>

                        <CCol :lg="4" class="text-center">
                            <CButton color="success" class="font" size="sm" @click="getObsUsuario()">
                                <CIcon icon="cil-featured-playlist"></CIcon> Cargar Observaciones
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UidObs</th>
                                <th>Tipo</th>
                                <th>Detalle</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                <td>{{ lsobs.id }}</td>
                                <td>{{ lsobs.uidobs }}</td>
                                <td>
                                    <div>{{ lsobs.tipo }}</div>
                                    <div class="small text-medium-emphasis">
                                        <span>{{ lsobs.horaEntrada }}</span> | {{ lsobs.horaSalida }}
                                    </div>
                                </td>
                                <td>
                                    <div>{{ lsobs.detalle }}</div>
                                    <div class="small text-medium-emphasis">
                                        <span>{{ lsobs.fechainicio }}</span> | {{ lsobs.fechafin }}
                                    </div>
                                </td>
                                <td>
                                    <CBadge color="danger" v-if="lsobs.estado === 2">Rechazado</CBadge>
                                    <CBadge color="success" v-if="lsobs.estado === 1">Aprobado</CBadge>
                                    <CBadge color="warning" v-if="lsobs.estado === 0">En Espera</CBadge>
                                </td>
                                <td>
                                    <CButtonGroup role="group">
                                        <CButton color="success" class="font" size="sm"
                                            @click="getObsDetalle(lsobs.id)">
                                            <CIcon icon="cil-featured-playlist"></CIcon>
                                        </CButton>
                                        <CButton v-if="lsobs.estado == 0" color="warning" class="font" size="sm"
                                            @click="setObs(lsobs.id)">
                                            <CIcon icon="cil-pencil"></CIcon>
                                        </CButton>
                                        <CButton v-if="lsobs.estado == 0" color="danger" class="font" size="sm"
                                            @click="deleteObs(lsobs.id)">
                                            <CIcon icon="cil-trash"></CIcon>
                                        </CButton>
                                    </CButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>

                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal  Detalles de OBS-->
    <CModal size="lg" :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-featured-playlist" size="lg" class="me-2" />Detalles de la Observacion
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteObs :obsDetalle="obsDetalle" />
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalDetalleObs(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />Cancelar
            </CButton>
            <CButton @click="downloadImg(obsDetalle.url, obsDetalle.imagen)" color="success" class="font" size="sm">
                <CIcon icon="cil-cloud-download" class="me-2" />Descargar Documento
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- END Modal  Detalles de Obs-->

    <!-- Modal  Obserbasiones-->
    <CModal :visible="modalObs" @close="clickModalObs(false)">
        <CForm @submit.prevent="addObs()" enctype="multipart/form-data">
            <CModalHeader class="headercolor text-center" dismiss @close="clickModalObs(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-plus" size="lg" class="me-2" />Registrar una Observacion de Asistencia
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="obsDetalle.datos" />
                <hr>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">UID - OBS </CInputGroupText>
                    <CFormInput type="text" v-model="obs.uidobs" required="true"
                        placeholder="Ej. FHCE - # de hoja de Ruta" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Del </CInputGroupText>
                    <CFormInput type="date" v-model="obs.fechainicio" required="true" />
                    <CInputGroupText as="label">Al </CInputGroupText>
                    <CFormInput type="date" v-model="obs.fechafin" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Detalle </CInputGroupText>
                    <CFormTextarea v-model="obs.detalle" required="true"> </CFormTextarea>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Tipo </CInputGroupText>
                    <CFormSelect v-model="obs.tipo" required="true" @change="getTipo()">
                        <option v-for="opt in tipoOpciones" :key="opt.value" :value="opt.value"
                            :disabled="opt.disabled">
                            {{ opt.label }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3" v-if="mostrarHoraIngreso()">
                    <CInputGroupText as="label">Hora Ingreso </CInputGroupText>
                    <CFormInput type="text" v-model="obs.horaEntrada" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3" v-if="mostrarHoraSalida()">
                    <CInputGroupText as="label">Hora Salida </CInputGroupText>
                    <CFormInput type="text" v-model="obs.horaSalida" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Documento</CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"
                        @change="selectFile" :valid="fileValid" required="true" />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        Espere un Momento ........... {{ uploadProgress }} %
                    </CProgressBar>
                </CProgress>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalObs(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" /> Agregar Observacion
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>

    <!-- Modal Editar Obserbasiones-->
    <CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
        <CForm @submit.prevent="updateObs()" enctype="multipart/form-data">
            <CModalHeader class="headercolor text-center" dismiss @close="clickModalObsEditar(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar la Observacion de Asistencia
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="obsDetalle.datos" />
                <hr>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">UID - OBS </CInputGroupText>
                    <CFormInput type="text" v-model="uobs.uidobs" required="true"
                        placeholder="Ej. FHCE - # de hoja de Ruta" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Del </CInputGroupText>
                    <CFormInput type="date" v-model="uobs.fechainicio" required="true" />
                    <CInputGroupText as="label">Al </CInputGroupText>
                    <CFormInput type="date" v-model="uobs.fechafin" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Detalle </CInputGroupText>
                    <CFormTextarea v-model="uobs.detalle" required="true"> </CFormTextarea>
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Tipo </CInputGroupText>

                    <CFormSelect v-model="uobs.tipo" required="true" @change="getUTipo()">
                        <option v-for="opt in tipoOpciones" :key="opt.value" :value="opt.value"
                            :disabled="opt.disabled">
                            {{ opt.label }}
                        </option>
                    </CFormSelect>
                </CInputGroup>

                <CInputGroup class="mb-3" v-if="mostrarUHoraIngreso()">
                    <CInputGroupText as="label">Hora Ingreso </CInputGroupText>
                    <CFormInput type="text" v-model="uobs.horaEntrada" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3" v-if="mostrarUHoraSalida()">
                    <CInputGroupText as="label">Hora Salida </CInputGroupText>
                    <CFormInput type="text" v-model="uobs.horaSalida" required="true" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Documento</CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"
                        @change="selectFile" :valid="fileValid" required="true" />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        Espere un Momento ........... {{ uploadProgress }} %
                    </CProgressBar>
                </CProgress>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalObsEditar(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" /> Actualizar Observacion
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- END Modal Editar Obserbasiones-->

</template>
<script>
// Importamos Componentes
import ComponenteObs from "@/modules/egovf-scc/components/ComponenteObs.vue";
import ComponenteNombres from "@/modules/egovf/components/Ciudadano/ComponenteNombres.vue";
//Importamos Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
import EgovfService from '@/modules/egovf/services/egovfService';
import UploadService from '@/services/upload/uploadService';

export default {
    name: 'ObservacionesView',
    components: {
        ComponenteObs,
        ComponenteNombres
    },
    data() {
        return {
            titulo: 'Observaciones',
            archivo: null,
            fileValid: false,
            sccService: null,
            egovfService: null,
            uploadService: null,
            modalDetalleObs: false,
            modalObsEditar: false,
            listaGestion: [],
            uploading: false,
            uploadProgress: 0,
            listaMes: [],
            usuario: { ...this.$models.usuarioModel },
            obsgestion: 0,
            obsmes: 0,
            listaObs: [],
            tipoOpciones: [],
            obsDetalle: { ...this.$models.obsDetalleModel },
            egovf: { ...this.$models.egovfModel },
            modalObs: false,
            obs: {
                cif: null,
                uidobs: '',
                fechainicio: '',
                fechafin: '',
                detalle: 'Referencia por la que pide su Observación',
                imagen: '',
                tipo: 'Seleccionar Tipo',
                horaEntrada: '08:30',
                horaSalida: '16:30',
                url: '',
                estado: 0
            },
            uobs: {
                id: 0,
                idObs: 0,
                cif: null,
                sexo: 0,
                uidobs: '',
                fechainicio: '',
                fechafin: '',
                detalle: '',
                imagen: '',
                tipo: '',
                horaEntrada: '',
                horaSalida: '',
                url: '',
                estado: 0
            },
        }
    },
    mounted() {
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        const gestion = this.$functions.getGestion();
        this.obsgestion = gestion.gestion;
        this.listaGestion = gestion.lgestion;
        this.listaMes = this.$functions.listaMes();
        this.getEgovf();
        this.tipoOpciones = this.$functions.tipoOpciones();
    },
    created() {
        //Creamos los Sercicios
        this.sccService = new SccService();
        this.egovfService = new EgovfService();
        this.uploadService = new UploadService();
    },
    methods: {
        selectFile(event) {// Funcion que permite cambiar los datos del archivo
            const fileInput = this.getSafeFileInput(event);

            if (!fileInput?.files?.length) {
                this.resetFileInput();
                return;
            }

            this.archivo = fileInput.files[0];

            if (!this.this.$egovf.validateFile(this.archivo)) {
                this.resetFileInput();
                return;
            }
            this.fileValid = true;
        },
        getDatos() {
            //cargamos datos del Usuario
            if (this.$cookies.get('cif') != null) {
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get('foto');
            }
        },
        async getObsUsuario() { // Funcion que llama una lista de Observaciones del usuario 
            await this.sccService.getObsUsuario(this.usuario.cif, this.obsgestion, this.obsmes).then(response => {
                this.listaObs = response.data;
            });
            if (this.listaObs.length == 0) {
                this.$swal.fire('No se encontro ninguna Observacion', '', 'info');
            }
        },
        getObsDetalle(id) {// Funcion que Muestra el detalle de las Observaciones del Usuario
            this.listaObs.forEach(obs => {
                if (obs.id === id) {
                    this.obsDetalle.id = obs.id;
                    this.obsDetalle.idObs = obs.idObs;
                    this.obsDetalle.cif = obs.cif;
                    this.obsDetalle.sexo = obs.sexo;
                    this.obsDetalle.uidobs = obs.uidobs;
                    this.obsDetalle.fechainicio = obs.fechainicio;
                    this.obsDetalle.fechafin = obs.fechafin;
                    this.obsDetalle.gestion = obs.gestion;
                    this.obsDetalle.mes = obs.mes;
                    this.obsDetalle.di = obs.di;
                    this.obsDetalle.df = obs.df;
                    this.obsDetalle.detalle = obs.detalle;
                    this.obsDetalle.imagen = obs.imagen;
                    this.obsDetalle.tipo = obs.tipo;
                    this.obsDetalle.horaEntrada = obs.horaEntrada;
                    this.obsDetalle.hEntrada = obs.hEntrada;
                    this.obsDetalle.mEntrada = obs.mEntrada;
                    this.obsDetalle.horaSalida = obs.horaSalida;
                    this.obsDetalle.hSalida = obs.hSalida;
                    this.obsDetalle.mSalida = obs.mSalida;
                    this.obsDetalle.url = obs.url;
                    this.obsDetalle.estado = obs.estado;

                    if (obs.idtipo == 1) {
                        this.obsDetalle.idtipo = "GENERAL";
                    }
                    else {
                        this.obsDetalle.idtipo = "PRIVADO";
                    }

                    if (this.obsDetalle.estado == 1) {
                        this.obsDetalle.forma.color = 'success';
                        this.obsDetalle.forma.estado = 'Aprobado';
                    }
                    if (this.obsDetalle.estado == 0) {
                        this.obsDetalle.forma.color = 'warning';
                        this.obsDetalle.forma.estado = 'En Espera';
                    }
                    if (this.obsDetalle.estado == 2) {
                        this.obsDetalle.forma.color = 'danger';
                        this.obsDetalle.forma.estado = 'Rechazado: Espere la Devolucion de su nota';
                    }
                    return true;
                }
            });
            this.clickModalDetalleObs(true);
        },
        clickModalDetalleObs(Obs) {
            this.modalDetalleObs = Obs;
        },
        async getEgovf() {
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) => {
                this.egovf = response.data;
                this.obsDetalle.datos.cif = this.egovf.cif;
                this.obsDetalle.datos.nombre = this.egovf.nombre;
                this.obsDetalle.datos.apellido = this.egovf.paterno + " " + this.egovf.materno;
            });
        },
        async downloadImg(Url, nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        clickModalObs(cio) {
            this.modalObs = cio;
        },
        getTipo() {
            if (this.obs.tipo == 'Entrada M.')
                this.obs.horaEntrada = '08:30';
            if (this.obs.tipo == 'Salida M.')
                this.obs.horaSalida = '12:30';
            if (this.obs.tipo == 'Entrada T.')
                this.obs.horaEntrada = '14:30';
            if (this.obs.tipo == 'Salida T.')
                this.obs.horaSalida = '18:30';
            if (this.obs.tipo == 'continuo')
                this.obs.horaSalida = '16:30';
            if (this.obs.tipo == 'continuoingreso') {
                this.obs.horaEntrada = '08:30';
                this.obs.horaSalida = '16:30';
            }
            if (this.obs.tipo == 'asueto')
                this.obs.horaEntrada = '08:30';
        },
        mostrarHoraIngreso() {
            const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.", "horas", "extraordinario", "comision", "permiso"];
            return tiposPermitidos.includes(this.obs.tipo);
        },
        mostrarHoraSalida() {
            const tiposPermitidos = ["continuoingreso", "continuo", "Salida M.", "Salida T."];
            return tiposPermitidos.includes(this.obs.tipo);
        },

        getUTipo() {
            if (this.uobs.tipo == 'Entrada M.')
                this.uobs.horaEntrada = '08:30';
            if (this.uobs.tipo == 'Salida M.')
                this.uobs.horaSalida = '12:30';
            if (this.uobs.tipo == 'Entrada T.')
                this.uobs.horaEntrada = '14:30';
            if (this.uobs.tipo == 'Salida T.')
                this.uobs.horaSalida = '18:30';
            if (this.uobs.tipo == 'continuo') {
                this.uobs.horaEntrada = '08:30';
                this.uobs.horaSalida = '16:30';
            }
            if (this.uobs.tipo == 'continuoingreso') {
                this.uobs.horaEntrada = '08:30';
                this.uobs.horaSalida = '16:30';
            }
            if (this.uobs.tipo == 'asueto')
                this.uobs.horaEntrada = '08:30';
        },
        mostrarUHoraIngreso() {
            const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.", "horas", "extraordinario", "comision", "permiso"];
            return tiposPermitidos.includes(this.uobs.tipo);
        },
        mostrarUHoraSalida() {
            const tiposPermitidos = ["continuoingreso", "continuo", "Salida M.", "Salida T."];
            return tiposPermitidos.includes(this.uobs.tipo);
        },

        async addObs() { //Funcion para registrar una Observacion del Usuario
            this.uploading = true;
            this.uploadProgress = 0;
            try {
                const formData = new FormData();
                formData.append('archivo', this.archivo);
                const config = {
                    onUploadProgress: progressEvent => {
                        this.uploadProgress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                    }
                };
                const uploadResponse = await this.uploadService.addImagen(formData, config);
                if (uploadResponse.status !== 200) {
                    throw new Error('Error al subir archivo');
                }

                this.obs.url = this.uploadService.getUrl() + uploadResponse.data.nombre;
                this.obs.imagen = uploadResponse.data.nombre;
                this.obs.cif = this.usuario.cif;

                this.$swal.fire({
                    title: 'Deseas Agregar la Observacion de Tu Asistencia ?',
                    showDenyButton: true,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.sccService.addObsEmpleado(this.obs).then(response => {
                            if (response.status == 201) {
                                this.$swal.fire('La Observacion fue Agregada Corectamente', 'Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res) => {
                                    if (res)
                                        location.reload();
                                });
                            }
                            else {
                                this.$swal.fire('La Observacion no pudo ser Registrada', '' + response.status, 'error');
                            }
                        });

                    } else if (result.isDenied) {
                        this.$swal.fire('Datos Cancelados', '', 'info');
                    }
                });
            } catch (err) {
                this.$swal.fire('El archivo no pudo ser Guardado  ' + err, '', 'error');
            } finally {
                this.uploading = false;
                this.uploadProgress = 0;
            }
        },
        async updateObs() { //Funcion actualizar una Observacion del Usuario
            this.uploading = true;
            this.uploadProgress = 0;
            try {
                const formData = new FormData();
                formData.append('archivo', this.archivo);
                const config = {
                    onUploadProgress: progressEvent => {
                        this.uploadProgress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                    }
                };
                const uploadResponse = await this.uploadService.addImagen(formData, config);
                if (uploadResponse.status !== 200) {
                    throw new Error('Error al subir archivo');
                }

                this.uobs.url = this.uploadService.getUrl() + uploadResponse.data.nombre;
                this.uobs.imagen = uploadResponse.data.nombre;
                this.$swal.fire({
                    title: 'Deseas Actualizar la Observacion de Tu Asistencia ?',
                    showDenyButton: true,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.sccService.updateObsEmpleado(this.uobs).then(response => {
                            if (response.status == 200) {
                                this.$swal.fire('La Observacion fue Actualizada Corectamente', 'Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res) => {
                                    if (res)
                                        location.reload();
                                });
                            }
                            else {
                                this.$swal.fire('La Observacion no pudo ser Actualizada', '' + response.status, 'error');
                            }
                        });

                    } else if (result.isDenied) {
                        this.$swal.fire('Datos Cancelados', '', 'info');
                    }
                });
            } catch (err) {
                this.$swal.fire('El archivo no pudo ser Guardado  ' + err, '', 'error');
            }
        },
        clickModalObsEditar(cio) {
            this.modalObsEditar = cio;
        },
        setObs(id) {// Funcion que carga los datos de las Observaciones del Usuario
            this.listaObs.forEach(obs => {
                if (obs.id === id) {
                    this.uobs.id = id;
                    this.uobs.idObs = obs.idObs;
                    this.uobs.cif = obs.cif;
                    this.uobs.sexo = obs.sexo;
                    this.uobs.uidobs = obs.uidobs;
                    this.uobs.fechainicio = obs.fechainicio;
                    this.uobs.fechafin = obs.fechafin;
                    this.uobs.detalle = obs.detalle;
                    this.uobs.imagen = obs.imagen;
                    this.uobs.tipo = obs.tipo;
                    this.uobs.horaEntrada = obs.horaEntrada;
                    this.uobs.horaSalida = obs.horaSalida;
                    this.uobs.url = obs.url;
                    this.uobs.estado = obs.estado;
                }
            });
            this.clickModalObsEditar(true);
        },
        async deleteObs(id) { //Funcion eliminar una Observacion del Usuario
            var dObs = {
                id: 0,
                idObs: "",
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
                horaEntrada: 0,
                hEntrada: 0,
                mEntrada: 0,
                horaSalida: 0,
                hSalida: 0,
                mSalida: 0,
                url: "",
                estado: 0
            };
            this.listaObs.forEach(obs => {
                if (obs.id == id) {
                    dObs = obs;
                    dObs.estado = 3;
                }
            });
            await this.$swal.fire({
                title: 'Desea Eliminar la Observacion ? ',
                showDenyButton: true,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.sccService.updateObsEmpleado(dObs).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Observacion Eliminada Corectamente', '', 'success').then((res) => {
                                if (res)
                                    location.reload();
                            });
                        }
                        else {
                            this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
                        }
                    });

                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },

        //funciones para validar el archivo a subir
        getSafeFileInput(event) {
            // Todas las formas posibles de obtener el input
            return (
                // CoreUI v4+ (recomendado)
                this.$refs.fileInput?.$refs?.input ||

                // Event target
                event?.target ||

                // CoreUI v3
                this.$refs.fileInput?.$el?.querySelector?.('input[type="file"]') ||

                // Último recurso
                document.getElementById('filedoc')
            );
        },

        resetFileInput() {
            this.archivo = null;
            this.fileValid = false;
            const input = this.getSafeFileInput();
            if (input) input.value = '';
        },
    }

}
</script>