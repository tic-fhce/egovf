<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6"><label class="d-none d-md-flex me-auto">{{titulo}}</label>
            </CCol>
            <CCol :lg="6" class="text-end">
              <CDropdown variant="btn-group">
                <CDropdownToggle color="success" class="font" size="sm">
                  <CIcon icon="cil-menu" class="me-2"/>Opciones
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CButton @click="clickModalObs(true)" size="sm">
                      Agregar Observaciones
                    </CButton>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="listaObsTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UidObs</th>
                  <th>Tipo</th>
                  <th>Detalle</th>
                  <th>Alcanse</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lobs in listaObs" :key="lobs.id">
                  <th scope="row">{{ lobs.id }}</th>
                  <td>
                    <div>{{ lobs.uidobs }}</div>
                    <div class="small text-medium-emphasis">
                        <span>{{ mes[lobs.mes-1] }}</span>
                    </div>
                  </td>
                  <td>
                    <div>{{ lobs.tipo }}</div>
                    <div class="small text-medium-emphasis">
                        <span>{{ lobs.horaEntrada }}</span> |
                        {{ lobs.horaSalida }}
                    </div>
                  </td>
                  <td>{{ lobs.detalle }}
                    <div class="small text-medium-emphasis">
                        <span>{{ lobs.fechainicio }}</span> |
                        {{ lobs.fechafin }}
                    </div>
                  </td>
                  <td><h2>{{ lobs.cif }}</h2></td>
                  <td>
                      <CButtonGroup role="group">
                        <CButton color="success" class="font" size="sm" @click="getObsDetalle(lobs.id)">
                          <CIcon icon="cil-featured-playlist"></CIcon>
                        </CButton>
                        <CButton color="warning" class="font" size="sm" @click="setObs(lobs.id)">
                          <CIcon icon="cil-pencil"></CIcon>
                        </CButton>
                        <CButton color="secondary" class="font" size="sm" @click="setImg(lobs.id)">
                          <CIcon icon="cil-clipboard"></CIcon>
                        </CButton>
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
        <CModalTitle class="text-center">
          <h5>Agregar Observaciones de Asistencia</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <!--Input para Tipos de empleado-->
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select v-model="obsall.cif" class="form-control" required="true">
              <option v-for="lte in listaTipoEmpleado" :value="lte.id" :key="lte.id">
                {{ lte.detalle }}
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
            <input type="text" class="form-control" v-model="obsall.uidobs" required="true"/>
          </div>
        </div>
        <!--Input para el identificativo de observaciones-->
        <!--Input para la fecha de Inicio-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label" >Fecha de Inicio</label>
          <div class="col-8">
            <input type="date" class="form-control" v-model="obsall.fechainicio" required="true"/>
          </div>
        </div>
        <!--Input para la fecha de Inicio-->
        <!--Input para la fecha Fin-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
          <div class="col-8">
            <input type="date" class="form-control" v-model="obsall.fechafin" required="true"/>
          </div>
        </div>
        <!--Input para la fecha Fin-->
        <!--Input para el detalle de Obserbacion-->
        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Detalle</label>
          <div class="col-8">
            <textarea class="form-control" v-model="obsall.detalle" required="true"></textarea>
          </div>
        </div>
        <!--Input para el detalle de Obserbacion-->
        <!--Input para el tipo de Observacion-->
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select class="form-control" v-model="obsall.tipo" required="true" @change="getTipo()">
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
            </select>
          </div>
        </div>
        <!--Input para el tipo de Observacion-->
        <!--Input para la hora-->
        <div class="mb-3 row" v-if="mostrarHoraIngreso()"  >
              <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso</label>
              <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="obsall.horaEntrada">
              </div>
          </div>

          <div class="mb-3 row" v-if="mostrarHoraSalida()">
              <label for="datos" class="col-sm-4 col-form-label">Hora Salida</label>
              <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="obsall.horaSalida">
              </div>
          </div>
        <!--Input para la hora-->
        <!--Input para el Docuemtno-->
        <div class="mb-3 row">
          <label for="archivo" class="col-4 col-form-label">Documento</label>
          <div class="col-8">
            <input type="file" ref="obsfile" class="form-control" accept="image/png,image/jpeg" @change="selectFile()" required="true"/>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalObs(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Agregar Observaciones
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal  Obserbasiones-->

  <!-- Modal  Detalles de OBS-->
  <CModal :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
      <CModalTitle class="text-center">
        <h5>{{ obsDetalle.uidobs }}</h5>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CListGroup flush>
        <CListGroupItem><strong>ID:</strong> {{ obsDetalle.id }}</CListGroupItem>
        <CListGroupItem><strong>UID:</strong> {{ obsDetalle.uidobs }}</CListGroupItem>
        <CListGroupItem><strong>Tipo de Obs. :</strong> {{ obsDetalle.tipo }}</CListGroupItem>
        <CListGroupItem><strong>Fechas:</strong> {{ obsDetalle.fechainicio }} | {{ obsDetalle.fechafin }}</CListGroupItem>
        <CListGroupItem><strong>Horas:</strong> {{ obsDetalle.horaEntrada }} | {{ obsDetalle.horaSalida }}</CListGroupItem>
      </CListGroup>

      <CRow>
        <CCol>
          <img :src="obsDetalle.url" alt="" class="img-fluid" />
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalDetalleObs(false)" color="success" class="font">
        <CIcon icon="cil-x" class="me-2" />OK
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- END Modal  Detalles de Obs-->

  <!-- Modal Editar Obserbasiones-->
  <CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
    <form @submit.prevent="updateObs()">
      <CModalHeader class="headercolor text-center" dismiss @close="clickModalObsEditar(false)">
        <CModalTitle>
          <h5>Actualizar la Observacion de Asistencia</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>

        <!--Input para Tipos de empleado-->
        <div class="mb-3 row">
          <label for="tipo" class="col-4 col-form-label">Tipo</label>
          <div class="col-8">
            <select v-model="uobs.cif" class="form-control" required="true">
              <option v-for="lte in listaTipoEmpleado" :value="lte.id" :key="lte.id">
                {{ lte.detalle }}
              </option>
            </select>
          </div>
        </div>
        <!--Input para Tipos de empleado-->

        <!--Input para el sexo de cada empleado-->
        <div class="mb-3 row">
          <label for="sexo" class="col-4 col-form-label">Caracteristica</label>
          <div class="col-8">
            <select class="form-control" v-model="uobs.sexo" required="true">
              <option value="0">Todos</option>
              <option value="1">Femenino</option>
              <option value="2">Masculino</option>
            </select>
          </div>
        </div>
        <!--Input para el sexo de cada empleado-->

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">UID - OBS</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="uobs.uidobs" required="true" placeholder="Cite u Hoja de Ruta"  />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Fecha de Inicio</label>
          <div class="col-8">
            <input type="date" class="form-control" v-model="uobs.fechainicio" required="true" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="datos" class="col-4 col-form-label">Fecha Fin</label>
          <div class="col-8">
            <input type="date" class="form-control" v-model="uobs.fechafin" required="true"/>
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
            <select class="form-control" v-model="uobs.tipo" required="true" @change="getTipoSet()">
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
            </select>
          </div>
        </div>

        <!--Input para la hora-->
        <div class="mb-3 row" v-if="mostrarHoraIngresoSet()"  >
          <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso</label>
          <div class="col-sm-8">
              <input type="text" class="form-control" v-model="uobs.horaEntrada">
          </div>
        </div>

        <div class="mb-3 row" v-if="mostrarHoraSalidaSet()">
          <label for="datos" class="col-sm-4 col-form-label">Hora Salida</label>
          <div class="col-sm-8">
              <input type="text" class="form-control" v-model="uobs.horaSalida">
          </div>
        </div>
        <!--Input para la hora-->

        <CCol>
          <img :src="uobs.url" alt="" class="img-fluid" />
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalObsEditar(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Actualizar Observacion
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal Editar Obserbasiones-->

  <!-- Modal IMG Obserbasiones-->
  <CModal :visible="modalImgEditar" @close="clickModalImgEditar(false)">
    <form @submit.prevent="updateImg()" enctype="multipart/form-data">
      <CModalHeader class="headercolor text-center" dismiss @close="clickModalImgEditar(false)">
        <CModalTitle>
          <h5>Actualizar Imagen de Observacion</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="imagen" class="col-4 col-form-label">Documento</label>
          <div class="col-8">
            <input type="file" ref="obsfileimg" class="form-control" accept="image/png,image/jpeg" @change="selectFileImg()" required="true"/>
          </div>
        </div>
        <CCol>
          <img :src="uobs.url" alt="" class="img-fluid" />
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalImgEditar(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button class="btn btn-success font">
          <CIcon icon="cil-check-alt" class="me-2" /> Actualizar Observacion
        </button>
      </CModalFooter>
    </form>
  </CModal>
  <!-- END Modal Editar Obserbasiones-->
</template>

<script>
import UploadService from "@/services/upload/uploadService";
import SccService from "@/modules/egovf-scc/services/sccService";
import EmpleadoService from "@/modules/egovf-emp/services/empleadoService";

//Importamos Herramientas
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import $ from "jquery";

DataTable.use(DataTablesLib);

export default {
  name: "ListaObservacionesView",
  components: {},
  data() {
    return {
      titulo: "Observaciones",
      modalObs: false,
      modalDetalleObs: false,
      modalObsEditar: false,
      modalImgEditar: false,
      uploadService: null,
      sccService: null,
      empleadoService: null,
      listaGestion: [],
      listaObs: [],
      listaTipoEmpleado: [],
      gestion:0,
      archivo: "",
      mes:["Enenro","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      usuario: {
        token: "",
        cif: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        sigla: "",
        foto:"",
      },
      obsall:{
          cif:null,
          sexo:'',
          uidobs:'',
          fechainicio:'',
          fechafin:'',
          detalle:'',
          tipo:'Seleccionar Tipo',
          horaEntrada:'08:30',
          horaSalida:'18:30',
          url:''
      },
      obsDetalle: {
        id:0,
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
        estado:0
      },
      uobs: {
        id:0,
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
        estado:0
      },
    };
  },
  beforeCreate() {
    if (this.$cookies.get("cif") == null) {
      this.$router.push("/");
    }
  },
  created() {
    this.sccService = new SccService();
    this.uploadService = new UploadService();
    this.empleadoService = new EmpleadoService();
  },
  mounted() {
    this.gestion = this.$route.params.gestion;
    this.getDatos();
    this.getListaObs(this.gestion);
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
    tablaObsLista() {
      this.$nextTick(() => {
        $("#listaObsTabla").DataTable();
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
        this.usuario.foto = this.$cookies.get("foto");
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
            this.obsall.url = this.uploadService.getUrl() + response.data.nombre;
            this.obsall.imagen = response.data.nombre;
            this.$swal.fire({
                title:"Desea agregar la Observacione de Asistencia a los Empleados?",
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.sccService.addObsAll(this.obsall).then((response) => {
                    if (response.status == 200) {
                      this.$swal.fire("Las Observaciones fueron Agregados Corectamente ","","success").then((res) => {
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
    },
    async getListaObs(rgestion) {
      try {
          const response = await this.sccService.getListaObs(rgestion);
          if (response && response.data) {
              this.listaObs = response.data;
              this.tablaObsLista(); // Llamar a tablaObs() solo después de recibir los datos
          } else {
              console.warn("No se recibieron datos en la respuesta.");
          }
      } catch (error) {
          console.error("Error al obtener la lista de observaciones:", error);
      }
      },
    getObsDetalle(id) {
      // Funcion que Muestra el detalle de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.obsDetalle.id = obs.id,
          this.obsDetalle.cif= obs.cif,
          this.obsDetalle.sexo= obs.sexo,
          this.obsDetalle.uidobs= obs.uidobs,
          this.obsDetalle.fechainicio= obs.fechainicio,
          this.obsDetalle.fechafin= obs.fechafin,
          this.obsDetalle.gestion= obs.gestion,
          this.obsDetalle.mes= obs.mes,
          this.obsDetalle.di= obs.di,
          this.obsDetalle.df= obs.df,
          this.obsDetalle.detalle= obs.detalle,
          this.obsDetalle.imagen= obs.imagen,
          this.obsDetalle.tipo= obs.tipo,
          this.obsDetalle.horaEntrada= obs.horaEntrada,
          this.obsDetalle.hentrada= obs.hentrada,
          this.obsDetalle.mentrada= obs.mentrada,
          this.obsDetalle.horaSalida= obs.horaSalida,
          this.obsDetalle.hsalida= obs.hsalida,
          this.obsDetalle.msalida= obs.msalida,
          this.obsDetalle.url= obs.url,
          this.obsDetalle.estado= obs.estado
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
            uObs.id = obs.id,
            uObs.cif = obs.cif,
            uObs.uidobs = obs.uidobs,
            uObs.fechainicio = obs.fechainicio,
            uObs.fechafin = obs.fechafin,
            uObs.gestion = obs.gestion,
            uObs.mes = obs.mes,
            uObs.di = obs.di,
            uObs.df = obs.df,
            uObs.detalle = obs.detalle,
            uObs.imagen = obs.imagen,
            uObs.tipo = obs.tipo,
            uObs.hora = obs.hora,
            uObs.h = obs.h,
            uObs.m = obs.m,
            uObs.url = obs.url,
            uObs.estado = estado
        }
      });
      await this.$swal.fire({
          title: "Desea Aprobar la Observacion ? ",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObs(uObs).then((response) => {
              if (response.status == 200) {
                this.$swal.fire("Observacion Actualizada Corectamente", "", "success").then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire("Los Datos no fueron Guardados Error","" + response.status,"error");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async updateObs() {
      //Funcion actualizar una Observacion del Usuario
      this.$swal.fire({
          title: "Deseas Actualizar la Observacion de Tu Asistencia ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObs(this.uobs).then((response) => {
              if (response.status == 200) {
                this.$swal.fire("La Observacion fue Actualizada Corectamente","","success").then((res) => {
                    if (res) location.reload();
                  });
              } else {
                this.$swal.fire("La Observacion no pudo ser Registrada","" + response.status,"error");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async updateImg() {
      //Funcion actualizar una Observacion del Usuario
      const fromData = new FormData();
      fromData.append("archivo", this.archivo);
      try {
        await this.uploadService.addImagen(fromData).then((response) => {
          if (response.status == 200) {
            this.uobs.url = this.uploadService.getUrl() + response.data.nombre;
            this.uobs.imagen = response.data.nombre;
            this.$swal.fire({
                title:"Desea agregar la Observacione de Asistencia a los Empleados?",
                showDenyButton: true,
                icon: "info",
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.sccService.updateObs(this.uobs).then((response) => {
                      if (response.status == 200) {
                        this.$swal.fire("El Documento fue Actualizado Corectamente ","","success").then((res) => {
                            if (res) location.reload();
                          });
                      } else {
                        this.$swal.fire("El Documento no fue Guardad Error" + response.status,"","error");
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
          this.uobs.id = obs.id,
          this.uobs.cif= obs.cif,
          this.uobs.sexo= obs.sexo,
          this.uobs.uidobs= obs.uidobs,
          this.uobs.fechainicio= obs.fechainicio,
          this.uobs.fechafin= obs.fechafin,
          this.uobs.gestion= obs.gestion,
          this.uobs.mes= obs.mes,
          this.uobs.di= obs.di,
          this.uobs.df= obs.df,
          this.uobs.detalle= obs.detalle,
          this.uobs.imagen= obs.imagen,
          this.uobs.tipo= obs.tipo,
          this.uobs.horaEntrada= obs.horaEntrada,
          this.uobs.hentrada= obs.hentrada,
          this.uobs.mentrada= obs.mentrada,
          this.uobs.horaSalida= obs.horaSalida,
          this.uobs.hsalida= obs.hsalida,
          this.uobs.msalida= obs.msalida,
          this.uobs.url= obs.url,
          this.uobs.estado= obs.estado
        }
      });
      this.clickModalObsEditar(true);
    },
    setImg(id) {
      // Funcion que carga los datos de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.uobs.id = id;
          this.uobs.uidobs = obs.uidobs;
          this.uobs.fechainicio = obs.fechainicio;
          this.uobs.fechafin = obs.fechafin;
          this.uobs.detalle = obs.detalle;
          this.uobs.imagen = obs.imagen;
          this.uobs.tipo = obs.tipo;
          this.uobs.url = obs.url;
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
    getTipo(){
          if(this.obsall.tipo == 'Entrada M.')
              this.obsall.horaEntrada = '08:30';
          if(this.obsall.tipo == 'Salida M.')
              this.obsall.horaSalida = '12:30';
          if(this.obsall.tipo == 'Entrada T.')
              this.obsall.horaEntrada = '14:30';
          if(this.obsall.tipo == 'Salida T.')
              this.obsall.horaSalida = '18:30';
          if(this.obsall.tipo == 'continuo')
              this.obsall.horaSalida = '16:30';
          if(this.obsall.tipo == 'continuoingreso'){
              this.obsall.horaEntrada = '08:30';
              this.obsall.horaSalida = '16:30';
          }
          if(this.obsall.tipo == 'asueto')
              this.obsall.horaEntrada = '08:30';
      },
      getTipoSet(){
          if(this.uobs.tipo == 'Entrada M.')
              this.uobs.horaEntrada = '08:30';
          if(this.uobs.tipo == 'Salida M.')
              this.uobs.horaSalida = '12:30';
          if(this.uobs.tipo == 'Entrada T.')
              this.uobs.horaEntrada = '14:30';
          if(this.uobs.tipo == 'Salida T.')
              this.uobs.horaSalida = '18:30';
          if(this.uobs.tipo == 'continuo')
              this.uobs.horaSalida = '16:30';
          if(this.uobs.tipo == 'continuoingreso'){
              this.uobs.horaEntrada = '08:30';
              this.uobs.horaSalida = '16:30';
          }
          if(this.uobs.tipo == 'asueto')
              this.uobs.horaEntrada = '08:30';
      },
      mostrarHoraIngreso() {
          const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
          return tiposPermitidos.includes(this.obsall.tipo);
      },
      mostrarHoraSalida() {
          const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
          return tiposPermitidos.includes(this.obsall.tipo);
      },

      mostrarHoraIngresoSet() {
          const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
          return tiposPermitidos.includes(this.uobs.tipo);
      },
      mostrarHoraSalidaSet() {
          const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
          return tiposPermitidos.includes(this.uobs.tipo);
      }
  },
};
</script>

<style scoped>
@import "datatables.net-dt";
</style>