<template>
    <CRow>
        <CCol :lg="12">
            <CCard>
                <CCardHeader class="headercolor">
                    <CRow>
                        <CCol :lg="6"><label class="d-none d-md-flex me-auto">Modulo SCC</label></CCol>
                        <CCol :lg="6" class="text-end">
                            <CButtonGroup role="group">
                                <CDropdown variant="btn-group">
                                    <CDropdownToggle  color="success" class="font" size="sm"><CIcon icon="cil-menu" class="me-2"/>Opciones</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Observaciones</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalMes(true)" size="sm">Reporte Mensual</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalDias(true)" size="sm">Reporte Segmentado</CButton></CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs">
                        <CNavItem><CNavLink :active="tabScc == 1" @click="clicktabScc(1)" ><CButton size="sm"><CIcon icon="cil-monitor"></CIcon><label class="d-none d-md-flex me-auto">Datos del Biometricos</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabScc == 2" @click="clicktabScc(2)" ><CButton size="sm"><CIcon icon="cil-calendar"></CIcon><label class="d-none d-md-flex me-auto">Horarios</label></CButton></CNavLink></CNavItem>
                        <CNavItem><CNavLink :active="tabScc == 3" @click="clicktabScc(3)" ><CButton size="sm"><CIcon icon="cil-featured-playlist"></CIcon><label class="d-none d-md-flex me-auto">Observaciones</label></CButton></CNavLink></CNavItem>
                    </CNav>

                    <CTabContent>
                        <!--Datos del Biometrico-->
                        <CTabPane :visible="tabScc == 1">
                            <CRow>
                                <CCol :lg="3" v-for="perfil in listaPerfil" :key="perfil.id">
                                    <br>
                                    <CCard>
                                        <CCardHeader class="headercolor">UID : {{perfil._01user_id}}</CCardHeader>
                                        <CCardBody>
                                            <label>ID Biometrico : {{perfil.id}}</label><br>
                                            <label>UID : {{perfil._01user_id}}</label><br>
                                            <label>Nombre : {{perfil._02nombre}}</label><br>
                                            <label v-if="perfil._04estado==0">Estado : <CBadge color="success" >Activo</CBadge></label>
                                            <label v-else>Estado : <CBadge color="warning">Inactivo</CBadge></label><br>
                                            <label>Lugar : {{perfil._06lugar}}</label><br>
                                            <label>Tipo : {{empleado.empleado}}</label><br> 
                                        </CCardBody>
                                        <CCardFooter>
                                            
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Datos del Biometrico-->

                        <!--Horario-->
                        <CTabPane :visible="tabScc == 2">
                            <CRow>
                                <CCol :lg="12" >
                                    <br>
                                    <CCard>
                                        <CCardHeader class="headercolor text-center">
                                            Horario Actual
                                        </CCardHeader>
                                        <CCardBody class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Horario</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th><th>Domingo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Ingreso Mañana</th>
                                                        <td>{{horarioPerfil._02lem}}</td>
                                                        <td>{{horarioPerfil._06mem}}</td>
                                                        <td>{{horarioPerfil._10miem}}</td>
                                                        <td>{{horarioPerfil._14jem}}</td>
                                                        <td>{{horarioPerfil._18vem}}</td>
                                                        <td>{{horarioPerfil._22sem}}</td>
                                                        <td>{{horarioPerfil._26dem}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Salida Mañana</th>
                                                        <td>{{horarioPerfil._03lsm}}</td>
                                                        <td>{{horarioPerfil._07msm}}</td>
                                                        <td>{{horarioPerfil._11mism}}</td>
                                                        <td>{{horarioPerfil._15jsm}}</td>
                                                        <td>{{horarioPerfil._19vsm}}</td>
                                                        <td>{{horarioPerfil._23ssm}}</td>
                                                        <td>{{horarioPerfil._27dsm}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Ingreso Tarde</th>
                                                        <td>{{horarioPerfil._04let}}</td>
                                                        <td>{{horarioPerfil._08met}}</td>
                                                        <td>{{horarioPerfil._12miet}}</td>
                                                        <td>{{horarioPerfil._16jet}}</td>
                                                        <td>{{horarioPerfil._20vet}}</td>
                                                        <td>{{horarioPerfil._24set}}</td>
                                                        <td>{{horarioPerfil._28det}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Salida Tarde</th>
                                                        <td>{{horarioPerfil._05lst}}</td>
                                                        <td>{{horarioPerfil._09mst}}</td>
                                                        <td>{{horarioPerfil._13mist}}</td>
                                                        <td>{{horarioPerfil._17jst}}</td>
                                                        <td>{{horarioPerfil._21vst}}</td>
                                                        <td>{{horarioPerfil._25sst}}</td>
                                                        <td>{{horarioPerfil._29dst}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <CCard>
                                        <CCardHeader class="headercolor text-center">
                                            Otros Horarios
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol :lg="2">Gestion :</CCol>
                                                <CCol :lg="4">
                                                    <select v-model="obsgestion" class="form-control">
                                                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                    </select>
                                                    <br>
                                                </CCol>
                                                <CCol :lg="6" class="text-center">
                                                    <CButton color="success" class="font" @click="getListaHorario()" size="sm"><CIcon icon="cil-calendar"></CIcon> Cargar Horarios</CButton>
                                                </CCol>               
                                            </CRow>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CRow>
                                                <CCol :lg="12" v-for="horario in listaHorarios" :key="horario.historial_id">
                                                    <br>
                                                    <CCard>
                                                        <CCardHeader class="headercolor">
                                                            ID : {{horario.historial_id  }} Fecha : {{ horario.fecha }} valido hasta {{ horario.valido }}
                                                        </CCardHeader>
                                                        <CCardBody class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Horario</th><th>L</th><th>M</th><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>I. Mañana</th>
                                                                        <td>{{horario.lem}}</td>
                                                                        <td>{{horario.mem}}</td>
                                                                        <td>{{horario.miem}}</td>
                                                                        <td>{{horario.jem}}</td>
                                                                        <td>{{horario.vem}}</td>
                                                                        <td>{{horario.sem}}</td>
                                                                        <td>{{horario.dem}}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>S. Mañana</th>
                                                                        <td>{{horario.lsm}}</td>
                                                                        <td>{{horario.msm}}</td>
                                                                        <td>{{horario.mism}}</td>
                                                                        <td>{{horario.jsm}}</td>
                                                                        <td>{{horario.vsm}}</td>
                                                                        <td>{{horario.ssm}}</td>
                                                                        <td>{{horario.dsm}}</td>
                                                                        </tr>
                                                                    <tr>
                                                                        <th>I. Tarde</th>
                                                                        <td>{{horario.let}}</td>
                                                                        <td>{{horario.met}}</td>
                                                                        <td>{{horario.miet}}</td>
                                                                        <td>{{horario.jet}}</td>
                                                                        <td>{{horario.vet}}</td>
                                                                        <td>{{horario.set}}</td>
                                                                        <td>{{horario.det}}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>S. Tarde</th>
                                                                        <td>{{horario.lst}}</td>
                                                                        <td>{{horario.mst}}</td>
                                                                        <td>{{horario.mist}}</td>
                                                                        <td>{{horario.jst}}</td>
                                                                        <td>{{horario.vst}}</td>
                                                                        <td>{{horario.sst}}</td>
                                                                        <td>{{horario.dst}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>          
                                                        </CCardBody>
                                                    </CCard>
                                                </CCol>  
                                            </CRow>
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Horario-->
                        
                        <!--Obtener Observaciones del Biometrico-->
                        <CTabPane :visible="tabScc == 3">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <CCard>
                                        <CCardHeader class="headercolor">
                                            Observaciones
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol :lg="2">Gestion :</CCol>
                                                <CCol :lg="2">
                                                    <select v-model="obsgestion"  class="form-control">
                                                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                    </select>                                                    
                                                </CCol>
                                                <CCol :lg="2">Mes :</CCol>
                                                <CCol :lg="2">
                                                    <select v-model="obsmes" class="form-control">
                                                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                                                    </select>
                                                    <br>
                                                </CCol>
                                                <CCol :lg="4" class="text-center">
                                                    <CButton color="success" class="font" size="sm" @click="getObsUsuario()"><CIcon icon="cil-featured-playlist"></CIcon> Cargar Observaciones</CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                        <CCardFooter class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th><th>UidObs</th><th>Tipo</th><th>Estado</th><th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                                        <td>{{ lsobs.id }}</td>
                                                        <td>{{ lsobs._02uidobs }}</td>
                                                        <td>{{ lsobs._11tipo }}</td>
                                                        <td>
                                                            <CBadge color="success" v-if="lsobs._16estado === 1">Aprobado</CBadge>
                                                            <CBadge color="warning" v-if="lsobs._16estado === 0">En Espera</CBadge>
                                                        </td>
                                                        <td>
                                                            <CButtonGroup role="group">
                                                                <CButton color="success" class="font" size="sm" @click="getObsDetalle(lsobs.id)"><CIcon icon="cil-featured-playlist"></CIcon></CButton>
                                                                <CButton v-if="lsobs._16estado == 0" color="warning" class="font" size="sm" @click="setObs(lsobs.id)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                                <CButton v-if="lsobs._16estado == 0" color="danger" class="font" size="sm" @click="deleteObs(lsobs.id)"><CIcon icon="cil-trash"></CIcon></CButton>
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
                        </CTabPane>
                        <!-- End Obtener Observaciones del Biometrico-->
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>


<!-- Modal  Detalles de OBS-->
<CModal :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
        <CModalTitle>
            <h5>Detalles de la Observacion</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos" />
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
</CModal>
<!-- END Modal  Detalles de Obs-->


<!-- Modal  Obserbasiones-->
<CModal :visible="modalObs" @close="clickModalObs(false)">
    <form @submit.prevent="addObs()" enctype="multipart/form-data">
        <CModalHeader class="headercolor text-center" dismiss @close="clickModalObs(false)">
            <CModalTitle>
                <h5>Registrar una Observacion de Asistencia</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">UID - OBS</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="obs.uidobs" required="true" placeholder="Cite u Hoja de Ruta">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha de Inicio</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="obs.fechainicio" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="obs.fechafin" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <textarea class="form-control" v-model="obs.detalle" required="true"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="tipo" class="col-4 col-form-label">Tipo</label>
                <div class="col-8">
                    <select class="form-control" v-model="obs.tipo" required="true" @change="getTipo()">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row" v-if="obs.tipo != 'asueto'">
                <label for="datos" class="col-4 col-form-label">Hora</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="obs.hora">
                </div>
            </div>
            <div 
            class="mb-3 row">
                <label for="archivo" class="col-4 col-form-label">Documento</label>
                <div class="col-8">
                    <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true">
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObs(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Observacion</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal  Obserbasiones-->

<!-- Modal Editar Obserbasiones-->
<CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
    <form @submit.prevent="updateObs()" enctype="multipart/form-data">
        <CModalHeader class="headercolor text-center" dismiss @close="clickModalObsEditar(false)">
            <CModalTitle>
                <h5>Actualizar la Observacion de Asistencia</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">UID - OBS</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="uobs.uidobs" required="true" placeholder="Cite u Hoja de Ruta">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha de Inicio</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="uobs.fechainicio" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
                <div class="col-8">
                    <input type="date" class="form-control" v-model="uobs.fechafin" required="true">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <textarea class="form-control" v-model="uobs.detalle" required="true"></textarea>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="tipo" class="col-4 col-form-label">Tipo</label>
                <div class="col-8">
                    <select class="form-control" v-model="uobs.tipo" required="true" @change="getuTipo()">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row" v-if="uobs.tipo != 'asueto'">
                <label for="datos" class="col-4 col-form-label">Hora</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="uobs.hora">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-4 col-form-label">Documento</label>
                <div class="col-8">
                    <input type="file" ref="file" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true">
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObsEditar(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Observacion</button>
        </CModalFooter>
    </form>
</CModal>
<!-- END Modal Editar Obserbasiones-->

<!-- Modal Reporte Mensual-->
<CModal :visible="modalMes" @close="clickModalMes(false)">
    <form @submit.prevent="getReporteMes()">
        <CModalHeader class="headercolor" dismiss @close="clickModalMes(false)">
            <CModalTitle>
                <h5>Reporte Mensual</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />
            <hr>
            <div class="mb-3 row">
                <label for="gestion" class="col-6 col-form-label">Gestion :</label>
                <div class="col-6">
                    <select v-model="reporteMes.gestion" class="form-control" required="true">
                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="mes" class="col-6 col-form-label">Mes :</label>
                <div class="col-6">
                    <select v-model="reporteMes.mes" class="form-control" required="true">
                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                    </select>
                </div>
            </div>
            
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalMes(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-file" class="me-2"/>Ver Reporte</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado-->
<CModal :visible="modalDias" @close="clickModalDias(false)">
    <form @submit.prevent="getReporteMes()">
        <CModalHeader class="headercolor" dismiss @close="clickModalDias(false)">
            <CModalTitle>
                <h5>Reporte Mensual Segmentado</h5>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ComponenteNombres :datos="datos" />
            <hr>
            <div class="mb-3 row">
                <label for="gestion" class="col-6 col-form-label">Gestion :</label>
                <div class="col-6">
                    <select v-model="reporteMes.gestion" class="form-control" required="true">
                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="mes" class="col-6 col-form-label">Mes :</label>
                <div class="col-6">
                    <select v-model="reporteMes.mes" class="form-control" required="true">
                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="inicio" class="col-6 col-form-label">Inicio :</label>
                <div class="col-6">
                    <select  class="form-control" v-model="reporteMes.di" required="true">
                        <option v-for="i=1 in 31" :key="i" :value="i">{{i}}</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="mb-3 row">
                <label for="fin" class="col-6 col-form-label">Fin :</label>
                <div class="col-6">
                    <select  class="form-control" v-model="reporteMes.df" required="true">
                        <option v-for="j=1 in 31" :key="j" :value="j">{{j}}</option>
                    </select>
                </div>
            </div>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalDias(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
            <button class="btn btn-success font" ><CIcon icon="cil-file" class="me-2"/>Ver Reporte</button>
        </CModalFooter>
    </form>
</CModal>
<!-- End Modal Reporte Mensual Segmentado-->

</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';
//Importamos Servicios
import BiometricoService from '@/services/biometricoService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'ComponenteMSccVue',
    props:['mscc','empleado'],
    components:{
        ComponenteNombres
    },
    data(){
        return{
            tabScc:1,
            modalDetalleObs:false,
            modalBiometrico:false,
            modalHorario:false,
            modalObs:false,
            modalObsEditar:false,
            modalMes:false,
            modalDias:false,
            
            biometricoService:null,
            uploadService:null,

            listaPerfil:[],
            listaObs:[],
            listaGestion:[],
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            listaHorarios:[],
            listaAviso:[],
            id_horario:0,
            getPB:true,
            obsgestion:0,
            obsmes:0,
            archivo:'',
            reporteMes:{
                id_horario:'',
                cif:'',
                gestion:0,
                mes:1,
                di:0,
                df:0,
                listaPerfil:[],
                persona:{
                    id:null,
                    _01cif:'',
                    _02ci:'',
                    _03complemento:'',
                    _04nombre:'',
                    _05paterno:'',
                    _06materno:'',
                    _07fecha:'',
                    _08sexo:'',
                    _09cel:'',
                    _10correo:''
                },
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
                foto:''
            },
            horarioPerfil:{
                id:0,
                _01cif:this.mscc.cif,
                _02lem:'08:30',_03lsm:'12:30',_04let:'14:30',_05lst:'18:30',
                _06mem:'08:30',_07msm:'12:30',_08met:'14:30',_09mst:'18:30',
                _10miem:'08:30',_11mism:'12:30',_12miet:'14:30',_13mist:'18:30',
                _14jem:'08:30',_15jsm:'12:30',_16jet:'14:30',_17jst:'18:30',
                _18vem:'08:30',_19vsm:'12:30',_20vet:'14:30',_21vst:'18:30',
                _22sem:'08:30',_23ssm:'12:30',_24set:'14:30',_25sst:'18:30',
                _26dem:'08:30',_27dsm:'12:30',_28det:'14:30',_29dst:'18:30'
            },
            obs:{
                cif:null,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'Referencia por la que pide su Observacion',
                imagen:'',
                tipo:'Seleccionar Tipo',
                hora:'08:30',
                url:''
            },
            obsDetalle:{
                id:0,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'',
                hora:'',
                url:'',
                estado:0
            },
            uobs:{
                id:0,
                cif:null,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'',
                hora:'',
                url:''
            },
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            }
        }
    },
    created(){
        //Creamos los Sercicios
        this.biometricoService = new BiometricoService();
        this.uploadService = new UploadService();
        this.getAbiso();
    },
    mounted(){
        
    },
    updated(){
        this.egovf = this.mscc; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            this.getPerfilBiometrico(); // funcion que debuelbe una lista del Usuario registrado en los biometricos 
            this.getGestion(); // funcion que crea una lista de gestiones desde el 2021
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
        }
    },
    methods:{

        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        async getPerfilBiometrico(){ // funcion que debuelve una lista del Usuario registrado en los biometricos 
            await this.biometricoService.getPerfil(this.egovf.cif).then(response=>{
                this.listaPerfil = response.data;
                if(this.listaPerfil.length > 0){
                    this.id_horario = this.listaPerfil[0]._05horario_id;
                    this.getHorario(); // Funcion que llama el horario del usuario
                }
            });
            this.datos.cif = this.egovf.cif;
            this.datos.nombre = this.egovf.nombre;
            this.datos.apellido = this.egovf.paterno +' '+this.egovf.materno;
        },
        async getHorario(){ // Funcion que llama el horario del usuario
            await this.biometricoService.getHorario(this.id_horario,this.egovf.cif).then(response=>{
                this.horarioPerfil = response.data;
            });
        },
        async getListaHorario(){ // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
            await this.biometricoService.getListaHorario(this.egovf.cif,this.obsgestion).then(response=>{
                this.listaHorarios = response.data;
            });
        },
        async getObsUsuario(){ // Funcion que llama una lista de Observaciones del usuario 
            await this.biometricoService.getObsUsuario(this.egovf.cif,this.obsgestion,this.obsmes).then(response=>{
                this.listaObs = response.data;
            });
            if(this.listaObs.length == 0){
                this.$swal.fire('No se encontro ninguna Observacion', '', 'info');
            }
        },
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            this.reporteMes.gestion = this.obsgestion;
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
            this.reporteMes.gestion = this.obsgestion;
            this.reporteMes.mes = fecha.getMonth();
        },
        async addObs(){ //Funcion para registrar una Observacion del Usuario
            
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                if(response.status == 200){
                    this.obs.url = this.uploadService.getUrl()+ response.data.nombre;
                    this.obs.imagen = response.data.nombre;
                    this.obs.cif = this.egovf.cif;
                    this.$swal.fire({
                        title: 'Deseas Agregar la Observacion de Tu Asistencia ?',
                        showDenyButton: true,
                        icon:'info',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.biometricoService.addObsEmpleado(this.obs).then(response =>{
                                if(response.status == 200){
                                    this.$swal.fire('La Observacion fue Agregada Corectamente','Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('La Observacion no pudo ser Registrada', ''+ response.status, 'error');
                                }
                            });
                            
                        } else if (result.isDenied) {
                            this.$swal.fire('Datos Cancelados', '', 'info');
                        }
                    });

                }
                else {
                    this.$swal.fire('El archivo no pudo ser Guardado  ', '','error');
                }
            });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err,'', 'error');
            }
        },
        async updateObs(){ //Funcion actualizar una Observacion del Usuario
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                if(response.status == 200){
                    this.uobs.url = this.uploadService.getUrl()+ response.data.nombre;
                    this.uobs.imagen = response.data.nombre;
                    this.uobs.cif = this.egovf.cif;
                    this.$swal.fire({
                        title: 'Deseas Actualizar la Observacion de Tu Asistencia ?',
                        showDenyButton: true,
                        icon:'info',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.biometricoService.updateObsEmpleado(this.uobs).then(response =>{
                                if(response.status == 200){
                                    this.$swal.fire('La Observacion fue Actualizada Corectamente','Recuerda que para que tenga efecto debe de ser aprobada por tu inmediato superior', 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('La Observacion no pudo ser Registrada', ''+ response.status, 'error');
                                }
                            });
                            
                        } else if (result.isDenied) {
                            this.$swal.fire('Datos Cancelados', '', 'info');
                        }
                    });

                }
                else {
                    this.$swal.fire('El archivo no pudo ser Guardado  ', '','error');
                }
            });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err,'', 'error');
            }
        },
        async deleteObs(id){ //Funcion eliminar una Observacion del Usuario
            var uObs={
                id:0,
                cif:0,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                gestion:0,
                mes:0,
                di:0,
                df:0,
                detalle:'',
                imagen:'',
                tipo:'',
                hora:'',
                h:0,
                m:0,
                url:'',
                estado:0
            };
            this.listaObs.forEach(obs => {
                if(obs.id == id){
                    uObs.id = obs.id,
                    uObs.cif = obs._01cif,
                    uObs.uidobs = obs._02uidobs,
                    uObs.fechainicio = obs._03fechainicio,
                    uObs.fechafin = obs._04fechafin,
                    uObs.gestion = obs._05gestion,
                    uObs.mes = obs._06mes,
                    uObs.di = obs._07di,
                    uObs.df = obs._08df,
                    uObs.detalle = obs._09detalle,
                    uObs.imagen = obs._10imagen,
                    uObs.tipo= obs._11tipo,
                    uObs.hora = obs._12hora,
                    uObs.h = obs._13h,
                    uObs.m = obs._14m,
                    uObs.url= obs._15url,
                    uObs.estado= 2
                }
            });
            await this.$swal.fire({
                title: 'Desea Eliminar la Observacion ? ',
                showDenyButton: true,
                icon:'error',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.updateObs(uObs).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Observacion Eliminada Corectamente', '', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });  
        },
        getReporteMes(){//Funcion que muestra los Reportes de Usuario
            this.clickModalMes(false);
            this.clickModalDias(false);
            this.reporteMes.cif = this.egovf.cif;
            if(this.reporteMes.di<10){
                this.reporteMes.di='0'+this.reporteMes.di;
            }
            if(this.reporteMes.df<10){
                this.reporteMes.df='0'+this.reporteMes.df;
            }
            this.$router.push({
                name: "UReporteView",
                params:{
                    uri:this.reporteMes.cif+'j'+this.reporteMes.gestion+'m'+this.reporteMes.mes+'m'+this.reporteMes.di+'k'+this.reporteMes.df
                }
            });
        },
        getObsDetalle(id){// Funcion que Muestra el detalle de las Observaciones del Usuario
            this.listaObs.forEach(obs =>{
                if(obs.id === id){
                    this.obsDetalle.id = obs.id;
                    this.obsDetalle.uidobs = obs._02uidobs;
                    this.obsDetalle.fechainicio = obs._03fechainicio;
                    this.obsDetalle.fechafin = obs._04fechafin;
                    this.obsDetalle.detalle = obs._09detalle;
                    this.obsDetalle.imagen = obs._10imagen;
                    this.obsDetalle.tipo = obs._11tipo;
                    this.obsDetalle.hora = obs._12hora;
                    this.obsDetalle.url = obs._15url;
                    this.obsDetalle.estado = obs._16estado;
                }
            });
            this.clickModalDetalleObs(true);
        },
        setObs(id){// Funcion que carga los datos de las Observaciones del Usuario
            this.listaObs.forEach(obs =>{
                if(obs.id === id){
                    this.uobs.id = id;
                    this.uobs.uidobs = obs._02uidobs;
                    this.uobs.fechainicio = obs._03fechainicio;
                    this.uobs.fechafin = obs._04fechafin;
                    this.uobs.detalle = obs._09detalle;
                    this.uobs.imagen = obs._10imagen;
                    this.uobs.tipo  = obs._11tipo;
                    this.uobs.hora = obs._12hora;
                    this.uobs.url = obs._15url;
                }
            });
            this.clickModalObsEditar(true);
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
        clicktabScc(tabH){
            this.tabScc = tabH;
        },
        clickModalDetalleObs(Obs){
            this.modalDetalleObs = Obs;
        },
        clickModalObs(cio){
            this.modalObs = cio;
        },
        clickModalObsEditar(cio){
            this.modalObsEditar = cio;
        },
        clickModalMes(rmes){
            if(this.egovf.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil()
            else
                this.modalMes = rmes;
        },
        clickModalDias(dias){
            if(this.egovf.foto =='https://fhcevirtual.umsa.bo/egovf-img/imagenes/user.png')
                this.getFotoPerfil()
            else
                this.modalDias = dias;
        },
        getTipo(){
            if(this.obs.tipo == 'Entrada M.')
                this.obs.hora = '08:30';
            if(this.obs.tipo == 'Salida M.')
                this.obs.hora = '12:30';
            if(this.obs.tipo == 'Entrada T.')
                this.obs.hora = '14:30';
            if(this.obs.tipo == 'Salida T.')
                this.obs.hora = '18:30';
            if(this.obs.tipo == 'continuo')
                this.obs.hora = '16:30';
            if(this.obs.tipo == 'asueto')
                this.obs.hora = '08:30';
        },
        getuTipo(){
            if(this.uobs.tipo == 'Entrada M.')
                this.uobs.hora = '08:30';
            if(this.uobs.tipo == 'Salida M.')
                this.uobs.hora = '12:30';
            if(this.uobs.tipo == 'Entrada T.')
                this.uobs.hora = '14:30';
            if(this.uobs.tipo == 'Salida T.')
                this.uobs.hora = '18:30';
            if(this.uobs.tipo == 'continuo')
                this.uobs.hora = '16:30';
            if(this.uobs.tipo == 'asueto')
                this.uobs.hora = '08:30';
        },
        getFotoPerfil(){ //Funcion que verifica su foto de perfil
            this.$swal.fire({
                title: 'Para obtener tu Reporte Debes de cambiar tu foto de perfil',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/perfil');
                } else if (result.isDenied) {
                    location.reload();
                }
            });
        },

        async getAbiso(){
            const steps = [];
            var x = 0;
            var c = 0;
            await this.biometricoService.getAviso().then(response=>{
                this.listaAviso = response.data;
            });
            this.listaAviso.forEach(aviso => {
                steps.push(x+1);
                x = x+1;
                c = aviso.id;
            });
            
            const Queue = this.$swal.mixin({
                progressSteps: steps,
                confirmButtonText: 'Siguiente >',
                // optional classes to avoid backdrop blinking between steps
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
            })
            ;(async () => {
                if(this.listaAviso.length>0){
                    x = 0;
                    c = c +1;
                    while (x < this.listaAviso.length){
                        await Queue.fire({
                            title: this.listaAviso[x]._01titulo,
                            icon: this.listaAviso[x]._03icon,
                            text: this.listaAviso[x]._02detalle,
                            currentProgressStep: x,
                        })
                        x = x+1;
                    }
                }
            })()
        }
    }
}
</script>
