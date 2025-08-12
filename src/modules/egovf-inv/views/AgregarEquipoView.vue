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
          <label @click="getLista(idTipo)"  class="breadcrumb-link">{{ titulo }}</label>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
            Nuevo Equipo >
        </li>
      </ol>
    </nav>

    <CRow>
      <CCol :xs="12">
        <h4 class="mb-4">Registrar Nuevo Equipo</h4>
  
        <!-- Sección: Equipo (Obligatoria) -->
        <CAlert class="titulos mb-3">Datos del Equipo</CAlert>
        <CRow class="cuerpo">
          <CCol :md="6">
            <CFormLabel>Código (Formato: INV + Número)</CFormLabel>
            <CInputGroup>
              <CInputGroupText>INV</CInputGroupText>
              <CFormInput
                v-model.number="equipo.numeroCodigo"
                placeholder="Ej: 008"
                @input="updateCodigo"
              />
            </CInputGroup>
            <small class="text-muted">Código final: {{ equipo.codigo }}</small>
          </CCol>
          <CCol :md="6">
            <CFormLabel>MAC/Serie</CFormLabel>
            <CFormInput v-model="equipo.macSerie" />
          </CCol>
          <CCol :md="6" class="mt-3">
            <CFormLabel>Marca</CFormLabel>
            <CFormInput v-model="equipo.marca" />
          </CCol>
          <CCol :md="6" class="mt-3">
            <CFormLabel>Modelo</CFormLabel>
            <CFormInput v-model="equipo.modelo" />
          </CCol>
          <CCol :md="12" class="mt-3">
            <CFormLabel>Detalle</CFormLabel>
            <CFormTextarea v-model="equipo.detalle" rows="2"></CFormTextarea>
          </CCol>
        </CRow>
  
        <!-- Sección: Componente PC -->
        <div class="mt-4">
          <CButtonGroup role="group" aria-label="Toggle Componente PC">
            <CButton class="botonesAE" color="secondary" size="sm" @click="toggleSection('componente')">
              {{ componente.visible ? 'Omitir' : 'Definir' }} Componentes
            </CButton>
          </CButtonGroup>
          <CAlert color="info" class="mt-2" v-if="componente.visible">Detalles del Hardware</CAlert>
          <CRow v-if="componente.visible">
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fuente</CFormLabel>
              <CFormInput v-model="componente.fuente" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Memorias (GB)</CFormLabel>
              <CFormInput type="number" v-model.number="componente.memorias" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Tipo Memoria</CFormLabel>
              <CFormInput v-model="componente.capacidad" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Microprocesador</CFormLabel>
              <CFormInput v-model="componente.micro" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Velocidad Micro</CFormLabel>
              <CFormInput v-model="componente.microCapacidad" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Disco</CFormLabel>
              <CFormInput v-model="componente.disco" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Cortapico</CFormLabel>
              <CFormInput v-model="componente.cortapico" />
            </CCol>
            <CCol :md="12" class="mt-2">
              <CFormLabel>Detalle</CFormLabel>
              <CFormTextarea v-model="componente.detalle" rows="2"></CFormTextarea>
            </CCol>
          </CRow>
        </div>
  
        <!-- Sección: Pertenece -->
        <div class="mt-4">
          <CButtonGroup role="group" aria-label="Toggle Pertenece">
            <CButton class="botonesAE" color="secondary" size="sm" @click="toggleSection('pertenece')">
              {{ pertenece.visible ? 'Omitir' : 'Definir' }} Encargado/a
            </CButton>
          </CButtonGroup>
          <CAlert color="info" class="mt-2" v-if="pertenece.visible">Información de Asignación</CAlert>
          <CRow v-if="pertenece.visible">
            <CCol :md="6" class="mt-2">
              <CFormLabel>CIF</CFormLabel>
              <CFormInput type="number" v-model.number="pertenece.cif" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Estado</CFormLabel>
              <CFormInput v-model="pertenece.estado" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fecha Asignación</CFormLabel>
              <CFormInput type="date" v-model="pertenece.fechaAdd" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fecha Devolución</CFormLabel>
              <CFormInput type="date" v-model="pertenece.fechaDel" />
            </CCol>
          </CRow>
        </div>
  
        <!-- Sección: Red -->
        <div class="mt-4">
          <CButtonGroup role="group" aria-label="Toggle Red">
            <CButton class="botonesAE" color="secondary" size="sm" @click="toggleSection('red')">
              {{ red.visible ? 'Omitir' : 'Definir' }} Información de Red
            </CButton>
          </CButtonGroup>
          <CAlert color="info" class="mt-2" v-if="red.visible">Configuración de Red</CAlert>
          <CRow v-if="red.visible">
            <CCol :md="6" class="mt-2">
              <CFormLabel>IP</CFormLabel>
              <CFormInput v-model="red.ip" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Segmento</CFormLabel>
              <CFormInput v-model="red.segmento" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>VLAN</CFormLabel>
              <CFormInput v-model="red.vlan" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Switch</CFormLabel>
              <CFormInput v-model="red.switchRed" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Puerto</CFormLabel>
              <CFormInput v-model="red.puerto" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>DNS</CFormLabel>
              <CFormInput v-model="red.dns" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fecha Registro</CFormLabel>
              <CFormInput type="date" v-model="red.fechaRegistro" />
            </CCol>
          </CRow>
        </div>
  
        <!-- Sección: Ubicación -->
        <div class="mt-4">
          <CButtonGroup role="group" aria-label="Toggle Ubicación">
            <CButton class="botonesAE" color="secondary" size="sm" @click="toggleSection('ubicacion')">
              {{ ubicacion.visible ? 'Omitir' : 'Definir' }} Ubicación
            </CButton>
          </CButtonGroup>
          <CAlert color="info" class="mt-2" v-if="ubicacion.visible">Ubicación Física</CAlert>
          <CRow v-if="ubicacion.visible">
            <CCol :md="6" class="mt-2">
              <CFormLabel>Ambiente</CFormLabel>
              <CFormInput v-model="ubicacion.ambiente" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Latitud</CFormLabel>
              <CFormInput v-model="ubicacion.latitud" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Longitud</CFormLabel>
              <CFormInput v-model="ubicacion.longitud" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fecha</CFormLabel>
              <CFormInput type="date" v-model="ubicacion.fecha" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Estado</CFormLabel>
              <CFormInput v-model.number="ubicacion.estado" />
            </CCol>
          </CRow>
        </div>
  
        <!-- Sección: Software -->
        <div class="mt-4">
          <CButtonGroup role="group" aria-label="Toggle Software">
            <CButton class="botonesAE" color="secondary" size="sm" @click="toggleSection('software')">
              {{ software.visible ? 'Omitir' : 'Definir' }} Software
            </CButton>
          </CButtonGroup>
          <CAlert color="info" class="mt-2" v-if="software.visible">Software Instalado</CAlert>
          <CRow v-if="software.visible">
            <CCol :md="6" class="mt-2">
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput v-model="software.nombre" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Tipo</CFormLabel>
              <CFormInput v-model="software.tipo" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Versión</CFormLabel>
              <CFormInput v-model="software.version" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Estado Licencia</CFormLabel>
              <CFormInput v-model="software.estadoLicencia" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Fecha</CFormLabel>
              <CFormInput type="date" v-model="software.fecha" />
            </CCol>
            <CCol :md="6" class="mt-2">
              <CFormLabel>Estado</CFormLabel>
              <CFormInput v-model.number="software.estado" />
            </CCol>
          </CRow>
        </div>
  
        <div class="mt-5">
          <CButton class="botonesAE" color="success" @click="submitForm">Guardar Equipo</CButton>
        </div>
      </CCol>
    </CRow>
  </template>
  <script>
  import InventarioService from '@/modules/egovf-inv/services/inventarioService';
  
  export default {
    name: 'FormularioEquipo',
    data() {
        return {
            listaTipo: [],
        inventarioService: null,
        idTipo: 0,
        equipo: {
          numeroCodigo: '', 
          codigo: 'INV000', 
          macSerie: '',
          marca: '',
          modelo: '',
          detalle: ''
        },
        componente: {
          visible: false,
          fuente: 'Genérico',
          memorias: 8,
          capacidad: 'DDR4',
          micro: 'Intel Genérico',
          microCapacidad: '2.0GHz',
          disco: 'HDD 250GB',
          cortapico: 'N/A',
          detalle: 'Sin detalles',
          teclado: 'No incluido',
          mouse: 'No incluido',
          versionamiento: 'v1.0'
        },
        pertenece: {
          visible: false,
          cif: 1001,
          estado: 'Por designar',
          fechaAdd: '2025-05-22',
          fechaDel: '2025-05-22'
        },
        red: {
          visible: false,
          ip: '0.0.0.0',
          segmento: 'LAN',
          vlan: 'VLAN1',
          switchRed: 'Sin asignar',
          puerto: 'Desconocido',
          dns: '8.8.8.8',
          fechaRegistro: '2025-05-22'
        },
        ubicacion: {
          visible: false,
          ambiente: 'Sin definir',
          latitud: '0.0000',
          longitud: '0.0000',
          fecha: '2025-05-22',
          estado: 1
        },
        software: {
          visible: false,
          nombre: 'Windows Genérico',
          tipo: 'Sistema Operativo',
          version: 'N/A',
          estadoLicencia: 'Sin licencia',
          fecha: '2025-05-22',
          estado: 1
            },
        
      };
    },
    async mounted() {
        this.idTipo = this.$route.params.id;
        await this.getInventario();
    
    },
    computed: {
        titulo() {
        
        const tipo = this.listaTipo.find(t => t.idTipo == this.idTipo);
        return tipo ? tipo.sigla : 'Título por Defecto';
      }
    },
    created() {
      this.inventarioService = new InventarioService();
    },
    methods: {
        getLista(id){
            this.$router.push({
                name: "ListaEquiposView",
                params: {
                    id:id
                },
            });
        },
      toggleSection(section) {
        this[section].visible = !this[section].visible;
      },
      async getInventario() {
        await this.inventarioService.getTipo().then(response => {
          this.listaTipo = response.data;
        });
      },
      updateCodigo(event) {
        let value = event.target.value;
  
        
        value = value.replace(/[^0-9]/g, '');
  
        if (value.length > 3) {
          value = value.slice(0, 3); 
        }
  
        this.equipo.numeroCodigo = value;
        this.equipo.codigo = 'INV' + String(value).padStart(3, '0');
      },
      async submitForm() {
        const payload = {
          equipoRequestDTO: {
            codigo: this.equipo.codigo,
            macSerie: this.equipo.macSerie,
            marca: this.equipo.marca,
            modelo: this.equipo.modelo,
            detalle: this.equipo.detalle,
            idTipo: this.idTipo
          },
          componentePcRequestDTO: this.componente.visible ? { ...this.componente } : {
            fuente: 'Genérico',
            memorias: 8,
            capacidad: 'DDR4',
            micro: 'Intel Genérico',
            microCapacidad: '2.0GHz',
            disco: 'HDD 250GB',
            cortapico: 'N/A',
            detalle: 'Sin detalles',
            teclado: 'No incluido',
            mouse: 'No incluido',
            versionamiento: 'v1.0'
          },
          perteneceRequestDTO: this.pertenece.visible ? { ...this.pertenece } : {
            cif: 1001,
            estado: 'Por designar',
            fechaAdd: '2025-05-22',
            fechaDel: '2025-05-22'
          },
          redRequestDTO: this.red.visible ? { ...this.red } : {
            ip: '0.0.0.0',
            segmento: 'LAN',
            vlan: 'VLAN1',
            switchRed: 'Sin asignar',
            puerto: 'Desconocido',
            dns: '8.8.8.8',
            fechaRegistro: '2025-05-22'
          },
          ubicacionRequestDTO: this.ubicacion.visible ? { ...this.ubicacion } : {
            ambiente: 'Sin definir',
            latitud: '0.0000',
            longitud: '0.0000',
            fecha: '2025-05-22',
            estado: 1
          },
          softwareRequestDTO: this.software.visible ? { ...this.software } : {
            nombre: 'Windows Genérico',
            tipo: 'Sistema Operativo',
            version: 'N/A',
            estadoLicencia: 'Sin licencia',
            fecha: '2025-05-22',
            estado: 1
          }
        };
  
        try {
            await this.inventarioService.añadirequipo(payload);
            alert('Equipo guardado exitosamente');
          
        } catch (error) {
          console.error('Error al guardar el equipo', error);
          alert('Hubo un error al guardar el equipo.');
        }
      }
    }
  };
  </script>
    <style scoped>
    .custom-breadcrumb {
    background-color: transparent;
    padding: 0;
    margin-bottom: 1rem;
  }
  
  .breadcrumb-link {
    text-decoration: none;
    color: #00222f;
    cursor: pointer ;
    font-weight: 500;
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }
  
  .breadcrumb-link:hover {
    color: white;
    text-shadow: 0 0 10px rgba(7, 26, 59, 0.941);
  }
  
  .breadcrumb-item + .breadcrumb-item::before {
    color: #bbb;
  }
  .boton-agregar
  {
    background-color: #00222f;
    color: white;
    border: solid 1px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-color: #00222f;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .boton-agregar:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }
  .titulos{
    background-color: #00222f;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .cuerpo{
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    color: #00222f;
    margin-bottom: 20px;
  }
  .botonesAE{
    background-color: #00222f;
    color: white;
    border: solid 1px;
    padding: 10px 20px;
    width: 30%;
    cursor: pointer;
    border-color: #00222f;
    transition: background-color 0.3s ease, color 0.3s ease;
    
  }
  .botonesAE:hover {
    background-color: white;
    color: #00222f;
    border-color: #00222f;
  }
  </style>