<template>
    <CRow>
        <!--Datos Personales -->
        <CCol :lg="6">
            <CCard>
                <CCardHeader class="headercolor">
                   Datos Personales
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="4">
                           <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                           <div class="d-grid gap-2">
                                <CButton color="dark" @click="clickModalFoto(true)"><CIcon icon="cil-camera"></CIcon> Actualizar</CButton>
                           </div>
                           
                        </CCol>
                        <CCol :lg="8">
                            <br>
                           <h4 class="card-title">CIF : {{egovf.cif}}</h4>
                           <CFormLabel for="nombre" class="col-md-4">Nombre : </CFormLabel>
                           <CFormLabel for="nombre" class="col-md-8">{{egovf.nombre}}</CFormLabel>
                           <br>
                           <CFormLabel for="apellido" class="col-md-4">Apellidos : </CFormLabel>
                           <CFormLabel for="apellido" class="col-md-8">{{egovf.paterno}} {{egovf.materno}}</CFormLabel>
                           <hr>
                            <ul>
                                <li>ID app : {{egovf.idPersona}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>C.I. : {{egovf.ci}} </li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li>Unidad : {{ egovf.sigla }}</li>
                                <li>Celular : {{egovf.celular}}</li>
                                <li>Fecha N : {{egovf.fecha}}</li>
                                <li v-if="egovf.sexo == 1">Sexo : Femenino</li>
                                <li v-else >Sexo : Masculino</li>
                            </ul>
                        </CCol>
                   </CRow>
               </CCardBody>
            </CCard>
        </CCol>
        <!--End Datos Personales -->
        
        <!--Datos De Usuario -->
        <CCol :lg="6">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    Datos E-govf
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs" class="nav nav-tabs">
                        <CNavItem><CNavLink :active="tab == 1" @click="clicktab(1)"><CButton size="sm"><CIcon icon="cil-user"></CIcon><label class="d-none d-md-flex me-auto">Datos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tab == 2" @click="clicktab(2)"><CButton size="sm"><CIcon icon="cil-pencil"></CIcon><label class="d-none d-md-flex me-auto">Actualizar</label></CButton></CNavLink></CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane :visible="tab == 1">
                            <br>
                            <ul>
                                <li>ID app : {{egovf.idUsuario}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>Matricula : {{egovf.matricula}}</li>
                                <li>C.I. : {{egovf.ci}} {{egovf.complemento}}</li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li>Celular : {{egovf.celular}}</li>
                                <li>Unidad : {{ egovf.sigla }}</li>
                            </ul>
                        </CTabPane>
                        <CTabPane :visible="tab == 2">
                            <br>
                            <ul>
                                <li>ID app : {{egovf.idUsuario}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>Matricula :{{egovf.matricula}}</li>
                                <li>C.I. : {{egovf.ci}} </li>
                                <li>Unidad : {{ egovf.sigla }}</li>
                                <li><CButton color="success" class="font" size="sm" @click="clickModalCelular(true)">Actualizar {{egovf.celular}}</CButton></li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li><CButton color="success" class="font" size="sm" @click="clickModalPass(true)"> Actualizar Contraseña</CButton></li>
                            </ul>
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
            <h5>Actualizar Numero de Celular</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
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
        <div class="mb-3 row">
            <label for="actual" class="col-sm-6 col-form-label">Contraseña Actual :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass1" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="nueva" class="col-sm-6 col-form-label">Nueva Contraseña :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass2" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="confirmar" class="col-sm-6 col-form-label">Confirmar Nueva Contraseña :</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" v-model="pass.pass3" @keyup="botonesFuncion()">
            </div>
        </div>
        <div class="mb-3 row text-center">
            <div class="col-sm-12 col-form-label" v-if="pass.pass2 !=pass.pass3">
                <div class="alert alert-danger" role="alert">
                    Las Contraseñas no Coinciden
                </div>
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalPass(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton v-if="botones"  @click="updatePass()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Actualizar</CButton>
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
                <label for="archivo" class="col-4 col-form-label">Foto de Perfil</label>
                <div class="col-8">
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

//Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue'
//Importamos Servicios
import UsuarioService from '@/services/usuarioServices';
import EgovfService from '@/services/egovf/egovfService';
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
            botones:false,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
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
        selectFile(){//Funcion que cambia los datos del archivp
            this.archivo = this.$refs.file.files[0];
        },
        async updateFoto(){//Funcion para actualizar la foto de perfil
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                this.uploadService.addImagen(fromData).then((response)=>{
                    if(response.status == 200){
                        this.egovf.foto = this.uploadService.getUrl()+ response.data.nombre;
                        this.$swal.fire({
                            title: 'Desea Subir su foto de perfil ?',
                            showDenyButton: true,
                            confirmButtonText: 'Aceptar',
                            denyButtonText: 'Cancelar',
                            }).then((result) => {
                            if (result.isConfirmed) {
                                this.usuarioService.updateUsuario(this.egovf).then(response =>{
                                    if(response.status == 200){
                                        this.$swal.fire('La Foto de Perfil fue guardado correctamente', '','success').then((res)=>{
                                            if(res)
                                                location.reload();
                                        });
                                    }
                                    else{
                                        this.$swal.fire('La Foto de Perfil no pudo ser Guardado, intente mas tarde'+ response.status, '', 'error');
                                    }
                                });
                                
                            } else if (result.isDenied) {
                                this.$swal.fire('Datos Cancelados', '', 'info');
                            }
                        });
                    }
                    else {
                        this.$swal.fire('La foto de Perfil No puede ser guardado Intente mas tarde', 'error');
                    }
            });
            }catch(err){
                console.log(err);
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
        }
    }
}
</script>

<style scoped>

</style>