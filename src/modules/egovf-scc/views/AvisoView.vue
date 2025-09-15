<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
              </div>
            </CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="clickModalAviso(true)" color="dark" class="font" size="sm">
                <CIcon icon="cil-cloud-upload" class="me-2 text-success" />Agregar
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="equipoTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Detalle</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="aviso in listaAvisos" :key="aviso.id">
                  <th scope="row">{{ aviso.id }}</th>
                  <td>{{ aviso.titulo }}
                    <CProgress thin color="success" :value="100" />
                    <div class="clearfix">
                      <div class="float-start">
                        <strong>{{ aviso.icon }}</strong>
                      </div>
                      <div class="float-end">
                        <CBadge v-if="aviso.estado == 1" color="success">Activo</CBadge>
                        <CBadge v-else color="warning">Inactivo</CBadge>
                      </div>
                    </div>
                  </td>
                  <td>{{ aviso.detalle }}</td>
                  <td>
                    <CButton class="font" color="success" @click="avisoSelect(aviso.id)" size="sm">
                      <CIcon icon="cil-pencil" />
                    </CButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Add Aviso-->
  <CModal :visible="modalAviso" @close="clickModalAviso(false)">
    <CForm @submit.prevent="addAviso()">
      <CModalHeader class="headercolor" dismiss @close="clickModalAviso(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-medical-cross" class="me-2" /> Agregar Nuevo Aviso
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Titulo</CInputGroupText>
          <CFormInput type="text" v-model="aviso.titulo" placeholder="Titulo del Aviso a colocar" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormTextarea cols="30" rows="5" v-model="aviso.detalle" required="true"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Icono</CInputGroupText>
          <CFormSelect v-model="aviso.icon" :model-value="String(aviso.icon)" required="true">
            <option value="info">Informacion</option>
            <option value="error">Error</option>
            <option value="success">Completo</option>
            <option value="warning">Incompleto</option>
            <option value="question">Pregunta</option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalAviso(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Add Equipo-->

  <!-- Modal  Update Aviso-->
  <CModal :visible="modalAvisoUpdate" @close="clickModalAvisoUpdate(false)">
    <CForm @submit.prevent="updateAviso()">
      <CModalHeader class="headercolor" dismiss @close="clickModalAvisoUpdate(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-medical-cross" class="me-2" /> Actualizar Aviso
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Titulo</CInputGroupText>
          <CFormInput type="text" v-model="avisoUpdate.titulo" placeholder="Titulo del Aviso a colocar"
            required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormTextarea cols="30" rows="5" v-model="avisoUpdate.detalle" required="true"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Icono</CInputGroupText>
          <CFormSelect v-model="avisoUpdate.icon" :model-value="String(avisoUpdate.icon)" required="true">
            <option value="info">Informacion</option>
            <option value="error">Error</option>
            <option value="success">Completo</option>
            <option value="warning">Incompleto</option>
            <option value="question">Pregunta</option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Estado</CInputGroupText>
          <CFormSelect v-model="avisoUpdate.estado" :model-value="String(avisoUpdate.estado)"
            @update:model-value="avisoUpdate.estado = Number($event)" required="true">
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalAvisoUpdate(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-cloud-upload" class="me-2" />Actualizar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Update Equipo-->
</template>

<script>
//Importamos Servicios
import SccService from "@/modules/egovf-scc/services/sccService";

//Importamos Herramientas
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import $ from "jquery";

DataTable.use(DataTablesLib);

export default {
  name: "AvisoView",
  components: {},
  data() {
    return {
      titulo: "Avisos Modulo SCC",
      modalAviso: false,
      modalAvisoUpdate: false,
      sccService: null,
      listaAvisos: [],
      usuario: {
        token: "",
        cif: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        sigla: "",
        foto: ""
      },
      aviso: {
        titulo: "",
        detalle: "",
        icon: "",
        estado: 0,
      },
      avisoUpdate: {
        id: 0,
        titulo: "",
        detalle: "",
        icon: "",
        estado: 0,
      },
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      window.location.href = '/';
    }
  },
  created() {
    this.sccService = new SccService();
  },
  mounted() {
    this.getDatos(); // Llamamos los datos del Usuario
    this.getAvisoAll(); // Funcion que debuelve una lista de Equipos Biometricos
  },
  methods: {
    tabla() {
      this.$nextTick(() => {
        $("#equipoTabla").DataTable();
      });
    },
    getDatos() {
      // Funcion que guarda los datos del Usuario en la View
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");
        this.usuario.foto = this.$cookies.get("foto");
      }
    },
    async getAvisoAll() {
      // Funcion que crea una lista de Avisos
      await this.sccService.getAvisoAll().then((response) => {
        this.listaAvisos = response.data;
      });
      this.tabla();
    },
    addAviso() {
      // funcion para el registro de un Aviso
      this.$swal.fire({
        title: "Desea Registrar El Aviso",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.sccService.addAviso(this.aviso).then((response) => {
            if (response.status == 201) {
              this.$swal.fire("Aviso Registrado Corectamente", "", "success").then((result) => {
                if (result) location.reload();
              });
            } else {
              this.$swal.fire("Los Datos no fueron Guardados Error", "" + response.status, "error");
            }
          });
        }
      });
    },
    updateAviso() {
      // funcion para actualizar un Aviso
      this.$swal.fire({
        title: "Desea Actualizar El Aviso",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Actualizar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.sccService.updateAviso(this.avisoUpdate).then((response) => {
            if (response.status == 200) {
              this.$swal.fire("Aviso Actualizado Corectamente", "", "success").then((result) => {
                if (result) location.reload();
              });
            } else {
              this.$swal.fire("Los Datos no fueron Guardados Error", "" + response.status, "error");
            }
          });
        }
      });
    },
    avisoSelect(id) {
      this.listaAvisos.forEach((aviso) => {
        if (aviso.id == id) {
          this.avisoUpdate.id = aviso.id;
          this.avisoUpdate.titulo = aviso.titulo;
          this.avisoUpdate.detalle = aviso.detalle;
          this.avisoUpdate.icon = aviso.icon;
          this.avisoUpdate.estado = aviso.estado;
        }
      });
      this.clickModalAvisoUpdate(true);
    },
    clickModalAviso(m) {
      //funcion para Visibilisar el modal
      this.modalAviso = m;
    },
    clickModalAvisoUpdate(m) {
      //funcion para Visibilisar el modal
      this.modalAvisoUpdate = m;
    },
  },
};
</script>
<style scoped>
@import "datatables.net-dt";
</style>
