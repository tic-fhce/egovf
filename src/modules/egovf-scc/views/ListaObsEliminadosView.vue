<template>
  <CRow>

    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between">
          <div class="align-items-center">
            <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
            <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
          </div>
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
                      <CButton color="success" class="font" size="sm" @click="getObsDetalle(lsobs.id)">
                        <CIcon icon="cil-featured-playlist"></CIcon>
                      </CButton>
                      <CButton color="warning" class="font" size="sm" @click="setObs(lsobs.id)">
                        <CIcon icon="cil-pencil"></CIcon>
                      </CButton>
                      <CButton color="secondary" class="font" size="sm" @click="setImg(lsobs.id)">
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


  <!-- Modal  Detalles de OBS-->
  <CModal :visible="modalDetalleObs" @close="clickModalDetalleObs(false)">
    <CModalHeader class="headercolor" dismiss @close="clickModalDetalleObs(false)">
      <CModalTitle>
        <h5>Detalles de la Observacion</h5>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3 row">
        <h4 class="card-title">CIF : {{ obsDetalle.cif }}</h4>
      </div>
      <hr>
      <CRow class="mb-2">
        <CCol><strong>ID:</strong></CCol>
        <CCol>{{ obsDetalle.id }}</CCol>
      </CRow>
      <hr>
      <CRow class="mb-2">
        <CCol><strong>UID:</strong></CCol>
        <CCol>{{ obsDetalle.uidobs }}</CCol>
      </CRow>
      <hr>
      <CRow class="mb-2">
          <CCol><strong>Fecha Inicio:</strong></CCol>
          <CCol>{{ obsDetalle.fechainicio }}</CCol>
          <CCol><strong>Fecha Fin:</strong></CCol>
          <CCol>{{ obsDetalle.fechafin }}</CCol>
      </CRow>
      <hr>
      <CRow class="mb-2">
          <CCol><strong>Detalle:</strong></CCol>
          <CCol>{{ obsDetalle.detalle }}</CCol>
      </CRow>
      <hr>
      <CRow class="mb-2">
          <CCol><strong>Tipo de Obs. :</strong></CCol>
          <CCol>{{ obsDetalle.tipo }}</CCol>
      </CRow>
      <CRow class="mb-2">
          <CCol><strong>Hora Entrada:</strong></CCol>
          <CCol>{{ obsDetalle.horaEntrada }}</CCol>
          <CCol><strong>Hora Salida:</strong></CCol>
          <CCol>{{ obsDetalle.horaSalida }}</CCol>
      </CRow>
      <CRow>
        <CAlert color="success" v-if="obsDetalle.estado === 1">Aprobado</CAlert>
        <CAlert color="warning" v-if="obsDetalle.estado === 0">En Espera</CAlert>
      </CRow>

      <CRow>  
        <CCol>
          <img :src="obsDetalle.url" alt="" class="img-fluid" />
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalDetalleObs(false)" color="danger" class="font">
        <CIcon icon="cil-x" class="me-2" />Cancelar
      </CButton>
      <CButton @click="updateObsBio(obsDetalle.id, 0)" color="success" class="font">
        <CIcon icon="cil-check-alt" class="me-2" />Restaurar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- END Modal  Detalles de Obs-->

  <!-- Modal Editar Obserbasiones-->
  <CModal :visible="modalObsEditar" @close="clickModalObsEditar(false)">
    <form @submit.prevent="updateObsEmpleado()">
      <CModalHeader class="headercolor text-center" dismiss @close="clickModalObsEditar(false)">
        <CModalTitle>
          <h5>Actualizar la Observacion de Asistencia</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row">
          <label for="cif" class="col-4 col-form-label">CIF</label>
          <div class="col-8">
            <input type="text" class="form-control" v-model="uobs.cif" required="true" placeholder="CIF"/>
          </div>
        </div>

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
            <select class="form-control" v-model="uobs.tipo" required="true" @change="getUTipo()">
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

        <div class="mb-3 row" v-if="mostrarUHoraIngreso()"  >
            <label for="datos" class="col-sm-4 col-form-label">Hora Ingreso</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="uobs.horaEntrada">
            </div>
        </div>

        <div class="mb-3 row" v-if="mostrarUHoraSalida()">
            <label for="datos" class="col-sm-4 col-form-label">Hora Salida{{ uobs.horaEntrada }}</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="uobs.horaSalida">
            </div>
        </div>
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
    <form @submit.prevent="updateImgEmpleado()" enctype="multipart/form-data">
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
import EgovfService from "@/modules/egovf/services/egovfService";
import UploadService from "@/services/upload/uploadService";
import EmpleadoService from "@/modules/egovf-emp/services/empleadoService";
import SccService from "@/modules/egovf-scc/services/sccService";

//Importamos Herramientas
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import $ from "jquery";

DataTable.use(DataTablesLib);

export default {
  name: "ListaObsEliminadosView",
  components: {},
  data() {
    return {
      titulo: "Observaciones Eliminadas",
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
      tipo:0,
      gestion:0,
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
        foto:"",
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
        idObs:0,
        cif: 0,
        uidobs: "",
        fechainicio: "",
        fechafin: "",
        detalle: "",
        imagen: "",
        tipo: "",
        horaEntrada: "",
        horaSalida: "",
        url: "",
        estado: 0
      },
      uobs: {
        id:0,
        idObs:0,
        cif:null,
        sexo:0,
        uidobs:'',
        fechainicio:'',
        fechafin:'',
        detalle:'',
        imagen:'',
        tipo:'',
        horaEntrada:'',
        horaSalida:'',
        url:'',
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
    this.egovfService = new EgovfService();
    this.sccService = new SccService();
    this.uploadService = new UploadService();
    this.empleadoService = new EmpleadoService();
  },
  mounted() {
    this.getDatos();
    this.getsolicitudEliminada();
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
        this.usuario.foto = this.$cookies.get("foto");
      }
    },
    async getsolicitudEliminada() {
      // funcion que crea una lista de Solicitudes Eliminadas
      let loadingAlert = null;

      try{
        loadingAlert = this.$swal.fire({
          title: 'Cargando Solicitudes de Empleados',
          html: 'Procesando datos, por favor espere...',
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading();
          }
        });
        this.$nprogress.start();

        const response = await this.sccService.getListaObsEliminado()
        this.listaObs = response.data;

        const responseEmpleado = await this.egovfService.getListaEmpleado();
        this.listaCiudadanoEmpleado = responseEmpleado.data;

        this.getListaObsCiudadano();

        this.$swal.close();

        // Mostrar éxito
        this.$swal.fire({
          icon: 'success',
          title: '¡Completado!',
          text: `Se procesaron ${this.listaObsCiudadanos.length} Solicitudes`,
          timer: 2000,
          showConfirmButton: false
        });

      }catch(error){
        if (loadingAlert) {
          this.$swal.close();
        }

        // Mostrar error
        this.$swal.fire({
          icon: 'error',
          title: 'Error en la carga',
          text: error.message || 'Ocurrió un error al procesar los datos',
          confirmButtonText: 'Reintentar'
        });

      }finally{
        this.$nprogress.done();
      }
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
            estado:0
          };
          if (empleado.cif == obs.cif) {
            obsCiudadano.id = obs.id;
            obsCiudadano.cif = obs.cif;
            obsCiudadano.nombre =
              empleado.nombre + " " + empleado.paterno + " " + empleado.materno;
            obsCiudadano.uidobs = obs.uidobs;
            obsCiudadano.tipo = obs.tipo;
            obsCiudadano.detalle = obs.detalle;
            obsCiudadano.estado = obs.estado;
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
          this.obsDetalle.idObs=obs.idObs;
          this.obsDetalle.cif = obs.cif;
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
        }
      });
      this.clickModalDetalleObs(true);
    },
    async updateObsBio(id, estado) {
      var uObs = {
        id: 0,
        cif: 0,
        idObs:0,
        horaEntrada: "",
        horaSalida: "",
        hEntrada: 0,
        hSalida: 0,
        mEntrada: 0,
        mSalida:0,
        estado:0
      };
      this.listaObs.forEach((obs) => {
        if (obs.id == id) {
          uObs.id = obs.id,
          uObs.cif = obs.cif,
          uObs.idObs = obs.idObs,
          uObs.horaEntrada = obs.horaEntrada,
          uObs.hEntrada = obs.hEntrada,
          uObs.mEntrada = obs.mEntrada,
          uObs.horaSalida = obs.horaSalida,
          uObs.hSalida = obs.hSalida,
          uObs.mSalida = obs.mSalida,
          uObs.estado = estado
        }
      });
      await this.$swal.fire({
          title:"Desea Aprobar la Observacion  ? ",
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
    async updateObsEmpleado() {
      //Funcion actualizar una Observacion del Usuario
      this.$swal.fire({
          title: "Deseas Actualizar la Observacion de Tu Asistencia ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.sccService.updateObsEmpleado(this.uobs).then((response) => {
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
    async updateImgEmpleado() {
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
                  this.sccService.updateObsEmpleado(this.uobs).then((response) => {
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
          this.uobs.id = id;
          this.uobs.idObs = obs.idObs;
          this.uobs.cif = obs.cif;
          this.uobs.sexo = obs.sexo;
          this.uobs.uidobs = obs.uidobs;
          this.uobs.fechainicio = obs.fechainicio;
          this.uobs.fechafin = obs.fechafin;
          this.uobs.detalle = obs.detalle;
          this.uobs.imagen = obs.imagen;
          this.uobs.tipo = obs.tipo;
          this.uobs.horaEntrada = obs.horaEntrada;
          this.uobs.horaSalida = obs.horaSalida;
          this.uobs.url = obs.url;
          this.uobs.estado = obs.estado;
        }
      });
      this.clickModalObsEditar(true);
    },
    setImg(id) {
      // Funcion que carga los datos de las Observaciones del Usuario
      this.listaObs.forEach((obs) => {
        if (obs.id === id) {
          this.uobs.id = id;
          this.uobs.idObs = obs.idObs;
          this.uobs.cif = obs.cif;
          this.uobs.sexo = obs.sexo;
          this.uobs.uidobs = obs.uidobs;
          this.uobs.fechainicio = obs.fechainicio;
          this.uobs.fechafin = obs.fechafin;
          this.uobs.detalle = obs.detalle;
          this.uobs.imagen = obs.imagen;
          this.uobs.tipo = obs.tipo;
          this.uobs.horaEntrada = obs.horaEntrada;
          this.uobs.horaSalida = obs.horaSalida;
          this.uobs.url = obs.url;
          this.uobs.estado = obs.estado;
        }
      });
      this.clickModalImgEditar(true);
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
    getUTipo(){
        if(this.uobs.tipo == 'Entrada M.')
            this.uobs.horaEntrada = '08:30';
        if(this.uobs.tipo == 'Salida M.')
            this.uobs.horaSalida = '12:30';
        if(this.uobs.tipo == 'Entrada T.')
            this.uobs.horaEntrada = '14:30';
        if(this.uobs.tipo == 'Salida T.')
            this.uobs.horaSalida = '18:30';
        if(this.uobs.tipo == 'continuo'){
            this.uobs.horaEntrada = '08:30';
            this.uobs.horaSalida = '16:30';
        }
        if(this.uobs.tipo == 'continuoingreso'){
            this.uobs.horaEntrada = '08:30';
            this.uobs.horaSalida = '16:30';
        }
        if(this.uobs.tipo == 'asueto')
            this.uobs.horaEntrada = '08:30';
    },
    mostrarUHoraIngreso() {
        const tiposPermitidos = ["continuoingreso", "Entrada M.", "Entrada T.","horas","extraordinario","comision","permiso"];
        return tiposPermitidos.includes(this.uobs.tipo);
    },
    mostrarUHoraSalida() {
        const tiposPermitidos = ["continuoingreso","continuo", "Salida M.", "Salida T."];
        return tiposPermitidos.includes(this.uobs.tipo);
    },
  },
};
</script>

<style scoped>
@import "datatables.net-dt";
</style>
