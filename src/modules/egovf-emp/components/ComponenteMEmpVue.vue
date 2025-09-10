<template>
  <CRow>
    <CCol :lg="12">
      <CCard>
        <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
            <label class="mb-0 fs-6 text-white">{{ titulo }}</label>
          </div>
          <CDropdown variant="btn-group">
            <CDropdownToggle color="dark" class="font border-0 shadow-sm" size="sm">
              <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>
                <CButton @click="clickModalModulo(true)" size="sm"><CIcon icon="cil-plus"  class="me-2" /> Agregar Modulo</CButton>
                </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem>
                <CButton @click="clickModalContrato(true)" size="sm"><CIcon icon="cil-plus" class="me-2" /> Agregar Contrato</CButton>
                </CDropdownItem>
              
                <CDropdownDivider />
              <CDropdownItem>
                <CButton @click="getModuloMenu()" size="sm"><CIcon icon="cil-menu" class="me-2" />Empleado</CButton>
                </CDropdownItem>


            </CDropdownMenu>
          </CDropdown>
        </CCardHeader>

        <CCardBody>
          <CCol :xs="12">
              <CWidgetStatsB class="mb-3" :progress="{ color: esFechaPasada(empleado.salida),value:this.total}">
                <template #text>
                  <CAlert :color="esFechaPasada(empleado.salida)" class="py-1 my-0 d-inline-block">
                      Fecha de Culminacion : {{ empleado.salida }}
                  </CAlert>
                  {{ this.total }} %
                  <CButton v-if="this.total===100" color="danger" class="font" size="sm" @click="updateEstado()" >Eliminar Empleado</CButton>
                </template>
                <template #title>Inicio del Contrato : {{ empleado.fecha }}</template>
                <template #value>{{ empleado.empleado }} </template>
              </CWidgetStatsB>            
          </CCol>

          <!-- Tarjetas de Empleado-->
          <CCol :xs="12">
            <CNav variant="tabs" class="nav nav-tabs">
              <CNavItem><CNavLink :active="tab == 1" @click="clicktab(1)">
                <CButton size="sm"><CIcon icon="cil-command"></CIcon>
                  <label class="d-none d-md-flex me-auto">Modulos</label>
                </CButton>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink :active="tab == 2" @click="clicktab(2)">
                <CButton size="sm">
                  <CIcon icon="cil-handshake"></CIcon>
                  <label class="d-none d-md-flex me-auto">Contratos</label>
                  </CButton>
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <!--Modulos del Empleado-->
              <CTabPane :visible="tab == 1">
                <CRow>
                  <CCol :lg="3" class="text-center" v-for="l in listaModuloCif" :key="l.id">
                    <br />
                    <CCard>
                      <CCardHeader class="headercolor text-center">{{l.nombre}}</CCardHeader>
                      <CCardBody class="text-center">
                        <CIcon customClassName="nav-icon" :icon="l.imagen" class="menuicon"/>
                        <CCardSubtitle class="mb-2 text-body-secondary">{{l.detalle}}</CCardSubtitle> 
                      </CCardBody>
                      <CCardFooter class="text-center">
                        <CButton color="success" size="sm" class="font" @click="getModulo(l.ruta)">{{ l.nombre }}</CButton>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                </CRow>
              </CTabPane>
              <!--Modulos del Empleado-->

              <!--Contratos del Empleado-->
              <CTabPane :visible="tab == 2">
                <br />
                <CCol :xs="12" class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>N° Contrato</th>
                        <th>Servicio</th>
                        <th>Cargo</th>
                        <th>Detalle</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="contrato in contratos" :key="contrato.id">
                        <td>{{ contrato.id }}</td>
                        <td>
                          {{ contrato.numero_contrato }}<br />
                          <label class="small text-medium-emphasis">{{ contrato.unidad }}</label>
                        </td>
                        <td>
                          {{ contrato.servicio }}
                          <CProgress thin color="success" :value="100"/>
                          <div class="clearfix">
                            <div class="float-start">
                              <strong>{{ contrato.gestion }}</strong>
                            </div>
                            <div class="float-end">
                              <small class="text-medium-emphasis">
                                {{ contrato.inicio }} | {{ contrato.fin }}
                              </small>
                            </div>
                          </div>

                        </td>
                        <td>{{ contrato.cargo }}</td>
                        <td>{{ contrato.detalle }}</td>
                        <td>
                          <CButton
                            color="warning"
                            class="font"
                            size="sm"
                            @click="getContrato(contrato.id)"
                            ><CIcon icon="cil-pencil"></CIcon
                          ></CButton>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                </CCol>
              </CTabPane>
              <!--Contratos del Empleado-->

            </CTabContent>
          </CCol>
          <!-- End Tarjetas de Empleado-->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Modulo-->
  <CModal :visible="modalModulo" @close="clickModalModulo(false)">
    <CForm @submit.prevent="addEmpleadoModulo()">
      <CModalHeader class="headercolor" dismiss @close="clickModalModulo(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-medical-cross"  class="me-2" /> Agregar Modulos</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="datos" />
        <hr />
        <CInputGroup class="mb-3">
          <CInputGroupText as="label" >Modulo</CInputGroupText>
          <CFormSelect v-model="id_modulo" :model-value="String(id_modulo)"  @update:model-value="id_modulo = Number($event)" required="true">
            <option v-for="lm in listaModulo" :value="lm.id" :key="lm.id">
              {{ lm.detalle }}
            </option>
          </CFormSelect>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalModulo(false)" color="danger" size="sm" class="font"
          ><CIcon icon="cil-x" class="me-2" />Cancelar</CButton>
        <CButton type="submit" color="success" size="sm" class="font">
          <CIcon icon="cil-check-alt" class="me-2" />Agregar Modulo
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Modulo-->

  <!-- Modal  Contrato-->
  <CModal  :visible="modalContrato" @close="clickModalContrato(false)">
    <CForm @submit.prevent="addContrato()">
      <CModalHeader class="headercolor" dismiss @close="clickModalContrato(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-clipboard" class="me-2" size="lg"/> Agregar Contrato</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="datos" />
        <hr />
        
        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Numero de Contrato</CInputGroupText>
          <CFormInput type="text" v-model="contrato.numerocontrato" placeholder="Numero de contrato" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Servicios Prestados</CInputGroupText>
          <CFormTextarea  v-model="contrato.servicio" required="true" rows="5"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Cargo</CInputGroupText>
          <CFormInput type="text" v-model="contrato.cargo" placeholder="Cargo del Empleado" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" >Tipo de Empleado</CInputGroupText>
          <CFormSelect v-model="contrato.idTipoEmpleado" :model-value="String(contrato.idTipoEmpleado)"  @update:model-value="contrato.idTipoEmpleado = Number($event)" required="true">
            <option v-for="lte in listaTipoEmpleado" :value="lte.id" :key="lte.id">
              {{ lte.detalle }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" >Unidad</CInputGroupText>
          <CFormSelect v-model="contrato.unidad" :model-value="String(contrato.unidad)" required="true">
            <option></option>
            <option v-for="unidad in listaUnidades" :value="unidad.unidad" :key="unidad.id">
              {{ unidad.unidad }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Fecha de Inicio</CInputGroupText>
          <CFormInput type="date" v-model="contrato.inicio" placeholder="Inicio" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Fecha de Conclucion</CInputGroupText>
          <CFormInput type="date" v-model="contrato.fin" placeholder="Inicio" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormInput type="text" v-model="contrato.detalle" placeholder="Detalle del Contrato" required="true"/>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalContrato(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar</CButton>
        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />Agregar Contrato
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Contrato-->

  <!-- Modal  Editar Contrato-->
  <CModal :visible="modalEditarContrato" @close="clickModalEditarContrato(false)">
    <CForm @submit.prevent="updateContrato()">
      <CModalHeader class="headercolor" dismiss @close="clickModalEditarContrato(false)">
        <CModalTitle>
          <h6><CIcon icon="cil-pencil" class="me-2" />Editar Contrato</h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <ComponenteNombres :datos="datos" />
        <hr />

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Numero de Contrato</CInputGroupText>
          <CFormInput type="text" v-model="setContrato.numerocontrato" placeholder="Numero de contrato" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText  as="label">Servicios Prestados</CInputGroupText>
          <CFormTextarea  v-model="setContrato.servicio" required="true" rows="5"> </CFormTextarea>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Cargo </CInputGroupText>
          <CFormInput type="text" v-model="setContrato.cargo" placeholder="Cargo del empleado" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" >Tipo de Empleado</CInputGroupText>
          <CFormSelect v-model="setContrato.idTipoEmpleado" :model-value="String(setContrato.idTipoEmpleado)"  @update:model-value="setContrato.idTipoEmpleado = Number($event)" required="true">
            <option v-for="lte in listaTipoEmpleado" :value="lte.id" :key="lte.id">
              {{ lte.detalle }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label" >Unidad</CInputGroupText>
          <CFormSelect v-model="setContrato.unidad" :model-value="String(setContrato.unidad)" required="true">
            <option v-for="unidad in listaUnidades" :value="unidad.unidad" :key="unidad.id">
              {{ unidad.unidad }}
            </option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Fecha de Inicio  </CInputGroupText>
          <CFormInput type="date" v-model="setContrato.inicio" placeholder="Fecha de Inicio" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Fecha de Conclucion  </CInputGroupText>
          <CFormInput type="date" v-model="setContrato.fin" placeholder="Fecha Fin" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Gestion </CInputGroupText>
          <CFormInput type="text" v-model="setContrato.gestion" placeholder="Gestion" required="true"/>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Detalle</CInputGroupText>
          <CFormInput type="text" v-model="setContrato.detalle" placeholder="Detalle del Contrato" required="true"/>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalEditarContrato(false)" color="danger" class="font" size="sm" >
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" color="success" class="font" size="sm"><CIcon icon="cil-check-alt" class="me-2" />Actualizar Contrato</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Editar Contrato-->
</template>

<script>
//Importamos Componentes
import ComponenteNombres from "@/modules/egovf/components/Ciudadano/ComponenteNombres.vue";

// Importamos  los Servicios
import UsuarioService from "@/modules/egovf/services/usuarioService";
import EmpleadoService from "@/modules/egovf-emp/services/empleadoService";
import UnidadService from "@/modules/egovf-uni/services/unidadService";
import MenuService from "@/modules/egovf/services/menuService";
import SccService from "@/modules/egovf-scc/services/sccService";
import ModuloService from "@/modules/egovf/services/moduloService";
import { CDropdown } from "@coreui/vue";

// End

export default {
  name: "ComponenteMEmpVue",
  props: ["emp"],
  components: {
    ComponenteNombres,
    CDropdown,
  },
  data() {
    return {
      titulo:'Modulos Del Empleado',
      modalModulo: false,
      modalContrato: false,
      modalEditarContrato: false,
      empleadoService: null,
      unidadService: null,
      usuarioService: null,
      moduloService: null,
      sccService: null,
      menuService: null,
      listaModulo: [],
      listaModuloCif: [],
      listaTipoEmpleado: [],
      listaUnidades: [],
      id_modulo: 0,
      id_tipoEmpleado: 0,
      contratos: [],
      total:0,
      menu: {
        id: 0,
        titulo: "",
        icono: "",
        menuObj: [],
      },
      getPB: true,
      tab: 1,
      empleado: {
        id: 0,
        cif: 0,
        empleado: "",
        tipoempleado_id: 0,
        fecha: "",
        estado: 0,
        salida: "",
        contratos: [],
      },
      usuario: {
        token: "",
        cif: "",
        correo: "",
        celular: "",
        pass: "",
        unidad: "",
        sigla: "",
        foto:""
      },
      empleado_modulo: {
        cif: 0,
        id_modulo: 0,
      },
      contrato: {
        cif: 0,
        id: 0,
        numerocontrato: "AREA.DESC.CONT.N.",
        servicio: "CONTRATO ADMINISTRATIVO PARA LA PRESTACIÓN DE SERVICIOS CONSULTOR INDIVIDUAL DE LINEA",
        unidad: "",
        inicio: "",
        fin: "",
        gestion: 0,
        detalle: "",
        idTipoEmpleado:0,
        cargo:"",
        foto:""
      },
      setContrato: {
        id: 0,
        cif: 0,
        empleado: 0,
        numerocontrato: "",
        servicio: "",
        unidad: "",
        inicio: "",
        fin: "",
        gestion: 0,
        detalle: "",
        idTipoEmpleado:0,
        cargo:"",
        foto:""
      },
      unidad: {
        id: 0,
        unidad: "",
        dependencia: "",
        sigla: "",
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
        foto:""
      },
      datos: {
        cif: 0,
        nombre: "",
        apellido: "",
      },
    };
  },
  beforeCreate() {
    this.total=0;
    if (this.$cookies.get("cif") == null) {
      this.$router.push("/");
    }
  },
  created() {
    this.empleadoService = new EmpleadoService();
    this.unidadService = new UnidadService();
    this.usuarioService = new UsuarioService();
    this.menuService = new MenuService();
    this.sccService = new SccService();
    this.moduloService = new ModuloService();
    this.total=0;
  },
  mounted() {
    this.getDatos();
    this.getListaTipoEmpleado();
    this.getUnidades();
    this.total=0;
  },
  updated() {
    this.egovf = this.emp;
    if (this.egovf.cif > 0 && this.getPB) {
      this.getEmpleado();
      this.getListarEmpleadoModulo();
      this.getListarEmpleadoModuloCif();
      this.getPB = false;
    }
    this.datos.cif = this.egovf.cif;
    this.datos.nombre = this.egovf.nombre;
    this.datos.apellido = this.egovf.paterno + " " + this.egovf.materno;
  },
  methods: {
    // Funcion par arecuperar informacion del Usuaario de las Cokkies
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
        this.menuService.headersUsuario(this.usuario.token);
      }
    },
    //Funcion para listar las Undiades
    async getUnidades() {
      await this.unidadService.getUnidades().then((response) => {
        this.listaUnidades = response.data;
      });
    },
    async getEmpleado() {
      //Corregido funcionando
      //Funcion para listar Los Datos del empleado como tambien sus contratos
      await this.empleadoService.getEmpleado(this.egovf.cif).then((response) => {
          this.empleado = response.data;
          if(this.empleado.id>0){
            this.contratos = this.empleado.contratos;
            this.calcularDiasRestantes(this.empleado.fecha,this.empleado.salida);
          }
          
        });
      this.getMenuModulo();
    },
    // Funcion para listar El tipo de Empleado para la Verificacion
    async getListaTipoEmpleado() {
      await this.empleadoService.getListaTipoEmpleado().then((response) => {
        this.listaTipoEmpleado = response.data;
      });
    },
    // Funcion para listar los Modulos para el Empleado
    async getListarEmpleadoModulo() {
      await this.empleadoService.getListarEmpleadoModulo(this.egovf.cif).then((response) => {
          this.listaModulo = response.data;
        });
    },
    // Funcion que lista los Modulos del Empleado
    async getListarEmpleadoModuloCif() {
      await this.empleadoService.getListarEmpleadoModuloCif(this.egovf.cif).then((response) => {
          this.listaModuloCif = response.data;
        });
    },
    async addEmpleadoModulo() {
      // Funcion para registrar al Empleado en un Modulo
      var idmenu = 0;
      //designamos el cif al objeto empleado_modulo e id del modulo
      this.empleado_modulo.cif = this.egovf.cif;
      this.empleado_modulo.id_modulo = this.id_modulo;

      //Seleccionamos el id del memu de la lista de modulos
      this.listaModulo.forEach((modulo) => {
        if (modulo.id == this.id_modulo) {
          idmenu = modulo.idmenu;
        }
      });
      await this.$swal.fire({
          title: "Desea Agregar el Modulo al Empleado ?",
          showDenyButton: true,
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            //Agregamos el modulo al empleado
            this.empleadoService.addEmpleadoModulo(this.empleado_modulo).then((response) => {
                if (response.status == 201) {
                  //Actualisamos el menu del usuario habilitando el modulo deacuerdo al menu
                  this.menuService.addMenuUsuario(this.empleado_modulo.cif, idmenu).then((res)=>{
                    if(res.status == 201){
                      this.$swal.fire("El Modulo fue Agregado al Empleado Corectamente","","success").then((r)=>{
                        if (r) location.reload();
                      });
                    }else{
                      this.$swal.fire("Los Datos  del Menu Usuario no fueron Guardados Error" + res.status,"","error");
                    }
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
    async addContrato() {
      // Funcion para Agregar Un contrato Al empelado
      this.usuarioService.headersUsuario(this.usuario.token);
      //Buscamos la unidad deacuerdo a la lista seleccionada
      this.listaUnidades.forEach((element) => {
        if (element.unidad == this.contrato.unidad) {
          this.unidad.id = element.id;
          this.unidad.unidad = element.unidad;
          this.unidad.dependiente = element.dependiente;
          this.unidad.sigla = element.sigla;
          return false;
        }
      });
      //designamos el cif al objeto  Contrato
      this.contrato.cif = this.egovf.cif;
      this.contrato.foto = this.egovf.foto;
      //para la actualizacion del usuario designamos el tipo de empleado en id de persona 
      this.egovf.idPersona = this.contrato.idTipoEmpleado;
      await this.$swal.fire({
          title: "Desea Agregar Contrato al Empleado ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            //Agregamos el contrato del empleado 
            this.empleadoService.addContrato(this.contrato).then((response) => {
              if (response.status == 201) {
                //Actualizamos el usuario con la Unidad Correspondiente y si es de tipo 2 se actualiza o habilita en el menu
                this.usuarioService.updateUnidad(this.egovf, this.unidad).then((respon) => {
                    if (respon.status == 200) {
                      //Agregamos la pertenencia de un usuario a una unidad 
                      this.unidadService.addPertenece(this.egovf, this.unidad).then((res) => {
                          if (res.status == 201) {
                            this.$swal.fire("El Comtrato fue Agregado al Empleado Corectamente","","success").then((r) => {
                                if (r) location.reload();
                              });
                          } else { 
                            this.$swal.fire("Los Datos de Unidad no fueron Guardados Error" +response.status,"","error");
                          }
                        });
                    } else {
                      this.$swal.fire("Los Datos del Usuario No fueron Actualizados" +response.status,"","error");
                    }
                  });
              } else {
                this.$swal.fire("Los Datos del Contrato no fueron Guardados Error" +response.status,"","error");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    // Funcion para Actualizar Un contrato
    async updateContrato() {
      this.usuarioService.headersUsuario(this.usuario.token);
      //buscamos la unidad si fue modificado
      this.listaUnidades.forEach((element) => {
        if (element.unidad == this.setContrato.unidad) {
          this.unidad.id = element.id;
          this.unidad.unidad = element.unidad;
          this.unidad.dependiente = element.dependiente;
          this.unidad.sigla = element.sigla;
          return false;
        }
      });
      await this.$swal.fire({
          title: "Desea Actualizar el Contrato del Empleado ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            //Actualizamos el contrato del empleado tambien mandamos la foto
            this.empleadoService.updateContrato(this.setContrato,this.egovf.foto).then((response) => {
                if (response.status == 200) {
                  //Actualizamos la unidad del empleado
                  this.usuarioService.updateUnidad(this.egovf, this.unidad).then((respon) => {
                      if (respon.status == 200) {
                        //Creamos la pertenencia de la uniad al empleado
                        this.unidadService.addPertenece(this.egovf, this.unidad).then((res) => {
                          //Actualizamos el tipo de empleado en el modulo Scc
                          this.sccService.updateTipo(this.egovf.cif, this.setContrato.idTipoEmpleado).then();
                          if (res.status == 201) {
                            this.$swal.fire("El Comtrato fue Actializado al Empleado Corectamente","","success").then((r) => {
                              if (r) location.reload();
                            });
                          } else {
                            this.$swal.fire("Los Datos de Unidad no fueron Guardados Error" + response.status,"", "error");
                          }
                        });
                      } else {
                        this.$swal.fire("Los Datos del Usuario No fueron Actualizados" + response.status,"","error");
                      }
                    });
                } else {
                  this.$swal.fire("Los Datos del Contrato no fueron Guardados Error" + response.status,"","error");
                }
              });
          } else if (result.isDenied) {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    async getMenuModulo() {
      await this.menuService.getMenuModulo(this.egovf.cif, "Modulo EMP").then((response) => {
          this.menu = response.data;
        });
    },
    async updateEstado() {
      this.moduloService.headersUsuario(this.usuario.token);
      await this.$swal.fire({
          title: "Desea eliminar al Empleado ?",
          showDenyButton: true,
          icon: "info",
          confirmButtonText: "Aceptar",
          denyButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.empleadoService.updateEmpleadoEliminar(this.empleado).then((result) => {
                if (result.status == 200) {
                  this.sccService.updateBiometricoEliminar(this.empleado).then();
                  this.moduloService.updateEliminarModuloEmpleado(this.empleado.cif,this.usuario.cif).then(); // 1 xq em id del modulo EMP es 1
                  
                  this.$swal.fire("El Empleado fue removido con exito", "", "success").then((r) => {
                      if (r) location.reload();
                  });
                } else {
                  this.$swal.fire("Los Datos no fueron Guardados Error" + result.status,"","error");
                }
              });
          } else {
            this.$swal.fire("Datos Cancelados", "", "info");
          }
        });
    },
    // Funcion para ingresar a otros modulos del Empleado
    getModulo(ruta) {
      this.$router.push({
        name: ruta,
        params: {
          cifCiudadano: this.egovf.cif,
        },
      });
    },
    clickModalModulo(modal) {
      this.modalModulo = modal;
    },
    clickModalContrato(modal) {
      this.modalContrato = modal;
    },

    clickModalEditarContrato(modal) {
      this.modalEditarContrato = modal;
    },
    getContrato(id) {
      this.contratos.forEach((con) => {
        if (con.id === id) {
          this.setContrato.id = con.id;
          this.setContrato.cif = this.egovf.cif;
          this.setContrato.empleado = this.empleado.id;
          this.setContrato.numerocontrato = con.numero_contrato;
          this.setContrato.servicio = con.servicio;
          this.setContrato.unidad = con.unidad;
          this.setContrato.inicio = con.inicio;
          this.setContrato.fin = con.fin;
          this.setContrato.gestion = con.gestion;
          this.setContrato.detalle = con.detalle;
          this.setContrato.idTipoEmpleado=con.idTipoEmpleado;
          this.setContrato.cargo=con.cargo;
        }
      });
      this.clickModalEditarContrato(true);
    },
    clicktab(tab) {
      this.tab = tab;
    },
    esFechaPasada(fechaSalida) {
      if (!fechaSalida) return 'warning';
      
      const fechaTermino = new Date(fechaSalida);
      const hoy = new Date();
      
      // Normalizar fechas (ignorar horas)
      fechaTermino.setHours(0, 0, 0, 0);
      hoy.setHours(0, 0, 0, 0);
      
      return fechaTermino < hoy ? 'danger' : 'success';
    },
    calcularDiasRestantes(fi,fs) {
      const fechaInicio = new Date(fi);
      const fechaSalida = new Date(fs);
      const diasTotales = Math.floor((fechaSalida - fechaInicio) / (1000 * 60 * 60 * 24));
      const fechaActual = new Date();
      if (!fechaSalida) this.total = 0;
      
      if (fechaActual >= fechaSalida) {
        this.total =100;
      }
      else{
        const diasPasados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));
        const progreso = (diasPasados / diasTotales) * 100;
        this.total = parseInt(progreso < 0 ? 0 : progreso.toFixed(2));
      }
    },
    getModuloMenu() {
      this.$router.push({
        name: 'MenuView',
        params: {
          cifCiudadano: this.cif,
          idModulo: 2,
          titulo: "Modulo Empleado"
        },
      });
    },
  },
};
</script>