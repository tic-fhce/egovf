<template>
    <CRow>
        <CCol :lg="12">
            <CAccordion>
              <CAccordionItem :item-key="1">
                <CAccordionHeader class="accordion">
                    <CIcon icon="cil-user" size="lg" class="me-2 text-light" />
                    <label class="mb-0 fs-6 text-white">Perfil del Ciudadano : {{egovf.cif}}</label>
                </CAccordionHeader>

                <CAccordionBody>
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
                                    <img :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/800/'+egovf.foto" class="img-fluid rounded-start" alt="...">
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Nombre</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.nombre" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Apellidos</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.paterno+' '+egovf.materno" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">C.I.</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.ci" disabled/>
                                    </CInputGroup>

                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">ID app</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.idPersona" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Celular</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.celular" disabled/>
                                        <CButton type="button" color="success" class="font" size="sm" @click="openWhatsApp(egovf.celular)" >Whatsapp</CButton>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Fecha de Nacimiento</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.fecha" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Sexo</CInputGroupText>
                                        <CFormInput type="text" v-if="egovf.sexo == 1"  value="Femenino" disabled/>
                                        <CFormInput type="text" v-else value="Masculino" disabled/>
                                    </CInputGroup>
                                </CCol>  
                            </CRow>
                        </CTabPane>
                        <!-- End Datos Personales-->

                        <!-- Datos de Usuario-->
                        <CTabPane :visible="tab == 2">
                            <CRow>
                                <CCol :lg="2">
                                    <br>
                                    <img :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/'+egovf.foto" class="img-fluid rounded-start" alt="...">
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">ID app</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.idUsuario" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">CIF</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.cif" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Matricula</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.matricula" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">C.I.</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.ci" disabled/>
                                    </CInputGroup>
                                </CCol>
                                <CCol :lg="5">
                                    <br>
                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Correo</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.correo" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Celular</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.celular" disabled/>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Unidad</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.sigla" disabled/>
                                    </CInputGroup>

                                </CCol>
                            </CRow> 
                        </CTabPane>
                        <!-- End Datos Usuario-->

                        <!-- Actualizar Datos-->
                        <CTabPane :visible="tab == 3">
                            <CRow>
                                <CCol :lg="5">
                                    <br>
                                    
                                    <CWidgetStatsC
                                        class="mb-3"
                                        :progress="{ color: 'success', value: 100 }"
                                        title="Visitors"
                                    >
                                        <template #icon>
                                            <img :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/800/'+egovf.foto" class="img-fluid rounded-start" alt="..."><br>
                                            <CButton color="dark" @click="clickModalFoto(true)" size="sm" class="mt-2"><CIcon icon="cil-camera" class="me-1"></CIcon> Actualizar Foto</CButton>
                                        </template>
                                        <template #title>
                                        </template>
                                    </CWidgetStatsC>
                                </CCol>
                                <CCol :lg="7">
                                    <br>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Matricula</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.matricula" disabled/>
                                        <CButton type="button" color="success" class="font" size="sm" >Actualizar</CButton>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Celular</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.celular" disabled/>
                                        <CButton type="button" color="success" class="font" size="sm" @click="clickModalCelular(true)" >Actualizar</CButton>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Correo</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.correo" disabled/>
                                        <CButton type="button" color="success" class="font" size="sm" >Actualizar</CButton>
                                    </CInputGroup>

                                    <CInputGroup size="sm" class="mb-3">
                                        <CInputGroupText as="label">Contraseña</CInputGroupText>
                                        <CFormInput type="text" :value="egovf.pass" disabled/>
                                        <CButton  type="button" color="success" class="font" size="sm" @click="clickModalPass(true)"> Actualizar Contraseña</CButton>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Actualizar Datos-->
                    </CTabContent>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
        </CCol>
    </CRow>

<!-- Modal  Actualizar Celular-->
<CModal :visible="modalCelular" @close="clickModalCelular(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalCelular(false)">
        <CModalTitle>
            <h6><CIcon icon="cil-at" size="lg" class="me-2" />Actualizar Numero de Celular</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <br>
        <CInputGroup class="mb-3">
            <CInputGroupText as="label">Nuevo Numero de Celular</CInputGroupText>
            <CFormInput type="text" v-model="egovf.celular"/>
        </CInputGroup>
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
            <h6><CIcon icon="cil-at" size="lg" class="me-2" />Actualizar Contraseña</h6>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <CAlert color="success">La Contrasena se Actializara al CIF del Ciudadano</CAlert>
       
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalPass(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton  @click="updatePassAdmin()" color="success" class="font" size="sm"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal  Actualizar Contraseña-->

<!-- Modal  Actualizar Foto-->
<CModal :visible="modalFoto" @close="clickModalFoto(false)">
    <CForm @submit.prevent="updateFoto()" enctype="multipart/form-data">
        <CModalHeader class="headercolor" dismiss @close="clickModalFoto(false)">
            <CModalTitle>
                <h6><CIcon icon="cil-description" size="lg" class="me-2" />Actualizar Foto de Perfil</h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            
           <CInputGroup class="mb-3">
                <CInputGroupText as="label">Foto de Perfil</CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"  @change="selectFile" :valid="fileValid" required="true"/>
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check" class="text-success"/>
                    </CInputGroupText>
            </CInputGroup>

            <div class="md-3 row text-center">
                <img :src="nuevafoto" class="img-fluid">
            </div>

            <CProgress v-if="uploading" :height="50" class="mb-3">
                <CProgressBar  :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'" animated >
                    Espere un Momento ........... {{ uploadProgress }} %
                </CProgressBar>
            </CProgress>     

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalFoto(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <CButton type="submit" class="font" color="success" size="sm"><CIcon icon="cil-camera" class="me-2"/>Actualizar</CButton>
        </CModalFooter>
    </CForm>
</CModal>
<!-- End Modal  Actualizar Foto-->

</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/modules/egovf/components/Ciudadano/ComponenteNombres.vue';

// Importamos  Servicios
import UsuarioService from '@/modules/egovf/services/usuarioService';
import PersonaService from '@/modules/egovf/services/personaService';
import UnidadService from '@/modules/egovf-uni/services/unidadService';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';
import UploadService from '@/services/upload/uploadService';


export default {
    name: 'ComponenteDatosPersonalesVue',
    props: ['cifCiudadano', 'egovfp'],
    components:{
        ComponenteNombres
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
            empleadoService:null,
            listaUnidad: [],
            uploading:false,
            uploadProgress:0,
            fileValid:false,
            nuevafoto:'',
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
                foto:''
            },
            pass: {
                id: null,
                cif: '',
                pass1: '',
                pass2: '',
                pass3: ''
            },
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
        //this.getListaUnidades();
    },
    created() {
        this.usuarioService = new UsuarioService();
        this.personaService = new PersonaService();
        this.unidadService = new UnidadService();
        this.uploadService = new UploadService();
        this.empleadoService = new EmpleadoService();
    },
    updated() {
        this.egovf = this.egovfp;
        this.nuevafoto = "https://fhcevirtual.umsa.bo/egovf-img/imagenes/800/"+ this.egovf.foto;
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
            this.usuario.foto = this.$cookies.get("foto");
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
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                icon: 'info',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePassAdmin(this.pass).then(response => {
                        if (response.status == 200) {
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
        selectFile(event){//Funcion que cambia los datos del archivp
            const fileInput = this.getSafeFileInput(event);
      
            if (!fileInput?.files?.length) {
                this.resetFileInput();
                return;
            }
            
            this.archivo = fileInput.files[0];
            
            if (!this.validateFile(this.archivo)) {
                this.resetFileInput();
                return;
            }
            this.fileValid = true;
            this.nuevafoto = URL.createObjectURL(this.archivo);
        },
        async updateFoto() {
            this.uploading = true;
            this.uploadProgress = 0;
            try{
                const formData = new FormData();
                formData.append('archivo',this.archivo);
                const config = {
                    onUploadProgress: progressEvent => {
                        this.uploadProgress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                    }
                };
                const uploadResponse = await this.uploadService.addFoto(formData, config);
                if (uploadResponse.status !== 200) {
                    throw new Error('Error al subir archivo');
                }
                this.egovf.foto = uploadResponse.data.nombre;
                this.$swal.fire({
                    title: 'Desea Subir su foto de perfil ?',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.usuarioService.updateUsuario(this.egovf).then(response =>{
                            if(response.status == 200){
                                this.empleadoService.updateFoto(this.egovf.cif,this.egovf.foto);
                                this.$swal.fire('La Foto de Perfil fue guardado correctamente', '','success').then((res)=>{
                                    if(res)
                                        location.reload();
                                });
                            }else{
                                this.$swal.fire('La Foto de Perfil no pudo ser Guardado, intente mas tarde'+ response.status, '', 'error');
                            }
                        });
                            
                    } else if (result.isDenied) {
                        this.$swal.fire('Datos Cancelados', '', 'info');
                    }
                });
            }catch(err){
                this.$swal.fire('La foto de Perfil No puede ser guardado Intente mas tarde', 'error');
            }finally {
                this.uploading = false;
                this.uploadProgress = 0;
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
        },
        openWhatsApp(phone) {
            const cleanedPhone = phone.replace(/[^\d]/g, '');
            if (cleanedPhone.length >= 8) {
                window.open(`https://wa.me/${cleanedPhone}`, '_blank');
            } else {
                this.$toast.error('Número de teléfono inválido');
            }
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
    
        validateFile(file) {
            const VALID_TYPES = ['image/jpeg', 'image/png'];
            return file && VALID_TYPES.includes(file.type);
        },
    
        resetFileInput() {
            this.archivo=null;
            this.fileValid = false;
            const input = this.getSafeFileInput();
            if (input) input.value = '';
        },
    }
}
</script>
<style scoped>
.accordion{
    --cui-accordion-btn-color: white;
    --cui-accordion-btn-bg: var(--color-primary);
    --cui-accordion-btn-icon: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round'><path d='m2 5 6 6 6-6'/></svg>");
    --cui-accordion-active-bg: var(--color-primary);
    --cui-accordion-active-color: white;
    --cui-accordion-btn-color-active: white;
    --cui-accordion-btn-active-icon: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round'><path d='m2 5 6 6 6-6'/></svg>");
}
</style>