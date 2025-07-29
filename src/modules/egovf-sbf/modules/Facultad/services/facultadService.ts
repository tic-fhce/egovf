import { SBFApi } from '@sbf/api/SBFApi';
export interface Facultad{
  id_facultad: number,
  nombre: string;
}
export const getFacultades = async()=>{
  try {
    const { data } = await SBFApi.get<Facultad[]>(`/facultad/listar_facultades`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting facultades');
  }
}

export const createFacultad = async(facultad: Partial<Facultad>) =>{
  try {
    const { data } = await SBFApi.post<Facultad>(`/facultad/addFacultad`, facultad);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating facultad');
  }
}

export const updatedFacultad = async(facultad: Partial<Facultad>) =>{
  try {
    const { data } = await SBFApi.put<Facultad>(`/facultad/editFacultad`, facultad);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error edit facultad');
  }
}

export const deleteFacultad = async(id_facultad: number) =>{
  try {
    // const { data } = await SBFApi.delete<Facultad>(`/facultad/deleteFacultad/${id_facultad}`);
    const { data } = await SBFApi.delete(`/facultad/deleteFacultad`, { data: { id_facultad } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error delete facultad');
  }
}