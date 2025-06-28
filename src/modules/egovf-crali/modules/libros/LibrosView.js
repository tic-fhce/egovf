import VisorPdf from './VisorPdf.vue';

export default {
  components: {
    VisorPdf,
  },
  data() {
    return {
      titulo: "Gestión de Libros",
      modalLibro: false,
      libroEditandoId: null, // nuevo estado para saber si estamos editando
       pdfVista: null,
      mostrarSoloPrimeraPagina: true,
      libro: {
        titulo: "",
        autor: "",
        anio: "",
        idioma: "",
        signatura: "",
        ejemplares: "",
        estado: "",
        pdf: ""
      },
       listaLibros: [
      {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        anio: 1967,
        idioma: "Español",
        signatura: "863 G216c",
        ejemplares: 5,
        estado: "Disponible",
        pdf: ""
      },
      {
        id: 2,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        anio: 1605,
        idioma: "Español",
        signatura: "863 C337d",
        ejemplares: 3,
        estado: "Prestado",
        pdf: ""
      },
      {
        id: 3,
        titulo: "1984",
        autor: "George Orwell",
        anio: 1949,
        idioma: "Inglés",
        signatura: "823 O79n",
        ejemplares: 4,
        estado: "Disponible",
        pdf: "Vue-cheat-sheet.pdf"
      }
    ],
      fields: [
        { label: "Título", model: "titulo", placeholder: "Título del libro", type: "text", required: true },
        { label: "Autor", model: "autor", placeholder: "Nombre del autor", type: "text", required: true },
        { label: "Año", model: "anio", placeholder: "Año de publicación", type: "number", required: true },
        { label: "Idioma", model: "idioma", placeholder: "Idioma del libro", type: "text", required: true },
        { label: "Signatura", model: "signatura", placeholder: "Signatura", type: "text", required: true },
        { label: "Ejemplares", model: "ejemplares", placeholder: "Número de ejemplares", type: "number", required: true },
        {
          label: "Estado", model: "estado", type: "select", required: true,
          options: ["Disponible", "Prestado", "Dañado", "Extraviado"]
        },
        { label: "PDF", model: "pdf", type: "file", required: false }
      ]
    };
  },
 methods: {
verPdfPrimeraPagina(url) {
      this.pdfVista = url;
      this.mostrarSoloPrimeraPagina = true;
    },
    cerrarPdf() {
      this.pdfVista = null;
    },
  clickModalLibro(val) {
    this.modalLibro = val;
    if (!val) {
      this.limpiarFormulario();
    }
  },
  registrarLibro() {
    if (
      !this.libro.titulo || !this.libro.autor || !this.libro.anio ||
      !this.libro.idioma || !this.libro.signatura || !this.libro.ejemplares ||
      !this.libro.estado
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (this.libroEditandoId !== null) {
      // Editar libro existente
      const index = this.listaLibros.findIndex(libro => libro.id === this.libroEditandoId);
      if (index !== -1) {
        this.listaLibros[index] = { ...this.libro, id: this.libroEditandoId };
      }
    } else {
      // Agregar nuevo libro
      const nuevoLibro = {
        ...this.libro,
        id: Date.now()
      };
      this.listaLibros.push(nuevoLibro);
    }

    this.clickModalLibro(false);
  },
  cargarPDF(event) {
    const file = event.target.files[0];
    if (file) {
      this.libro.pdf = URL.createObjectURL(file); // Simula una URL para ver el PDF
    }
  },
  verDetalles(libro) {
  alert(`📘 Título: ${libro.titulo}\n✍️ Autor: ${libro.autor}\n📅 Año: ${libro.anio}\n📚 Estado: ${libro.estado}`);
},

editarLibro(libro) {
  this.libro = { ...libro };
  this.libroEditandoId = libro.id;
  this.modalLibro = true;
},

eliminarLibro(id) {
  if (confirm("¿Está seguro de eliminar este libro?")) {
    this.listaLibros = this.listaLibros.filter(libro => libro.id !== id);
  }
},

limpiarFormulario() {
  this.libro = {
    titulo: "",
    autor: "",
    anio: "",
    idioma: "",
    signatura: "",
    ejemplares: "",
    estado: "",
    pdf: ""
  };
  this.libroEditandoId = null;
}
}
};