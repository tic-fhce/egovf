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
                                        <CDropdownItem><CButton @click="clickModalCPU(true)" size="sm">Agregar CPU</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalMonitor(true)" size="sm">Agregar Monitor</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Impresora</CButton></CDropdownItem>
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
                        <CNavItem><CNavLink :active="tabInv == 4" @click="clicktabInv(4)" ><CButton size="sm"><CIcon icon="cil-rss"></CIcon><label class="d-none d-md-flex me-auto">Telefonos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabInv == 5" @click="clicktabInv(5)" ><CButton size="sm"><CIcon icon="cil-pin"></CIcon><label class="d-none d-md-flex me-auto">Ubicaciones</label></CButton></CNavLink></CNavItem>
                    </CNav>

                    <CTabContent>
                        <!--Lista de CPU del Empleado-->
                        <CTabPane :visible="tabInv == 1">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Caracteristicas</th><th>Red</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cpu in listaCpu" :key="cpu.id">
                                                <td>{{ cpu.id }}</td>
                                                <td>{{cpu._02codigo}}</td>
                                                <td>
                                                    Sistema : {{ cpu._08sistema }} <br>
                                                    RAM : {{cpu._05capacidad}} - {{ cpu._04memorias }}<br>
                                                    Micro Procesador : {{ cpu._06micro }} de {{ cpu._07micro_capacidad }}<br>
                                                    Capasidad Disco : {{ cpu._09disco }}<br>
                                                    Tipo : {{ cpu._15detalle }}<br>
                                                    Fuente Pw : {{cpu._03fuente  }}<br>
                                                    Cortapico : {{ cpu._14cortapico }} 
                                                </td>
                                                <td>
                                                    Ip : {{ cpu._10ip }}<br>
                                                    Mascara : {{ cpu._12dns }}<br>
                                                    Segmento : {{ cpu._13segmento }}<br>
                                                    Mac : {{ cpu._11mac }}<br>
                                                    Switch : {{cpu._16switch}}<br>
                                                    Puerto : {{ cpu._17puerto }}<br>
                                                    Vlan : {{ cpu._18vlan }} 
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de CPU del Empleado-->

                        <!--Lista de Monitores del Empleado-->
                        <CTabPane :visible="tabInv == 2">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Marca</th><th>Pulgadas</th><th>Tipo</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="monitor in listaMonitor" :key="monitor.id">
                                                <td>{{ monitor.id }}</td>
                                                <td>{{ monitor._02codigo }}</td>
                                                <td>{{ monitor._03marca }}</td>
                                                <td>{{ monitor._04pulgadas }}</td>
                                                <td>{{ monitor._05tipo }}</td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Monitores del Empleado-->
                        
                        <!--Lista de Ubicaciones del Empleado-->
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
                                                <td>Latitud: {{ ubicacion._03latitud }}<br>Longitud: {{ ubicacion._04longitud }}</td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!-- End Lista de Ubicaciones del Empleado-->
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
            <label for="ubicacion" class="col-sm-4 col-form-label">Latitud</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="ubicacion.latitud" required="true">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="ubicacion" class="col-sm-4 col-form-label">Longitud</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="ubicacion.longitud" required="true">
            </div>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalUbicacion(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="addUbicacion()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Agregar Ubicacion</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Ubicacion-->

<!-- Modal  CPU-->
<CModal :visible="modalCPU" @close="clickModalCPU(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalCPU(false)">
        <CModalTitle>
            <h5>Agregar CPU</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>

        <form @submit.prevent="addCPU()">
            
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fuente de Pw</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.fuente" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Memoria RAM</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.memoria" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.capacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Micro Procesador</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.micro" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.microcapacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Disco</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.disco" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Sistema Operativo</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpu.sistema" required="true">
                        <option value="Windows XP">Windows XP</option>
                        <option value="Windows 7">Windows 7</option>
                        <option value="Windows 8">Windows 8</option>
                        <option value="Windows 10">Windows 10</option>
                        <option value="Windows 11">Windows 11</option>
                        <option value="Linux">Linux</option>
                        <option value="Mac">Mac</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.ip" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Mascara</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.mascara" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Segmento</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.segmento" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">MAC</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.mac" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Cortapico</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpu.cortapico" required="true">
                        <option value="Buen Estado">Buen Estado</option>
                        <option value="Mal Estado">Mal Estado</option>
                        <option value="Regular">Regular</option>
                        <option value="No tiene">No tiene</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpu.detalle" required="true">
                        <option value="PC">PC</option>
                        <option value="Laptop">Laptop</option>
                        <option value="OnlyOne">OnlyOne</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpu.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar CPU</button>
                </div>
            </div>

        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalCPU(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  CPU-->

<!-- Modal Monitor-->
<CModal :visible="modalMonitor" @close="clickModalMonitor(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalMonitor(false)">
        <CModalTitle>
            <h5>Agregar Monitor</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="addMonitor()">
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitor.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitor.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Pulgadas</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitor.pulgadas" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Tipo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitor.tipo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="monitor.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Monitor</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalMonitor(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Monitor-->

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
            modalCPU:false,
            modalMonitor:false,
            modalMes:false,
            modalDias:false,
            uploadService:null,
            inventarioService:null,
            listaUbicacion:[],
            listaCpu:[],
            listaMonitor:[],
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
                latitud:0,
                longitud:0
            },
            cpu:{
                cif:0,
                codigo:0,
                fuente:'150w',
                memoria:1,
                capacidad:'2GB',
                micro:'i3',
                microcapacidad:'3.0Ghz',
                sistema:'Windows 10',
                disco:'500GB',
                ip:'',
                mac:'',
                mascara:'',
                segmento:'',
                cortapico:'',
                detalle:'',
                switch:'',
                puerto:'',
                vlan:'',
                ubicacion:0
            },
            monitor:{
                cif:0,
                codigo:0,
                marca:'',
                pulgadas:'',
                tipo:'',
                ubicacion:0
            }
        }
    },
    created(){
        this.uploadService = new UploadService();//Creamos el Servicio para la Foto de perfil
        this.inventarioService = new InventarioService(); // Creamos el servicio para el Modulo Inventarios
    },
    mounted(){
        // funcion que trae La lista de usuarios 
        //this.getUb();
    },
    updated(){
        this.egovf = this.minv; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            // funcion que debuelbe una lista del Usuario registrado en los biometricos 
            // funcion que crea una lista de gestiones desde el 2021
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
            this.getUbicacionCif();
            this.getCpuCif();
            this.getMonitorCif();
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods:{

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
        async addCPU(){// funcion para agregar cpu al empleado
            this.cpu.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea Agregar la CPU Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addCpu(this.cpu).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El CPU fue Agregado Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getCpuCif(){
            await this.inventarioService.getCpuCif(this.egovf.cif).then(response => {
                this.listaCpu = response.data;
            });
        },
        async addMonitor(){// funcion para agregar un monitor al empleado
            this.monitor.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea Agregar la Monitor Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addMonitor(this.monitor).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El Monitor fue Agregado Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getMonitorCif(){
            await this.inventarioService.getMonitorCif(this.egovf.cif).then(response => {
                this.listaMonitor = response.data;
            });
        },

        clicktabInv(tabI){
            this.tabInv = tabI;
        },
        clickModalUbicacion(Bio){
            this.modalUbicacion = Bio;
        },
        clickModalCPU(cpu){
            this.modalCPU = cpu;
        },
        clickModalMonitor(monitor){
            this.modalMonitor = monitor;
        },
        clickModalObs(cio){
            this.modalObs = cio;
        },
        clickModalMes(rmes){
            this.modalMes = rmes;
        },
        clickModalDias(dias){
            this.modalDias = dias;
        },
        getUb(){
            if (navigator.geolocation) { //check if geolocation is available
                navigator.geolocation.getCurrentPosition(function(position){
                    this.ubicacion.latitud = position.latitude;
                    this.ubicacion.longitud = position.longitude;
                  console.log(position);
                });   
            }
        }

    }
}
</script>
