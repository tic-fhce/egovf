<template>
    <form>
        <CModalBody>
                <div class="mb-3 row">
                    <label for="datos" class="col-4 col-form-label">Ambiente</label>
                    <div class="col-8">
                        <input type="text" class="form-control" required="true">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="tipo" class="col-4 col-form-label">Estado</label>
                    <div class="col-8">
                        <select class="form-control" required="true" >
                            <option value="Entrada M.">Activo</option>
                            <option value="Salida M.">Inactiva</option>
            
                        </select>
                    </div>
                </div>
        </CModalBody>
        <CModalFooter>
            <button class="btn btn-success font" ><CIcon icon="cil-check-alt" class="me-2"/> Agregar Ambiente</button>
        </CModalFooter>
    </form>
</template>