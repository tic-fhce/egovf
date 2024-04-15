<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6"><label class="d-none d-md-flex me-auto">Modulo INV</label></CCol>
                        <CCol :lg="6" class="text-end">
                            <CButtonGroup role="group">
                                <CDropdown variant="btn-group">
                                    <CDropdownToggle  color="success" class="font" size="sm"><CIcon icon="cil-menu" class="me-2"/>Opciones</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem><CButton @click="clickModalUbicacion(true)" size="sm">Agregar Ubicacion</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalBiometrico(true)" size="sm">Agregar CPU</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalHorario(true)" size="sm">Agregar Impresora</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Monitor</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Telefono</CButton></CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>

                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs">
                        <CNavItem><CNavLink :active="tabInv == 1" @click="clicktabInv(1)" ><CButton size="sm"><CIcon icon="cil-screen-smartphone"></CIcon><label class="d-none d-md-flex me-auto">CPU's</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 2" @click="clicktabInv(2)" ><CButton size="sm"><CIcon icon="cil-monitor"></CIcon><label class="d-none d-md-flex me-auto">Monitores</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 3" @click="clicktabInv(3)" ><CButton size="sm"><CIcon icon="cil-print"></CIcon><label class="d-none d-md-flex me-auto">Impresoras</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 4" @click="clicktabInv(3)" ><CButton size="sm"><CIcon icon="cil-rss"></CIcon><label class="d-none d-md-flex me-auto">Telefonos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 5" @click="clicktabInv(5)" ><CButton size="sm"><CIcon icon="cil-pin"></CIcon><label class="d-none d-md-flex me-auto">Ubicaciones</label></CButton></CNavLink></CNavItem>
                    </CNav>

                    <CTabContent>
                        <!--Datos del Biometrico-->
                        <CTabPane :visible="tabInv == 1">
                            <CRow>
                            </CRow>
                        </CTabPane>
                        <!--End Datos del Biometrico-->

                        <!--Horario-->
                        <CTabPane :visible="tabInv == 2">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <CCard>
                                        <CCardHeader class="headercolor text-center">
                                            Horario Actual
                                        </CCardHeader>
                                    </CCard>
                                    <CCardBody class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Horario</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th><th>Domingo</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </CCardBody>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Horario-->
                        
                        <!--Obtener Observaciones del Biometrico-->
                        <CTabPane :visible="tabInv == 5">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Ambiente</th><th>Ubicaion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ubicacion in listaUbicacion" :key="ubicacion.id">
                                                <td>{{ ubicacion.id }}</td>
                                                <td>{{ ubicacion._02ambiente }}</td>
                                                <td>{{ ubicacion._03ubicacion }}</td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Obtener Observaciones del Biometrico-->
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>


<!-- Modal  Detalles de OBS
<CModal :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
        <CModalTitle>
            <h5>Detalles de la Observacion</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <CRow>
            <CCol :lg="12">
                <ul>
                    <li><strong>ID: </strong>{{ obsDetalle.id }}</li>
                    <li><strong>UID: </strong>{{ obsDetalle.uidobs }}</li>
                    <li><strong>Fecha Inicio: </strong>{{ obsDetalle.fechainicio }}</li>
                    <li><strong>Fecha Fin: </strong> {{ obsDetalle.fechafin }}</li>
                    <li><strong>Detalle: </strong>{{ obsDetalle.detalle }}</li>
                    <li><strong>Tipo de Obs. : </strong>{{ obsDetalle.tipo }} </li>
                    <li><strong>Hora: </strong>{{ obsDetalle.hora }}</li>    
                </ul>
                <CAlert color="success" v-if="obsDetalle.estado === 1">Aprobado</CAlert>
                <CAlert color="warning" v-if="obsDetalle.estado === 0">En Espera</CAlert>
            </CCol>
            <CCol>
                <img :src="obsDetalle.url" alt="" class="img-fluid">
            </CCol>
        </CRow>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalDetalleObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="downloadImg(obsDetalle.url,obsDetalle.imagen)" color="success" class="font"><CIcon icon="cil-cloud-download" class="me-2"/>Descargar Documento</CButton>
    </CModalFooter>
</CModal>-->
<!-- END Modal  Detalles de Obs-->

<!-- Modal  Ubicacion-->
<CModal :visible="modalUbicacion" @close="clickModalUbicacion(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalUbicacion(false)">
        <CModalTitle>
            <h5>Agregar Ubicacion</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="ambiente" class="col-4 col-form-label">Ambiente</label>
            <div class="col-8">
                <input type="text" class="form-control" v-model="ubicacion.ambiente" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="ubicacion" class="col-sm-4 col-form-label">Ubicacion</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="ubicacion.ubicacion" required="true">
            </div>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalUbicacion(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="addUbicacion()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Agregar Ubicacion</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Ubicacion-->

<!-- Modal  Obserbasiones
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
        <CModalTitle>
            <h5>Agregar Observaciones de Asistencia</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>

        <form @submit.prevent="addObs()" enctype="multipart/form-data">
            
            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">UID - OBS</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.uidobs" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha de Inicio</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obs.fechainicio" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha Fin</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obs.fechafin" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Detalle</label>
                <div class="col-sm-8">
                    <textarea class="form-control" v-model="obs.detalle" required="true"></textarea>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="tipo" class="col-sm-4 col-form-label">Tipo</label>
                <div class="col-sm-8">
                    <select class="form-control" v-model="obs.tipo" required="true">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="horas">Horas de Servicio</option>
                        <option value="extraordinario">Horario Extraordinario</option>
                        <option value="comision">Comisión</option>
                        <option value="permiso">Permiso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Hora</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.hora">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-sm-4 col-form-label">Documento</label>
                <div class="col-sm-8">
                    <input type="file" ref="file" class="form-control" @change="selectFile()" required="true">
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Observaciones</button>
                </div>
            </div>

        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal> -->
<!-- END Modal  Obserbasiones-->

<!-- Modal Reporte Mensual
<CModal :visible="modalMes" @close="clickModalMes(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalMes(false)">
        <CModalTitle>
            <h5>Reporte Mensual</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.gestion" class="form-control">
                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-3 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.mes" class="form-control">
                    <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                </select>
            </div>
        </div>
        
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalMes(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="getReporteMes()" color="success" class="font"><CIcon icon="cil-file" class="me-2"/>Ver Reporte</CButton>
    </CModalFooter>
</CModal>-->
<!-- End Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado
<CModal :visible="modalDias" @close="clickModalDias(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDias(false)">
        <CModalTitle>
            <h5>Reporte Mensual Segmentado</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.gestion" class="form-control">
                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-3 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.mes" class="form-control">
                    <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-3 row">
            <label for="inicio" class="col-sm-6 col-form-label">Inicio :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMes.di">
                    <option v-for="i=1 in 31" :key="i" :value="i">{{i}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-3 row">
            <label for="fin" class="col-sm-6 col-form-label">Fin :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMes.df">
                    <option v-for="j=1 in 31" :key="j" :value="j">{{j}}</option>
                </select>
            </div>
        </div>

    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalDias(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="getReporteMes()" color="success" class="font"><CIcon icon="cil-file" class="me-2"/>Ver Reporte</CButton>
    </CModalFooter>
</CModal>-->
<!-- End Modal Reporte Mensual Segmentado-->
</template>

<script>
//Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';

//Importamos los Servicios
import UploadService from '@/services/upload/uploadService';
import InventarioService from '@/services/inv/inventarioService';

export default {
    name:'ComponenteMInvVue',
    props:['minv','empleado'],
    components:{
        ComponenteNombres
    },
    data(){
        return{
            tabInv:1,
            modalDetalleObs:false,
            modalUbicacion:false,
            modalHorario:false,
            modalObs:false,
            modalMes:false,
            modalDias:false,
            uploadService:null,
            inventarioService:null,
            listaUbicacion:[],
            getPB:true,
            archivo:'',
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
                foto:''
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            },
            ubicacion:{
                cif:0,
                ambiente:'',
                ubicacion:''
            }
        }
    },
    created(){
        this.uploadService = new UploadService();//Creamos el Servicio para la Foto de perfil
        this.inventarioService = new InventarioService(); // Creamos el servicio para el Modulo Inventarios
    },
    mounted(){
        // funcion que trae La lista de usuarios 
    },
    updated(){
        this.egovf = this.minv; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            // funcion que debuelbe una lista del Usuario registrado en los biometricos 
            // funcion que crea una lista de gestiones desde el 2021
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
            this.getUbicacionCif();
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods:{

        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        async addUbicacion(){// funcion para agregar la ubicacion de un Empleado
            this.ubicacion.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea agregar la Ubicacion Correspondiente Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addUbicacion(this.ubicacion).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Ubicacion Fue Agregada Corectamente a '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error', ''+ response.status, 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        async getUbicacionCif(){
            await this.inventarioService.getUbicacionCif(this.egovf.cif).then(response => {
                this.listaUbicacion = response.data;
            });
        },
        clicktabInv(tabI){
            this.tabInv = tabI;
        },
        clickModalDetalleObs(Obs){
            this.modalDetalleObs = Obs;
        },
        clickModalUbicacion(Bio){
            this.modalUbicacion = Bio;
        },
        clickModalHorario(hor){
            this.modalHorario = hor;
        },
        clickModalObs(cio){
            this.modalObs = cio;
        },
        clickModalMes(rmes){
            this.modalMes = rmes;
        },
        clickModalDias(dias){
            this.modalDias = dias;
        }

    }
}
</script>
