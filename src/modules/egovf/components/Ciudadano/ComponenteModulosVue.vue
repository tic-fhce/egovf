<template>
  <CRow>
    <CCol :lg="12">
      <CCard>
        <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
            <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
          </div>
          <CButton @click="clickModalModulo(true)" color="dark" class="font" size="sm">
            <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :lg="3" v-for="moduloCif in listaModuloCifEmpleado" :key="moduloCif.id">
              <br />
              <CCard>
                <CCardHeader class="headercolor text-center">{{ moduloCif.nombre }}</CCardHeader>
                <CCardBody class="text-center">
                  <CIcon customClassName="nav-icon" :icon="moduloCif.imagen" class="menuicon" />
                </CCardBody>
                <CCardFooter class="text-center">
                  <CTooltip :content="moduloCif.descripcion" placement="bottom">
                    <template #toggler="{ id, on }">
                      <CButton :aria-describedby="id" v-on="on" color="success" size="sm" class="font"
                        @click="getModulo(moduloCif.ruta, moduloCif.id, moduloCif.descripcion)">
                        Ingresar
                      </CButton>
                    </template>
                  </CTooltip>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  MOdulo-->
  <CModal :visible="modalModulo" @close="clickModalModulo(false)">
    <CForm @submit.prevent="addModulo()">
      <CModalHeader class="headercolor" dismiss @close="clickModalModulo(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-cloud-upload" class="me-2" />Agregar Modulos
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="datos" />
        <br>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" for="inputGroupSelect01">Modulo </CInputGroupText>
          <CFormSelect v-model="id_modulo" :model-value="String(id_modulo)"
            @update:model-value="id_modulo = Number($event)" required="true">
            <option v-for="modulo in listaModulo" :value="modulo.id" :key="modulo.id">
              {{ modulo.descripcion }}
            </option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalModulo(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Modulo-->
</template>

<script>
// Importamos Componentes
import ComponenteNombres from '@/modules/egovf/components/Ciudadano/ComponenteNombres.vue';

import ModuloService from "@/modules/egovf/services/moduloService";

export default {
  name: "ComponenteModulosVue",
  props: ["cif", "egovf", "datos"],
  components: {
    ComponenteNombres
  },
  data() {
    return {
      titulo: "Modulos del Ciudadano",
      modalModulo: false,
      moduloService: null,
      listaModulo: [],
      listaModuloCifEmpleado: [],
      id_modulo: 0,
      getPB: true,
      usuario: {...this.$models.usuarioModel},
      modulo: {
        cif: 0,
        idmodulo: 0,
        quien: 0
      },
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      window.location.href = '/';
    }
  },
  created() {
    this.moduloService = new ModuloService();

  },
  mounted() {
    this.getDatos();

  },
  updated() {
    if (this.cif > 0 && this.getPB) {

      this.getModuloCifEmpleado();
      this.getModulos();
      this.getPB = false;
    }
  },
  methods: {
    getDatos() {
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");
        this.usuario.foto = this.$cookies.get("foto");
        this.moduloService.headersUsuario(this.usuario.token);

      }
    },
    async getModulos() {
      // correcto funcionando
      await this.moduloService.getModulos(this.cif).then((response) => {
        this.listaModulo = response.data;
      });
    },
    async getModuloCifEmpleado() {
      // correcto funcionando
      await this.moduloService.getModuloCifEmpleado(this.cif).then((response) => {
        this.listaModuloCifEmpleado = response.data;
      });
      console.log(this.listaModuloCifEmpleado);
    },
    async addModulo() {
      this.modulo.cif = this.cif;
      this.modulo.idmodulo = this.id_modulo;
      this.modulo.quien = this.usuario.cif;
      await this.$swal.fire({
        title: "Desea Agregar el Modulo al Ciudadano ?",
        showDenyButton: true,
        icon: "info",
        confirmButtonText: "Aceptar",
        denyButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.moduloService.addModulo(this.modulo).then((response) => {
            if (response.status == 201) {
              this.$swal.fire("El Modulo fue Agregado al Ciudadano Corectamente", "", "success").then((res) => {
                if (res) location.reload();
              });
            } else {
              this.$swal.fire("Los Datos no fueron Guardados Error" + response.status, "", "error");
            }
          });
        } else if (result.isDenied) {
          this.$swal.fire("Datos Cancelados", "", "info");
        }
      });
    },
    getModulo(ruta, id, titulo) {
      this.$router.push({
        name: ruta,
        params: {
          cifCiudadano: this.cif,
          idModulo: id,
          titulo: titulo
        },
      });
    },
    clickModalModulo(modal) {
      this.modalModulo = modal;
    },
  },
};
</script>
