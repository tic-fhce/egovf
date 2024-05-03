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
                                        <CDropdownItem><CButton @click="clickModalImpresora(true)" size="sm">Agregar Impresora</CButton></CDropdownItem>
                                        <CDropdownDivider/>
                                        <CDropdownItem><CButton @click="clickModalTelefono(true)" size="sm">Agregar Telefono</CButton></CDropdownItem>
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
                                                <th>ID</th><th>Codigo</th><th>Caracteristicas</th><th>Red</th><th>Datos Actividad</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cpu in listaCpu" :key="cpu.idPc">
                                                <td>{{ cpu.idPc }}</td>
                                                <td>{{cpu.codigo}}</td>
                                                <td>
                                                    Sistema : {{ cpu.sistema }} <br>
                                                    RAM : {{cpu.capacidad}} - {{ cpu.memorias }}<br>
                                                    Micro Procesador : {{ cpu.micro }} de {{ cpu.micro_capacidad }}<br>
                                                    Capasidad Disco : {{ cpu.disco }}<br>
                                                    Tipo : {{ cpu.detalle }}<br>
                                                    Fuente Pw : {{cpu.fuente  }}<br>
                                                    Cortapico : {{ cpu.cortapico }} 
                                                </td>
                                                <td>
                                                    Ip : {{ cpu.ip }}<br>
                                                    Mascara : {{ cpu.dns }}<br>
                                                    Segmento : {{ cpu.segmento }}<br>
                                                    Mac : {{ cpu.mac }}<br>
                                                    Switch : {{cpu.swit}}<br>
                                                    Puerto : {{ cpu.puerto }}<br>
                                                    Vlan : {{ cpu.vlan }} 
                                                </td>
                                                <td>
                                                    Fehca de Adicion : {{ cpu.fecha_add }}<br>Fecha de Traspaso : {{ cpu.fecha_del }}<br>Estado : <CBadge color="success" v-if="cpu.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge>
                                                </td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="warning" class="font" size="sm" @click="getCpu(cpu.idPc)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup>  
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
                                                <th>ID</th><th>Codigo</th><th>Datos Monitor</th><th>Datos Actividad</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="monitor in listaMonitor" :key="monitor.idMonitor">
                                                <td>{{ monitor.idMonitor }}</td>
                                                <td>{{ monitor.codigo }}</td>
                                                <td>Marca : {{ monitor.marca }}<br>Pulgadas : {{ monitor.pulgadas }}<br> Tipo : {{ monitor.tipo }}</td>
                                                <td>Fehca de Adicion : {{ monitor.fecha_add }}<br>Fecha de Traspaso : {{ monitor.fecha_del }}<br>Estado : <CBadge color="success" v-if="monitor.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="warning" class="font" size="sm" @click="getMonitor(monitor.idMonitor)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Monitores del Empleado-->

                        <!--Lista de Impresoras del Empleado-->
                        <CTabPane :visible="tabInv == 3">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Datos Impresora</th><th>Datos Actividad</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="impresora in listaImpresora" :key="impresora.idImpresora">
                                                <td>{{ impresora.idImpresora }}</td>
                                                <td>{{ impresora.codigo }}</td>
                                                <td>Marca : {{ impresora.marca }}<br>Modelo : {{ impresora.modelo }}<br>Detalle : {{ impresora.detalle }}</td>
                                                <td>Fehca de Adicion : {{ impresora.fecha_add }}<br>Fecha de Traspaso : {{ impresora.fecha_del }}<br>Estado : <CBadge color="success" v-if="impresora.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="warning" class="font" size="sm" @click="getImpresora(impresora.idImpresora)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Impresoras del Empleado-->

                        <!--Lista de Telefono del Empleado-->
                        <CTabPane :visible="tabInv == 4">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Codigo</th><th>Datos Telefono</th><th>Datos Actividad</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="telefono in listaTelefono" :key="telefono.idTelefono">
                                                <td>{{ telefono.idTelefono }}</td>
                                                <td>{{ telefono.codigo }}</td>
                                                <td>Marca : {{ telefono.marca }}<br>Ip : {{ telefono.ip }}<br>Interno : {{ telefono.interno }}</td>
                                                <td>Fehca de Adicion : {{ telefono.fecha_add }}<br>Fecha de Traspaso : {{ telefono.fecha_del }}<br>Estado : <CBadge color="success" v-if="telefono.estado == 1">Activo</CBadge><CBadge color="danger" v-else>Inactivo</CBadge></td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="warning" class="font" size="sm" @click="getTelefono(telefono.idTelefono)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                </CCol>
                            </CRow>
                        </CTabPane>
                        <!--End Lista de Telefonos del Empleado-->
                        
                        <!--Lista de Ubicaciones del Empleado-->
                        <CTabPane :visible="tabInv == 5">
                            <CRow>
                                <CCol :lg="12">
                                    <br>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Ambiente</th><th>Ubicaion</th><th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ubicacion in listaUbicacion" :key="ubicacion.id">
                                                <td>{{ ubicacion.id }}</td>
                                                <td>{{ ubicacion._02ambiente }}</td>
                                                <td>Latitud: {{ ubicacion._03latitud }}<br>Longitud: {{ ubicacion._04longitud }}</td>
                                                <td>
                                                    <CButtonGroup role="group">
                                                        <CButton color="warning" class="font" size="sm" @click="getUbicacion(ubicacion.id)"><CIcon icon="cil-pencil"></CIcon></CButton>
                                                    </CButtonGroup>
                                                </td>
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
        <form @submit.prevent="addUbicacion()">
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
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Ubicacion</button>
                </div>
            </div>

        </form>
        
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalUbicacion(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
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
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="fuente" class="col-4 col-form-label">Fuente de Pw</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.fuente" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="memoria" class="col-4 col-form-label">Memoria RAM</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.memoria" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.capacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="micro" class="col-4 col-form-label">Micro Procesador</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.micro" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpu.microcapacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="disco" class="col-4 col-form-label">Disco</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.disco" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="sistema" class="col-4 col-form-label">Sistema Operativo</label>
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
                <label for="ip" class="col-4 col-form-label">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.ip" required="true" placeholder="192.168.0.2" >
                </div>
            </div>

            <div class="mb-3 row">
                <label for="mascara" class="col-4 col-form-label">Mascara</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.mascara" required="true" placeholder="255.255.255.0">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="segmento" class="col-4 col-form-label">Segmento</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.segmento" required="true" placeholder="192.168.0.1">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="mac" class="col-4 col-form-label">MAC</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpu.mac" required="true" placeholder="ab:cd:ef:gh:12">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="cortapico" class="col-4 col-form-label">Cortapico</label>
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
                <label for="detalle" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpu.detalle" required="true">
                        <option value="PC">PC</option>
                        <option value="Laptop">Laptop</option>
                        <option value="OnlyOne">OnlyOne</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
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

<!-- Modal Impresora-->
<CModal :visible="modalImpresora" @close="clickModalImpresora(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalImpresora(false)">
        <CModalTitle>
            <h5>Agregar Impresora</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="addImpresora()">
            <div class="mb-3 row">
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresora.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="marca" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresora.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="modelo" class="col-4 col-form-label">Modelo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresora.modelo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="detalle" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresora.detalle" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="impresora.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Impresora</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalImpresora(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Impresora-->

<!-- Modal Telefono-->
<CModal :visible="modalTelefono" @close="clickModalTelefono(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalTelefono(false)">
        <CModalTitle>
            <h5>Agregar Telefono</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="addTelefono()">
            <div class="mb-3 row">
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefono.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="marca" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefono.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4 col-form-label">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefono.ip" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="interno" class="col-4 col-form-label">Numero Interno</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefono.interno" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="telefono.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Telefono</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalTelefono(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Telefono-->

<!--Seccion de Updates $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$-->

<!-- Modal  CPU Update-->
<CModal :visible="modalCPUUpdate" @close="clickModalCPUUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalCPUUpdate(false)">
        <CModalTitle>
            <h5>Actualizar datos del CPU</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>

        <form @submit.prevent="updateCPU()">
            
            <div class="mb-3 row">
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="fuente" class="col-4 col-form-label">Fuente de Pw</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.fuente" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="memoria" class="col-4 col-form-label">Memoria RAM</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.memoria" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.capacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="micro" class="col-4 col-form-label">Micro Procesador</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.micro" required="true">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.microcapacidad" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="disco" class="col-4 col-form-label">Disco</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.disco" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="sistema" class="col-4 col-form-label">Sistema Operativo</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpuUpdate.sistema" required="true">
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
                <label for="ip" class="col-4 col-form-label">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.ip" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="mascara" class="col-4 col-form-label">Mascara</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.mascara" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="segmento" class="col-4 col-form-label">Segmento</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.segmento" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="mac" class="col-4 col-form-label">MAC</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.mac" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="cortapico" class="col-4 col-form-label">Cortapico</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpuUpdate.cortapico" required="true">
                        <option value="Buen Estado">Buen Estado</option>
                        <option value="Mal Estado">Mal Estado</option>
                        <option value="Regular">Regular</option>
                        <option value="No tiene">No tiene</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="detalle" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpuUpdate.detalle" required="true">
                        <option value="PC">PC</option>
                        <option value="Laptop">Laptop</option>
                        <option value="OnlyOne">OnlyOne</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="cpuUpdate.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="switch" class="col-4 col-form-label">Switch</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="cpuUpdate.switch" required="true" placeholder="Switch">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="coneccion" class="col-4 col-form-label">Coneccion</label>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.puerto" required="true" placeholder="Puerto">
                </div>
                <div class="col-4">
                    <input type="text" class="form-control" v-model="cpuUpdate.vlan" required="true" placeholder="Vlan">
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar CPU</button>
                </div>
            </div>

        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalCPUUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  CPU Update-->

<!-- Modal Monitor Update-->
<CModal :visible="modalMonitorUpdate" @close="clickModalMonitorUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalMonitorUpdate(false)">
        <CModalTitle>
            <h5>Actualizar Datos del Monitor</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="updateMonitor()">
            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitorUpdate.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitorUpdate.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Pulgadas</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitorUpdate.pulgadas" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Tipo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="monitorUpdate.tipo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="monitorUpdate.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Monitor</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalMonitorUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Monitor Update -->


<!-- Modal Impresora Update-->
<CModal :visible="modalImpresoraUpdate" @close="clickModalImpresoraUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalImpresoraUpdate(false)">
        <CModalTitle>
            <h5>Actualizar datos de la Impresora</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="updateImpresora()">
            <div class="mb-3 row">
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresoraUpdate.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="marca" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresoraUpdate.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="modelo" class="col-4 col-form-label">Modelo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresoraUpdate.modelo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="detalle" class="col-4 col-form-label">Detalle</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="impresoraUpdate.detalle" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="impresoraUpdate.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Impresora</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalImpresoraUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Impresora Update-->

<!-- Modal Telefono Update-->
<CModal :visible="modalTelefonoUpdate" @close="clickModalTelefonoUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalTelefonoUpdate(false)">
        <CModalTitle>
            <h5>Actualizar Datos del Telefono</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="updateTelefono()">
            <div class="mb-3 row">
                <label for="codigo" class="col-4 col-form-label">Codigo</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefonoUpdate.codigo" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="marca" class="col-4 col-form-label">Marca</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefonoUpdate.marca" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ip" class="col-4 col-form-label">IP</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefonoUpdate.ip" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="interno" class="col-4 col-form-label">Numero Interno</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="telefonoUpdate.interno" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-4 col-form-label">Ubicacion</label>
                <div class="col-8">
                    <select class="form-control" v-model="telefonoUpdate.ubicacion" required="true">
                        <option v-for="ubicacion in listaUbicacion" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion._02ambiente }}</option>
                    </select>
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Telefono</button>
                </div>
            </div>
        </form>
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalTelefonoUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- End Modal Telefono-->

<!-- Modal  Ubicacion Update-->
<CModal :visible="modalUbicacionUpdate" @close="clickModalUbicacionUpdate(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalUbicacionUpdate(false)">
        <CModalTitle>
            <h5>Actualizar datos de la Ubicacion</h5>
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        <ComponenteNombres :datos="datos"/>
        <hr>
        <form @submit.prevent="updateUbicacion()">
            <div class="mb-3 row">
                <label for="ambiente" class="col-4 col-form-label">Ambiente</label>
                <div class="col-8">
                    <input type="text" class="form-control" v-model="ubicacionUpdate.ambiente" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-sm-4 col-form-label">Latitud</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="ubicacionUpdate.latitud" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="ubicacion" class="col-sm-4 col-form-label">Longitud</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="ubicacionUpdate.longitud" required="true">
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <div class="col-sm-12 ">
                    <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Actualizar Ubicacion</button>
                </div>
            </div>
        </form>
        
    </CModalBody>
    <CModalFooter>
        <CButton @click="clickModalUbicacionUpdate(false)" color="danger" class="font"><CIcon icon="cil-x" class="me-2"/>Cancelar</CButton>
    </CModalFooter>
</CModal>
<!-- END Modal  Ubicacion Update-->

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
            modalUbicacion:false,
            modalCPU:false,
            modalMonitor:false,
            modalImpresora:false,
            modalTelefono:false,

            modalUbicacionUpdate:false,
            modalCPUUpdate:false,
            modalMonitorUpdate:false,
            modalImpresoraUpdate:false,
            modalTelefonoUpdate:false,

            uploadService:null,
            inventarioService:null,
            listaUbicacion:[],
            listaCpu:[],
            listaMonitor:[],
            listaImpresora:[],
            listaTelefono:[],
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
            ubicacionUpdate:{
                id:0,
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
            cpuUpdate:{
                id:0,
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
            },
            monitorUpdate:{
                id:0,
                cif:0,
                codigo:0,
                marca:'',
                pulgadas:'',
                tipo:'',
                ubicacion:0
            },
            impresora:{
                cif:0,
                codigo:0,
                marca:'',
                modelo:'',
                detalle:'',
                ubicacion:0
            },
            impresoraUpdate:{
                id:0,
                cif:0,
                codigo:0,
                marca:'',
                modelo:'',
                detalle:'',
                ubicacion:0
            },
            telefono:{
                cif:0,
                codigo:0,
                marca:'',
                ip:'',
                interno:'',
                ubicacion:0
            },
            telefonoUpdate:{
                id:0,
                cif:0,
                codigo:0,
                marca:'',
                ip:'',
                interno:'',
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
            this.getImpresoraCif();
            this.getTelefonoCif();
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
        getUbicacion(id){
            this.listaUbicacion.forEach(ubicacion => {
                if(ubicacion.id == id){
                    this.ubicacionUpdate.id = ubicacion.id;
                    this.ubicacionUpdate.cif = ubicacion._01cif;
                    this.ubicacionUpdate.ambiente = ubicacion._02ambiente;
                    this.ubicacionUpdate.latitud = ubicacion._03latitud;
                    this.ubicacionUpdate.longitud = ubicacion._04longitud;
                }
            });
            this.clickModalUbicacionUpdate(true);
        },
        async updateUbicacion(){// funcion para actualizar la ubicacion de un Empleado
            await this.$swal.fire({
                title: 'Desea Actualizar la Ubicacion Correspondiente Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateUbicacion(this.ubicacionUpdate).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Ubicacion Fue Actualizada Corectamente a '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getCpuCif(){// funcion que trae una lista de cpus del empleado
            await this.inventarioService.getCpuCif(this.egovf.cif).then(response => {
                this.listaCpu = response.data;
            });
        },
        getCpu(id){//funcion que permite obtener los datos de la lista de Cpus'
            this.listaCpu.forEach(cpu => {
                if(cpu.idPc == id){
                    this.cpuUpdate.id = cpu.idPc;
                    this.cpuUpdate.cif = cpu.cif;
                    this.cpuUpdate.codigo = cpu.codigo;
                    this.cpuUpdate.fuente = cpu.fuente;
                    this.cpuUpdate.memoria = cpu.memorias;
                    this.cpuUpdate.capacidad = cpu.capacidad;
                    this.cpuUpdate.micro = cpu.micro;
                    this.cpuUpdate.microcapacidad = cpu.micro_capacidad;
                    this.cpuUpdate.sistema = cpu.sistema;
                    this.cpuUpdate.disco = cpu.disco;
                    this.cpuUpdate.ip = cpu.ip;
                    this.cpuUpdate.mac = cpu.mac;
                    this.cpuUpdate.mascara = cpu.dns;
                    this.cpuUpdate.segmento = cpu.segmento;
                    this.cpuUpdate.cortapico = cpu.cortapico;
                    this.cpuUpdate.detalle = cpu.detalle;
                    this.cpuUpdate.switch = cpu.swit;
                    this.cpuUpdate.puerto = cpu.puerto;
                    this.cpuUpdate.vlan = cpu.vlan;
                    this.cpuUpdate.ubicacion = cpu.idubicacion;
                    
                }
            });
            this.clickModalCPUUpdate(true);
        },
        async updateCPU(){// funcion para actualizar el cpu del empleado
            await this.$swal.fire({
                title: 'Desea Actualizar la CPU del empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateCpu(this.cpuUpdate).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El CPU fue Actualizado Correctamente '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getMonitorCif(){// funcion que trae una lista de Monitores
            await this.inventarioService.getMonitorCif(this.egovf.cif).then(response => {
                this.listaMonitor = response.data;
            });
        },
        getMonitor(id){
            this.listaMonitor.forEach(monitor => {
                if(monitor.idMonitor == id){
                    this.monitorUpdate.id = monitor.idMonitor;
                    this.monitorUpdate.cif = monitor.cif;
                    this.monitorUpdate.codigo = monitor.codigo;
                    this.monitorUpdate.marca = monitor.marca;
                    this.monitorUpdate.pulgadas = monitor.pulgadas;
                    this.monitorUpdate.tipo = monitor.tipo;
                    this.monitorUpdate.ubicacion = monitor.idubicacion;
                }
            });
            this.clickModalMonitorUpdate(true);
        },
        async updateMonitor(){// funcion para actualizar un monitor al empleado
            await this.$swal.fire({
                title: 'Desea Actualizar el Monitor del empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateMonitor(this.monitorUpdate).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El Monitor fue Actualizado Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async addImpresora(){// funcion para agregar un monitor al empleado
            this.impresora.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea Agregar la Impresora Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addImpresora(this.impresora).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Impresora fue Agregada Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getImpresoraCif(){
            await this.inventarioService.getImpresoraCif(this.egovf.cif).then(response => {
                this.listaImpresora = response.data;
            });
        },
        getImpresora(id){
            this.listaImpresora.forEach(impresora => {
                if(impresora.idImpresora == id){
                    this.impresoraUpdate.id = impresora.idImpresora;
                    this.impresoraUpdate.cif = impresora.cif;
                    this.impresoraUpdate.codigo = impresora.codigo;
                    this.impresoraUpdate.marca = impresora.marca;
                    this.impresoraUpdate.modelo = impresora.modelo;
                    this.impresoraUpdate.detalle = impresora.detalle;
                    this.impresoraUpdate.ubicacion = impresora.idubicacion;
                }
            });
            this.clickModalImpresoraUpdate(true);
        },
        async updateImpresora(){// funcion para actualizar los datos de la Impresora
            await this.$swal.fire({
                title: 'Desea Actualizar los datos de Impresora Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateImpresora(this.impresoraUpdate).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('La Impresora fue Aactualizada Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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

        //Servicios para Telefono
        async addTelefono(){// funcion para agregar un monitor al empleado
            this.telefono.cif = this.egovf.cif;
            await this.$swal.fire({
                title: 'Desea Agregar el Telefono Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.addTelefono(this.telefono).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El Telefono fue Agregado Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async updateTelefono(){// funcion para Actualizar los datos del telefono del empleado
            await this.$swal.fire({
                title: 'Desea Actualizar los datos del Telefono Al empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                icon:'info',
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.inventarioService.updateTelefono(this.telefonoUpdate).then(response =>{
                        if(response.status == 200){
                            this.$swal.fire('El Telefono fue Actualizado Correctamente al Empleado '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno ,'', 'success').then((res)=>{
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
        async getTelefonoCif(){
            await this.inventarioService.getTelefonoCif(this.egovf.cif).then(response => {
                this.listaTelefono = response.data;
            });
        },
        getTelefono(id){
            this.listaTelefono.forEach(telefono => {
                if(telefono.idTelefono == id){
                    this.telefonoUpdate.id = telefono.idTelefono;
                    this.telefonoUpdate.cif = telefono.cif;
                    this.telefonoUpdate.codigo = telefono.codigo;
                    this.telefonoUpdate.marca = telefono.marca;
                    this.telefonoUpdate.ip = telefono.ip;
                    this.telefonoUpdate.interno = telefono.interno;
                    this.telefonoUpdate.ubicacion = telefono.idubicacion;
                }
            });
            this.clickModalTelefonoUpdate(true);
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
        clickModalImpresora(impresora){
            this.modalImpresora = impresora;
        },
        clickModalTelefono(telefono){
            this.modalTelefono = telefono;
        },

        clickModalUbicacionUpdate(Bio){
            this.modalUbicacionUpdate = Bio;
        },
        clickModalCPUUpdate(cpu){
            this.modalCPUUpdate = cpu;
        },
        clickModalMonitorUpdate(monitor){
            this.modalMonitorUpdate = monitor;
        },
        clickModalImpresoraUpdate(impresora){
            this.modalImpresoraUpdate = impresora;
        },
        clickModalTelefonoUpdate(telefono){
            this.modalTelefonoUpdate = telefono;
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
