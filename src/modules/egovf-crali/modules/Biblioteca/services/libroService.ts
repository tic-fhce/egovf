import { SBFApi } from '@sbf/api/SBFApi';
import { createEjemplar } from './ejemplarService';

export interface Libro {
  id_libro: number;
  titulo: string;
  autor: string;
  anio: number;
  idioma: string;
  signatura_topografica: string;
  ejemplares: number;
  contenido_pdf: string;
  id_usuario: number;
  id_biblioteca: number;
}

// Obtener todos los libros
export const getLibros = async (): Promise<Libro[]> => {
  try {
    const { data } = await SBFApi.get<Libro[]>('/libro/listar');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting libros');
  }
};

// export const getLibroById = async (idLibro: number, idBiblioteca: number): Promise<Libro | null> => {
export const getLibroById = async (idLibro: number) => {
  try {
    // Primero obtenemos todos los libros de la biblioteca con el ID
    // const { data } = await SBFApi.get<Libro[]>(`/libro/buscar/biblioteca?id=${idBiblioteca}`);
    const libros = await getLibros();

    // Luego, buscamos el libro que coincida con el idLibro
    const libroEncontrado = libros.find(libro => libro.id_libro === idLibro);

    // Si no se encuentra, regresamos null
    return libroEncontrado ?? null;
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    return null;
  }
};

export const getLibrosByIdBiblioteca = async (id_biblioteca: number): Promise<Libro[]> => {
  try {
    const { data } = await SBFApi.get<Libro[]>(`/libro/buscar/biblioteca?id=${id_biblioteca}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getLibrosByIdBiblioteca');
  }
};


// Crear nuevo libro
export const createLibro = async (libro: Partial<Libro>): Promise<Libro> => {
  try {
    const { data } = await SBFApi.post<Libro>('/libro/add', libro);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating libro');
  }
};
// Crear nuevo libro
export const createLibroFile = async (libro: Partial<Libro>, imageFile:File, pdfFile: File, ) => {
  try {
    console.log('create file')
    console.log({libro})
    console.log(imageFile)
    console.log(pdfFile)
     // Upload image file if provided
    let portadaUrl = '';
    if (imageFile) {
      portadaUrl = await uploadFile(imageFile);
    }

    // Upload PDF file if provided
    let pdfUrl = '';
    if (pdfFile) {
      pdfUrl = await uploadFile(pdfFile);
    }
    const libroData: Partial<Libro> = {
      ...libro,
      contenido_pdf: pdfUrl || libro.contenido_pdf || ''
    };
    const { data: createdLibro } = await SBFApi.post<Libro>('/libro/add', libroData);
    if (createdLibro.ejemplares && createdLibro.ejemplares > 0) {
      const ejemplarPromises = Array.from({ length: createdLibro.ejemplares }, (_, index) =>
        createEjemplar({
          codigo: Date.now() + index, // Generate unique code
          estado: 'Disponible',
          portada: portadaUrl,
          direccion: 'S/D',
          id_libro: createdLibro.id_libro
        })
      );

      await Promise.all(ejemplarPromises);
    }

    return createdLibro;
    // const { data } = await SBFApi.post<Libro>('/libro/add', libro);
    // return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating libro');
  }
};

// Editar libro existente
export const updateLibro = async (libro: Partial<Libro>): Promise<Libro> => {
  try {
    const { data } = await SBFApi.put<Libro>('/libro/edit', libro);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating libro');
  }
};

// Eliminar libro
export const deleteLibro = async (id_libro: number): Promise<void> => {
  try {
    await SBFApi.delete('/libro/delete', { data: { id_libro } });
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting libro');
  }
};

// Simulated endpoint for uploading files
const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `/uploads/${file.name}`;
  } catch (error) {
    throw new Error(`Error uploading file ${file.name}`);
  }
};