<template>
  <CRow>
    <CCol :lg="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between">
          <CRow>
            <CCol :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-devices" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
              </div>
            </CCol>
            <CCol :lg="6" class="text-end">
              <CDropdown variant="btn-group">
                <!--Menus-->
                  <CButtonGroup role="group">
                    <!--Menu Opciones-->
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="dark" class="font border-0  shadow-sm" size="sm">
                        <CIcon icon="cil-menu" color="dark" class="me-2 text-success"/>Opciones</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>
                          <CButton @click="clickModalBiometrico(true)" size="sm"><CIcon icon="cil-medical-cross" size="lg" class="me-2" />Agregar Biometrico</CButton>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem>
                          <CButton @click="clickModalHorario(true)" size="sm"><CIcon icon="cil-medical-cross" size="lg" class="me-2" />Agregar Horario</CButton>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem>
                          <CButton @click="clickModalObs(true)" size="sm"><CIcon icon="cil-medical-cross" size="lg" class="me-2" />Agregar Observaciones</CButton>
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <!--Menu reportes-->
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="dark" class="font border-0  shadow-sm" size="sm">Reportes</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>
                          <CButton @click="clickModalMes(true)" size="sm"><CIcon icon="cil-description" size="lg" class="me-2" />Reporte Mensual</CButton>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem>
                          <CButton @click="clickModalDias(true)" size="sm"><CIcon icon="cil-description" size="lg" class="me-2" />Reporte Segmentado</CButton>
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CButtonGroup>
              </CDropdown>
            </CCol>
          </CRow>

        </CCardHeader>

        <CCardBody>
          <!--Tabs de Navegacion Datos del biometrico - Horairos - Obserbaciones -->
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink :active="tabScc == 1" @click="clicktabScc(1)">
                <CButton size="sm">
                  <CIcon icon="cil-monitor"></CIcon><label class="d-none d-md-flex me-auto">Datos del Biometricos</label>
                </CButton>
              </CNavLink>
            </CNavItem>
            
            <CNavItem>
              <CNavLink :active="tabScc == 2" @click="clicktabScc(2)">
                <CButton size="sm">
                  <CIcon icon="cil-calendar"></CIcon><label class="d-none d-md-flex me-auto">Horarios</label>
                </CButton>
              </CNavLink>
            </CNavItem>
            
            <CNavItem>
              <CNavLink :active="tabScc == 3" @click="clicktabScc(3)">
                <CButton size="sm">
                  <CIcon icon="cil-featured-playlist"></CIcon><label class="d-none d-md-flex me-auto">Observaciones</label>
                </CButton>
              </CNavLink>
            </CNavItem>
          </CNav>
          <!--Tabs de Navegacion  -->

          <CTabContent>
            <!--Datos del Biometrico-->
            <CTabPane :visible="tabScc == 1">
              <CRow>
                <CCol :lg="4" v-for="perfil in listaPerfil" :key="perfil.id">
                  <br>
                  <CCard>
                      <CCardHeader class="headercolor"> <CIcon icon="cil-monitor"></CIcon> - UID : {{perfil.user_id}} </CCardHeader>
                      <CCardBody class="datos">
                          <CRow class="mb-2">
                              <CCol><strong>ID-Biometrico:</strong></CCol>
                              <CCol>{{ perfil.id }}</CCol>
                          </CRow>
                          <CRow class="mb-2">
                              <CCol><strong>UID:</strong></CCol>
                              <CCol>{{ perfil.user_id }}</CCol>
                          </CRow>
                          <CRow class="mb-2">
                              <CCol><strong>Estado:</strong></CCol>
                              <CCol>
                                  <CBadge :color="perfil.estado == 0 ? 'warning' : 'success'">
                                      {{ perfil.estado == 0 ? 'Inactivo' : 'Activo' }}
                                  </CBadge>
                              </CCol>
                          </CRow>

                          <CRow class="mb-2">
                              <CCol><strong>Sigla:</strong></CCol>
                              <CCol>{{ perfil.lugar }}</CCol>
                          </CRow>
                          <CRow class="mb-2">
                              <CCol><strong>Horario:</strong></CCol>
                              <CCol>
                                  <CBadge :color="perfil.horario_id == 0 ? 'danger' : 'success'">
                                      {{ perfil.horario_id == 0 ? 'Sin Horario' : 'Horario Registrado' }}
                                  </CBadge>
                              </CCol>
                          </CRow>
                          <CRow class="mb-2">
                              <CCol><strong>Tipo:</strong></CCol>
                              <CCol>{{ empleado.empleado }}</CCol>
                          </CRow>
                          <CRow><br><hr></CRow>
                          <CRow class="mb-2 text-center">
                              <CCol>{{ perfil.nombre }}<br>nombre registrado</CCol>
                          </CRow> 
                      </CCardBody>
                      <CCardFooter>
                          <CCol class="text-center"><strong>{{perfil.detalle}}</strong></CCol> <!-- Aquí puedes agregar más detalles si lo deseas -->
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
                  <br />
                  <CCard>
                    <CCardHeader class="headercolor text-center">
                      {{this.tituloh}}
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
                          <td>{{ horarioPerfil.lem }}</td>
                          <td>{{ horarioPerfil.mem }}</td>
                          <td>{{ horarioPerfil.miem }}</td>
                          <td>{{ horarioPerfil.jem }}</td>
                          <td>{{ horarioPerfil.vem }}</td>
                          <td>{{ horarioPerfil.sem }}</td>
                          <td>{{ horarioPerfil.dem }}</td>
                        </tr>
                        <tr>
                          <th>Salida Mañana</th>
                          <td>{{ horarioPerfil.lsm }}</td>
                          <td>{{ horarioPerfil.msm }}</td>
                          <td>{{ horarioPerfil.mism }}</td>
                          <td>{{ horarioPerfil.jsm }}</td>
                          <td>{{ horarioPerfil.vsm }}</td>
                          <td>{{ horarioPerfil.ssm }}</td>
                          <td>{{ horarioPerfil.dsm }}</td>
                        </tr>
                        <tr>
                          <th>Ingreso Tarde</th>
                          <td>{{ horarioPerfil.let }}</td>
                          <td>{{ horarioPerfil.met }}</td>
                          <td>{{ horarioPerfil.miet }}</td>
                          <td>{{ horarioPerfil.jet }}</td>
                          <td>{{ horarioPerfil.vet }}</td>
                          <td>{{ horarioPerfil.set }}</td>
                          <td>{{ horarioPerfil.det }}</td>
                        </tr>
                        <tr>
                          <th>Salida Tarde</th>
                          <td>{{ horarioPerfil.lst }}</td>
                          <td>{{ horarioPerfil.mst }}</td>
                          <td>{{ horarioPerfil.mist }}</td>
                          <td>{{ horarioPerfil.jst }}</td>
                          <td>{{ horarioPerfil.vst }}</td>
                          <td>{{ horarioPerfil.sst }}</td>
                          <td>{{ horarioPerfil.dst }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CCardBody>
                </CCol>
              </CRow>
              <CRow>
                <CCol :lg="12">
                  <br />
                  <CCard>
                    <CCardHeader class="headercolor text-center">
                      Otros Horarios
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol :lg="2">Gestion :</CCol>
                        <CCol :lg="4">
                          <select v-model="obsgestion" class="form-control">
                            <option v-for="y in listaGestion" :key="y" :value="y">
                              {{ y }}
                            </option>
                          </select>
                          <br />
                        </CCol>
                        <CCol :lg="6" class="text-center">
                          <CButton color="success" class="font" size="sm" @click="getListaHorario()"><CIcon icon="cil-calendar"></CIcon> Cargar Horarios</CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                    <CCardFooter>
                      <CRow>
                        <CCol :lg="12" v-for="horario in listaHorarios" :key="horario.historial_id">
                          <br />
                          <CCard>
                            <CCardHeader class="headercolor">
                              ID : {{ horario.historial_id }} Fecha :
                              {{ horario.fecha }} valido hasta
                              {{ horario.valido }}
                            </CCardHeader>
                            <CCardBody class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>Horario</th>
                                    <th>L</th>
                                    <th>M</th>
                                    <th>M</th>
                                    <th>J</th>
                                    <th>V</th>
                                    <th>S</th>
                                    <th>D</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th>I. Mañana</th>
                                    <td>{{ horario.lem }}</td>
                                    <td>{{ horario.mem }}</td>
                                    <td>{{ horario.miem }}</td>
                                    <td>{{ horario.jem }}</td>
                                    <td>{{ horario.vem }}</td>
                                    <td>{{ horario.sem }}</td>
                                    <td>{{ horario.dem }}</td>
                                  </tr>
                                  <tr>
                                    <th>S. Mañana</th>
                                    <td>{{ horario.lsm }}</td>
                                    <td>{{ horario.msm }}</td>
                                    <td>{{ horario.mism }}</td>
                                    <td>{{ horario.jsm }}</td>
                                    <td>{{ horario.vsm }}</td>
                                    <td>{{ horario.ssm }}</td>
                                    <td>{{ horario.dsm }}</td>
                                  </tr>
                                  <tr>
                                    <th>I. Tarde</th>
                                    <td>{{ horario.let }}</td>
                                    <td>{{ horario.met }}</td>
                                    <td>{{ horario.miet }}</td>
                                    <td>{{ horario.jet }}</td>
                                    <td>{{ horario.vet }}</td>
                                    <td>{{ horario.set }}</td>
                                    <td>{{ horario.det }}</td>
                                  </tr>
                                  <tr>
                                    <th>S. Tarde</th>
                                    <td>{{ horario.lst }}</td>
                                    <td>{{ horario.mst }}</td>
                                    <td>{{ horario.mist }}</td>
                                    <td>{{ horario.jst }}</td>
                                    <td>{{ horario.vst }}</td>
                                    <td>{{ horario.sst }}</td>
                                    <td>{{ horario.dst }}</td>
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
                  <br />
                  <CCard>
                    <CCardHeader class="headercolor text-center">
                      Observaciones
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol :lg="4">
                            <CInputGroup class="mb-3">
                                <CInputGroupText  as="label">Gestion</CInputGroupText>
                                <CFormSelect  v-model="obsgestion" :model-value="String(obsgestion)"  @update:model-value="obsgestion = Number($event)" required="true">
                                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>

                        <CCol :lg="4">
                            <CInputGroup class="mb-3">
                                <CInputGroupText  as="label">Mes</CInputGroupText>
                                <CFormSelect  v-model="obsmes" :model-value="String(obsmes)"  required="true">
                                    <option v-for="mes  in listaMes" :key="mes.m" :value="mes.m">{{mes.mes}}</option>
                                </CFormSelect>
                            </CInputGroup>
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
                            <th>ID</th><th>UidObs</th><th>Tipo</th><th>Detalle</th><th>Estado</th><th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="lsobs in listaObs" :key="lsobs.id">
                            <th scope="row">{{ lsobs.id }}</th>
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
                              <CButton color="danger" class="font" size="sm" v-if="lsobs.estado === 2" @click="updateObsBio(lsobs.id, 0)" ><CIcon icon="cil-warning" size="lg"/>
                              </CButton>
                              <CButton color="success" class="font" size="sm" v-if="lsobs.estado === 1" @click="updateObsBio(lsobs.id, 0)" ><CIcon icon="cil-check" size="lg"/>
                              </CButton>
                              <CButton color="warning" class="font" size="sm" v-if="lsobs.estado === 0" @click="updateObsBio(lsobs.id, 1)"><CIcon icon="cil-cloud-upload" size="lg"/>
                              </CButton>
                            </td>
                            <td>
                              <CButton color="dark" class="font" size="sm" @click="getObsDetalle(lsobs.id)"><CIcon icon="cil-featured-playlist"></CIcon>
                              </CButton>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr></tr>
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
  <CModal size="lg" :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
      <CModalTitle>
        <h6><CIcon icon="cil-featured-playlist"/> Detalles de la Observacion</h6>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <ComponenteObs :obsDetalle="obsDetalle"/>
    </CModalBody>
    <CModalFooter>
      <CButtonGroup role="group">
        <CButton @click="clickModalDetalleObs(false)" color="danger" class="font" size="sm" ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton>
        <CButton @click="downloadImg(obsDetalle.url, obsDetalle.imagen)" color="warning" class="font" size="sm" >
          <CIcon icon="cil-cloud-download" class="me-2" />Descargar
        </CButton>
        <CButton @click="updateObsBio(obsDetalle.id, 1)" color="success" class="font" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />Aporbar
        </CButton>
        <CButton @click="updateObsBio(obsDetalle.id, 2)" color="dark" class="font" size="sm">
          <CIcon icon="cil-warning" class="me-2" />Rechazar
        </CButton>
      </CButtonGroup>
    </CModalFooter>
  </CModal>
  <!-- END Modal  Detalles de Obs-->

  <!-- Modal  Biometrico-->
  <CModal :visible="modalBiometrico" @close="clickModalBiometrico(false)">
    <CForm @submit.prevent="updateBiometrico()">
      <CModalHeader class="headercolor" dismiss @close="clickModalBiometrico(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-monitor"/> Agregar Biometrico</h6>
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <ComponenteNombres :datos="obsDetalle.datos" />
        <hr />
        <CInputGroup class="mb-3">
          <h6>{{ empleado.empleado }}</h6>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" for="inputGroupSelect01">Datos del Biometrico</CInputGroupText>
          <CFormSelect v-model="id_bio" :model-value="String(id_bio)"  @update:model-value="id_bio = Number($event)" @change="datosChange()" required="true">
            <option v-for="lista in listaBiometrico" :value="lista.id" :key="lista.id">
                {{ lista.nombre }} - {{ lista.lugar }}
            </option>
          </CFormSelect>
        </CInputGroup>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalBiometrico(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />Agregar Biometrico
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- END Modal  Biometrico-->

  <!-- Modal  Horario-->
  <CModal :visible="modalHorario" @close="clickModalHorario(false)" size="lg">
    <CForm @submit.prevent="addHorario()">
      <CModalHeader class="headercolor" dismiss @close="clickModalHorario(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-calendar"/> Agregar Nuevo Horario</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="obsDetalle.datos" />
        <hr />
        <CInputGroup class="mb-3">
          <h6>{{ empleado.empleado }}</h6>
        </CInputGroup>

        <div class="mb-3 row table-responsive">
          <br />
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
                <td><input type="text" v-model="horario.lem" size="5" /></td>
                <td><input type="text" v-model="horario.mem" size="5" /></td>
                <td>
                  <input type="text" v-model="horario.miem" size="5" />
                </td>
                <td><input type="text" v-model="horario.jem" size="5" /></td>
                <td><input type="text" v-model="horario.vem" size="5" /></td>
                <td><input type="text" v-model="horario.sem" size="5" /></td>
                <td><input type="text" v-model="horario.dem" size="5" /></td>
              </tr>
              <tr>
                <th>Salida Mañana</th>
                <td><input type="text" v-model="horario.lsm" size="5" /></td>
                <td><input type="text" v-model="horario.msm" size="5" /></td>
                <td>
                  <input type="text" v-model="horario.mism" size="5" />
                </td>
                <td><input type="text" v-model="horario.jsm" size="5" /></td>
                <td><input type="text" v-model="horario.vsm" size="5" /></td>
                <td><input type="text" v-model="horario.ssm" size="5" /></td>
                <td><input type="text" v-model="horario.dsm" size="5" /></td>
              </tr>
              <tr>
                <th>Ingreso Tarde</th>
                <td><input type="text" v-model="horario.let" size="5" /></td>
                <td><input type="text" v-model="horario.met" size="5" /></td>
                <td>
                  <input type="text" v-model="horario.miet" size="5" />
                </td>
                <td><input type="text" v-model="horario.jet" size="5" /></td>
                <td><input type="text" v-model="horario.vet" size="5" /></td>
                <td><input type="text" v-model="horario.set" size="5" /></td>
                <td><input type="text" v-model="horario.det" size="5" /></td>
              </tr>
              <tr>
                <th>Salida Tarde</th>
                <td><input type="text" v-model="horario.lst" size="5" /></td>
                <td><input type="text" v-model="horario.mst" size="5" /></td>
                <td>
                  <input type="text" v-model="horario.mist" size="5" />
                </td>
                <td><input type="text" v-model="horario.jst" size="5" /></td>
                <td><input type="text" v-model="horario.vst" size="5" /></td>
                <td><input type="text" v-model="horario.sst" size="5" /></td>
                <td><input type="text" v-model="horario.dst" size="5" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalHorario(false)" color="danger" class="font" size="sm"><CIcon icon="cil-x" class="me-2" />Cancelar</CButton>
        <CButton type="submit" class="font" color="success" size="sm" >
          <CIcon icon="cil-check-alt" class="me-2" />Agregar Horario
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- END Modal  Horario-->

  <!-- Modal  Obserbasiones-->
  <CModal :visible="modalObs" @close="clickModalObs(false)">
    <CForm @submit.prevent="addObs()" enctype="multipart/form-data">
      <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-featured-playlist"/> Agregar Observaciones de Asistencia</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="obsDetalle.datos" />
        <hr />

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">UID - OBS</CInputGroupText>
          <CFormInput type="text" v-model="obs.uidobs" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Fecha de Inicio</CInputGroupText>
          <CFormInput type="date"  v-model="obs.fechainicio" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Fecha Fin</CInputGroupText>
          <CFormInput type="date"  v-model="obs.fechafin" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Detalle</CInputGroupText>
          <CFormTextarea  v-model="obs.detalle" required="true"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Tipo</CInputGroupText>
          <CFormSelect  v-model="obs.tipo" required="true" @change="getTipo()"> 
              <option value="Entrada M.">Entrada Mañana</option>
              <option value="Salida M.">Salida Mañana</option>
              <option value="Entrada T.">Entrada Tarde</option>
              <option value="Salida T.">Salida Tarde</option>
              <option value="continuo">Continuo</option>
              <option value="continuoingreso">Continuo e Ingreso</option>
              <option value="horas">Horas de Servicio</option>
              <option value="extraordinario">Horario Extraordinario</option>
              <option value="comision">Comisión</option>
              <option value="permiso">Permiso</option>
              <option value="asueto">Asueto</option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3" v-if="mostrarHoraIngreso()">
          <CInputGroupText as="label">Hora Ingreso</CInputGroupText>
          <CFormInput type="text"  v-model="obs.horaEntrada" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3" v-if="mostrarHoraSalida()">
          <CInputGroupText as="label">Hora Salida</CInputGroupText>
          <CFormInput type="text"  v-model="obs.horaSalida" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Documento</CInputGroupText>
          <CFormInput type="file" ref="file"  accept="image/png,image/jpeg" @change="selectFile()" required="true"/>
        </CInputGroup>

      </CModalBody>

      <CModalFooter>
        <CButton @click="clickModalObs(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" /> Agregar Observaciones
        </CButton>
      </CModalFooter>

    </CForm>
  </CModal>
  <!-- END Modal  Obserbasiones-->

  
  <!-- Modal Reporte Mensual-->
  <CModal :visible="modalMes" @close="clickModalMes(false)">
    <CForm @submit.prevent="getReporteMes()">
      <CModalHeader class="headercolor" dismiss @close="clickModalMes(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-description" size="lg" class="me-2" /> Reporte Mensual</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="obsDetalle.datos" />
        <hr />

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Gestion </CInputGroupText>
          <CFormSelect v-model="reporteMes.gestion" :model-value="String(reporteMes.gestion)" @update:model-value="reporteMes.gestion = Number($event)" required="true">
            <option v-for="y in listaGestion" :key="y" :value="y">
              {{ y }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Mes </CInputGroupText>
          <CFormSelect v-model="reporteMes.mes" :model-value="String(reporteMes.mes)"  required="true">
            <option v-for="mes in listaMes" :value="mes.m" :key="mes.m" >
              {{ mes.mes }}
            </option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalMes(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-file" class="me-2" />Ver Reporte
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Reporte Mensual-->

  <!-- Modal Reporte Mensual Segmentado-->
  <CModal :visible="modalDias" @close="clickModalDias(false)">
    <CForm @submit.prevent="getReporteMes()">
      <CModalHeader class="headercolor" dismiss @close="clickModalDias(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-description" size="lg" class="me-2" />Reporte Mensual Segmentado</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="obsDetalle.datos" />
        <hr />
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Gestion </CInputGroupText>
          <CFormSelect v-model="reporteMes.gestion" :model-value="String(reporteMes.gestion)" @update:model-value="reporteMes.gestion = Number($event)" required="true">
            <option v-for="y in listaGestion" :key="y" :value="y">
              {{ y }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Mes </CInputGroupText>
          <CFormSelect v-model="reporteMes.mes" :model-value="String(reporteMes.mes)"  required="true">
            <option v-for="mes in listaMes" :key="mes.m" :value="mes.m">
              {{ mes.mes }}
            </option>
          </CFormSelect>
        </CInputGroup>
        

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Inicio </CInputGroupText>
          <CFormSelect v-model="reporteMes.di" :model-value="String(reporteMes.di)" @update:model-value="reporteMes.di = Number($event)" required="true">
            <option value=""></option>
            <option v-for="i = 1 in 31" :key="i" :value="i">{{ i }}</option>
          </CFormSelect><br>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Fin </CInputGroupText>
          <CFormSelect v-model="reporteMes.df" :model-value="String(reporteMes.df)" @update:model-value="reporteMes.df = Number($event)" required="true">
            <option v-for="j = 1 in 31" :key="j" :value="j">{{ j }}</option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalDias(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-file" class="me-2" />Ver Reporte
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Reporte Mensual Segmentado-->
</template>

<script>
//Importamos Componentes
import ComponenteNombres from "@/modules/egovf/components/Ciudadano/ComponenteNombres.vue";
import ComponenteObs from "@/modules/egovf-scc/components/ComponenteObs.vue";

//Importamos los Servicios
import SccService from "@/modules/egovf-scc/services/sccService";
import UploadService from "@/services/upload/uploadService";

export default {
  name: "ComponenteMSccVue",
  props: ["mscc", "empleado"],
  components: {
    ComponenteNombres,
    ComponenteObs
  },
  data() {
    return {
      titulo:'Modulo SCC',
      tabScc: 1,
      modalDetalleObs: false,
      modalBiometrico: false,
      modalHorario: false,
      modalObs: false,
      modalMes: false,
      modalDias: false,
      sccService: null,
      uploadService: null,
      listaBiometrico: [],
      listaPerfil: [],
      reporteFinal: [],
      listaObs: [],
      listaGestion: [],
      listaMes: [
        { m: "01", mes: "Enero" },
        { m: "02", mes: "Febrero" },
        { m: "03", mes: "Marzo" },
        { m: "04", mes: "Abril" },
        { m: "05", mes: "Mayo" },
        { m: "06", mes: "Junio" },
        { m: "07", mes: "Julio" },
        { m: "08", mes: "Agosto" },
        { m: "09", mes: "Septiembre" },
        { m: "10", mes: "Octubre" },
        { m: "11", mes: "Noviembre" },
        { m: "12", mes: "Diciembre" },
      ],
      listaHorarios: [],
      id_bio: 0,
      id_horario: 0,
      getPB: true,
      obsgestion: 0,
      obsmes: 1,
      archivo: "",
      tituloh:"No tiene Un horario Actual Designado ",
      reporteMes: {
        id_horario: "",
        cif: "",
        gestion: 2023,
        mes: 1,
        di: 0,
        df: 0,
        listaPerfil: [],
        persona: {
          id: null,
          _01cif: "",
          _02ci: "",
          _03complemento: "",
          _04nombre: "",
          _05paterno: "",
          _06materno: "",
          _07fecha: "",
          _08sexo: "",
          _09cel: "",
          _10correo: "",
        },
      },
      biometrico: {
        id: null,
        user_id: 0,
        nombre: "",
        cif: 0,
        estado: 0,
        horario: 0,
        lugar: "",
        id_tipo: 0,
        detalle: "",
        sexo: 0,
      },
      egovf: {
        idPersona: 0,
        nombre: "",
        paterno: "",
        materno: "",
        fecha: "",
        sexo: 0,
        idUsuario: 0,
        cif: 0,
        matricula: 0,
        ci: "",
        ci_com: 0,
        complemento: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        dependiente: "",
        sigla: "",
        foto: "",
      },
      horario: {
        cif: 0,
        fecha:"",
        salida:"",
        tipo:0,
        lem: "08:30",
        lsm: "12:30",
        let: "14:30",
        lst: "18:30",
        mem: "08:30",
        msm: "12:30",
        met: "14:30",
        mst: "18:30",
        miem: "08:30",
        mism: "12:30",
        miet: "14:30",
        mist: "18:30",
        jem: "08:30",
        jsm: "12:30",
        jet: "14:30",
        jst: "18:30",
        vem: "08:30",
        vsm: "12:30",
        vet: "14:30",
        vst: "18:30",
        sem: "08:30",
        ssm: "12:30",
        set: "14:30",
        sst: "18:30",
        dem: "08:30",
        dsm: "12:30",
        det: "14:30",
        dst: "18:30"
      },
      horarioPerfil: {
        id: 0,
        cif: this.mscc.cif,
        lem: "08:30",
        lsm: "12:30",
        let: "14:30",
        lst: "18:30",
        mem: "08:30",
        msm: "12:30",
        met: "14:30",
        mst: "18:30",
        miem: "08:30",
        mism: "12:30",
        miet: "14:30",
        mist: "18:30",
        jem: "08:30",
        jsm: "12:30",
        jet: "14:30",
        jst: "18:30",
        vem: "08:30",
        vsm: "12:30",
        vet: "14:30",
        vst: "18:30",
        sem: "08:30",
        ssm: "12:30",
        set: "14:30",
        sst: "18:30",
        dem: "08:30",
        dsm: "12:30",
        det: "14:30",
        dst: "18:30",
      },
      obs: {
        cif: null,
        uidobs: "",
        fechainicio: "",
        fechafin: "",
        detalle: "",
        imagen: "",
        tipo: "Seleccionar Tipo",
        horaEntrada: "08:30",
        horaSalida:"16:30",
        url: ""
      },
      obsDetalle: {
        id: 0,
        idObs:0,
        cif:0,
        sexo:0,
        uidobs:"",
        fechainicio:"",
        fechafin:"",
        gestion:0,
        mes:0,
        di:0,
        df:0,
        detalle:"",
        imagen:"",
        tipo:"",
        horaEntrada:"",
        hentrada:"",
        mentrada:"",
        horaSalida:"",
        hsalida:"",
        msalida:"",
        url:"",
        estado:0,
        datos: {
            cif: 0,
            nombre: "",
            apellido: "",
        },
        forma:{
            color:'',
            estado:''
        }
      },
    };
  },
  created() {
    this.uploadService = new UploadService(); //Creamos el Servicio para la Foto de perfil
    this.sccService = new SccService(); // Creamos el servicio para el Modulo Scc
  },
  mounted() {
    this.getListarCifCero(); // funcion que trae La lista de usuarios Registrados en los Biometricos
  },
  updated() {
    this.egovf = this.mscc; // pasamos el props a objeto egovf
    if (this.egovf.cif > 0 && this.getPB) {
      this.getPerfilBiometrico(); // funcion que debuelbe una lista del Usuario registrado en los biometricos
      this.getGestion(); // funcion que crea una lista de gestiones desde el 2021
      this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
    }
    this.obsDetalle.datos.cif = this.egovf.cif;
    this.obsDetalle.datos.nombre = this.egovf.nombre;
    this.obsDetalle.datos.apellido = this.egovf.paterno + " " + this.egovf.materno;
  },
  methods: {
    selectFile() {
      // Funcion que permite cambiar los datos del archivo
      this.archivo = this.$refs.file.files[0];
    },
    async getListarCifCero() {
      // funcion que trae una lista de usuarios Registrados en los Biometricos
      // revisado
      await this.sccService.getListarCifCero().then((response) => {
        this.listaBiometrico = response.data;
      });
    },
    async getPerfilBiometrico() {
      // funcion que debuelve una lista del Usuario registrado en los biometricos
      // revisado
      await this.sccService.getPerfil(this.egovf.cif).then((response) => {
        this.listaPerfil = response.data;
        if (this.listaPerfil.length > 0) {
          this.id_horario = this.listaPerfil[0].horario_id;
          this.getHorario(); // Funcion que llama el horario del usuario
        }
      });
    },
    async getHorario() {
      // Funcion que llama el horario del usuario
      // revisado
      if(this.id_horario>0){
        await this.sccService.getHorario(2025, this.egovf.cif).then((response) => {
          this.tituloh = "Horario Actual";
          this.horarioPerfil = response.data;
        });
        
      }
    },
    async getListaHorario() {
      // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
      await this.sccService.getListaHorario(this.egovf.cif, this.obsgestion).then((response) => {
          this.listaHorarios = response.data;
        });
    },
    async getObsUsuario() {
      // Funcion que llama una lista de Observaciones del usuario
      await this.sccService.getObsUsuario(this.egovf.cif, this.obsgestion, this.obsmes).then((response) => {
          this.listaObs = response.data;
        });
      if (this.listaObs.length == 0) {
        this.$swal.fire("No se encontro ninguna Observacion", "", "info");
      }
    },
    getGestion() {
      // funcion que crea una lista de gestiones desde el 2021
      // revisado
      var lgestion = [];
      const fecha = new Date();
      this.obsgestion = fecha.getFullYear();
      for (var i = 2021; i <= this.obsgestion; i++) {
        lgestion.push(i);
      }
      this.listaGestion = lgestion;
      this.reporteMes.gestion = this.obsgestion;
      this.reporteMes.mes = fecha.getMonth();
    },
    datosChange() {
      //Funcion que cambia los parametros del Biometrico para su registro
      //verificado
      this.listaBiometrico.forEach((element) => {
        if (element.id === this.id_bio) {
          this.biometrico = element;
          this.biometrico.cif = this.egovf.cif;
          this.biometrico.id_tipo = this.empleado.tipoempleado_id;
          this.biometrico.sexo = this.egovf.sexo;
        }
      });
    },
    addHorario() {
      //Funcion para registrar un Horario al Usuario
      //revisado
      this.horario.cif = this.egovf.cif;
      this.horario.fecha = this.empleado.fecha;
      this.horario.salida = this.empleado.salida;
      this.horario.tipo = this.empleado.tipoempleado_id;
      this.$swal
        .fire({
          title: "Desea Agregar el Horario de trabajo del Empleado ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.sccService.addHorario(this.horario).then((response) => {
              if (response.status == 201) {
                this.$swal.fire("Los Horarios fueron Agregados al Empleado Corectamente","","success").then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire("Los Datos no fueron Guardados Error" + response.status,"","error");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async addObs() {
      //Funcion para registrar una Observacion del Usuario
      const fromData = new FormData();
      fromData.append("archivo", this.archivo);
      try {
        //primero subimos el archivo
        await this.uploadService.addImagen(fromData).then((response) => {
          if (response.status == 200) {
            this.obs.url = this.uploadService.getUrl() + response.data.nombre;
            this.obs.imagen = response.data.nombre;
            this.obs.cif = this.egovf.cif;
            this.$swal.fire({
                title:"Desea agregar las Observaciones de Asistencia al Empleado?" +this.egovf.nombre +" " +this.egovf.paterno +" " +this.egovf.materno,
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.sccService.addObs(this.obs).then((response) => {
                    if (response.status == 201) {
                      this.$swal.fire("Las Observaciones fueron Agregados Corectamente a " +this.egovf.nombre +" " +this.egovf.paterno +" " +this.egovf.materno,"","success").then((res) => {
                          if (res) location.reload();
                        });
                    } else {
                      this.$swal.fire("Las Observaciones no fueron Guardados Error" +response.status,"","error");
                    }
                  });
                } else if (result.isDenied) {
                  this.$swal.fire("Datos Cancelados", "", "info");
                }
              });
          } else {
            this.$swal.fire("El archivo no pudo ser Guardado  ", "", "error");
          }
        });
      } catch (err) {
        this.$swal.fire("El archivo no pudo ser Guardado  " + err, "", "error");
      }
    },
    async updateObsBio(id, estado) {
      var uObs = {
        id: 0,
        cif: 0,
        idObs:0,
        horaEntrada: "",
        horaSalida: "",
        hentrada: 0,
        hsalida: 0,
        mentrada: 0,
        msalida:0,
        estado:0
      };
      this.listaObs.forEach((obs) => {
        if (obs.id == id) {
          uObs.id = obs.id;
          uObs.cif = obs.cif;
          uObs.idObs = obs.idObs;
          uObs.horaEntrada = obs.horaEntrada;
          uObs.hentrada = obs.hentrada;
          uObs.mentrada = obs.mentrada;
          uObs.horaSalida = obs.horaSalida;
          uObs.hsalida = obs.hsalida;
          uObs.msalida = obs.msalida;
          uObs.estado = estado;
          return true;
        }
      });
      await this.$swal.fire({
          title:"Desea Actualizar la Observacion de ? " +this.egovf.nombre +" " +this.egovf.paterno + " " +this.egovf.materno,
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObsBio(uObs).then((response) => {
              if (response.status == 200) {
                this.$swal.fire("Observacion Actualizada Corectamente", "", "success").then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire("Los Datos no fueron Guardados Error" + response.status,"","error");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async updateBiometrico() {
      // Funcion para registrar al usuario con un biometrico
      // verificado
      await this.$swal
        .fire({
          title:"Desea Agregar el Biometrico  al Ciudadano ? " +this.egovf.nombre +" " +this.egovf.paterno +" " +this.egovf.materno,
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateBiometrico(this.biometrico).then((response) => {
                if (response.status == 200) {
                  this.$swal.fire("Los datos del Biometrico fueron Agregados al Ciudadano Corectamente","","success").then((res) => {
                      if (res) location.reload();
                    });
                } else {
                  this.$swal.fire("Los Datos no fueron Guardados Error" + response.status,"","error");
                }
              });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    getReporteMes() {
      //Funcion que muestra los Reportes de Usuario
      this.clickModalMes(false);
      this.clickModalDias(false);
      this.reporteMes.cif = this.egovf.cif;
      if (this.reporteMes.di < 10) {
        this.reporteMes.di = "0" + this.reporteMes.di;
      }
      if (this.reporteMes.df < 10) {
        this.reporteMes.df = "0" + this.reporteMes.df;
      }
      this.$router.push({
        name: "ReporteView",
        params: {
          uri:this.reporteMes.cif +"j" +this.reporteMes.gestion +"m" +this.reporteMes.mes +"m" + this.reporteMes.di +"k" +this.reporteMes.df,
        },
      });
    },
    async estadoActibo(bio) {
      // Funcion que Activa al Usuario en el Biometrico

      await this.$swal
        .fire({
          title:
            "Desea cambiar el Estado de Biometrico al Ciudadano ? " +
            this.egovf.nombre +
            " " +
            this.egovf.paterno +
            " " +
            this.egovf.materno,
          showDenyButton: true,
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            bio._04estado = 0;
            this.sccService.estadoBiometrico(bio).then((response) => {
              if (response.status == 200) {
                this.$swal
                  .fire(
                    "Datos del Biometrico Actualizados Corectamente",
                    "",
                    "success"
                  )
                  .then((result) => {
                    if (result) location.reload();
                  });
              } else {
                this.$swal.fire(
                  "Los Datos no fueron Guardados Error" + response.status,
                  "",
                  "error"
                );
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async estadoInactibo(bio) {
      // Funcion que Desactiva al Usuario en el Biometrico
      await this.$swal
        .fire({
          title:
            "Desea cambiar el Estado de Biometrico al Ciudadano ? " +
            this.egovf.nombre +
            " " +
            this.egovf.paterno +
            " " +
            this.egovf.materno,
          showDenyButton: true,
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            bio._04estado = 1;
            this.sccService.estadoBiometrico(bio).then((response) => {
              if (response.status == 200) {
                this.$swal
                  .fire(
                    "Datos del Biometrico Actualizados Corectamente",
                    "",
                    "success"
                  )
                  .then((result) => {
                    if (result) location.reload();
                  });
              } else {
                this.$swal.fire(
                  "Los Datos no fueron Guardados Error" + response.status,
                  "",
                  "error"
                );
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    getObsDetalle(id) {
      // Funcion que Muestra el detalle de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.obsDetalle.id = obs.id;
          this.obsDetalle.cif=obs.cif;
          this.obsDetalle.idObs = obs.idObs;
          this.obsDetalle.uidobs = obs.uidobs;
          this.obsDetalle.fechainicio = obs.fechainicio;
          this.obsDetalle.fechafin = obs.fechafin;
          this.obsDetalle.detalle = obs.detalle;
          this.obsDetalle.imagen = obs.imagen;
          this.obsDetalle.tipo = obs.tipo;
          this.obsDetalle.horaEntrada = obs.horaEntrada;
          this.obsDetalle.horaSalida = obs.horaSalida;
          this.obsDetalle.url = obs.url;
          this.obsDetalle.estado = obs.estado;
          if(this.obsDetalle.estado==1){
              this.obsDetalle.forma.color='success';
              this.obsDetalle.forma.estado='Aprobado';
          }
          if(this.obsDetalle.estado==0){
              this.obsDetalle.forma.color='warning';
              this.obsDetalle.forma.estado='En Espera';
          }
          if(this.obsDetalle.estado==2){
              this.obsDetalle.forma.color='danger';
              this.obsDetalle.forma.estado='Rechazado';
          }
          return true;
        }
      });
      this.clickModalDetalleObs(true);
    },
    async downloadImg(Url, nombre) {
      // Funcion que permite Descargar imagen o documento
      const blob = await (await fetch(Url)).blob();
      const url = URL.createObjectURL(blob);
      Object.assign(document.createElement("a"), {
        href: url,
        download: nombre,
      }).click();
      URL.revokeObjectURL(url);
    },
    clicktabScc(tabH) {
      this.tabScc = tabH;
    },
    clickModalDetalleObs(Obs) {
      this.modalDetalleObs = Obs;
    },
    clickModalBiometrico(Bio) {
      this.modalBiometrico = Bio;
    },
    clickModalHorario(hor) {
      this.modalHorario = hor;
    },
    clickModalObs(cio) {
      this.modalObs = cio;
    },
    clickModalMes(rmes) {
      this.modalMes = rmes;
    },
    clickModalDias(dias) {
      this.modalDias = dias;
    },
    getTipo(){
        if(this.obs.tipo == 'Entrada M.')
            this.obs.horaEntrada = '08:30';
        if(this.obs.tipo == 'Salida M.')
            this.obs.horaSalida = '12:30';
        if(this.obs.tipo == 'Entrada T.')
            this.obs.horaEntrada = '14:30';
        if(this.obs.tipo == 'Salida T.')
            this.obs.horaSalida = '18:30';
        if(this.obs.tipo == 'continuo')
            this.obs.horaSalida = '16:30';
        if(this.obs.tipo == 'continuoingreso'){
            this.obs.horaEntrada = '08:30';
            this.obs.horaSalida = '16:30';
        }
        if(this.obs.tipo == 'asueto')
            this.obs.horaEntrada = '08:30';
    },
    mostrarHoraIngreso() {
        const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
        return tiposPermitidos.includes(this.obs.tipo);
    },
    mostrarHoraSalida() {
        const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
        return tiposPermitidos.includes(this.obs.tipo);
    }
  },
};
</script>
<style scoped>

CBadge {
  padding: 6px 10px;
  font-size: 0.9rem;
}
.datos{
    font-size: 12px;
}
</style>
