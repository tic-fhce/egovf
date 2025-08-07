import { SBFApi } from '@sbf/api/SBFApi';
import { createEstaEn, EstaEn, getEstaEnByPrestamo, updateEstaEn } from './estaEnService';
import { Ejemplar, EstadoEjemplar, updateStateEjemplar } from '../../Biblioteca/services/ejemplarService';
import { getBibliotecaByUser } from '../../Biblioteca/services/bibliotecaService';
import { getLibrosByIdBiblioteca } from '../../Biblioteca/services/libroService';

export interface Prestamo {
  id_prestamo: number;
  fecha_pres: string;
  fecha_dev: string;
  id_lector: number;
}

export const getPrestamos = async (): Promise<Prestamo[]> => {
  try {
    const { data } = await SBFApi.get<Prestamo[]>('/prestamo/all');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos');
  }
};

export const getPrestamoById = async (id_prestamo: number): Promise<Prestamo|null> => {
  try {
    const prestamos = await getPrestamos();
    const prestamoEncontrado = prestamos.find(prestamo => prestamo.id_prestamo === id_prestamo);
    return prestamoEncontrado ?? null;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos');
  }
};
export const getPrestamoByIdLector = async (id: number): Promise<Prestamo[]|[]> => {
  try {
    const { data } = await SBFApi.get<Prestamo[]>(`/prestamo/prestamos-lector`, {
      params: { id }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos de usuario');
  }
};

export const getPrestamoByIdAdmin = async (idUsuario: number): Promise<Prestamo[]|null|[]> => {
  try {
    const { data } = await SBFApi.get<Prestamo[]>(`/prestamo/prestamos-admin-biblioteca`, {
      params: { idUsuario }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos de usuario');
  }
};

export const getPrestamoByIdAdminFrontend = async (idUsuario: number): Promise<Prestamo[] | null> => {
  try {
    // 1. Obtener todos los préstamos
    const prestamosData = await getPrestamos();

    // 2. Obtener las bibliotecas asociadas al administrador
    const bibliotecasData = await getBibliotecaByUser(idUsuario);

    // 3. Obtener todos los libros por cada biblioteca
    const librosPorBiblioteca = await Promise.all(
      bibliotecasData.map(biblioteca => getLibrosByIdBiblioteca(biblioteca.id_biblioteca))
    );

    // 4. Relacionar los préstamos con los libros de las bibliotecas
    const prestamosConLibros= await Promise.all(
      prestamosData.map(async (prestamo) => {
        // Obtenemos los libros relacionados al préstamo (puede ser un arreglo o un solo objeto)
        const librosRelacionados = await getEstaEnByPrestamo(prestamo.id_prestamo);

        // Convertimos a un arreglo si es un solo objeto
        const librosRelacionadosArray = Array.isArray(librosRelacionados) ? librosRelacionados : [librosRelacionados];

        // Filtramos los libros que están relacionados con el préstamo
        const librosDelPrestamo = librosPorBiblioteca
          .flat() // Aplanamos el arreglo de libros por biblioteca
          .filter(libro => 
            librosRelacionadosArray.some(estaEn => estaEn.idLibro === libro.id_libro)
          );

        // Si el préstamo tiene libros relacionados, lo devolvemos
        if (librosDelPrestamo.length > 0) {
          return prestamo; // Devolvemos solo el préstamo sin la propiedad 'libros'
        }

        // Si el préstamo no tiene libros relacionados, lo ignoramos (retornamos null)
        return null;
      })
    );

    // Filtramos las posiciones null (en caso de que un préstamo no tenga libros asociados a las bibliotecas)
    const prestamosFiltrados = prestamosConLibros.filter((prestamo): prestamo is Prestamo => prestamo !== null);

    // Si no hay préstamos, devolvemos null
    if (prestamosFiltrados.length === 0) {
      return null;
    }

    // Devolvemos solo los préstamos filtrados
    return prestamosFiltrados;

  } catch (error) {
    console.error('Error al obtener los préstamos del administrador:', error);
    throw new Error('Error al obtener los préstamos de usuario');
  }
};

export const createPrestamo = async (prestamo: Partial<Prestamo>, estaEn: Partial<EstaEn>, ejemplar: Partial<Ejemplar>) => {
  try {
    delete prestamo.id_prestamo
    const { data: savedPrestamo } = await SBFApi.post<Prestamo>('/prestamo/save', prestamo);

    const estaEnData: EstaEn = {
      ...estaEn,
      idPrestamo: savedPrestamo.id_prestamo,
      idLibro: estaEn.idLibro || 0, // Ensure idLibro is provided
      idEjemplar: estaEn.idEjemplar || 0,
    };
    const savedEstaEn = await createEstaEn(estaEnData);

    const updatedEjemplar = await updateStateEjemplar(ejemplar, EstadoEjemplar.Prestado);

    return {
      prestamo: savedPrestamo,
      estaEn: savedEstaEn,
      ejemplar: updatedEjemplar
    };

  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el préstamo');
  }
};

export const updatePrestamo = async (prestamo: Partial<Prestamo>, estaEn: Partial<EstaEn>, ejemplarBefore?: Partial<Ejemplar>, ejemplar?: Partial<Ejemplar>)=> {
  try {
    const { data } = await SBFApi.put<Prestamo>('/prestamo/edit', prestamo); 
    if (ejemplar?.codigo !== ejemplarBefore?.codigo) {
      const estaEnData: EstaEn = {
        ...estaEn,
        idPrestamo: prestamo.id_prestamo || 0,
        idLibro: estaEn.idLibro || 0, // Ensure idLibro is provided
        idEjemplar: ejemplar?.codigo || 0,
      };
      const savedEstaEn = await updateEstaEn(estaEnData);
      
       const [updatedEjemplarBefore, updatedEjemplar] = await Promise.all([
        updateStateEjemplar(ejemplarBefore!, EstadoEjemplar.Disponible),
        updateStateEjemplar(ejemplar!, EstadoEjemplar.Prestado)
      ]);

      return {
        prestamo: data,
        estaEn: savedEstaEn,
        ejemplarBefore: updatedEjemplarBefore,
        ejemplar: updatedEjemplar
      };
     }

    return {
      prestamo: data,
    };

  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el préstamo');
  }
};

export const deletePrestamo = async (id_prestamo: number): Promise<void> => {
  try {
    await SBFApi.delete('/prestamo/delete', {
      data: { id_prestamo }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el préstamo');
  }
};
