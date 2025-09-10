<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
          <CCol :lg="6">
            <div class="align-items-center">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
            </div>
          </CCol>
          <CCol :lg="6" class="text-end">
            <CDropdown variant="btn-group">
              <CDropdownToggle color="dark" class="font border-0" size="sm">
                <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>
                  <CButton @click="clickModalServicio(true)" size="sm">
                    <CIcon icon="cil-cloud-upload" size="lg" class="me-2" /> Agregar
                  </CButton>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CCol>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="servicioTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th width="350px">Detalle</th>
                  <th>Inventario</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="servicio in listaServicios" :key="servicio.id">
                  <td>{{ servicio.id }}</td>
                  <td>{{ servicio.nombre }}</td>
                  <td>{{ servicio.detalle }}</td>
                  <td>
                    <CListGroup>
                      <CListGroupItem class="d-flex justify-content-between align-items-center"
                        v-for="inventario in servicio.inventario" :key="inventario.id">{{ inventario.nombre }} | {{
                          inventario.codigo }}<CBadge color="secondary" shape="rounded-pill">{{ inventario.cantidad }}
                        </CBadge>
                      </CListGroupItem>
                    </CListGroup>
                  </td>
                  <td>
                    <CButtonGroup role="group">
                      <CTooltip content="Agregar Inventario de Equipos para el Servicio" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton :aria-describedby="id" v-on="on" class="font" color="success" size="sm"
                            @click="inventarioModal(servicio.id)">
                            <CIcon icon="cil-plus" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Detalle de Equipos de Servicio" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton :aria-describedby="id" v-on="on" class="font" color="dark" size="sm"
                            @click="detalle(servicio.id)">
                            <CIcon icon="cil-featured-playlist" />
                          </CButton>
                        </template>
                      </CTooltip>
                      <CTooltip content="Editar Equipos de Servicio" placement="bottom">
                        <template #toggler="{ id, on }">
                          <CButton :aria-describedby="id" v-on="on" class="font" color="warning" size="sm"
                            @click="getServicio(servicio.id)">
                            <CIcon icon="cil-pencil" />
                          </CButton>
                        </template>
                      </CTooltip>
                    </CButtonGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>


  <!-- Modal  Servicio-->
  <CModal :visible="modalServicio" @close="clickModalServicio(false)">
    <CForm @submit.prevent="addServicio()">
      <CModalHeader class="headercolor" dismiss @close="clickModalServicio(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-note-add" size="xl" /> Agregar Servicio
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Nombre </CInputGroupText>
          <CFormInput type="text" v-model="servicio.nombre" placeholder="Nombre del Servicio" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle </CInputGroupText>
          <CFormTextarea v-model="servicio.detalle" required="true" rows="8"> </CFormTextarea>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalServicio(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Servicio-->

   <!-- Modal  Editar Servicio-->
  <CModal :visible="modalServicioEditar" @close="clickModalServicioEditar(false)">
    <CForm @submit.prevent="updateServicio()">
      <CModalHeader class="headercolor" dismiss @close="clickModalServicioEditar(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-note-add" size="xl" /> Editar Servicio
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Nombre </CInputGroupText>
          <CFormInput type="text" v-model="editarServicio.nombre" placeholder="Nombre del Servicio" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle </CInputGroupText>
          <CFormTextarea v-model="editarServicio.detalle" required="true" rows="8"> </CFormTextarea>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalServicioEditar(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Actualizar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Editar Servicio-->

  <!-- Modal  Inventario-->
  <CModal :visible="modalInventario" @close="clickModalInventario(false)">
    <CForm @submit.prevent="addInventario()">
      <CModalHeader class="headercolor" dismiss @close="clickModalInventario(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-plus" size="xl" /> Agregar Equipo
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Nombre </CInputGroupText>
          <CFormInput type="text" v-model="inventario.nombre" placeholder="Nombre del Equipo" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Cantidad </CInputGroupText>
          <CFormInput type="text" v-model="inventario.cantidad" placeholder="Cantidad del Equipo" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Codigo </CInputGroupText>
          <CFormInput type="text" v-model="inventario.codigo" placeholder="Codigo del Equipo" required="true" />
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalInventario(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  inventario-->

</template>


<script>

//Importamos Servicios
import SraService from '@/modules/egovf-sra/services/sraService';

//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
  name: 'ListaServiciosView',
  components: {

  },
  props: {
    idAmbiente: { type: [Number, String], required: true }
  },
  data() {
    return {
      titulo: 'Lista de Servicios',
      sraService: null,
      listaServicios: [],
      modalServicio: false,
      modalServicioEditar: false,
      modalInventario: false,
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
      servicio: {
        detalle: '',
        idAmbiente: 0,
        nombre: ''
      },
      editarServicio: {
        id:0,
        detalle: '',
        idAmbiente: 0,
        nombre: ''
      },
      inventario: {
        nombre: '',
        cantidad: 0,
        codigo: '',
        idServicio: 0,
      }
    }
  },
  beforeCreate() {
    if (this.$cookies.get('cif') == null) {
      this.$router.push('/');
    }
  },
  created() {
    this.sraService = new SraService();
  },
  mounted() {
    this.getDatos(); // Llamamos los datos del Usuario
    this.getListaServicio();
  },
  methods: {
    tabla() {
      this.$nextTick(() => {
        $('#servicioTabla').DataTable();
      });
    },
    getDatos() {// Funcion que guarda los datos del Usuario en la View
      if (this.$cookies.get('cif') != null) {
        this.usuario.token = this.$cookies.get('token');
        this.usuario.cif = this.$cookies.get('cif');
        this.usuario.correo = this.$cookies.get('correo');
        this.usuario.celular = this.$cookies.get('celular');
        this.usuario.pass = this.$cookies.get('pass');
        this.usuario.unidad = this.$cookies.get('unidad');
        this.usuario.sigla = this.$cookies.get('sigla');
        this.usuario.foto = this.$cookies.get("foto");
      }
    },
    async getListaServicio() { // Funcion que crea una lista de servicios deacuardo al id del ambiente
      console.log("id del ambiente" + this.idAmbiente);
      await this.sraService.getListaServicio(this.idAmbiente).then(response => {
        this.listaServicios = response.data;
        this.tabla();
      });
    },

    addServicio() { // funcion para el registro de un ciudadano
      this.servicio.idAmbiente = this.idAmbiente;
      this.$swal.fire({
        title: 'Desea Registrar el Servicio',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.addServicio(this.servicio).then(response => {
            if (response.status == 201) {
              this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
                if (result)
                  location.reload();
              });
            }
            else {
              this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
            }
          });
        } else if (result.isDenied) {
          this.$swal.fire('Datos Cancelados', '', 'info');
        }
      });
    },
    updateServicio() { // funcion para el registro de un ciudadano
      this.$swal.fire({
        title: 'Desea Actualizar el Servicio del  Requerimiento',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.updateServicio(this.editarServicio).then(response => {
            if (response.status == 200) {
              this.$swal.fire('Datos Actualizados Corectamente', '', 'success').then((result) => {
                if (result)
                  location.reload();
              });
            }
            else {
              this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
            }
          });
        } else if (result.isDenied) {
          this.$swal.fire('Datos Cancelados', '', 'info');
        }
      });
    },
    addInventario() { // funcion para el registro de un ciudadano
      this.$swal.fire({
        title: 'Desea Registrar el Equipo al Servicio ?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sraService.addInventario(this.inventario).then(response => {
            if (response.status == 201) {
              this.$swal.fire('Datos Guardados Corectamente', '', 'success').then((result) => {
                if (result)
                  location.reload();
              });
            }
            else {
              this.$swal.fire('Los Datos no fueron Guardados Error' + response.status, '', 'error');
            }
          });
        } else if (result.isDenied) {
          this.$swal.fire('Datos Cancelados', '', 'info');
        }
      });
    },
    inventarioModal(idServicio) {
      this.inventario.idServicio = idServicio;
      this.clickModalInventario(true);
    },

    clickModalServicio(Servicio) {//funcion para Visibilisar el modal
      this.modalServicio = Servicio;
    },
    clickModalInventario(Inventario) {//funcion para Visibilisar el modal
      this.modalInventario = Inventario;
    },
    getServicio(idServicio){
      this.listaServicios.forEach(servicio=>{
        console.log(servicio);
        if(servicio.id == idServicio){
          this.editarServicio.id = servicio.id,
          this.editarServicio.nombre = servicio.nombre;
          this.editarServicio.detalle = servicio.detalle;
          this.editarServicio.idAmbiente = servicio.idAmbiente;
          return true; 
        }
      });
      this.clickModalServicioEditar(true);
    },
    clickModalServicioEditar(servicio) {//funcion para Visibilisar el modal
      this.modalServicioEditar = servicio;
    },


  }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>