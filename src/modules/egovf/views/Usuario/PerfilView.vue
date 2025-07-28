<template>
    <CRow>
        <!--Datos Personales -->
        <CCol :lg="6">
            <CCard>
                <CCardHeader class="headercolor">
                   <h6><CIcon icon="cil-description" size="lg" class="me-2" />Datos Personales</h6>
                </CCardHeader>
                <CCardBody>
                    <CCol :sm="12">
                        <CWidgetStatsC
                            class="mb-3"
                            :value="'CIF: '+egovf.cif"
                            :progress="{ color: 'success', value: 100 }"
                            title="Visitors"
                        >
                            <template #icon>
                                <img :src="egovf.foto" class="img-fluid rounded-start" alt="..."><br>
                                <CButton color="dark" @click="clickModalFoto(true)" size="sm" class="mt-2"><CIcon icon="cil-camera" class="me-1"></CIcon> Actualizar Foto</CButton>
                            </template>
                            <template #title>
                                {{egovf.nombre}} {{egovf.paterno}} {{egovf.materno}}
                                <ul>
                                    <li class="lista">C.I. : {{egovf.ci}} </li>
                                    <li class="lista">Correo : {{egovf.correo}}</li>
                                    <li class="lista">Celular : {{egovf.celular}}</li>
                                    <li class="lista">Fecha N : {{egovf.fecha}}</li>
                                    <li class="lista" v-if="egovf.sexo == 1">Sexo : Femenino</li>
                                    <li class="lista" v-else >Sexo : Masculino</li>
                                </ul>
                            </template>
                        </CWidgetStatsC>
                    </CCol>

               </CCardBody>
            </CCard>
        </CCol>
        <!--End Datos Personales -->
        
        <!--Datos De Usuario -->
        <CCol :lg="6">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6><CIcon icon="cil-at" size="lg" class="me-2" />Datos E-govf</h6>
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs" class="nav nav-tabs">
                        <CNavItem><CNavLink :active="tab == 1" @click="clicktab(1)"><CButton size="sm"><CIcon icon="cil-user"></CIcon><label class="d-none d-md-flex me-auto">Datos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tab == 2" @click="clicktab(2)"><CButton size="sm"><CIcon icon="cil-pencil"></CIcon><label class="d-none d-md-flex me-auto">Actualizar</label></CButton></CNavLink></CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane :visible="tab == 1">
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
                        </CTabPane>
                        <CTabPane :visible="tab == 2">
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

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Correo</CInputGroupText>
                                <CFormInput type="text" :value="egovf.correo" disabled/>
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Celular</CInputGroupText>
                                <CFormInput type="text" :value="egovf.celular" disabled/>
                                <CButton type="button" color="success" class="font" size="sm" @click="clickModalCelular(true)" >Actualizar</CButton>
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Contraseña</CInputGroupText>
                                <CFormInput type="text" value="***************" disabled/>
                                <CButton  type="button" color="success" class="font" size="sm" @click="clickModalPass(true)"> Actualizar Contraseña</CButton>
                            </CInputGroup>
                        </CTabPane>
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
        <!--Datos De Usuario -->
        
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
        <CButton @click="clickModalCelular(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="updatePersona()" color="success" class="font" size="sm"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
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
        <br>

        <CInputGroup class="mb-3">
            <CInputGroupText as="label">Contraseña Actual</CInputGroupText>
            <CFormInput type="password" v-model="pass.pass1" @keyup="botonesFuncion()"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText as="label">Nueva Contraseña</CInputGroupText>
            <CFormInput type="password" v-model="pass.pass2" @keyup="botonesFuncion()"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
            <CInputGroupText as="label">Confirmar Nueva Contraseña</CInputGroupText>
            <CFormInput type="password" v-model="pass.pass3" @keyup="botonesFuncion()"/>
        </CInputGroup>

        <div class="mb-3 row text-center">
            <div class="col-sm-12 col-form-label" v-if="pass.pass2 !=pass.pass3">
                <div class="alert alert-danger" role="alert">
                    Las Contraseñas no Coinciden
                </div>
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalPass(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton v-if="botones"  @click="updatePass()" color="success" class="font" size="sm"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
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

//Importamos Componentes
//import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue'
import ComponenteNombres from '@/modules/egovf/components/Ciudadano/ComponenteNombres.vue'
//Importamos Servicios
import UsuarioService from '@/modules/egovf/services/usuarioService';
import EgovfService from '@/modules/egovf/services/egovfService';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'PerfilView',
    components:{
        ComponenteNombres
    },
    data(){
        return {
            tab:1,
            modalCelular:false,
            modalPass:false,
            modalFoto: false,
            titulo : 'Perfil de Usuario',
            egovfService : null,
            uploadService :null,
            usuarioService: null,
            empleadoService:null,
            botones:false,
            uploading:false,
            uploadProgress:0,
            fileValid:false,
            nuevafoto:'',
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:'',
                foto:''
            },
            egovf:{
                idPersona:0,
                nombre:'',
                paterno:'',
                materno:'',
                fecha:'',
                sexo:0,
                idUsuario:0,
                cif:0,
                matricula:0,
                ci:'',
                ci_com:0,
                complemento:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                dependiente:'',
                sigla:'',
                foto:'',
                empleado:0
            },
            pass:{
                id:null,
                cif:'',
                pass1:'',
                pass2:'',
                pass3:''
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            }
        }
    },
    computed:{

    },
    created(){
        this.usuarioService = new UsuarioService();
        this.egovfService = new EgovfService();
        this.uploadService = new UploadService();
        this.empleadoService = new EmpleadoService();
    },
    mounted(){
        this.getDatos();// Llamamos la funcion para recuperar los Datos
        this.getEgovf();// Llamamos los datos del ciudadano
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    methods:{
        getDatos(){// Funcion que guarda los datos del Usuario en la View
            if(this.$cookies.get('cif')!=null){
                this.usuario.token = this.$cookies.get('token');
                this.usuario.cif = this.$cookies.get('cif');
                this.usuario.correo = this.$cookies.get('correo');
                this.usuario.celular = this.$cookies.get('celular');
                this.usuario.pass = this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
                this.usuario.foto = this.$cookies.get('foto');
                this.$cookies.set('titulo',this.titulo);
                this.usuarioService.headersUsuario(this.usuario.token);
            }
        },
        async getEgovf(){//Funcion que debuelve los datos del ciudadano 
            this.egovfService.headersUsuario(this.usuario.token);
            await this.egovfService.getEgovf(this.usuario.cif).then((response) =>{
                this.egovf = response.data;
            });
            
            this.datos.cif = this.egovf.cif;
            this.datos.nombre = this.egovf.nombre;
            this.datos.apellido = this.egovf.paterno +' '+this.egovf.materno;
            this.nuevafoto = "https://fhcevirtual.umsa.bo/egovf-img/imagenes/800/"+ this.egovf.foto;
            this.egovf.foto = "https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/"+ this.egovf.foto;
        },
        updatePersona(){//funcion para actualizar los datos de la persona
            this.$swal.fire({
                title: 'Desea Realizar los Cambios',
                icon:'info',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePersona(this.egovf).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Tus Datos Guardados Corectamente', '', 'success');
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error',response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });  
        },
        updatePass(){// Funcion que cambia la contraseña del usuario
            this.pass.id = this.egovf.id;
            this.pass.cif = this.egovf.cif;
            this.$swal.fire({
                title: 'Desea Actualizar la contraseña ?',
                showDenyButton: true,
                confirmButtonText: 'Actualizar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.usuarioService.updatePass(this.pass).then(response=>{
                        if(response.data==true){
                            this.$swal.fire('Datos Guardados Corectamente', 'Inicie secion nuevamente', 'success');
                            this.$cookies.remove('token');
                            this.$cookies.remove('cif');
                            this.$cookies.remove('correo');
                            this.$cookies.remove('celular');
                            this.$cookies.remove('pass');
                            this.$router.push('/');
                        }
                        else{
                            this.$swal.fire('La Contraseña Actual no es Correcta Verifique e intente Nuevamente', '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        botonesFuncion(){// Funcion que habilita los botnes para la actualizacion del pass
            if((this.pass.pass1 != '') && (this.pass.pass2 !='') && (this.pass.pass2 == this.pass.pass3))
                this.botones=true;
            else
                this.botones=false;
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
        async updateFoto(){//Funcion para actualizar la foto de perfil
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
        clicktab(tab){
            this.tab=tab;
        },
        clickModalCelular(modal){
            this.modalCelular=modal;
        },
        clickModalPass(modal){
            this.modalPass=modal;
        },
        clickModalFoto(modal) {
            this.modalFoto = modal;
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


</style>