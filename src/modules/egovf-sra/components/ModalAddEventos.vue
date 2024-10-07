<template>
    <form>
        <CModalBody>
                <div class=" mb-3 row">
                <label for="tipo" class="col-4 col-form-label">Tipo del evento</label>
                    <div class="col-8">
                        <select class="form-control" required="true" >
                            <option value="Entrada M.">Evento..</option>
                            <option value="Salida M.">Evento..</option>
                        </select>
                    </div>
                </div>
                
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Nombre :</label>
                    <div class="col-8">
                        <input type="text" class="form-control" required="true">
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">cite :</label>
                    <div class="col-8">
                        <input type="text" class="form-control" required="true">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="tipo" class="col-4 col-form-label">Estado :</label>
                    <div class="col-8">
                        <select class="form-control" required="true" >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactiva</option>
                        </select>
                      </div>
                </div>
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Fecha :</label>
                    <div class="col-8">
                        <input type="date" class="form-control" required="true">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Hoja de ruta</label>
                    <div class="col-8">
                        <input type="number" class="form-control" required="true">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Hora de inicio</label>
                    <div class="col-8">
                        <input type="date" class="form-control" required="true">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Hora final </label>
                    <div class="col-8">
                        <input type="date" class="form-control" required="true">
                    </div>
                </div>
                
        </CModalBody>
        <CModalFooter>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Ambiente</button>
        </CModalFooter>
    </form>
</template>