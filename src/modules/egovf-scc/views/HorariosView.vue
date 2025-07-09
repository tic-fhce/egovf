<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/menumoduloscc" class="breadcrumb-link">Modulo M-SCC</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{titulo}} >
            </li>
        </ol>
    </nav>
    <CRow>
        <CCol :lg="12" >
            <br>
            <CCard>
                <CCardHeader class="headercolor text-center">
                    {{mensage}}
                </CCardHeader>
                <CCardBody class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Horario</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th><th>Domingo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Ingreso Mañana</th>
                                <td>{{horarioPerfil.lem}}</td>
                                <td>{{horarioPerfil.mem}}</td>
                                <td>{{horarioPerfil.miem}}</td>
                                <td>{{horarioPerfil.jem}}</td>
                                <td>{{horarioPerfil.vem}}</td>
                                <td>{{horarioPerfil.sem}}</td>
                                <td>{{horarioPerfil.dem}}</td>
                            </tr>
                            <tr>
                                <th>Salida Mañana</th>
                                <td>{{horarioPerfil.lsm}}</td>
                                <td>{{horarioPerfil.msm}}</td>
                                <td>{{horarioPerfil.mism}}</td>
                                <td>{{horarioPerfil.jsm}}</td>
                                <td>{{horarioPerfil.vsm}}</td>
                                <td>{{horarioPerfil.ssm}}</td>
                                <td>{{horarioPerfil.dsm}}</td>
                            </tr>
                            <tr>
                                <th>Ingreso Tarde</th>
                                <td>{{horarioPerfil.let}}</td>
                                <td>{{horarioPerfil.met}}</td>
                                <td>{{horarioPerfil.miet}}</td>
                                <td>{{horarioPerfil.jet}}</td>
                                <td>{{horarioPerfil.vet}}</td>
                                <td>{{horarioPerfil.set}}</td>
                                <td>{{horarioPerfil.det}}</td>
                            </tr>
                            <tr>
                                <th>Salida Tarde</th>
                                <td>{{horarioPerfil.lst}}</td>
                                <td>{{horarioPerfil.mst}}</td>
                                <td>{{horarioPerfil.mist}}</td>
                                <td>{{horarioPerfil.jst}}</td>
                                <td>{{horarioPerfil.vst}}</td>
                                <td>{{horarioPerfil.sst}}</td>
                                <td>{{horarioPerfil.dst}}</td>
                            </tr>
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol :lg="12">
            <br>
            <CCard>
                <CCardHeader class="headercolor text-center">
                    Otros Horarios
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :lg="2">Gestion :</CCol>
                        <CCol :lg="4">
                            <select v-model="gestion" class="form-control">
                                <option v-for="y  in listaGestion" :key="y" :value="y">{{y}}</option>
                            </select>
                            <br>
                        </CCol>
                        <CCol :lg="6" class="text-center">
                            <CButton color="success" class="font" @click="getListaHorario()" size="sm"><CIcon icon="cil-calendar"></CIcon> Cargar Horarios</CButton>
                        </CCol>               
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CRow>
                        <CCol :lg="12" v-for="horario in listaHorarios" :key="horario.historial_id">
                            <br>
                            <CCard>
                                <CCardHeader class="headercolor">
                                    ID : {{horario.historial_id  }} Fecha : {{ horario.fecha }} valido hasta {{ horario.valido }}
                                </CCardHeader>
                                <CCardBody class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Horario</th><th>L</th><th>M</th><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th>
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
                                </CCardBody>
                            </CCard>
                        </CCol>  
                    </CRow>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//Importamos Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
import EgovfService from '@/modules/egovf/services/egovfService';
export default {
    name:'HorariosView',
    data(){
        return {
            titulo:'Horarios',
            sccService:null,
            egovfService:null,
            listaHorarios:[],
            listaGestion:[],
            mensage:"No tiene Un horario Actual Designado",
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            },
            gestion:0,
            horarioPerfil:{
                id:0,
                cif:0,
                lem:'08:30',lsm:'12:30',let:'14:30',lst:'18:30',
                mem:'08:30',msm:'12:30',met:'14:30',mst:'18:30',
                miem:'08:30',mism:'12:30',miet:'14:30',mist:'18:30',
                jem:'08:30',jsm:'12:30',jet:'14:30',jst:'18:30',
                vem:'08:30',vsm:'12:30',vet:'14:30',vst:'18:30',
                sem:'08:30',ssm:'12:30',set:'14:30',sst:'18:30',
                dem:'08:30',dsm:'12:30',det:'14:30',dst:'18:30'
            },
            id_horario:0,
        }
    },
    mounted(){
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        this.getGestion();
        this.getHorario();

    },
    created(){
        //Creamos los Sercicios
        this.sccService = new SccService();
        this.egovfService = new EgovfService();
    },
    methods:{
        getDatos(){
            //cargamos datos del Usuario
            if(this.$cookies.get('cif')!=null){
                this.usuario.token=this.$cookies.get('token');
                this.usuario.cif=this.$cookies.get('cif');
                this.usuario.correo=this.$cookies.get('correo');
                this.usuario.celular=this.$cookies.get('celular');
                this.usuario.pass=this.$cookies.get('pass');
                this.usuario.unidad = this.$cookies.get('unidad');
                this.usuario.sigla = this.$cookies.get('sigla');
            }
        },
        async getHorario(){ // Funcion que llama el horario del usuario            
            await this.sccService.getHorario(this.gestion,this.usuario.cif).then(response=>{
                if(response.data.id>0){
                    this.mensage = "Horario Actual";
                    this.horarioPerfil = response.data;
                }
            });
        },
        async getListaHorario(){ // Funcion que llama una lista de Horarios del usuario deacuerdo a la gestion
            await this.sccService.getListaHorario(this.usuario.cif,this.gestion).then(response=>{
                this.listaHorarios = response.data;
            });
        },
        getGestion(){ // funcion que crea una lista de gestiones desde el 2021
            var lgestion=[];
            const fecha = new Date();
            this.gestion = fecha.getFullYear();
            for(var i=2021; i<= this.gestion; i++){
                lgestion.push(i);
            }
            this.listaGestion = lgestion;
        },
    }
}
</script>