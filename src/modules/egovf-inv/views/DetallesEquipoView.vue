<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb custom-breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/inventario" class="breadcrumb-link">Inventario</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
      
      <router-link to="/tipoEquipos" class="breadcrumb-link">Tipos de Equipos</router-link>
    </li>
        <li class="breadcrumb-item active" aria-current="page">
          <label @click="getLista(equipo.idTipo)"  class="breadcrumb-link">{{ titulo }}</label>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ nombre }} >
        </li>
      </ol>
    </nav>
    <CContainer class="mt-4">
    <h2>{{ nombre }} - {{ titulo }}</h2>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('equipo')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>

            <CIcon icon="cil-laptop" class="me-2" />
            <label>Equipo</label>
        </div>
        <CIcon :icon="isExpanded.equipo ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.equipo">

       
        <CCardBody class="card-principal">
          <div class="data-card">
            <div class="data-item-principal">
              <CIcon icon="cil-barcode" class="me-2" />
              <strong>Código:</strong>
              <span>{{ equipo.codigo }}</span>
            </div>
            <div class="data-item-principal">
              <CIcon icon="cil-code" class="me-2" />
              <strong>Serial:</strong>
              <span>{{ equipo.macSerie }}</span>
            </div>
            <div class="data-item-principal">
              <CIcon icon="cil-memory" class="me-2" />
              <strong>Marca:</strong>
              <span>{{ equipo.marca }}</span>
            </div>
            <div class="data-item-principal">
              <CIcon icon="cil-laptop" class="me-2" />
              <strong>Modelo:</strong>
              <span>{{ equipo.modelo }}</span>
            </div>
            <div class="data-item-principal">
              <CIcon icon="cil-tag" class="me-2" />
              <strong>Tipo:</strong>
              <span>{{ equipo.tipoNombre }}</span>
            </div>
            <div class="data-item-principal">
              <CIcon icon="cil-notes" class="me-2" />
              <strong>Detalle:</strong>
              <span>{{ equipo.detalle }}</span>
            </div>
          </div>
        </CCardBody >
        <CCardFooter class="card-principal">
          <CButton class="botoncito" @click="() => { verEditarEquipo = true }">Editar Equipo</CButton>
        </CCardFooter>
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('persona')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>
          <CIcon icon="cil-people" class="me-2" />
          <label>Propietario</label>
        </div>
        <CIcon :icon="isExpanded.persona ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.persona">
        <CCardBody>
          <div v-if="persona">
            
          <div class="data-card">
            <div class="data-item">
              <CIcon icon="cil-user" class="me-2" />
              <strong>CIF:</strong>
              <span>{{ persona.cif }}</span>
            </div>
            <div class="data-item">
              <CIcon icon="cil-barcode" class="me-2" />
              <strong>CI:</strong>
              <span>{{ persona.ci }} {{ persona.complemento }}</span>
            </div>
            <div class="data-item">
              <CIcon icon="cil-contact" class="me-2" />
              <strong>Nombre completo:</strong>
              <span>{{ persona.nombre }} {{ persona.paterno }} {{ persona.materno }}</span>
            </div>
            <div class="data-item">
              <CIcon icon="cil-phone" class="me-2" />
              <strong>Celular:</strong>
              <span>{{ persona.cel }}</span>
            </div>
            <div class="data-item">
              <CIcon icon="cil-envelope-open" class="me-2" />
              <strong>Correo:</strong>
              <span>{{ persona.correo }}</span>
            </div>
          </div>
          </div>
          <p v-else class="text-muted">No se encontró al propietario con cif: {{pertenece[pertenece.length - 1]?.cif }}<br> Modifique la Asignación</p>
        </CCardBody>
        
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('pertenece')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>
            <CIcon icon="cil-sign-language" class="me-2" />
            <label>Asignación</label>
        </div>
        <CIcon :icon="isExpanded.pertenece ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.pertenece">
        <CCardBody>

          <div v-if="pertenece.length > 0" style="display: flex; flex-direction: column; gap: 10px;">
            
              <div class="location-card mb-3 p-3">
                  <div class="data-card">
                      <div class="data-item">
                          <CIcon icon="cil-sign-language" class="me-2" style="color: #04bcd4;" />
                          <strong>ID Asignación:</strong>
                          <span>{{ pertenece[pertenece.length - 1].idPertenece }}</span>
                      </div>

                      <div class="data-item">
                          <CIcon icon="cil-account-logout" class="me-2" style="color: #04bcd4;" />
                          <strong>CIF:</strong>
                          <span>{{ pertenece[pertenece.length - 1].cif }}</span>
                      </div>
                      <div class="data-item">
                  <CIcon icon="cil-laptop" class="me-2" style="color: #04bcd4;" />
                  <strong>ID Equipo:</strong>
                  <span>{{ pertenece[pertenece.length - 1].idEquipo }}</span>
                  </div>
                  <div class="data-item">
                  <CIcon icon="cil-calendar" class="me-2" style="color: #04bcd4;" />
                  <strong>Fecha de asignación:</strong>
                  <span>{{ pertenece[pertenece.length - 1].fechaAdd }}</span>
                  </div>
                  <div class="data-item">
                  <CIcon icon="cil-calendar-check" class="me-2" style="color: #04bcd4;" />
                  <strong>Fecha devuelto:</strong>
                  <span v-if="pertenece[pertenece.length - 1].fechaDel != pertenece[pertenece.length-1].fechaAdd">
                    {{ pertenece[pertenece.length - 1].fechaDel }}</span>
                  <span v-else style="color:green">No devuelto</span>
                  </div>
                  <div class="data-item">
                  <CIcon icon="cil-check-circle" class="me-2" style="color: #04bcd4;" />
                  <strong>Estado:</strong>
                  <span :class="{
                      'text-success': pertenece[pertenece.length - 1].estado === 'Activo',
                      'text-danger': pertenece[pertenece.length - 1].estado === 'Devuelto',
                      'text-info': pertenece[pertenece.length - 1].estado === 'En préstamo'
                  }">{{ pertenece[pertenece.length - 1].estado }}</span>

                  <CButton color="info" variant="ghost" @click="() => { verAsignacion = true }">Editar Estado</CButton>
                  </div>
              </div>
            </div>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevaAsignacion()">Registrar Asignación</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Asignaciones()">Historial Asignaciónes</CButton>
            <!-- <CButton class="botoncito" @click="() => { verAsignacion = true }">Registrar Asignación</CButton> -->
          </div>
          <div v-else class="text-muted" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
            <p>
              sin asignaciones registradas.
            </p>

            <CButton class="botoncito" @click="nuevaAsignacion()">Registrar Asignación</CButton>
          </div>        
        </CCardBody>
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('atenciones')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>

<CIcon icon="cil-bell" class="me-2" />
        <strong>Historial de Solicitudes</strong>
        </div>
        <CIcon :icon="isExpanded.atenciones ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.atenciones">
        <CCardBody>
          <div v-if="listaAtenciones.length > 0">
            <div v-for="(solicitud, index) in listaAtenciones" :key="index" :class="[solicitud.estado == 0 ? 'atencion-card' : 'solicitud-card']" class="mb-3 p-3 border-left">
          
          <div class="data-item">
            <CIcon icon="cil-user" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>ID Solicitud:</strong>
            <span>{{ solicitud.idSolicitud }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-calendar" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Fecha Solicitud:</strong>
            <span>{{ solicitud.fechaSolicitud }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-clock" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Hora Solicitud:</strong>
            <span>{{ solicitud.horaSolicitud }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Especificacion:</strong>
            <span>{{ solicitud.especificacion }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-bug" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Error:</strong>
            <span>{{ solicitud.error }}</span>
          </div>
          
          <div class="data-item">
            <CIcon icon="cil-check-circle" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Estado:</strong>
            <span :class="solicitud.estado == 0 ? 'text-danger' : 'text-success'">
            {{ solicitud.estado == 0 ? 'Sin atender' : 'Atendida' }}
            </span>
          </div>
    
          <div v-if="solicitud.idAtencion != null" style="margin-left: 10px;">
          <h5 :style="[{ 'color': solicitud.estado == 0 ? 'red' : 'yellow', 'font-weight': 'bold' }]" >Detalles de la Atención: </h5>
          <div class="data-item">
            <CIcon icon="cil-sign-language" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>ID Atención:</strong>
            <span>{{ solicitud.idAtencion }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Solución:</strong>
            <span>{{ solicitud.solucion }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-calendar" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Fecha Atención:</strong>
            <span>{{ solicitud.fechaAtencion }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-clock" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Hora Atención:</strong>
            <span>{{ solicitud.horaAtencion }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-notes" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Observaciones:</strong>
            <span>{{ solicitud.observaciones }}</span>
          </div>
          <div class="data-item">
            <CIcon icon="cil-location-pin" class="me-2" :style="[{'color': solicitud.estado == 0 ? 'red' : 'yellow'}]" />
            <strong>Ubicación Actual:</strong>
            <span>{{ solicitud.ubicacionActual }}</span>
          </div>
          </div>
          <div v-else>
          <CButton color="danger" style="width: 100%;" variant="ghost" @click="atenderSolicitud(solicitud.idSolicitud)">Atender</CButton>
          </div>
    
        </div>
        <CButton class="botoncito" @click="nuevaSolicitud()">Registrar Solicitud</CButton>
    
          </div>
          <div v-else class="text-muted" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
            <p>
              No hay solicitudes de atención realizadas.
            </p>
            <CButton class="botoncito" @click="nuevaSolicitud()">Registrar Solicitud</CButton>

          </div>
        </CCardBody>
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('ubicaciones')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>

<CIcon icon="cil-location-pin" class="me-2" />
<strong>Ubicaciones</strong>
</div>
<CIcon :icon="isExpanded.ubicaciones ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.ubicaciones">
        <CCardBody >
    <div v-if="listaUbicaciones.idUbicacion != null" style="display: flex; flex-direction: column; gap: 10px;">


            <div class="ubicacion-card mb-3 p-3">
              
              <div class="data-item">

                <CIcon icon="cil-map" size="lg" class="me-2" style="color:green"/>
                <strong class="mb-0">Ambiente:</strong>
                <span> {{ listaUbicaciones.ambiente }}</span>
              </div>

              <div class="data-item">
                <CIcon icon="cil-calendar" size="lg" class="me-2" style="color:green"/>
                <strong>Fecha:</strong>
                <span> {{ listaUbicaciones.fecha }}</span>
              </div>
              
              <div class="data-item">
                <CIcon icon="cil-check-circle" size="lg" class="me-2" style="color:green"/>
                <strong>Estado:</strong>
                <span :class="{
                      'text-success': listaUbicaciones.estado === 1,
                      'text-danger': listaUbicaciones.estado === 0
                  }"> {{listaUbicaciones.estado == 1 ? 'Activo' : 'Inactivo'}} </span>

              <CButton color="success" variant="ghost" @click="() => { verUbicacion = true }">Desactivar Ubicación</CButton>

              </div>

              <div class="data-item">
                <CIcon icon="cil-location-pin" size="lg" class="me-2" style="color:green"/>
                <strong>Ubicación GPS:</strong>
                <span> {{ listaUbicaciones.latitud }}, {{ listaUbicaciones.longitud }}</span>
              </div>

            </div>

            <CButton class="botoncito" color="info" variant="ghost" @click="nuevaUbicacion()">Registrar Ubicación</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Ubicaciones()">Historial Ubicaciones</CButton>
    </div>
    <div v-else class="text-muted" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; gap: 10px;">
            <p>
              Sin ubicación activa.
            </p>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevaUbicacion()">Registrar Ubicación</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Ubicaciones()">Historial Ubicaciones</CButton>

          </div>  </CCardBody>
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('redes')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>
            <CIcon icon="cil-router" class="me-2" />
            <strong>Datos de Red</strong>
        </div>
        <CIcon :icon="isExpanded.redes ? 'cil-chevron-bottom' : 'cil-chevron-right'" />

      </CCardHeader>
      <CCollapse :visible="isExpanded.redes">
        <CCardBody>
          <div v-if="Red.idRed != null" style="display: flex; flex-direction: column; gap: 10px;">
            <div class="network-card mb-3 p-3">


              <div class="data-item">
                <CIcon icon="cil-barcode" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>ID Red:</strong>
                <span>{{ Red.idRed }}</span>
              </div>
              
              <div class="data-item">
                <CIcon icon="cil-router"  class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong class="mb-0">IP:</strong>
                <span> {{ Red.ip }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-lan" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>Segmento:</strong>
                <span>{{ Red.segmento }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-globe-alt" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>DNS:</strong>
                <span>{{ Red.dns }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-lan" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>VLAN:</strong>
                <span>{{ Red.vlan }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-router" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>Switch:</strong>
                <span>{{ Red.switchRed }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-memory" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>Puerto:</strong>
                <span>{{ Red.puerto }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-clock" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>Registro:</strong>
                <span>{{ Red.fechaRegistro }}</span>
              </div>
              <div class="data-item">
                <CIcon icon="cil-check-circle" class="me-2" :style="{'--ci-primary-color': 'blue'}"/>
                <strong>Estado:</strong>
                <span :class="{
                  'text-primary': Red.estado === 1,
                  'text-danger': Red.estado === 0
                }">{{ Red.estado === 1 ? 'Activo' : 'Inactivo' }}</span>
                <CButton color="primary" variant="ghost" @click="() => { verRed = true }">Desactivar Red</CButton>
              </div>
            </div>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevaRed()">Registrar Red</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Redes()">Historial de Red</CButton>
          </div>
          <div v-else class="text-muted" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; gap:10px">
            <p>
              Sin datos de red registrados.
            </p>
            <CButton class="botoncito" color="info" variant="ghost" @click="Redes()">Historial de Red</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevaRed()">Registrar Red</CButton>

          </div>
        </CCardBody>
      </CCollapse>
    </CCard>


    <CCard class="mb-3">
      <CCardHeader @click="toggleAccordion('software')" class="bg text-white d-flex justify-content-between align-items-center" style="cursor: pointer;">
        <div>
          <CIcon icon="cib-microsoft" class="me-2" />
          <strong>Software Instalado</strong>
        </div>
        <CIcon :icon="isExpanded.software ? 'cil-chevron-bottom' : 'cil-chevron-right'" />
      </CCardHeader>
      <CCollapse :visible="isExpanded.software">
        <CCardBody>
          <div v-if="listaSoftware.length > 0" style="display: flex; flex-direction: column; gap: 10px;">

            <div class="software-card mb-3 p-3">
              


            </div>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevoSoftware()">Registrar Software</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Software()">Historial de Software</CButton>

            
          </div>
          <div v-else class="text-muted" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
            <p>
              Sin software instalado registrado.
            </p>
            <CButton class="botoncito" color="info" variant="ghost" @click="nuevoSoftware()">Registrar Software</CButton>
            <CButton class="botoncito" color="info" variant="ghost" @click="Software()">Historial de Software</CButton>
          </div>        
          </CCardBody>
      </CCollapse>
    </CCard>
  </CContainer>

  <CModal
    scrollable
    :visible="verAsignacion"
    @close="() => { verAsignacion = false }"
    aria-labelledby="añadir-asignacion"
  >
    <CModalHeader style="background-color: #007bff; color: white;">
      <CModalTitle id="añadir-asignacion">Añadir registro de Asignación</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <c-form @submit.prevent="submitPertenece(pertenece[pertenece.length -1].idPertenece)">
  
      <div class="mb-3">
        <label class=""><strong>Cif: </strong></label>
        <br>
        <label>{{ pertenece[pertenece.length -1].cif }}</label>
      </div>

  
  
      <div class="mb-3">
        <strong>Estado:</strong>
        <c-form-select v-model="formDataPertenece.estado" required>
          <option value="Activo">Activo</option>
          <option value="Devuelto">Devuelto</option>
          <option value="En préstamo">En préstamo</option>
        </c-form-select>
      </div>


      <c-button type="submit" color="info" variant="ghost">Guardar</c-button>
    </c-form>
    </CModalBody>
  </CModal>
  <CModal
    scrollable
    :visible="verUbicacion"
    @close="() => { verUbicacion = false }"
    aria-labelledby="añadir-asignacion"
  >
    <CModalHeader style="background-color: green; color: white;">
      <CModalTitle id="añadir-asignacion">Modificar Estado de Ubicación</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="text-center">
        <p>¿Seguro que quiere desactivar la ubicación?</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <c-button color="secondary" variant="outline" @click="verUbicacion = false">No, cerrar</c-button>
          <c-button color="danger" @click="desactivarUbicacion(listaUbicaciones.idUbicacion)">Sí, desactivar</c-button>
        </div>
      </div>
    </CModalBody>
  </CModal>
  <CModal
    scrollable
    :visible="verRed"
    @close="() => { verRed = false }"
    aria-labelledby="añadir-asignacion"
  >
    <CModalHeader style="background-color: blue; color: white;">
      <CModalTitle id="añadir-asignacion">Modificar Estado de Red</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="text-center">
        <p>¿Seguro que quiere desactivar la red?</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <c-button color="secondary" variant="outline" @click="verRed = false">No, cerrar</c-button>
          <c-button color="danger" @click="desactivarRed(Red.idRed)">Sí, desactivar</c-button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal
    scrollable
    :visible="verEditarEquipo"
    @close="() => { verEditarEquipo = false }"
    aria-labelledby="editar-equipo"
  >
    <CModalHeader>
      <CModalTitle id="editar-equipo">Editar Equipo</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <c-form @submit.prevent="submitEditarEquipo(equipo)">
        <div class="mb-3">
          <c-form-label for="idEquipo">Código: </c-form-label>
          <c-form-input v-model="formEditarEquipo.codigo" id="idEquipo" :value="equipo.codigo" required />
        </div>


        <div class="mb-3">
          <c-form-label for="macSerie">Mac - Serie</c-form-label>
          <c-form-input v-model="formEditarEquipo.macSerie" id="macSerie" :value="equipo.macSerie" required />
        </div>
        <div class="mb-3">
          <c-form-label for="marca">Marca</c-form-label>
          <c-form-input v-model="formEditarEquipo.marca" id="marca" :value="equipo.marca" required />
        </div>
        <div class="mb-3">
          <c-form-label for="idTipo">Tipo de Equipo</c-form-label>
          <c-form-select v-model.number="formEditarEquipo.idTipo" id="idTipo" required>
            <option value="" disabled selected>Selecciona un tipo</option>
            <option v-for="tipo in listaTipo" :key="tipo.idTipo" :value="tipo.idTipo">{{ tipo.nombre }}</option>
          </c-form-select>
        </div>
        <div class="mb-3">
          <c-form-label for="modelo">Modelo</c-form-label>
          <c-form-input v-model="formEditarEquipo.modelo" id="modelo" :value="equipo.modelo" required />
        </div>
        <div class="mb-3">
          <c-form-label for="detalle">Detalle</c-form-label>
          <c-form-textarea v-model="formEditarEquipo.detalle" id="detalle" rows="3" :value="equipo.detalle" required></c-form-textarea>
        </div>
        <c-button type="submit" class="botoncito">Guardar Cambios</c-button>

      </c-form>
    </CModalBody>
  </CModal>
</template>
  
<script setup>
  import {  ref } from 'vue'
  const verAsignacion = ref(false)
const verUbicacion = ref(false)
  const verRed = ref(false)
  const verEditarEquipo = ref(false)
</script>

<script>
  import InventarioService from '@/modules/egovf-inv/services/inventarioService';
  import DataTable from 'datatables.net-vue3';
  import DataTablesLib from 'datatables.net';
  import $ from 'jquery';
  import { CButton, CCardFooter, CForm, CModal } from '@coreui/vue';
  const formDataPertenece = ref({
    estado: 'Activo',  
  })

  const submitPertenece = async (id) => {
    try {
      
      console.log('Datos a guardar:', formDataPertenece.value);
      const inventarioService = new InventarioService();
      await inventarioService.editarPertenece(formDataPertenece.value, id)
      alert('✅ Registro guardado correctamente')
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar:', error)
      alert('❌ Error al guardar el registro.')
    }
  }
  const formEditarEquipo = ref({
    codigo: '',
    macSerie: '',
    marca: '',
    idTipo: 0,
    modelo: '',
    detalle: ''
  })

  const submitEditarEquipo = async (equipo) => {
    try {
      const datosFormulario = { ...formEditarEquipo.value };
    
      for (const key in datosFormulario) {
        const valor = datosFormulario[key];

        
        if (
          valor === '' ||
          valor === null ||
          valor === undefined ||
          valor === 0
        ) {
          datosFormulario[key] = equipo[key];
        }
      }

      console.log('Datos a guardar:', datosFormulario);

      const inventarioService = new InventarioService();
        await inventarioService.editarEquipo(datosFormulario, equipo.idEquipo);
        alert('✅ Equipo editado correctamente');
        window.location.reload();
    } catch (error) {
      console.error('Error al editar:', error)
      alert('❌ Error al editar el equipo.')
    }
  }
DataTable.use(DataTablesLib);
  
export default {
  name: 'ListaEquiposView',
  data() {
    return {
      listaTipo:[],
          isExpanded: {
      equipo: true,
      persona: false,
      pertenece: false,
      atenciones: false,
      ubicaciones: false,
      redes: false,
      software: false
    },
          inventarioService: null,
          idEquipo: 0,
          usuario: {
              token: '',
              cif: '',
              correo: '',
              celular: '',
              pass: '',
              unidad: '',
              sigla: '',
              foto: ''
          },
          equipo: {
              idEquipo: 0,
              codigo: '',
              macSerie: '',
              marca: '',
              modelo: '',
              detalle: '',
              idTipo: 0,
              tipoNombre: '',
          },
          pertenece: [],
          persona: {
              id: 0,
              cif: 0,
              ci: '',
              complemento: '',
              nombre: '',
              paterno: '',
              materno: '',
              fecha: '',
              sexo: '',
              cel: '',
              correo: ''
          },
          listaAtenciones: [],
          listaUbicaciones: {},
          Red:{},
          listaSoftware: []
      };
  },
  computed: {
      titulo() {
          const tipo = this.equipo.tipoNombre;
          return tipo;
      },
      nombre() {
          const nombre = this.equipo.codigo;
          return nombre;
      }
  },
  async mounted() {
      this.getTipo();
      this.idEquipo = this.$route.params.id;

      
    

      this.getDatos();
      await this.getEquipo();
      await this.getPertenece();
      await this.getPersona();
      this.tablaTipo();
      await this.getlistaAtenciones();
      await this.getUbicaciones();
      
      await this.getRedes();
      await this.getSoftware();

      
  },
  created() {
      this.inventarioService = new InventarioService();
  },
  beforeCreate() {
      if (this.$cookies.get('cif') == null) {
          this.$router.push('/');
      }
  },
  methods: {


    atenderSolicitud(idSolicitud) {
      this.$router.push({
        name: 'AtenderSolicitudView',
        params: {
          idEquipo: this.idEquipo,
          idSolicitud: idSolicitud
       }
        });
    },

    desactivarRed(idRed) {
      this.inventarioService.desactivarRed(idRed)
      window.location.reload();
    },
    desactivarUbicacion(idUbi) {
      this.inventarioService.desactivarUbicacion(idUbi)
      window.location.reload();
    },
      Asignaciones() {
        this.$router.push({
          name: "HistorialAsignacionesView",
          params: {
            id: this.idEquipo
          }
        });
      },
      nuevaAsignacion() {
        this.$router.push({
          name: "AsignacionEquipoView",
          params: {
            id: this.idEquipo
          }
        });
    },
    nuevaSolicitud() {
        this.$router.push({
          name: "SolicitudEquipoView",
          params: {
            idEquipo: this.idEquipo
          }
        });
    },
    Ubicaciones() {
        this.$router.push({
          name: "HistorialUbicacionesView",
          params: {
            id: this.idEquipo
          }
        });
      },
      nuevaUbicacion() {
        this.$router.push({
          name: "UbicacionEquipoView",
          params: {
            id: this.idEquipo
          }
        });
    },
      nuevaRed() {
        this.$router.push({
          name: "RedEquipoView",
          params: {
            id: this.idEquipo
          }
        });
    },
      Redes() {
        this.$router.push({
          name: "HistorialRedesView",
          params: {
            id: this.idEquipo
          }
        });
    },
    Software() {
        this.$router.push({
          name: "HistorialSoftwareView",
          params: {
            id: this.idEquipo
          }
        });
    },
      nuevoSoftware() {
        this.$router.push({
          name: "SoftwareEquipoView",
          params: {
            id: this.idEquipo
          }
        });
      },
      async getTipo(){
                await this.inventarioService.getTipo().then((response) =>{
                    this.listaTipo = response.data;
                });
            },
      getLista(id){
          this.$router.push({
              name: "ListaEquiposView",
              params: {
                  id:id
              },
          });
      },
      toggleAccordion(section) {
    this.isExpanded[section] = !this.isExpanded[section];
  },
      tablaTipo() {
          this.$nextTick(() => {
              $('#tipoTabla').DataTable({
                  destroy: true, 
                  ordering: true,
                  searching: true,
                  language: {
                      url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
                  }
              });
          });
      },
      getDatos() {
          if (this.$cookies.get('cif') != null) {
              this.usuario.token = this.$cookies.get('token');
              this.usuario.cif = this.$cookies.get('cif');
              this.usuario.correo = this.$cookies.get('correo');
              this.usuario.celular = this.$cookies.get('celular');
              this.usuario.pass = this.$cookies.get('pass');
              this.usuario.unidad = this.$cookies.get('unidad');
              this.usuario.sigla = this.$cookies.get('sigla');
              this.usuario.foto = this.$cookies.get('foto');
          }
      },
      async getPertenece() {
          await this.inventarioService.getPertenecePorEquipo(this.idEquipo).then(response => {
            this.pertenece = response.data;

          });
      },

      async getEquipo() {
          await this.inventarioService.getEquipoById(this.idEquipo).then(response => {
              this.equipo = response.data;
          });
      },
    async getPersona() {
        try{
          this.inventarioService.headersUsuario(this.usuario.token);
          await this.inventarioService.getPersona(this.pertenece[this.pertenece.length - 1].cif).then(response => {
              this.persona = response.data;
          });
          
      }
        catch (e) {

          console.error("Error al obtener la persona:");

          this.persona = null;
          
        }
        
      },
    async getlistaAtenciones() {
      if (this.pertenece[0].cif != 1001) {
        await this.inventarioService.getSolicitudporEquipo(this.idEquipo).then(response => {
          this.listaAtenciones = response.data;
        });
      }
      else {
        this.listaAtenciones = [];
      }
      },
    async getUbicaciones() {
      try {
        await this.inventarioService.getUbicacionesPorEquipo(this.idEquipo).then(response => {
          this.listaUbicaciones = response.data;
        });
      }
      catch (error) {
        this.listaUbicaciones = {};
      }
    },
      async getRedes() {
        try {
          await this.inventarioService.getRedActiva(this.idEquipo).then(response => {
                this.Red = response.data;
            });
        } catch (error) {
          this.Red = {};
        }
      },
      async getSoftware() {
          await this.inventarioService.getSoftwarePorEquipo(this.idEquipo).then(response => {
              this.listaSoftware = response.data;
          });
      },

  }
  
};
</script>

<style scoped>
  @import 'datatables.net-dt';
  @import "leaflet/dist/leaflet.css";
  .botoncito
  {
    background-color: #00222f;
    color: white;
    border: solid 1px;
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
    border-color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    height: fit-content;
  }
  .botoncito:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }
  .map-container {
    height: 200px;
    width: 100%;
    max-width: 400px;
    margin-top: 10px;
  }

  ::v-deep .dataTable thead th {
    background-color: #00222f !important;
    color: white !important;
  }

  .custom-breadcrumb {
    background-color: transparent;
    padding: 0;
    margin-bottom: 1rem;
  }

  .breadcrumb-link {
    text-decoration: none;
    color: #00222f;
    font-weight: 500;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    cursor: pointer;
  }

  .breadcrumb-link:hover {
    color: white;
    text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
  }

  .breadcrumb-item + .breadcrumb-item::before {
    color: #bbb;
  }
  .card-header {
    background-color: #00222f;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .card-header:hover {
    background-color: #003547;
  }

  .bg-light {
    background-color: #f8f9fa !important;
  }

  .badge {
    font-size: 0.85rem;
    padding: 0.4em 0.6em;
  }
  .data-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .card-principal{
    background-color: #00222f;

  }
  .data-item-principal{
    color: white;
    background-color: rgba(0, 0, 0, 0.226);
    display: flex;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 0.9rem;
    align-items: center;

  }
  .data-item-principal strong {
    min-width: 160px;
  } 
  .data-item-principal span {
    flex-grow: 1;
    font-weight: 500;
  } 

  .data-item {
    color: black;
    background-color: rgba(255, 255, 255, 0.226);
    display: flex;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 0.9rem;
    align-items: center;

  }

  .data-item strong {
    min-width: 160px;
  }

  .data-item span {
    flex-grow: 1;
    font-weight: 500;
  }

  .card-body ul li {
    margin-bottom: 0.5rem;
  }

  .atencion-card {
    background-color: #fff9e6;
    border-left: 4px solid red;

  }
  .solicitud-card {
    background-color: #e6f7ff;
    border-left: 4px solid yellow;
  }

  .location-card {
    background-color: #e6f7ff;
    border-left: 4px solid #00bcd4;
  }
  .ubicacion-card {
    background-color: #e6f7ff;
    border-left: 4px solid #00ec20;
  }

  .network-card {
    background-color: #f1f1f1;
    border-left: 4px solid #3f51b5;
  }

  .software-card {
    background-color: #fffde7;
    border-left: 4px solid #ffeb3b;
  }
  .titulos {
    font-weight: bold; color: #495057;  

  }
</style>
