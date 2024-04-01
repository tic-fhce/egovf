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
                                        <CDropdownItem><CButton @click="clickModalBiometrico(true)" size="sm">Agregar Biometrico</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalHorario(true)" size="sm">Agregar Horario</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalObs(true)" size="sm">Agregar Observaciones</CButton></CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>

                                <CDropdown variant="btn-group">
                                    <CDropdownToggle  color="success" class="font" size="sm">Reportes</CDropdownToggle>
                                    <CDropdownMenu>
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
                                            <label v-if="perfil._04estado==0">Estado : <button class="badge bg-success" @click="estadoInactibo(perfil)">Activo</button></label>
                                            <label v-else>Estado : <button class="badge bg-danger" @click="estadoActibo(perfil)">Inactivo</button></label><br>
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
                                                    <CButton color="success" class="font" size="sm" @click="getListaHorario()"><CIcon icon="cil-calendar"></CIcon> Cargar Horarios</CButton>
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
                                        <CCardHeader class="headercolor text-center">
                                            Observaciones
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol :lg="2">Gestion :</CCol>
                                                <CCol :lg="2">
                                                    <select v-model="obsgestion" class="form-control">
                                                        <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                    </select>
                                                </CCol>
                                                <CCol :lg="2">Mes :</CCol>
                                                <CCol :lg="2">
                                                    <select v-model="obsmes" class="form-control">
                                                        <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                                                    </select>
                                                </CCol>
                                                <CCol :lg="4" class="text-center">
                                                    <CButton color="success" class="font" @click="getObsUsuario()" size="sm"><CIcon icon="cil-featured-playlist"></CIcon> Cargar Observaciones</CButton>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                        <CCardFooter class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th><th>UidObs</th><th>Tipo</th><th>Estado</th><th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                                        <th scope="row">{{ lsobs.id }}</th>
                                                        <td>{{ lsobs._02uidobs }}</td>
                                                        <td>{{ lsobs._11tipo }}</td>
                                                        <td>
                                                            <CButton color="success" class="font" size="sm" v-if="lsobs._16estado === 1" @click="updateObs(lsobs.id,0)">Aprobado</CButton>
                                                            <CButton color="warning" class="font" size="sm" v-if="lsobs._16estado === 0" @click="updateObs(lsobs.id,1)">En Espera</CButton>
                                                        </td>
                                                        <td>
                                                            <CButton color="success" class="font" size="sm" @click="getObsDetalle(lsobs.id)"><CIcon icon="cil-featured-playlist"></CIcon> Ver Detalles</CButton>
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
</CModal>
<!-- END Modal  Detalles de Obs-->

<!-- Modal  Biometrico-->
<CModal :visible="modalBiometrico" @close="clickModalBiometrico(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalBiometrico(false)">
        <CModalTitle>
            <h5>Agregar Biometrico</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="tipo" class="col-4">Tipo :</label>
            <label for="tipo" class="col-8">{{ empleado.empleado }}</label>
        </div>
        
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Datos del Biometrico</label>
            <div class="col-sm-6">
                <select v-model="id_bio" class="form-control" @change="datosChange()">
                    <option v-for="lista in listaBiometrico" :value="lista.id" :key="lista.id">{{lista._02nombre}} {{lista._06lugar}}</option>
                </select>
            </div>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalBiometrico(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="updateBiometrico()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Agregar Biometrico</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Biometrico-->

<!-- Modal  Horario-->
<CModal :visible="modalHorario" @close="clickModalHorario(false)" size="lg">
    <CModalHeader class="headercolor" dismiss @close="clickModalHorario(false)">
        <CModalTitle>
            <h5>Agregar Nuevo Horario</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <div class="mb-3 row">
            <label for="tipo" class="col-4">Tipo :</label>
            <label for="tipo" class="col-8">{{ empleado.empleado }}</label>
        </div>
        
        <div class="mb-3 row table-responsive">
            <br>
            <table class="table">
                <thead>
                    <tr>
                        <th>Horario</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sabado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Ingreso Mañana</th>
                        <td><input type="text" v-model="horario._02lem" size="5"></td>
                        <td><input type="text" v-model="horario._06mem" size="5"></td>
                        <td><input type="text" v-model="horario._10miem" size="5"></td>
                        <td><input type="text" v-model="horario._14jem" size="5"></td>
                        <td><input type="text" v-model="horario._18vem" size="5"></td>
                        <td><input type="text" v-model="horario._22sem" size="5"></td>
                        <td><input type="text" v-model="horario._26dem" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Mañana</th>
                        <td><input type="text" v-model="horario._03lsm" size="5"></td>
                        <td><input type="text" v-model="horario._07msm" size="5"></td>
                        <td><input type="text" v-model="horario._11mism" size="5"></td>
                        <td><input type="text" v-model="horario._15jsm" size="5"></td>
                        <td><input type="text" v-model="horario._19vsm" size="5"></td>
                        <td><input type="text" v-model="horario._23ssm" size="5"></td>
                        <td><input type="text" v-model="horario._27dsm" size="5"></td>
                    </tr>
                    <tr>
                        <th>Ingreso Tarde</th>
                        <td><input type="text" v-model="horario._04let" size="5"></td>
                        <td><input type="text" v-model="horario._08met" size="5"></td>
                        <td><input type="text" v-model="horario._12miet" size="5"></td>
                        <td><input type="text" v-model="horario._16jet" size="5"></td>
                        <td><input type="text" v-model="horario._20vet" size="5"></td>
                        <td><input type="text" v-model="horario._24set" size="5"></td>
                        <td><input type="text" v-model="horario._28det" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Tarde</th>
                        <td><input type="text" v-model="horario._05lst" size="5"></td>
                        <td><input type="text" v-model="horario._09mst" size="5"></td>
                        <td><input type="text" v-model="horario._13mist" size="5"></td>
                        <td><input type="text" v-model="horario._17jst" size="5"></td>
                        <td><input type="text" v-model="horario._21vst" size="5"></td>
                        <td><input type="text" v-model="horario._25sst" size="5"></td>
                        <td><input type="text" v-model="horario._29dst" size="5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalHorario(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
        <CButton @click="addHorario()" color="success" class="font"><CIcon icon="cil-check-alt" class="me-2"/>Agregar Horario</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Horario-->

<!-- Modal  Obserbasiones-->
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
</CModal>
<!-- END Modal  Obserbasiones-->

<!-- Modal Reporte Mensual-->
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
</CModal>
<!-- End Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado-->
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
</CModal>
<!-- End Modal Reporte Mensual Segmentado-->
</template>

<script>
//Importamos Componentes
import ComponenteNombres from '@/components/Ciudadano/ComponenteNombres.vue';

//Importamos los Servicios
import SccService from '@/services/scc/sccService';
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
            modalMes:false,
            modalDias:false,
            sccService:null,
            uploadService:null,
            listaBiometrico:[],
            listaPerfil:[],
            reporteFinal:[],
            listaObs:[],
            listaGestion:[],
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            listaHorarios:[],
            id_bio:0,
            id_horario:0,
            getPB:true,
            obsgestion:0,
            obsmes:1,
            archivo:'',
            reporteMes:{
                id_horario:'',
                cif:'',
                gestion:2023,
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
            biometrico:{
                id:null,
                _01user_id:0,
                _02nombre:'',
                _03cif:0,
                _04estado:0,
                _05horario:0,
                _06lugar:'',
                _07id_tipo:1,
                _08detalle:'',
                _09sexo:0
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
            horario:{
                _01cif:this.mscc.cif,
                _02lem:'08:30',_03lsm:'12:30',_04let:'14:30',_05lst:'18:30',
                _06mem:'08:30',_07msm:'12:30',_08met:'14:30',_09mst:'18:30',
                _10miem:'08:30',_11mism:'12:30',_12miet:'14:30',_13mist:'18:30',
                _14jem:'08:30',_15jsm:'12:30',_16jet:'14:30',_17jst:'18:30',
                _18vem:'08:30',_19vsm:'12:30',_20vet:'14:30',_21vst:'18:30',
                _22sem:'08:30',_23ssm:'12:30',_24set:'14:30',_25sst:'18:30',
                _26dem:'08:30',_27dsm:'12:30',_28det:'14:30',_29dst:'18:30'
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
                detalle:'',
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
            datos:{
                cif:0,
                nombre:'',
                apellido:''
            }
        }
    },
    created(){
        this.uploadService = new UploadService();//Creamos el Servicio para la Foto de perfil
        this.sccService = new SccService(); // Creamos el servicio para el Modulo Scc
    },
    mounted(){
        this.getLista(); // funcion que trae La lista de usuarios Registrados en los Biometricos
    },
    updated(){
        this.egovf = this.mscc; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            this.getPerfilBiometrico(); // funcion que debuelbe una lista del Usuario registrado en los biometricos 
            this.getGestion(); // funcion que crea una lista de gestiones desde el 2021
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
        }
        this.datos.cif = this.egovf.cif;
        this.datos.nombre = this.egovf.nombre;
        this.datos.apellido = this.egovf.paterno+' '+this.egovf.materno;
    },
    methods:{

        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        async getLista(){ // funcion que trae una lista de usuarios Registrados en los Biometricos
            await this.sccService.getListarCifCero().then(response => {
                this.listaBiometrico = response.data;
            });
        },
        async getPerfilBiometrico(){ // funcion que debuelve una lista del Usuario registrado en los biometricos 
            await this.sccService.getPerfil(this.egovf.cif).then(response=>{
                this.listaPerfil = response.data;
                if(this.listaPerfil.length > 0){
                    this.id_horario = this.listaPerfil[0]._05horario_id;
                    this.getHorario(); // Funcion que llama el horario del usuario
                }
            });
        },
        async getHorario(){ // Funcion que llama el horario del usuario
            await this.sccService.getHorario(this.id_horario,this.egovf.cif).then(response=>{
                this.horarioPerfil = response.data;
            });
        },
        async getListaHorario(){ // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
            await this.sccService.getListaHorario(this.egovf.cif,this.obsgestion).then(response=>{
                this.listaHorarios = response.data;
            });
        },
        async getObsUsuario(){ // Funcion que llama una lista de Observaciones del usuario 
            await this.sccService.getObsUsuario(this.egovf.cif,this.obsgestion,this.obsmes).then(response=>{
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
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
            this.reporteMes.gestion = this.obsgestion;
            this.reporteMes.mes = fecha.getMonth();
        },
        datosChange(){ //Funcion que cambia los parametros del Biometrico para su registro
            this.listaBiometrico.forEach(element => {
                if (element.id === this.id_bio)
                {
                    this.biometrico = element;
                    this.biometrico._03cif = this.egovf.cif;
                    this.biometrico._07id_tipo = this.empleado.tipoempleado_id;
                    this.biometrico._09sexo = this.egovf.sexo;
                }
            });
        },
        addHorario(){//Funcion para registrar un Horario al Usuario
            this.horario._01cif = this.egovf.cif;
            this.$swal.fire({
                title: 'Desea Agregar el Horario de trabajo del Empleado ?',
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.sccService.addHorario(this.horario).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Los Horarios fueron Agregados al Empleado Corectamente', '', 'success').then((res)=>{
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
                        title: 'Desea agregar las Observaciones de Asistencia al Empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                        showDenyButton: true,
                        icon:'info',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.sccService.addObs(this.obs).then(response =>{
                                if(response.status == 200){
                                    this.$swal.fire('Las Observaciones fueron Agregados Corectamente a '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('Las Observaciones no fueron Guardados Error'+ response.status, '', 'error');
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
        async updateObs(id,estado){
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
                    uObs.estado= estado
                }
            });
            await this.$swal.fire({
                title: 'Desea Actualizar la Observacion de ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.sccService.updateObs(uObs).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Observacion Actualizada Corectamente', '', 'success').then((res)=>{
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
        async updateBiometrico(){ // Funcion para registrar al usuario con un biometrico
            await this.$swal.fire({
                title: 'Desea Agregar el Biometrico  al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.sccService.updateBiometrico(this.biometrico).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Datos del Biometrico Agregados al Ciudadano Corectamente', '', 'success').then((res)=>{
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
                name: "ReporteView",
                params:{
                    uri:this.reporteMes.cif+'j'+this.reporteMes.gestion+'m'+this.reporteMes.mes+'m'+this.reporteMes.di+'k'+this.reporteMes.df
                }
            });
        },
        async estadoActibo(bio){ // Funcion que Activa al Usuario en el Biometrico
            
            await this.$swal.fire({
                title: 'Desea cambiar el Estado de Biometrico al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    bio._04estado=0;
                    this.sccService.estadoBiometrico(bio).then(response=>{
                        if(response.status== 200 ){
                            this.$swal.fire('Datos del Biometrico Actualizados Corectamente', '', 'success').then((result) => {
                                if(result)
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
        async estadoInactibo(bio){// Funcion que Desactiva al Usuario en el Biometrico
            await this.$swal.fire({
                title: 'Desea cambiar el Estado de Biometrico al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    bio._04estado=1;
                    this.sccService.estadoBiometrico(bio).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Datos del Biometrico Actualizados Corectamente', '', 'success').then((result) => {
                            if(result)
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
        clickModalBiometrico(Bio){
            this.modalBiometrico = Bio;
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
