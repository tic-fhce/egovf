<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    Perfil del Ciudadano : {{egovf.cif}}
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs">
                        <CNavItem><CNavLink :active="tab == 1" @click="clicktab(1)" ><CButton size="sm"><CIcon icon="cil-menu"></CIcon><label class="d-none d-md-flex me-auto">Datos Personales</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tab == 2" @click="clicktab(2)" ><CButton size="sm"><CIcon icon="cil-user"></CIcon><label class="d-none d-md-flex me-auto">Usuario</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tab == 3" @click="clicktab(3)" ><CButton size="sm"><CIcon icon="cil-cloud-upload"></CIcon><label class="d-none d-md-flex me-auto">Actualizar</label></CButton></CNavLink></CNavItem>
                    </CNav>
                    <CTabContent>
                        <!-- Datos Personales-->
                        <CTabPane :visible="tab == 1">
                            <CRow>
                                <CCol :lg="2">
                                    <br>
                                    <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <ul>
                                        <li>Nombre : {{egovf.nombre}}</li>
                                        <li>Apellidos : {{egovf.paterno}} {{egovf.materno}}</li>
                                        <li>C.I. : {{egovf.ci}} </li>
                                    </ul>
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <ul>
                                        <li>ID app : {{egovf.idPersona}}</li>
                                        <li>Celular : <a :href=what+egovf.celular target="_blank">{{egovf.celular}}</a></li>
                                        <li>Fecha N : {{egovf.fecha}}</li>
                                        <li v-if="egovf.sexo == 1">Sexo : Femenino</li>
                                        <li v-if="egovf.sexo == 2">Sexo : Masculino</li>
                                    </ul>
                                </CCol>  
                            </CRow>
                        </CTabPane>
                        <!-- End Datos Personales-->

                        <!-- Datos de Usuario-->
                        <CTabPane :visible="tab == 2">
                            <CRow>
                                <CCol :lg="2">
                                    <br>
                                    <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <ul>
                                        <li>ID app : {{egovf.idUsuario}}</li>
                                        <li>CIF : {{egovf.cif}}</li>
                                        <li>Matricula : {{egovf.matricula}}</li>
                                        <li>C.I. : {{egovf.ci}}</li>
                                    </ul>
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <ul>
                                        <li>Correo : {{egovf.correo}}</li>
                                        <li>Celular : {{egovf.celular}}</li>
                                        <li>Unidad : {{ egovf.sigla }}</li>
                                    </ul>
                                </CCol>
                            </CRow> 
                        </CTabPane>
                        <!-- End Datos Usuario-->

                        <!-- Actualizar Datos-->
                        <CTabPane :visible="tab == 3">
                            <CRow>
                                <CCol :lg="2">
                                    <br>
                                    <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                                    <div class="d-grid gap-2">
                                        <CButton color="dark" @click="clickModalFoto(true)"><CIcon icon="cil-camera"></CIcon> </CButton>
                                    </div>
                                </CCol>
                                <CCol :lg="10">
                                    <br>
                                    <ul>
                                        <li>Matricula :{{egovf.matricula}}</li>
                                        <li><CButton color="success" class="font" size="sm" @click="clickModalCelular(true)"> {{egovf.celular}}</CButton></li>
                                        <li>Correo : {{egovf.correo}}</li>
                                        <li><CButton color="success" class="font" size="sm" @click="clickModalPass(true)"> Actualizar Contraseña</CButton></li>
                                    </ul>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Actualizar Datos-->
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

<!-- Modal  Actualizar Celular-->
<CModal :visible="modalCelular" @close="clickModalCelular(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalCelular(false)">
        <CModalTitle>
            <h5>Actualizar Numero de Celular</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="celular" class="col-sm-6 col-form-label">Nuevo Numero de Celular : </label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="egovf.celular">
            </div>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalCelular(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="updatePersona()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal  Actualizar Celular-->

<!-- Modal  Actualizar Contraseña-->
<CModal :visible="modalPass" @close="clickModalPass(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalPass(false)">
        <CModalTitle>
            <h5>Actualizar Contraseña</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="nueva" class="col-sm-6 col-form-label">Nueva Contraseña </label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="contra">
            </div>
        </div>
       
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalPass(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton  @click="updatePassAdmin()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal  Actualizar Contraseña-->

<!-- Modal  Actualizar Foto-->
<CModal :visible="modalFoto" @close="clickModalFoto(false)">
    <form @submit.prevent="updateFoto()" enctype="multipart/form-data">
        <CModalHeader class="headercolor" dismiss @close="clickModalFoto(false)">
            <CModalTitle>
                <h5>Actualizar Foto de Perfil</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
                <div class="mb-3 row">
                    <label for="archivo" class="col-sm-4 col-form-label">Foto de Perfil</label>
                    <div class="col-sm-8">
                        <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true">
                    </div>
                </div>
                <br>
                <div class="md-3 row text-center">
                    <img :src="egovf.foto" class="img-fluid">
                </div>        
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalFoto(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font"><CIcon icon="cil-camera" class="me-2"/>Actualizar</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal  Actualizar Foto-->

</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';

// Importamos  Servicios
import UsuarioService from '@/services/usuarioServices';
import PersonaService from '@/services/personaService';
import UnidadService from '@/services/unidadService';
import UploadService from '@/services/upload/uploadService';
import { CButton } from '@coreui/vue';

export default {
    name: 'ComponenteDatosPersonalesVue',
    props: ['cifCiudadano', 'egovfp'],
    components:{
        ComponenteNombres,
        CButton
    },
    data() {
        return {
            tab: 1,
            modalCelular: false,
            modalPass: false,
            modalFoto: false,
            usuarioService: null,
            personaService: null,
            unidadService: null,
            uploadService: null,
            listaUnidad: [],
            what: "https://api.whatsapp.com/send?phone=591",
            getPB: true,
            archivo: '',
            usuario: {
                token: '',
                cif: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                sigla: ''
            },
            egovf: {
                idPersona: 0,
                nombre: '',
                paterno: '',
                materno: '',
                fecha: '',
                sexo: 0,
                idUsuario: 0,
                cif: 0,
                matricula: 0,
                ci: '',
                ci_com: 0,
                complemento: '',
                correo: '',
                celular: '',
                pass: '',
                unidad: '',
                dependiente: '',
                sigla: '',
            },
            pass: {
                id: null,
                cif: '',
                pass1: '',
                pass2: '',
                pass3: ''
            },
            contra: '',
            unidad: {
                id: 0,
                unidad: '',
                dependencia: '',
                sigla: ''
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            }
        };
    },
    mounted() {
        this.getListaUnidades();
    },
    created() {
        this.usuarioService = new UsuarioService();
        this.personaService = new PersonaService();
        this.unidadService = new UnidadService();
        this.uploadService = new UploadService();
    },
    updated() {
        this.egovf = this.egovfp;
        if (this.cifCiudadano > 0 && this.getPB) {
            this.getDatosComponenteDatosPersona();
            this.getPB = false;
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods: {
        getDatosComponenteDatosPersona() {
            this.usuario.token = this.$cookies.get('token');
            this.usuario.cif = this.$cookies.get('cif');
            this.usuario.correo = this.$cookies.get('correo');
            this.usuario.celular = this.$cookies.get('celular');
            this.usuario.pass = this.$cookies.get('pass');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');
            this.what + this.egovf.celular;
        },
        updatePersona() {
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                icon: 'info',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePersona(this.egovf).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
                        }
                        else {
                            this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
                        }
                    });
                }
                else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        updateUsuario() {
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updateUsuario(this.egovf).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
                        }
                        else {
                            this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
                        }
                    });
                }
                else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        updatePassAdmin() {
            this.pass.id = this.egovf.idUsuario;
            this.pass.cif = this.egovf.cif;
            this.pass.pass1 = this.contra;
            this.pass.pass2 = this.contra;
            this.pass.pass3 = this.contra;
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                icon: 'info',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePassAdmin(this.pass).then(response => {
                        if (response.data == true) {
                            this.$swal.fire('Datos Guardados Corectamente', '', 'success');
                        }
                        else {
                            this.$swal.fire('La Contraseña Actual no es Correcta Verifique e intente Nuevamente', '', 'error');
                        }
                    });
                }
                else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        async getListaUnidades() {
            await this.unidadService.getListaUnidad().then((response) => {
                this.listaUnidad = response.data;
            });
        },
        updateUnidad() {
            this.listaUnidad.forEach(element => {
                if (element._03sigla == this.unidad.sigla) {
                    this.unidad.id = element.id;
                    this.unidad.unidad = element._01unidad;
                    this.unidad.dependiente = element._02dependiente;
                    return false;
                }
            });
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updateUnidad(this.egovf, this.unidad).then(response => {
                        if (response.status == 200) {
                            this.unidadService.registrarPertenece(this.egovf, this.unidad).then(r => {
                                if (r.status == 200) {
                                    this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
                                        if (result)
                                            location.reload();
                                    });
                                }
                                else {
                                    this.$swal.fire('Los Datos no fueron Guardados Error' + r.status, '', 'error');
                                }
                            });
                        }
                        else {
                            this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
                        }
                    });
                }
                else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        selectFile() {
            this.archivo = this.$refs.file.files[0];
        },
        async updateFoto() {
            const fromData = new FormData();
            fromData.append('archivo', this.archivo);
            try {
                this.uploadService.addImagen(fromData).then((response) => {
                    if (response.status == 200) {
                        this.egovf.foto = this.uploadService.getUrl() + response.data.nombre;
                        this.$swal.fire({
                            title: 'Desea Subir la foto de perfil del Ciudadano ?' + this.egovf.nombre + " " + this.egovf.paterno + " " + this.egovf.materno,
                            showDenyButton: true,
                            confirmButtonText: 'Aceptar',
                            denyButtonText: 'Cancelar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.usuarioService.updateUsuario(this.egovf).then(response => {
                                    if (response.status == 200) {
                                        this.$swal.fire('La Foto de Perfil del Ciudadano', +this.egovf.nombre + " " + this.egovf.paterno + " " + this.egovf.materno + ' Fue guardado correctamente', 'success').then((res) => {
                                            if (res)
                                                location.reload();
                                        });
                                    }
                                    else {
                                        this.$swal.fire('La Foto de Perfil no pudo ser Guardado, intente mas tarde' + response.status, '', 'error');
                                    }
                                });
                            }
                            else if (result.isDenied) {
                                this.$swal.fire('Datos Cancelados', '', 'info');
                            }
                        });
                    }
                    else {
                        this.$swal.fire('La foto de Perfil No puede ser guardado Intente mas tarde', '', 'error');
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        },
        clicktab(tab) {
            this.tab = tab;
        },
        clickModalCelular(modal) {
            this.modalCelular = modal;
        },
        clickModalPass(modal) {
            this.modalPass = modal;
        },
        clickModalFoto(modal) {
            this.modalFoto = modal;
        }
    }
}
</script>