import { SBFApi } from '@sbf/api/SBFApi';
import { createEstaEn, EstaEn, updateEstaEn } from './estaEnService';
import { Ejemplar, updateEjemplar } from '../../Biblioteca/services/ejemplarService';

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


export const createPrestamo = async (prestamo: Partial<Prestamo>, estaEn: Partial<EstaEn>, ejemplar: Partial<Ejemplar>) => {
  try {
    delete prestamo.id_prestamo
    const { data: savedPrestamo } = await SBFApi.post<Prestamo>('/prestamo/save', prestamo);

    const estaEnData: EstaEn = {
      ...estaEn,
      idPrestamo: savedPrestamo.id_prestamo,
      idLibro: estaEn.idLibro || 0, // Ensure idLibro is provided
    };
    const savedEstaEn = await createEstaEn(estaEnData);
    
    // id 6 /uploads/portadas/esta1.jpg

    const ejemplarUpdate: Partial<Ejemplar> = {
      ...ejemplar,
      estado: 'Prestado'
    };
    console.log({ejemplarUpdate})
    const updatedEjemplar = await updateEjemplar(ejemplarUpdate);
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

export const updatePrestamo = async (prestamo: Partial<Prestamo>, estaEn: Partial<EstaEn>, ejemplar?: Partial<Ejemplar>)=> {
  try {
    const { data } = await SBFApi.put<Prestamo>('/prestamo/update', prestamo);
    
    const estaEnData: EstaEn = {
      ...estaEn,
      idPrestamo: prestamo.id_prestamo || 0,
      idLibro: estaEn.idLibro || 0, // Ensure idLibro is provided
    };
    const savedEstaEn = await updateEstaEn(estaEnData);
    
    // todo -- implementar para cambiar el estado del anterior ejemplar a Disponible
    const ejemplarUpdate: Partial<Ejemplar> = {
      ...ejemplar,
      estado: 'Prestado'
    };
    const updatedEjemplar = await updateEjemplar(ejemplarUpdate);


    return {
      prestamo: data,
      estaEn: savedEstaEn,
      ejemplar: updatedEjemplar
    };

    return data;
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
