import Dexie from 'dexie';

const DB_NAME = 'CiudadanoDB';
const db = new Dexie(DB_NAME);

// Schema: tabla 'ciudadanos' con pk 'id' y un store 'meta' para metadatos (ej. ultimaCarga)
db.version(2).stores({
  ciudadanos: 'idPersona,nombre,paterno,materno,fecha,sexo,idUsuario,cif,matricula,ci,ci_com,complemento,correo,celular,pass,unidad,dependiente,sigla,foto,empleado', // ajusta los campos indexados según tu modelo
  meta: 'key'
});

export async function getListaCiudadanosCached({ maxAgeMinutes = 10, fetcher }) {
  const meta = await db.meta.get('ciudadanos');
  const data = await db.ciudadanos.toArray();
  const now = Date.now();

  if (data.length > 0) {
    if (meta && (now - meta.timestamp) < maxAgeMinutes * 60 * 1000) {
      return data;
    } else {

      fetcher().then(async response => {
        await db.transaction('rw', db.ciudadanos, db.meta, async () => {
          await db.ciudadanos.clear();
          await db.ciudadanos.bulkPut(response.data);
          await db.meta.put({ key: 'ciudadanos', timestamp: now });
        });
      });
      return data;
    }
  }

  // Si no hay cache → API obligatorio
  const response = await fetcher();
  await db.transaction('rw', db.ciudadanos, db.meta, async () => {
    await db.ciudadanos.clear();
    await db.ciudadanos.bulkPut(response.data);
    await db.meta.put({ key: 'ciudadanos', timestamp: now });
  });
  return response.data;
}

/** Borrar cache manualmente */
export async function clearCiudadanoCache() {
  await db.transaction('rw', db.ciudadanos, db.meta, async () => {
    await db.ciudadanos.clear();
    await db.meta.delete('ultimaCarga');
  });
}

/** Obtener un ciudadano por id */
export async function getCiudadanoById(id) {
  return db.ciudadanos.get(id);
}

/** Exponer la instancia si la quieres usar directamente en dev/debug */
export { db };