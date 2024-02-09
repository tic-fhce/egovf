<template>
    <div class="row">
        <div class="card col-md-12">
            <div class="row">

                <!--Menu-->
                <div class="card-header headercolor">
                    <div class="row">
                        <nav class="navbar navbar-expand-lg navbar-dark">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="#">Modulo SCC</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mscc" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="mscc">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Opciones
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#biometricoModal">Agregar Biometrico</a></li>
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#horarioModal">Agregar Horario</a></li>
                                                <li><hr class="dropdown-divider"></li>
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#obsModal">Agregar Observaciones</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Reportes
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reportemensualModal">Reporte Mensual</a></li>
                                                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reportemensualsegmentadoModal">Reporte Segmentado</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <!--END Menu-->

                <!-- Cuerpo del Card-->
                <div class="card-body">
                    <div class="row">
                        <!--Cabesera del TAB-->
                        <ul class="nav nav-tabs" id="myTabBiometrico" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="user-tab" data-bs-toggle="tab" data-bs-target="#datos" type="button" role="tab"  aria-selected="true">Datos Biometrico</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#horario" type="button" role="tab"  aria-selected="true">Horarios</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#observaciones" type="button" role="tab"  aria-selected="true">Obs</button>
                            </li>
                        </ul>
                        <!--END Cabesera del TAB-->

                        <!--Contenido del TAB-->
                        <div class="tab-content" id="myTabContentBiometrico">
                            <!--Datos del Biometrico-->
                            <div class="tab-pane fade show active" id="datos" role="tabpanel" aria-labelledby="datos-tab">
                                <div class="row">
                                    <div class="col-md-3 espace" v-for="perfil in listaPerfil" :key="perfil.id">
                                        <div class="card">
                                            <div class="card-header headercolor">UID : {{perfil._01user_id}}</div>
                                            <div class="card-body">
                                                <label>ID Biometrico : {{perfil.id}}</label><br>
                                                <label>UID : {{perfil._01user_id}}</label><br>
                                                <label>Nombre : {{perfil._02nombre}}</label><br>
                                                <label v-if="perfil._04estado==0">Estado : <button class="badge bg-success" @click="estadoInactibo(perfil)">Activo</button></label>
                                                <label v-else>Estado : <button class="badge bg-danger" @click="estadoActibo(perfil)">Inactivo</button></label><br>
                                                <label>Lugar : {{perfil._06lugar}}</label><br>
                                                <label>Tipo : {{empleado.empleado}}</label><br>        
                                            </div>
                                            <div class="card-footer">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Datos del Biometrico-->

                            <!--Horario-->
                            <div class="tab-pane fade" id="horario" role="tabpanel" aria-labelledby="mensula-tab">
                                <div class="row">
                                    <div class="col-md-12 table-responsive">
                                        <h1>Horario Actual</h1>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Horario</th>
                                                    <th>Lunes</th>
                                                    <th>Martes</th>
                                                    <th>Miercoles</th>
                                                    <th>Jueves</th>
                                                    <th>Viernes</th>
                                                    <th>Sabado</th>
                                                    <th>Domingo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Ingreso Mañana</th>
                                                    <td>{{horarioPerfil._02lem}}</td>
                                                    <td>{{horarioPerfil._06mem}}</td>
                                                    <td>{{horarioPerfil._10miem}}</td>
                                                    <td>{{horarioPerfil._14jem}}</td>
                                                    <td>{{horarioPerfil._18vem}}</td>
                                                    <td>{{horarioPerfil._22sem}}</td>
                                                    <td>{{horarioPerfil._26dem}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Salida Mañana</th>
                                                    <td>{{horarioPerfil._03lsm}}</td>
                                                    <td>{{horarioPerfil._07msm}}</td>
                                                    <td>{{horarioPerfil._11mism}}</td>
                                                    <td>{{horarioPerfil._15jsm}}</td>
                                                    <td>{{horarioPerfil._19vsm}}</td>
                                                    <td>{{horarioPerfil._23ssm}}</td>
                                                    <td>{{horarioPerfil._27dsm}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Ingreso Tarde</th>
                                                    <td>{{horarioPerfil._04let}}</td>
                                                    <td>{{horarioPerfil._08met}}</td>
                                                    <td>{{horarioPerfil._12miet}}</td>
                                                    <td>{{horarioPerfil._16jet}}</td>
                                                    <td>{{horarioPerfil._20vet}}</td>
                                                    <td>{{horarioPerfil._24set}}</td>
                                                    <td>{{horarioPerfil._28det}}</td>
                                                </tr>
                                                <tr>
                                                    <th>Salida Tarde</th>
                                                    <td>{{horarioPerfil._05lst}}</td>
                                                    <td>{{horarioPerfil._09mst}}</td>
                                                    <td>{{horarioPerfil._13mist}}</td>
                                                    <td>{{horarioPerfil._17jst}}</td>
                                                    <td>{{horarioPerfil._21vst}}</td>
                                                    <td>{{horarioPerfil._25sst}}</td>
                                                    <td>{{horarioPerfil._29dst}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br>
                                
                                <br>
                                <hr> 
                                <div class="row">
                                    <h1>Otros Horarios</h1>
                                    <div class="col-md-3">
                                        <div class="card">
                                            <div class="card-header headercolor">
                                                Horarios
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-12 row">
                                                    <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsgestion" class="form-control">
                                                            <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <button type="button" class="btn btn-success" @click="getListaHorario()">Cargar Horarios</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9 table-responsive">
                                        <div class="row">
                                            <div class="col-md-12" v-for="horario in listaHorarios" :key="horario.historial_id">
                                                <div class="card">
                                                    <div class="card-header headercolor">
                                                        ID : {{horario.historial_id  }} Fecha : {{ horario.fecha }} valido hasta {{ horario.valido }}
                                                    </div>
                                                    <div class="card-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Horario</th>
                                                                    <th>L</th>
                                                                    <th>M</th>
                                                                    <th>M</th>
                                                                    <th>J</th>
                                                                    <th>V</th>
                                                                    <th>S</th>
                                                                    <th>D</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>I. Mañana</th>
                                                                    <td>{{horario.lem}}</td>
                                                                    <td>{{horario.mem}}</td>
                                                                    <td>{{horario.miem}}</td>
                                                                    <td>{{horario.jem}}</td>
                                                                    <td>{{horario.vem}}</td>
                                                                    <td>{{horario.sem}}</td>
                                                                    <td>{{horario.dem}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>S. Mañana</th>
                                                                    <td>{{horario.lsm}}</td>
                                                                    <td>{{horario.msm}}</td>
                                                                    <td>{{horario.mism}}</td>
                                                                    <td>{{horario.jsm}}</td>
                                                                    <td>{{horario.vsm}}</td>
                                                                    <td>{{horario.ssm}}</td>
                                                                    <td>{{horario.dsm}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>I. Tarde</th>
                                                                    <td>{{horario.let}}</td>
                                                                    <td>{{horario.met}}</td>
                                                                    <td>{{horario.miet}}</td>
                                                                    <td>{{horario.jet}}</td>
                                                                    <td>{{horario.vet}}</td>
                                                                    <td>{{horario.set}}</td>
                                                                    <td>{{horario.det}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>S. Tarde</th>
                                                                    <td>{{horario.lst}}</td>
                                                                    <td>{{horario.mst}}</td>
                                                                    <td>{{horario.mist}}</td>
                                                                    <td>{{horario.jst}}</td>
                                                                    <td>{{horario.vst}}</td>
                                                                    <td>{{horario.sst}}</td>
                                                                    <td>{{horario.dst}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>          
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Horario-->

                            <!--Obtener Observaciones del Biometrico-->
                            <div class="tab-pane fade" id="observaciones" role="tabpanel" aria-labelledby="datos-tab">
                                <br>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header headercolor">
                                                OBS
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-12 row">
                                                    <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsgestion" class="form-control">
                                                            <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
                                                    <div class="col-sm-6">
                                                        <select v-model="obsmes" class="form-control">
                                                            <option value="01">Enero</option>
                                                            <option value="02">Febrero</option>
                                                            <option value="03">Marzo</option>
                                                            <option value="04">Abril</option>
                                                            <option value="05">Mayo</option>
                                                            <option value="06">Junio</option>
                                                            <option value="07">Julio</option>
                                                            <option value="08">Agosto</option>
                                                            <option value="09">Septiembre</option>
                                                            <option value="10">Octubre</option>
                                                            <option value="11">Noviembre</option>
                                                            <option value="12">Diciembre</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="mb-12 row">
                                                    <button type="button" class="btn btn-success" @click="getObs()">Cargar Observaciones</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th><th>Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="lsobs in listaObs" :key="lsobs.id">
                                                    <td>{{ lsobs.id }}</td>
                                                    <td>
                                                        {{ lsobs._02uidobs }}<br>
                                                        <strong>Fecha : </strong>{{ lsobs._03fechainicio }}<br>
                                                        <strong>Tipo: </strong>{{ lsobs._11tipo }}   <strong>Hora: </strong>{{ lsobs._12hora }} <br>
                                                        <strong><a href="#" data-bs-toggle="modal" data-bs-target="#detalleModal" @click="getObsDetalle(lsobs.id)">Ver Detalles</a></strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--End Obtener Observaciones del Biometrico-->
                        </div>
                        <!--END Contenido del TAB-->
                    </div>
                </div>
                <!--END Cuerpo del Card-->

                <!-- Pie del Card-->
                <div class="card-footer"></div>
                <!-- END Pie del Card-->
            </div>
        </div>
    </div>
    <br>

<!-- Modal  Biometrico-->
<div class="modal fade" id="biometricoModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Biometrico</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <div class="mb-3 row">
            <label for="cif" class="col-sm-6 col-form-label">CIF</label>
            <label for="tipo" class="col-sm-6 col-form-label">{{ mscc.cif }}</label>
        </div>

        <div class="mb-3 row">
            <label for="nombre" class="col-sm-6 col-form-label">Nombre Completo</label>
            <label for="tipo" class="col-sm-6 col-form-label">{{ mscc.nombre }} {{ mscc.paterno }} {{ mscc.materno }}</label>
        </div>

        <div class="mb-3 row">
            <label for="tipo" class="col-sm-6 col-form-label">Tipo</label>
            <label for="tipo" class="col-sm-6 col-form-label">{{ empleado.empleado }}</label>
        </div>
        
        <div class="mb-3 row">
            <label for="datos" class="col-sm-6 col-form-label">Datos del Biometrico</label>
            <div class="col-sm-6">
                <select v-model="id_bio" class="form-control" @change="datosChange()">
                    <option v-for="lista in listaBiometrico" :value="lista.id" :key="lista.id">{{lista._02nombre}} {{lista._06lugar}}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateBiometrico()">Agregar Datos </button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal  Biometrico-->

<!-- Modal  Horario-->
<div class="modal fade" id="horarioModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Nuevo Horario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
            <br>
            <table class="table">
                <thead>
                    <tr>
                        <th>Horario</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sabado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Ingreso Mañana</th>
                        <td><input type="text" v-model="horario._02lem" size="5"></td>
                        <td><input type="text" v-model="horario._06mem" size="5"></td>
                        <td><input type="text" v-model="horario._10miem" size="5"></td>
                        <td><input type="text" v-model="horario._14jem" size="5"></td>
                        <td><input type="text" v-model="horario._18vem" size="5"></td>
                        <td><input type="text" v-model="horario._22sem" size="5"></td>
                        <td><input type="text" v-model="horario._26dem" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Mañana</th>
                        <td><input type="text" v-model="horario._03lsm" size="5"></td>
                        <td><input type="text" v-model="horario._07msm" size="5"></td>
                        <td><input type="text" v-model="horario._11mism" size="5"></td>
                        <td><input type="text" v-model="horario._15jsm" size="5"></td>
                        <td><input type="text" v-model="horario._19vsm" size="5"></td>
                        <td><input type="text" v-model="horario._23ssm" size="5"></td>
                        <td><input type="text" v-model="horario._27dsm" size="5"></td>
                    </tr>
                    <tr>
                        <th>Ingreso Tarde</th>
                        <td><input type="text" v-model="horario._04let" size="5"></td>
                        <td><input type="text" v-model="horario._08met" size="5"></td>
                        <td><input type="text" v-model="horario._12miet" size="5"></td>
                        <td><input type="text" v-model="horario._16jet" size="5"></td>
                        <td><input type="text" v-model="horario._20vet" size="5"></td>
                        <td><input type="text" v-model="horario._24set" size="5"></td>
                        <td><input type="text" v-model="horario._28det" size="5"></td>
                    </tr>
                    <tr>
                        <th>Salida Tarde</th>
                        <td><input type="text" v-model="horario._05lst" size="5"></td>
                        <td><input type="text" v-model="horario._09mst" size="5"></td>
                        <td><input type="text" v-model="horario._13mist" size="5"></td>
                        <td><input type="text" v-model="horario._17jst" size="5"></td>
                        <td><input type="text" v-model="horario._21vst" size="5"></td>
                        <td><input type="text" v-model="horario._25sst" size="5"></td>
                        <td><input type="text" v-model="horario._29dst" size="5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="addHorario()">Agregar Datos </button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal  Horario-->

<!-- Modal  Obserbasiones-->
<div class="modal fade" id="obsModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Agregar Observaciones de Asistencia</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <form @submit.prevent="addObs()" enctype="multipart/form-data">
            
            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">UID - OBS</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.uidobs" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha de Inicio</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obs.fechainicio" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Fecha Fin</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="obs.fechafin" required="true">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Detalle</label>
                <div class="col-sm-8">
                    <textarea class="form-control" v-model="obs.detalle" required="true"></textarea>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="tipo" class="col-sm-4 col-form-label">Tipo</label>
                <div class="col-sm-8">
                    <select class="form-control" v-model="obs.tipo" required="true">
                        <option value="Entrada M.">Entrada Mañana</option>
                        <option value="Salida M.">Salida Mañana</option>
                        <option value="Entrada T.">Entrada Tarde</option>
                        <option value="Salida T.">Salida Tarde</option>
                        <option value="continuo">Continuo</option>
                        <option value="horas">Horas de Servicio</option>
                        <option value="extraordinario">Horario Extraordinario</option>
                        <option value="comision">Comisión</option>
                        <option value="permiso">Permiso</option>
                        <option value="asueto">Asueto</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label for="datos" class="col-sm-4 col-form-label">Hora</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="obs.hora">
                </div>
            </div>

            <div class="mb-3 row">
                <label for="archivo" class="col-sm-4 col-form-label">Documento</label>
                <div class="col-sm-8">
                    <input type="file" ref="file" class="form-control" @change="selectFile()" required="true">
                </div>
            </div>
            <hr> 

            <div class="mb-3 row text-center" >
                <label for="archivo" class="col-sm-4 col-form-label"></label>
                <div class="col-sm-4">
                    <button class="btn btn-success" >Agregar Observaciones</button>
                </div>
                <label for="archivo" class="col-sm-4 col-form-label"></label>
            </div>

        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal  Obserbasiones-->

<!-- Modal Reporte Mensual-->
<div class="modal fade" id="reportemensualModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Reporte Mensual</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-12 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.gestion" class="form-control">
                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.mes" class="form-control">
                    <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="getReporteMes()">Ver Reporte</button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal Reporte Mensual-->

<!-- Modal Reporte Mensual Segmentado-->
<div class="modal fade" id="reportemensualsegmentadoModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Reporte Mensual Segmentado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-12 row">
            <label for="gestion" class="col-sm-6 col-form-label">Gestion :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.gestion" class="form-control">
                    <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="mes" class="col-sm-6 col-form-label">Mes :</label>
            <div class="col-sm-6">
                <select v-model="reporteMes.mes" class="form-control">
                    <option v-for = "mes in listaMes" :key = "mes" :value = "mes.m">{{ mes.mes }}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="inicio" class="col-sm-6 col-form-label">Inicio :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMes.di">
                    <option v-for="i=1 in 31" :key="i" :value="i">{{i}}</option>
                </select>
            </div>
        </div>
        <br>
        <div class="mb-12 row">
            <label for="fin" class="col-sm-6 col-form-label">Fin :</label>
            <div class="col-sm-6">
                <select  class="form-control" v-model="reporteMes.df">
                    <option v-for="j=1 in 31" :key="j" :value="j">{{j}}</option>
                </select>
            </div>
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="getReporteMes()">Ver Reporte</button>
      </div>
    </div>
  </div>
</div>
<!-- END Modal Reporte Mensual Segmentado-->

<!-- Modal  Detalles de OBS-->
<div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="biometricoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header headercolor">
        <h5 class="modal-title">Detalles de la Observacion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="row">
            <div class="col-md-12">
                <strong>ID: </strong>{{ obsDetalle.id }}<br>
                <strong>Fecha Inicio: </strong>{{ obsDetalle.fechainicio }}<br>
                <strong>Fecha Fin: </strong> {{ obsDetalle.fechafin }}<br>
                <strong>Detalle: </strong>{{ obsDetalle.detalle }}<br>
                <strong>Tipo de Obs. : </strong>{{ obsDetalle.tipo }} <br>
                <strong>Hora: </strong>{{ obsDetalle.hora }} <br>
            </div>
            <div class="col-md-12">
                <img :src="obsDetalle.url" alt="" class="img-fluid">
            </div>
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="downloadImg(obsDetalle.url,obsDetalle.imagen)">Descargar Documento </button>
      </div>

    </div>
  </div>
</div>
<!-- END Modal  documento-->


</template>
<script>
import BiometricoService from '@/services/biometricoService';
import UploadService from '@/services/upload/uploadService';

export default {
    name:'ComponenteMSccVue',
    props:['mscc','empleado'],
    data(){
        return{
            biometricoService:null,
            uploadService:null,
            listaBiometrico:[],
            listaPerfil:[],
            reporteFinal:[],
            listaObs:[],
            listaGestion:[],
            listaMes:[{m:"01",mes:"Enero"},{m:"02",mes:"Febrero"},{m:"03",mes:"Marzo"},{m:"04",mes:"Abril"},{m:"05",mes:"Mayo"},{m:"06",mes:"Junio"},{m:"07",mes:"Julio"},{m:"08",mes:"Agosto"},{m:"09",mes:"Septiembre"},{m:"10",mes:"Octubre"},{m:"11",mes:"Noviembre"},{m:"12",mes:"Diciembre"}],
            listaHorarios:[],
            id_bio:0,
            id_horario:0,
            getPB:true,
            obsgestion:0,
            obsmes:1,
            archivo:'',
            reporteMes:{
                id_horario:'',
                cif:'',
                gestion:2023,
                mes:1,
                di:0,
                df:0,
                listaPerfil:[],
                persona:{
                    id:null,
                    _01cif:'',
                    _02ci:'',
                    _03complemento:'',
                    _04nombre:'',
                    _05paterno:'',
                    _06materno:'',
                    _07fecha:'',
                    _08sexo:'',
                    _09cel:'',
                    _10correo:''
                },
            },
            biometrico:{
                id:null,
                _01user_id:0,
                _02nombre:'',
                _03cif:0,
                _04estado:0,
                _05horario:0,
                _06lugar:'',
                _07id_tipo:1
            },
            egovf:{
                idPersona:0,
                nombre:'',
                paterno:'',
                materno:'',
                fecha:'',
                sexo:0,
                idUsuario:0,
                cif:0,
                matricula:0,
                ci:'',
                ci_com:0,
                complemento:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                dependiente:'',
                sigla:'',
                foto:''
            },
            horario:{
                _01cif:this.mscc.cif,
                _02lem:'08:30',_03lsm:'12:30',_04let:'14:30',_05lst:'18:30',
                _06mem:'08:30',_07msm:'12:30',_08met:'14:30',_09mst:'18:30',
                _10miem:'08:30',_11mism:'12:30',_12miet:'14:30',_13mist:'18:30',
                _14jem:'08:30',_15jsm:'12:30',_16jet:'14:30',_17jst:'18:30',
                _18vem:'08:30',_19vsm:'12:30',_20vet:'14:30',_21vst:'18:30',
                _22sem:'08:30',_23ssm:'12:30',_24set:'14:30',_25sst:'18:30',
                _26dem:'08:30',_27dsm:'12:30',_28det:'14:30',_29dst:'18:30'
            },
            horarioPerfil:{
                id:0,
                _01cif:this.mscc.cif,
                _02lem:'08:30',_03lsm:'12:30',_04let:'14:30',_05lst:'18:30',
                _06mem:'08:30',_07msm:'12:30',_08met:'14:30',_09mst:'18:30',
                _10miem:'08:30',_11mism:'12:30',_12miet:'14:30',_13mist:'18:30',
                _14jem:'08:30',_15jsm:'12:30',_16jet:'14:30',_17jst:'18:30',
                _18vem:'08:30',_19vsm:'12:30',_20vet:'14:30',_21vst:'18:30',
                _22sem:'08:30',_23ssm:'12:30',_24set:'14:30',_25sst:'18:30',
                _26dem:'08:30',_27dsm:'12:30',_28det:'14:30',_29dst:'18:30'
            },
            obs:{
                cif:null,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'Seleccionar Tipo',
                hora:'08:30',
                url:''
            },
            obsDetalle:{
                id:0,
                uidobs:'',
                fechainicio:'',
                fechafin:'',
                detalle:'',
                imagen:'',
                tipo:'',
                hora:'',
                url:''
            }
        }
    },
    created(){
        //Creamos los Sercicios
        this.biometricoService = new BiometricoService();
        this.uploadService = new UploadService();
    },
    mounted(){
        this.getLista(); // funcion que trae La lista de usuarios Registrados en los Biometricos
    },
    updated(){
        this.egovf = this.mscc; // pasamos el props a objeto egovf
        if(this.egovf.cif > 0 && this.getPB)
        {
            this.getPerfilBiometrico(); // funcion que debuelbe una lista del Usuario registrado en los biometricos 
            this.getGestion(); // funcion que crea una lista de gestiones desde el 2021
            this.getPB = false; // cambiamos el valor para evitar la actualizacion constante
        }
    },
    methods:{

        selectFile(){// Funcion que permite cambiar los datos del archivo
            this.archivo = this.$refs.file.files[0];
        },
        async getLista(){ // funcion que trae una lista de usuarios Registrados en los Biometricos
            await this.biometricoService.getListarCifCero().then(response => {
                this.listaBiometrico = response.data;
            });
        },
        async getPerfilBiometrico(){ // funcion que debuelve una lista del Usuario registrado en los biometricos 
            await this.biometricoService.getPerfil(this.egovf.cif).then(response=>{
                this.listaPerfil = response.data;
                if(this.listaPerfil.length > 0){
                    this.id_horario = this.listaPerfil[0]._05horario_id;
                    this.getHorario(); // Funcion que llama el horario del usuario
                }
            });
        },
        async getHorario(){ // Funcion que llama el horario del usuario
            await this.biometricoService.getHorario(this.id_horario,this.egovf.cif).then(response=>{
                this.horarioPerfil = response.data;
            });
        },
        async getListaHorario(){ // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
            await this.biometricoService.getListaHorario(this.egovf.cif,this.obsgestion).then(response=>{
                this.listaHorarios = response.data;
            });
        },
        async getObs(){ // Funcion que llama una lista de Observaciones del usuario 
            await this.biometricoService.getObs(this.egovf.cif,this.obsgestion,this.obsmes).then(response=>{
                this.listaObs = response.data;
            });
        },
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.obsgestion = fecha.getFullYear();
            for(var i=2021; i<= this.obsgestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
            this.reporteMes.gestion = this.obsgestion;
            this.reporteMes.mes = fecha.getMonth();
        },
        datosChange(){ //Funcion que cambia los parametros del Biometrico para su registro
            this.listaBiometrico.forEach(element => {
                if (element.id === this.id_bio)
                {
                    this.biometrico = element;
                    this.biometrico._03cif = this.egovf.cif;
                    this.biometrico._07id_tipo = this.empleado.tipoempleado_id;
                }
            });
        },
        addHorario(){//Funcion para registrar un Horario al Usuario
            this.horario._01cif = this.egovf.cif;
            this.$swal.fire({
                title: 'Desea Agregar el Horario de trabajo del Empleado ?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.addHorario(this.horario).then(response=>{
                        if(response.status==200){
                            this.$swal.fire('Los Horarios fueron Agregados al Empleado Corectamente', '', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        async addObs(){ //Funcion para registrar una Observacion del Usuario
            
            const fromData = new FormData();
            fromData.append('archivo',this.archivo);
            try{
                //primero subimos el archivo
                await this.uploadService.addImagen(fromData).then((response)=>{
                if(response.status == 200){
                    this.obs.url = this.uploadService.getUrl()+ response.data.nombre;
                    this.obs.imagen = response.data.nombre;
                    this.obs.cif = this.egovf.cif;
                    this.$swal.fire({
                        title: 'Desea agregar las Observaciones de Asistencia al Empleado?'  +this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                        showDenyButton: true,
                        confirmButtonText: 'Aceptar',
                        denyButtonText: 'Cancelar',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            this.biometricoService.addObs(this.obs).then(response =>{
                                if(response.status == 200){
                                    this.$swal.fire('Las Observaciones fueron Agregados Corectamente a '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno , 'success').then((res)=>{
                                        if(res)
                                            location.reload();
                                    });
                                }
                                else{
                                    this.$swal.fire('Las Observaciones no fueron Guardados Error'+ response.status, '', 'error');
                                }
                            });
                            
                        } else if (result.isDenied) {
                            this.$swal.fire('Datos Cancelados', '', 'info');
                        }
                    });

                }
                else {
                    this.$swal.fire('El archivo no pudo ser Guardado  ', 'error');
                }
            });
            }catch(err){
                this.$swal.fire('El archivo no pudo ser Guardado  '+ err, 'error');
            }
        },
        
        async updateBiometrico(){ // Funcion para registrar al usuario con un biometrico
            await this.$swal.fire({
                title: 'Desea Agregar el Biometrico  al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.biometricoService.updateBiometrico(this.biometrico).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Datos del Biometrico Agregados al Ciudadano Corectamente', '', 'success').then((res)=>{
                                if(res)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getReporteMes(){//Funcion que muestra los Reportes de Usuario
            this.reporteMes.cif = this.egovf.cif;
            if(this.reporteMes.di<10){
                this.reporteMes.di='0'+this.reporteMes.di;
            }
            if(this.reporteMes.df<10){
                this.reporteMes.df='0'+this.reporteMes.df;
            }
            this.$router.push({
                name: "reporte",
                params:{
                    uri:this.reporteMes.cif+'j'+this.reporteMes.gestion+'m'+this.reporteMes.mes+'m'+this.reporteMes.di+'k'+this.reporteMes.df
                }
            });
        },
        async estadoActibo(bio){ // Funcion que Activa al Usuario en el Biometrico
            
            await this.$swal.fire({
                title: 'Desea cambiar el Estado de Biometrico al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    bio._04estado=0;
                    this.biometricoService.estadoBiometrico(bio).then(response=>{
                        if(response.status== 200 ){
                            this.$swal.fire('Datos del Biometrico Actualizados Corectamente', '', 'success').then((result) => {
                                if(result)
                                    location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        async estadoInactibo(bio){// Funcion que Desactiva al Usuario en el Biometrico
            await this.$swal.fire({
                title: 'Desea cambiar el Estado de Biometrico al Ciudadano ? '+this.egovf.nombre+" "+this.egovf.paterno+" "+this.egovf.materno,
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    bio._04estado=1;
                    this.biometricoService.estadoBiometrico(bio).then(response=>{
                        if(response.status == 200){
                            this.$swal.fire('Datos del Biometrico Actualizados Corectamente', '', 'success').then((result) => {
                            if(result)
                                location.reload();
                            });
                        }
                        else{
                            this.$swal.fire('Los Datos no fueron Guardados Error'+ response.status, '', 'error');
                        }
                    });
                    
                } else if (result.isDenied) {
                    this.$swal.fire('Datos Cancelados', '', 'info');
                }
            });
        },
        getObsDetalle(id){// Funcion que Muestra el detalle de las Observaciones del Usuario
            console.log(id);
            this.listaObs.forEach(obs =>{
                if(obs.id === id){
                    this.obsDetalle.id = obs.id;
                    this.obsDetalle.uidobs = obs._02uidobs;
                    this.obsDetalle.fechainicio = obs._03fechainicio;
                    this.obsDetalle.fechafin = obs._04fechafin;
                    this.obsDetalle.detalle = obs._09detalle;
                    this.obsDetalle.imagen = obs._10imagen;
                    this.obsDetalle.tipo = obs._11tipo;
                    this.obsDetalle.hora = obs._12hora;
                    this.obsDetalle.url = obs._15url;
                }
            });
        },
        async downloadImg(Url,nombre) {// Funcion que permite Descargar imagen o documento
            const blob = await (await fetch(Url)).blob();
            const url = URL.createObjectURL(blob);
            Object.assign(document.createElement('a'), { href: url, download: nombre }).click();
            URL.revokeObjectURL(url);
        },
    }
}
</script>


<style scoped>
.material-icons{
    
    color: white;
    font-size: 1em;
    border-top: 0ch;
    border-bottom: 0ch;
}
</style>