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
              <CDropdown variant="btn-group">
                <CDropdownToggle color="dark" class="font border-0" size="sm">
                  <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CButton @click="clickModalCiudadano(true)" size="sm">
                      <CIcon icon="cil-cloud-upload" size="lg" class="me-2" /> Agregar
                    </CButton>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="personaTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto</th>
                  <th>CIF</th>
                  <th>Datos</th>
                  <th>Contacto</th>
                  <th>Unidad</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ciudadano in listaCiudadanos" :key="ciudadano.idPersona">
                  <th scope="row">{{ ciudadano.idPersona }}</th>
                  <td>
                    <CImage :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/' + ciudadano.foto" width="70"
                      height="70" />
                  </td>
                  <td>{{ ciudadano.cif }}</td>
                  <td>
                    {{ ciudadano.nombre }} {{ ciudadano.paterno }} {{ ciudadano.materno }}<br>
                    {{ ciudadano.ci }}<br>
                    <label class="fontabla">{{ ciudadano.correo }}</label>
                  </td>
                  <td>
                    {{ ciudadano.celular }}</td>
                  <td>{{ ciudadano.sigla }}</td>
                  <td>
                    <CButton class="font" color="success" @click="perfil(ciudadano.cif)" size="sm">
                      <CIcon icon="cil-user" class="me-2" />Perfil
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

  <!-- Modal  Ciudadano-->
  <CModal :visible="modalCiudadano" @close="clickModalCiudadano(false)">
    <CForm @submit.prevent="registrarCiudadano()">
      <CModalHeader class="headercolor" dismiss @close="clickModalCiudadano(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-user" size="sm" /> Agregar Nuevo Ciudadano
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Celulda de Identidad </CInputGroupText>
          <CFormInput type="text" v-model="persona.ci" :valid="errorpersona.ci" required="true"
            placeholder="Cedula de Identidad" @input="validarCI()" @keyup="botonesFuncion()" />
          <CInputGroupText v-if="errorpersona.ci">
            <CIcon icon="cil-check" class="text-success" />
          </CInputGroupText>
          <CInputGroupText v-else>
            <CIcon icon="cil-x" class="text-danger" />
          </CInputGroupText>
          <label v-if="errorpersona.ci" style="color: green;">{{ errorCI }}</label>
          <label v-else style="color: red;">{{ errorCI }}</label>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Region Exp</CInputGroupText>
          <CFormSelect v-model="persona.complemento" required="true">
            <option>Seleccionar Region Expedida</option>
            <option value="lp">La Paz</option>
            <option value="sc">Santa Cruz</option>
            <option value="cb">Cochabamba</option>
            <option value="or">Oruro</option>
            <option value="pt">Potosi</option>
            <option value="tr">Tarija</option>
            <option value="ch">Chuquisaca</option>
            <option value="bn">Beni</option>
            <option value="pd">Pando</option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Nombres </CInputGroupText>
          <CFormInput type="text" v-model="persona.nombre" placeholder="Nombres" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">A. Paterno </CInputGroupText>
          <CFormInput type="text" v-model="persona.paterno" placeholder="Apellido Paterno" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">A. Materno </CInputGroupText>
          <CFormInput type="text" v-model="persona.materno" placeholder="Apellido Materno" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Fecha de Nacimiento </CInputGroupText>
          <CFormInput type="date" v-model="persona.fecha" required="true" />
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Sexo</CInputGroupText>
          <CFormSelect v-model="persona.sexo" required="true">
            <option>Seleccionar Sexo</option>
            <option value="1">Femenino</option>
            <option value="2">Masculino</option>
          </CFormSelect>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">Celular </CInputGroupText>
          <CFormInput type="text" :valid="errorpersona.cel" v-model="persona.cel" placeholder="Numero de Celular"
            @input="validarCelular()" @keyup="botonesFuncion()" required="true" />
          <CInputGroupText v-if="errorpersona.cel">
            <CIcon icon="cil-check" class="text-success" />
          </CInputGroupText>
          <CInputGroupText v-else>
            <CIcon icon="cil-x" class="text-danger" />
          </CInputGroupText>
          <label v-if="errorpersona.cel" style="color: green;">{{ errorCelular }}</label>
          <label v-else style="color: red;">{{ errorCelular }}</label>
        </CInputGroup>

        <CInputGroup class="mb-3">
          <CInputGroupText as="label">E-mail </CInputGroupText>
          <CFormInput type="text" :valid="errorpersona.correo" v-model="persona.correo" placeholder="Correo Electronico"
            @input="validarCorreo()" @keyup="botonesFuncion()" required="true" />
          <CInputGroupText v-if="errorpersona.correo">
            <CIcon icon="cil-check" class="text-success" />
          </CInputGroupText>
          <CInputGroupText v-else>
            <CIcon icon="cil-x" class="text-danger" />
          </CInputGroupText>
          <label v-if="errorpersona.correo" style="color: green;">{{ errorCorreo }}</label>
          <label v-else style="color: red;">{{ errorCorreo }}</label>
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalCiudadano(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <CButton type="submit" v-if="botones" class="font" size="sm" color="success">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal  Ciudadano-->
</template>

<script>

//Importamos Servicios
import PersonaService from '@/modules/egovf/services/personaService';
import EgovfService from '@/modules/egovf/services/egovfService';
//Importamos Herramientas 
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesLib);

export default {
  name: 'ListaView',
  components: {

  },
  data() {
    return {
      titulo: '',
      modalCiudadano: false,
      personaService: null,
      egovfService: null,
      listaCiudadanos: [],
      registro: [],
      listaUnidad: [],
      botones: false,
      usuario: { ...this.$models.usuarioModel },
      persona: {...this.$models.personaModel},
      errorCI: "",
      errorCorreo: "",
      errorCelular: "",
      errorpersona: {
        ci: false,
        complemento: false,
        cel: false,
        correo: false
      }
    }
  },
  beforeCreate() {
    if (this.$cookies.get('cif') == null) {
      window.location.href = '/';
    }
  },
  created() {
    this.egovfService = new EgovfService();
    this.personaService = new PersonaService();
  },
  mounted() {
    this.getDatos(); // Llamamos los datos del Usuario
    this.getListarCiudadano(); // Funcion que debuelve una lista de ciudadanos 
    this.titulo = this.$route.meta.title;
  },
  methods: {
    tabla() {
      this.$nextTick(() => {
        $('#personaTabla').DataTable();
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

        this.egovfService.headersUsuario(this.usuario.token);
        this.personaService.headersUsuario(this.usuario.token);
      }
    },
    async getListarCiudadano() { // Funcion que crea una lista de Ciudadanos 
      let loadingAlert = null;
      try {
        loadingAlert = this.$swal.fire({
          title: 'Cargando Ciudadanos',
          html: 'Procesando Ciudadanos<br>mas de 13000 ciudadanos registrados, por favor espere...',
          allowOutsideClick: false,
          didOpen: () => this.$swal.showLoading()
        });

        this.$nprogress.start();

        const response = await this.egovfService.getListaCiudadano();

        this.listaCiudadanos = response.data;

        this.tabla();

        this.$swal.close();

        await new Promise(resolve => setTimeout(resolve, 100));

        this.$swal.fire({
          icon: 'success',
          title: '¡Completado!',
          text: `Se procesaron ${this.listaCiudadanos.length} ciudadanos`,
          timer: 2000,
          showConfirmButton: false
        });

      } catch (error) {
        if (loadingAlert) this.$swal.close();
        this.$swal.fire({
          icon: 'error',
          title: 'Error en la carga',
          text: error.message || 'Ocurrió un error al procesar los datos',
          confirmButtonText: 'Reintentar'
        });
      } finally {
        this.$nprogress.done();
      }

    },
    perfil(cifAux) {
      this.$router.push({
        name: 'PerfilCiudadanoView',
        params: {
          cifCiudadano: cifAux
        }
      });
    },
    registrarCiudadano() { // funcion para el registro de un ciudadano
      this.personaFalse();
      this.$swal.fire({
        title: 'Desea Registrar al Ciudadano',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Registrar',
        denyButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.personaService.addPersona(this.persona).then(response => {
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
    validarCI() {
      const personaEncontrada = this.listaCiudadanos.find(
        (persona) => (persona.ci_com).toString() === this.persona.ci
      );
      if (personaEncontrada) {
        this.errorCI = "La Cédula de identidad ya Existe, revise en el sistema."; // Cédula válida
        this.errorpersona.ci = false;
      } else {
        this.errorCI = "La Cédula de Identidad es valida";
        this.errorpersona.ci = true;
      }
    },
    validarCelular() {
      const personaEncontrada = this.listaCiudadanos.find(
        (persona) => persona.celular === this.persona.cel
      );
      if (personaEncontrada) {
        this.errorCelular = "El Numero de Celular ya existe, verifique su estado en el sistema"; // Cédula válida
        this.errorpersona.cel = false;
      } else {
        this.errorCelular = "El Numero de Celular del Ciudadano es valido";
        this.errorpersona.cel = true;
      }
    },
    validarCorreo() {
      const personaEncontrada = this.listaCiudadanos.find(
        (persona) => persona.correo === this.persona.correo
      );
      if (personaEncontrada) {
        this.errorCorreo = "El correo Electronico ya existe ingrese otro o verifique su existencia en el sistema."; // Cédula válida
        this.errorpersona.correo = false;
      } else {
        this.errorCorreo = "El Correo Electronico del Ciudadano es Valido ";
        this.errorpersona.correo = true;
      }
    },
    personaFalse() {
      this.errorpersona.ci = false;
      this.errorpersona.complemento = false;
      this.errorpersona.cel = false;
      this.errorpersona.correo = false;
    },
    clickModalCiudadano(ciudadano) {//funcion para Visibilisar el modal
      this.modalCiudadano = ciudadano;
    },
    botonesFuncion() {// Funcion que habilita los botnes para la actualizacion del pass
      if ((this.errorpersona.ci) && (this.errorpersona.cel) && (this.errorpersona.correo))
        this.botones = true;
      else
        this.botones = false;
    }
  }
}
</script>
<style scoped>
@import 'datatables.net-dt';
</style>