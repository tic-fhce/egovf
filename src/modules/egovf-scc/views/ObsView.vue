<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6"
              ><label class="d-none d-md-flex me-auto">{{
                titulo
              }}</label></CCol
            >
            <CCol :lg="6" class="text-end">
              <CDropdown variant="btn-group">
                <CDropdownToggle color="success" class="font" size="sm"
                  ><CIcon
                    icon="cil-menu"
                    class="me-2"
                  />Opciones</CDropdownToggle
                >
                <CDropdownMenu>
                  <CDropdownItem
                    ><CButton @click="clickModalObs(true)" size="sm"
                      >Agregar Observaciones</CButton
                    ></CDropdownItem
                  >
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table class="table" id="obsTabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CIF</th>
                  <th>Empleado</th>
                  <th>UidObs</th>
                  <th>Tipo</th>
                  <th>Detalle</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lsobs in listaObsCiudadanos" :key="lsobs.id">
                  <th scope="row">{{ lsobs.id }}</th>
                  <td>{{ lsobs.cif }}</td>
                  <td>{{ lsobs.nombre }}</td>
                  <td>{{ lsobs.uidobs }}</td>
                  <td>{{ lsobs.tipo }}</td>
                  <td>{{ lsobs.detalle }}</td>
                  <td>
                    <CButtonGroup role="group">
                      <CButton
                        color="success"
                        class="font"
                        size="sm"
                        @click="getObsDetalle(lsobs.id)"
                        ><CIcon icon="cil-featured-playlist"></CIcon
                      ></CButton>
                      <CButton
                        color="warning"
                        class="font"
                        size="sm"
                        @click="setObs(lsobs.id)"
                        ><CIcon icon="cil-pencil"></CIcon
                      ></CButton>
                      <CButton
                        color="secondary"
                        class="font"
                        size="sm"
                        @click="setImg(lsobs.id)"
                        ><CIcon icon="cil-clipboard"></CIcon
                      ></CButton>
                    </CButtonGroup>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Obserbasiones-->
  <CModal :visible="modalObs" @close="clickModalObs(false)">
    <form @submit.prevent="addObsAll()" enctype="multipart/form-data">
      <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
        <CModalTitle>
          <h5>Agregar Observaciones de Asistencia</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <!--Input para Tipos de empleado-->
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select v-model="obsall.cif" class="form-control" required="true">
              <option
                v-for="lte in listaTipoEmpleado"
                :value="lte.id"
                :key="lte.id"
              >
                {{ lte._01detalle }}
              </option>
            </select>
          </div>
        </div>
        <!--Input para Tipos de empleado-->
        <!--Input para el sexo de cada empleado-->
        <div class="mb-3 row">
          <label for="sexo" class="col-4 col-form-label">Caracteristica</label>
          <div class="col-8">
            <select class="form-control" v-model="obsall.sexo" required="true">
              <option value="0">Todos</option>
              <option value="1">Femenino</option>
              <option value="2">Masculino</option>
            </select>
          </div>
        </div>
        <!--Input para el sexo de cada empleado-->
        <!--Input para el identificativo de observaciones-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">UID - OBS</label>
          <div class="col-8">
            <input
              type="text"
              class="form-control"
              v-model="obsall.uidobs"
              required="true"
            />
          </div>
        </div>
        <!--Input para el identificativo de observaciones-->
        <!--Input para la fecha de Inicio-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label"
            >Fecha de Inicio</label
          >
          <div class="col-8">
            <input
              type="date"
              class="form-control"
              v-model="obsall.fechainicio"
              required="true"
            />
          </div>
        </div>
        <!--Input para la fecha de Inicio-->
        <!--Input para la fecha Fin-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
          <div class="col-8">
            <input
              type="date"
              class="form-control"
              v-model="obsall.fechafin"
              required="true"
            />
          </div>
        </div>
        <!--Input para la fecha Fin-->
        <!--Input para el detalle de Obserbacion-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Detalle</label>
          <div class="col-8">
            <textarea
              class="form-control"
              v-model="obsall.detalle"
              required="true"
            ></textarea>
          </div>
        </div>
        <!--Input para el detalle de Obserbacion-->
        <!--Input para el tipo de Observacion-->
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select
              class="form-control"
              v-model="obsall.tipo"
              required="true"
              @change="getTipo()"
            >
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
        <!--Input para el tipo de Observacion-->
        <!--Input para la hora-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Hora</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="obsall.hora" />
          </div>
        </div>
        <!--Input para la hora-->
        <!--Input para el Docuemtno-->
        <div class="mb-3 row">
          <label for="archivo" class="col-4 col-form-label">Documento</label>
          <div class="col-8">
            <input
              type="file"
              ref="obsfile"
              class="form-control"
              accept="image/png,image/jpeg"
              @change="selectFile()"
              required="true"
            />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalObs(false)" color="danger" class="font"
          ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton
        >
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Agregar Observaciones
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal  Obserbasiones-->

  <!-- Modal  Detalles de OBS-->
  <CModal :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader
      class="headercolor"
      dismiss
      @close="clickModalDetalleObs(false)"
    >
      <CModalTitle>
        <h5>Detalles de la Observacion</h5>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3 row">
        <h4 class="card-title">CIF : {{ obsDetalle.cif }}</h4>
      </div>
      <CRow>
        <CCol :lg="12">
          <ul>
            <li><strong>ID: </strong>{{ obsDetalle.id }}</li>
            <li><strong>UID: </strong>{{ obsDetalle.uidobs }}</li>
            <li><strong>Fecha Inicio: </strong>{{ obsDetalle.fechainicio }}</li>
            <li><strong>Fecha Fin: </strong> {{ obsDetalle.fechafin }}</li>
            <li><strong>Detalle: </strong>{{ obsDetalle.detalle }}</li>
            <li><strong>Tipo de Obs. : </strong>{{ obsDetalle.tipo }}</li>
            <li><strong>Hora: </strong>{{ obsDetalle.hora }}</li>
          </ul>
          <CAlert color="success" v-if="obsDetalle.estado === 1"
            >Aprobado</CAlert
          >
          <CAlert color="warning" v-if="obsDetalle.estado === 0"
            >En Espera</CAlert
          >
        </CCol>
        <CCol>
          <img :src="obsDetalle.url" alt="" class="img-fluid" />
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalDetalleObs(false)" color="danger" class="font"
        ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton
      >
      <CButton
        @click="updateObsEstado(obsDetalle.id, 1)"
        color="success"
        class="font"
        ><CIcon icon="cil-check-alt" class="me-2" />Aprobar</CButton
      >
    </CModalFooter>
  </CModal>
  <!-- END Modal  Detalles de Obs-->

  <!-- Modal Editar Obserbasiones-->
  <CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
    <form @submit.prevent="updateObsEmpleado()">
      <CModalHeader
        class="headercolor text-center"
        dismiss
        @close="clickModalObsEditar(false)"
      >
        <CModalTitle>
          <h5>Actualizar la Observacion de Asistencia</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="cif" class="col-4 col-form-label">CIF</label>
          <div class="col-8">
            <input
              type="text"
              class="form-control"
              v-model="uobs.cif"
              required="true"
              placeholder="CIF"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">UID - OBS</label>
          <div class="col-8">
            <input
              type="text"
              class="form-control"
              v-model="uobs.uidobs"
              required="true"
              placeholder="Cite u Hoja de Ruta"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label"
            >Fecha de Inicio</label
          >
          <div class="col-8">
            <input
              type="date"
              class="form-control"
              v-model="uobs.fechainicio"
              required="true"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
          <div class="col-8">
            <input
              type="date"
              class="form-control"
              v-model="uobs.fechafin"
              required="true"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Detalle</label>
          <div class="col-8">
            <textarea
              class="form-control"
              v-model="uobs.detalle"
              required="true"
            ></textarea>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select class="form-control" v-model="uobs.tipo" required="true">
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
          <label for="datos" class="col-4 col-form-label">Hora</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="uobs.hora" />
          </div>
        </div>
        <CCol>
          <img :src="uobs.url" alt="" class="img-fluid" />
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalObsEditar(false)" color="danger" class="font"
          ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton
        >
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Actualizar Observacion
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal Editar Obserbasiones-->

  <!-- Modal IMG Obserbasiones-->
  <CModal :visible="modalImgEditar" @close="clickModalImgEditar(false)">
    <form @submit.prevent="updateImgEmpleado()" enctype="multipart/form-data">
      <CModalHeader
        class="headercolor text-center"
        dismiss
        @close="clickModalImgEditar(false)"
      >
        <CModalTitle>
          <h5>Actualizar Imagen de Observacion</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="imagen" class="col-4 col-form-label">Documento</label>
          <div class="col-8">
            <input
              type="file"
              ref="obsfileimg"
              class="form-control"
              accept="image/png,image/jpeg"
              @change="selectFileImg()"
              required="true"
            />
          </div>
        </div>
        <CCol>
          <img :src="uobs.url" alt="" class="img-fluid" />
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalImgEditar(false)" color="danger" class="font"
          ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton
        >
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Actualizar Observacion
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal Editar Obserbasiones-->
</template>

<script>
import EgovfService from "@/services/egovf/egovfService";
import UploadService from "@/services/upload/uploadService";
import EmpleadoService from "@/services/emp/empleadoService";
import SccService from "@scc/services/sccService";

//Importamos Herramientas
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import $ from "jquery";

DataTable.use(DataTablesLib);

export default {
  name: "ObsView",
  components: {},
  data() {
    return {
      titulo: "Observaciones",
      modalObs: false,
      modalDetalleObs: false,
      modalObsEditar: false,
      modalImgEditar: false,
      egovfService: null,
      uploadService: null,
      sccService: null,
      empleadoService: null,
      listaGestion: [],
      listaObs: [],
      listaTipoEmpleado: [],
      listaCiudadanoEmpleado: [],
      listaObsCiudadanos: [],
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
      archivo: "",
      usuario: {
        token: "",
        cif: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        sigla: "",
      },
      obsall: {
        cif: null,
        uidobs: "",
        sexo: "",
        fechainicio: "",
        fechafin: "",
        detalle: "",
        tipo: "Seleccionar Tipo",
        hora: "08:30",
        url: "",
      },
      obsDetalle: {
        id: 0,
        cif: 0,
        uidobs: "",
        fechainicio: "",
        fechafin: "",
        detalle: "",
        imagen: "",
        tipo: "",
        hora: "",
        url: "",
        estado: 0,
      },
      uobs: {
        id: 0,
        cif: null,
        uidobs: "",
        fechainicio: "",
        fechafin: "",
        detalle: "",
        imagen: "",
        tipo: "",
        hora: "",
        url: "",
      },
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      this.$router.push("/");
    }
  },
  created() {
    this.egovfService = new EgovfService();
    this.sccService = new SccService();
    this.uploadService = new UploadService();
    this.empleadoService = new EmpleadoService();
  },
  mounted() {
    this.getDatos();
    this.getGestion();
    this.getListaTipoEmpleado();
  },
  methods: {
    selectFile() {
      // Funcion que permite cambiar los datos del archivo
      this.archivo = this.$refs.obsfile.files[0];
    },
    selectFileImg() {
      // Funcion que permite cambiar los datos del archivo
      this.archivo = this.$refs.obsfileimg.files[0];
    },
    tablaObs() {
      this.$nextTick(() => {
        $("#obsTabla").DataTable();
      });
    },
    getDatos() {
      //Cargamos datos del Usuario
      if (this.$cookies.get("cif") != null) {
        this.usuario.token = this.$cookies.get("token");
        this.usuario.cif = this.$cookies.get("cif");
        this.usuario.correo = this.$cookies.get("correo");
        this.usuario.celular = this.$cookies.get("celular");
        this.usuario.pass = this.$cookies.get("pass");
        this.usuario.unidad = this.$cookies.get("unidad");
        this.usuario.sigla = this.$cookies.get("sigla");

        this.egovfService.headersUsuario(this.usuario.token);
      }
    },
    async getListaTipoEmpleado() {
      // Funcion para listar El tipo de Empleado
      await this.empleadoService.getListaTipoEmpleado().then((response) => {
        this.listaTipoEmpleado = response.data;
      });
    },
    async addObsAll() {
      //Funcion para registrar una Observacion del Usuario
      const fromData = new FormData();
      fromData.append("archivo", this.archivo);
      try {
        //primero subimos el archivo
        await this.uploadService.addImagen(fromData).then((response) => {
          if (response.status == 200) {
            this.obsall.url =
              this.uploadService.getUrl() + response.data.nombre;
            this.obsall.imagen = response.data.nombre;
            this.$swal
              .fire({
                title:
                  "Desea agregar la Observacione de Asistencia a los Empleados?",
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.sccService.addObsAll(this.obsall).then((response) => {
                    if (response.status == 200) {
                      this.$swal
                        .fire(
                          "Las Observaciones fueron Agregados Corectamente ",
                          "",
                          "success"
                        )
                        .then((res) => {
                          if (res) location.reload();
                        });
                    } else {
                      this.$swal.fire(
                        "Las Observaciones no fueron Guardados Error" +
                          response.status,
                        "",
                        "error"
                      );
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
        this.$swal.fire("El archivo no pudo ser Guardado  " + err, "error");
      }
    },
    getGestion() {
      // funcion que crea una lista de gestiones desde el 2021
      var lgestion = [];
      const fecha = new Date();
      var rgestion = fecha.getFullYear();
      for (var i = 2021; i <= rgestion; i++) {
        lgestion.push(i);
      }
      this.listaGestion = lgestion;
      this.getListaObs();
    },
    async getListaObs() {
      await this.sccService.getListaObs().then((response) => {
        this.listaObs = response.data;
      });
      this.getListaCiudadanoEmpleado();
    },
    async getListaCiudadanoEmpleado() {
      // Funcion que regresa una lista de Ciudadanos que son Empleados del ModuloEgovf
      await this.egovfService.getListaEmpleado().then((response) => {
        this.listaCiudadanoEmpleado = response.data;
      });
      this.getListaObsCiudadano();
    },
    getListaObsCiudadano() {
      //Funcion que une las listas listaEmpelado y listaCiudadanoEmpleado
      this.listaObsCiudadanos = [];
      this.listaCiudadanoEmpleado.forEach((empleado) => {
        this.listaObs.forEach((obs) => {
          var obsCiudadano = {
            id: 0,
            cif: 0,
            nombre: "",
            uidobs: "",
            tipo: "",
            detalle: "",
          };
          if (empleado.cif == obs._01cif) {
            obsCiudadano.id = obs.id;
            obsCiudadano.cif = obs._01cif;
            obsCiudadano.nombre =
              empleado.nombre + " " + empleado.paterno + " " + empleado.materno;
            obsCiudadano.uidobs = obs._02uidobs;
            obsCiudadano.tipo = obs._11tipo;
            obsCiudadano.detalle = obs._09detalle;
            this.listaObsCiudadanos.push(obsCiudadano);
            return false;
          }
          return true;
        });
      });
      this.tablaObs();
    },
    getObsDetalle(id) {
      // Funcion que Muestra el detalle de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.obsDetalle.id = obs.id;
          this.obsDetalle.cif = obs._01cif;
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
    async updateObsEstado(id, estado) {
      var uObs = {
        id: 0,
        cif: 0,
        uidobs: "",
        fechainicio: "",
        fechafin: "",
        gestion: 0,
        mes: 0,
        di: 0,
        df: 0,
        detalle: "",
        imagen: "",
        tipo: "",
        hora: "",
        h: 0,
        m: 0,
        url: "",
        estado: 0,
      };
      this.listaObs.forEach((obs) => {
        if (obs.id == id) {
          (uObs.id = obs.id),
            (uObs.cif = obs._01cif),
            (uObs.uidobs = obs._02uidobs),
            (uObs.fechainicio = obs._03fechainicio),
            (uObs.fechafin = obs._04fechafin),
            (uObs.gestion = obs._05gestion),
            (uObs.mes = obs._06mes),
            (uObs.di = obs._07di),
            (uObs.df = obs._08df),
            (uObs.detalle = obs._09detalle),
            (uObs.imagen = obs._10imagen),
            (uObs.tipo = obs._11tipo),
            (uObs.hora = obs._12hora),
            (uObs.h = obs._13h),
            (uObs.m = obs._14m),
            (uObs.url = obs._15url),
            (uObs.estado = estado);
        }
      });
      await this.$swal
        .fire({
          title: "Desea Aprobar la Observacion ? ",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObs(uObs).then((response) => {
              if (response.status == 200) {
                this.$swal
                  .fire("Observacion Actualizada Corectamente", "", "success")
                  .then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire(
                  "Los Datos no fueron Guardados Error",
                  "" + response.status,
                  "error"
                );
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async updateObsEmpleado() {
      //Funcion actualizar una Observacion del Usuario
      this.$swal
        .fire({
          title: "Deseas Actualizar la Observacion de Tu Asistencia ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObsEmpleado(this.uobs).then((response) => {
              if (response.status == 200) {
                this.$swal
                  .fire(
                    "La Observacion fue Actualizada Corectamente",
                    "",
                    "success"
                  )
                  .then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire(
                  "La Observacion no pudo ser Registrada",
                  "" + response.status,
                  "error"
                );
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async updateImgEmpleado() {
      //Funcion actualizar una Observacion del Usuario
      const fromData = new FormData();
      fromData.append("archivo", this.archivo);
      try {
        await this.uploadService.addImagen(fromData).then((response) => {
          if (response.status == 200) {
            this.uobs.url = this.uploadService.getUrl() + response.data.nombre;
            this.uobs.imagen = response.data.nombre;
            this.$swal
              .fire({
                title:
                  "Desea agregar la Observacione de Asistencia a los Empleados?",
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.sccService
                    .updateObsEmpleado(this.uobs)
                    .then((response) => {
                      if (response.status == 200) {
                        this.$swal
                          .fire(
                            "El Documento fue Actualizado Corectamente ",
                            "",
                            "success"
                          )
                          .then((res) => {
                            if (res) location.reload();
                          });
                      } else {
                        this.$swal.fire(
                          "El Documento no fue Guardad Error" + response.status,
                          "",
                          "error"
                        );
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
        this.$swal.fire("El archivo no pudo ser Guardado  " + err, "error");
      }
    },
    setObs(id) {
      // Funcion que carga los datos de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.uobs.id = id;
          this.uobs.cif = obs._01cif;
          this.uobs.uidobs = obs._02uidobs;
          this.uobs.fechainicio = obs._03fechainicio;
          this.uobs.fechafin = obs._04fechafin;
          this.uobs.detalle = obs._09detalle;
          this.uobs.imagen = obs._10imagen;
          this.uobs.tipo = obs._11tipo;
          this.uobs.hora = obs._12hora;
          this.uobs.url = obs._15url;
        }
      });
      this.clickModalObsEditar(true);
    },
    setImg(id) {
      // Funcion que carga los datos de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.uobs.id = id;
          this.uobs.cif = obs._01cif;
          this.uobs.uidobs = obs._02uidobs;
          this.uobs.fechainicio = obs._03fechainicio;
          this.uobs.fechafin = obs._04fechafin;
          this.uobs.detalle = obs._09detalle;
          this.uobs.imagen = obs._10imagen;
          this.uobs.tipo = obs._11tipo;
          this.uobs.hora = obs._12hora;
          this.uobs.url = obs._15url;
        }
      });
      this.clickModalImgEditar(true);
    },
    clickModalObs(cio) {
      this.modalObs = cio;
    },
    clickModalDetalleObs(Obs) {
      this.modalDetalleObs = Obs;
    },
    clickModalObsEditar(cio) {
      this.modalObsEditar = cio;
    },
    clickModalImgEditar(cio) {
      this.modalImgEditar = cio;
    },
    moduloScc(cif) {
      this.$router.push({
        name: "ModuloSccView",
        params: {
          cifCiudadano: cif,
        },
      });
    },
    getTipo() {
      if (this.obsall.tipo == "Entrada M.") this.obsall.hora = "08:30";
      if (this.obsall.tipo == "Salida M.") this.obsall.hora = "12:30";
      if (this.obsall.tipo == "Entrada T.") this.obsall.hora = "14:30";
      if (this.obsall.tipo == "Salida T.") this.obsall.hora = "18:30";
      if (this.obsall.tipo == "continuo") this.obsall.hora = "16:30";
      if (this.obsall.tipo == "asueto") this.obsall.hora = "08:30";
    },
  },
};
</script>

<style scoped>
@import "datatables.net-dt";
</style>
