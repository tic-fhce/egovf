import { SBFApi } from '@sbf/api/SBFApi';
export interface Unidad{
  id_unidad: number,
  nombre: string,
  tipo: string,
  id_facultad: number
}

export const getUnidades = async()=>{
  try {
    const { data } = await SBFApi.get<Unidad[]>(`/unidad/listar`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Unidades');
  }
}

export const createUnidad = async(Unidad: Partial<Unidad>) =>{
  try {
    const { data } = await SBFApi.post<Unidad>(`/unidad/add`, Unidad);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating Unidad');
  }
}

export const updatedUnidad = async(Unidad: Partial<Unidad>) =>{
  try {
    const { data } = await SBFApi.put<Unidad>(`/unidad/edit`, Unidad);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error edit Unidad');
  }
}

export const deleteUnidad = async(id_unidad: number) =>{
  try {
    // const { data } = await SBFApi.delete<Unidad>(`/Unidad/deleteUnidad/${id_Unidad}`);
    const { data } = await SBFApi.delete(`/unidad/delete`, { data: { id_unidad } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error delete Unidad');
  }
}