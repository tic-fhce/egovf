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
                  <th>UidObs</th>
                  <th>Tipo</th>
                  <th>Detalle</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lsobs in listaObsCiudadanos" :key="lsobs.id">
                  <th scope="row">{{ lsobs.id }}</th>
                  <td>
                    <div>{{ lsobs.cif }}</div>
                    <div class="small text-medium-emphasis">
                        <span>{{ lsobs.nombre }}</span>
                    </div>
                  </td>
                  <td>{{ lsobs.uidobs }}</td>
                  <td>
                    <div>{{ lsobs.tipo }}</div>
                    <div class="small text-medium-emphasis">
                        <span>{{ lsobs.horas }}</span>
                    </div>
                  </td>
                  <td>
                    <div>{{ lsobs.detalle }}</div>
                    <div class="small text-medium-emphasis">
                        <span>{{ lsobs.fechas }}</span>
                    </div>
                  </td>
                  <td>
                    <CButtonGroup role="group">
                      <CButton color="success" class="font" size="sm" @click="getObsDetalle(lsobs.id)">
                        <CIcon icon="cil-featured-playlist"></CIcon>
                      </CButton>
                      <CButton color="warning" class="font" size="sm" @click="setObs(lsobs.id)">
                        <CIcon icon="cil-pencil"></CIcon>
                      </CButton>
                      <CButton color="dark" class="font" size="sm" @click="setImg(lsobs.id)">
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
            <label for="datos" class="col-sm-4 col-form-label">Hora Salida</label>
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
//Importamos Componentes
import ComponenteObs from "@/modules/egovf-scc/components/ComponenteObs.vue";

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
  name: "ObsView",
  components: {
    ComponenteObs,
  },
  data() {
    return {
      titulo: "Observaciones de los Empleados",
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
      color:'',
      estado:'',
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
      uobs: {
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
        estado:0
      }
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
        this.usuario.foto = this.$cookies.get("foto");
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
      this.getListaObsEmpleado(rgestion);
    },
    async getListaObsEmpleado(rgestion) {
      await this.sccService.getListaObsEmpleado(rgestion).then((response) => {
        this.listaObs = response.data;
      });
      this.getListaCiudadanoEmpleado();
    },
    async getListaTipoEmpleado() {
      // Funcion para listar El tipo de Empleado
      await this.empleadoService.getListaTipoEmpleado().then((response) => {
        this.listaTipoEmpleado = response.data;
      });
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
            idObs:0,
            cif: 0,
            nombre: "",
            uidobs: "",
            tipo: "",
            detalle: "",
            fechas:"",
            horas:"",

          };
          if (empleado.cif == obs.cif) {
            obsCiudadano.id = obs.id;
            obsCiudadano.idObs = obs.idObs;
            obsCiudadano.cif = obs.cif;
            obsCiudadano.nombre =
              empleado.nombre + " " + empleado.paterno + " " + empleado.materno;
            obsCiudadano.uidobs = obs.uidobs;
            obsCiudadano.tipo = obs.tipo;
            obsCiudadano.detalle = obs.detalle;
            obsCiudadano.fechas = obs.fechainicio+" | "+obs.fechafin;
            obsCiudadano.horas = obs.horaEntrada+" | "+obs.horaSalida;
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
          this.obsDetalle.id=obs.id;
          this.obsDetalle.idObs=obs.idObs;
          this.obsDetalle.cif=obs.cif;
          this.obsDetalle.sexo=obs.sexo;
          this.obsDetalle.uidobs=obs.uidobs;
          this.obsDetalle.fechainicio=obs.fechainicio;
          this.obsDetalle.fechafin=obs.fechafin;
          this.obsDetalle.gestion=obs.gestion;
          this.obsDetalle.mes=obs.mes;
          this.obsDetalle.di=obs.di;
          this.obsDetalle.df=obs.df;
          this.obsDetalle.detalle=obs.detalle;
          this.obsDetalle.imagen=obs.imagen;
          this.obsDetalle.tipo=obs.tipo;
          this.obsDetalle.horaEntrada=obs.horaEntrada;
          this.obsDetalle.hentrada=obs.hentrada;
          this.obsDetalle.mentrada=obs.mentrada;
          this.obsDetalle.horaSalida=obs.horaSalida;
          this.obsDetalle.hsalida=obs.hsalida;
          this.obsDetalle.msalida=obs.msalida;
          this.obsDetalle.url=obs.url;
          this.obsDetalle.estado=obs.estado;

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
      this.listaObsCiudadanos.forEach((ciudadano)=>{
        if(ciudadano.cif == this.obsDetalle.cif){
          this.obsDetalle.datos.cif=ciudadano.cif;
          this.obsDetalle.datos.nombre=ciudadano.nombre;
          return true;
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
          this.uobs.id=obs.id;
          this.uobs.idObs=obs.idObs;
          this.uobs.cif=obs.cif;
          this.uobs.sexo=obs.sexo;
          this.uobs.uidobs=obs.uidobs;
          this.uobs.fechainicio=obs.fechainicio;
          this.uobs.fechafin=obs.fechafin;
          this.uobs.gestion=obs.gestion;
          this.uobs.mes=obs.mes;
          this.uobs.di=obs.di;
          this.uobs.df=obs.df;
          this.uobs.detalle=obs.detalle;
          this.uobs.imagen=obs.imagen;
          this.uobs.tipo=obs.tipo;
          this.uobs.horaEntrada=obs.horaEntrada;
          this.uobs.hentrada=obs.hentrada;
          this.uobs.mentrada=obs.mentrada;
          this.uobs.horaSalida=obs.horaSalida;
          this.uobs.hsalida=obs.hsalida;
          this.uobs.msalida=obs.msalida;
          this.uobs.url=obs.url;
          this.uobs.estado=obs.estado;
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
    moduloScc(cif) {
      this.$router.push({
        name: "ModuloSccView",
        params: {
          cifCiudadano: cif,
        },
      });
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
  },
};
</script>

<style scoped>
@import "datatables.net-dt";
</style>
