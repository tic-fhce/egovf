<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :lg="6">{{ titulo }}</CCol>
            <CCol :lg="6" class="text-end">
              <CButton @click="clickModalLibro(true)" color="success" class="font" size="sm">
                <CIcon icon="cil-cloud-upload" class="me-2" />Agregar Libro
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="librosTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Año</th>
                  <th>Idioma</th>
                  <th>Signatura</th>
                  <th>Ejemplares</th>
                  <th>Estado</th>
                  <th>PDF</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="libro in listaLibros" :key="libro.id">
                  <td>{{ libro.titulo }}</td>
                  <td>{{ libro.autor }}</td>
                  <td>{{ libro.anio }}</td>
                  <td>{{ libro.idioma }}</td>
                  <td>{{ libro.signatura }}</td>
                  <td>{{ libro.ejemplares }}</td>
                  <td>{{ libro.estado }}</td>
                  <td>
                    <a :href="libro.pdf" target="_blank" v-if="libro.pdf">Ver PDF</a>
                    <span v-else>No disponible</span>
                  </td>
                  <td>
                    <CButton size="sm" color="secondary" :disabled="!libro.pdf" @click="verPdfPrimeraPagina(libro.pdf)">
                      Ver 1ra pág.
                    </CButton>
                    <CButton class="font me-1" color="info" size="sm" @click="verDetalles(libro)">
                      <CIcon icon="cil-magnifying-glass" class="me-1" /> Detalles
                    </CButton>
                    <CButton class="font me-1" color="warning" size="sm" @click="editarLibro(libro)">
                      <CIcon icon="cil-pencil" class="me-1" /> Editar
                    </CButton>
                    <CButton class="font" color="danger" size="sm" @click="eliminarLibro(libro.id)">
                      <CIcon icon="cil-trash" class="me-1" /> Eliminar
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

  <!-- Modal Libro -->
  <CModal :visible="modalLibro" @close="clickModalLibro(false)">
    <form @submit.prevent="registrarLibro()">
      <CModalHeader class="headercolor" dismiss @close="clickModalLibro(false)">
        <CModalTitle>
          <h4>
            <CIcon icon="cil-book" size="xl" /> Agregar Nuevo Libro
          </h4>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mb-3 row" v-for="field in fields" :key="field.model">
          <label :for="field.model" class="col-4 col-form-label">{{ field.label }}</label>
          <div class="col-8">
            <input v-if="field.type !== 'select' && field.type !== 'file'" :type="field.type" class="form-control"
              v-model="libro[field.model]" :placeholder="field.placeholder" :required="field.required" />
            <select v-if="field.type === 'select'" class="form-control" v-model="libro[field.model]"
              :required="field.required">
              <option disabled value="">Seleccione</option>
              <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
            </select>
            <input v-if="field.type === 'file'" type="file" class="form-control" @change="cargarPDF" />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalLibro(false)" color="danger" class="font">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>
        <button class="btn btn-success font">
          <CIcon icon="cil-cloud-upload" class="me-2" />Agregar
        </button>
      </CModalFooter>
    </form>
  </CModal>

   <!-- Modal o ventana para mostrar PDF -->
  <div v-if="pdfVista" class="pdf-viewer-modal">
    <button @click="cerrarPdf" class="btn btn-danger mb-2">Cerrar visor</button>
    
    <div class="mb-2">
      <label>
        <input type="radio" v-model="mostrarSoloPrimeraPagina" :value="true" />
        Ver solo primera página
      </label>
      <label class="ms-3">
        <input type="radio" v-model="mostrarSoloPrimeraPagina" :value="false" />
        Ver PDF completo
      </label>
    </div>
    
    <VisorPdf :pdfUrl="mostrarSoloPrimeraPagina ? pdfVista + '#page=1' : pdfVista" />
  </div>
</template>

<script lang="js" src="./LibrosView.js" />

<style scoped>
@import 'datatables.net-dt';
</style>
