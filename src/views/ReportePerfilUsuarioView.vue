<template>
    <ComponenteMenuVue :cif="usuario.cif" :menu="usuario.menu"/>
    <div class="container">
        <div class="row">
            <div class="margen">
                
            </div>
        </div>
        <!--Construccion de Componentes-->

        <!-- Datos de Persona -->
        <div class="row">
            <div class="card col-sm-12 col-md-12">
                <div class="row">
                    <div class="card-header">
                        <h3>Datos Personales</h3>
                    </div>
                    <div class="col-sm-4">
                        <img src="../assets/logo.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <div class="row">
                                <div class="col col-sm-6 col-md-6">
                                    <h4 class="card-title">CIF : {{persona._01cif}}</h4>
                                    <br>
                                    <label for="nombre" class="col-md-4">Nombre : </label>
                                    <label for="nombre" class="col-md-8">{{persona._04nombre}}</label>

                                    <label for="apellido" class="col-md-4">Apellidos : </label>
                                    <label for="nombre" class="col-md-8">{{persona._05paterno}} {{persona._06materno}}</label>
                                </div>
                                <div class="col col-sm-6 col-md-6">
                                    <ul>
                                        <li>ID app : {{persona.id}}</li>
                                        <li>CIF : {{persona._01cif}}</li>
                                        <li>C.I. : {{persona._02ci}} {{persona._03complemento}}</li>
                                        <li>Correo : {{persona._10correo}}</li>
                                        <li>Celular : {{persona._09cel}}</li>
                                        <li>Fecha N : {{persona._07fecha}}</li>
                                        <li v-if="persona._08sexo == 1">Sexo : Femenino</li>
                                        <li v-if="persona._08sexo == 2">Sexo : Masculino</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Componente de Reporte de Personal -->
        <br>

        <div class="row">
            <div class="card col-md-12">
                <div class="row">
                    <div class="card-header">
                        <div class="row">
                            <div class="col col-md-6 col-sm-6">
                                <h2 id="titulo">Reporte de Asistencia</h2>
                            </div>
                            <div class="col col-md-6 col-sm-6">
                                <h2>{{mes}} de {{reporte.gestion}} </h2>
                            </div>
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <table class="table table-striped table-hover" id="printDatos">
                            <tr><td colspan="4" class="text-center"><h4>Datos de Usuario Registrado en Biometricos</h4></td></tr>
                            <tr v-for="perfil in reporte.listaPerfil" :key="perfil.id">
                                <td>ID Biometrico : {{perfil.id}}</td>
                                <td>User ID : {{perfil._01user_id}}</td>
                                <td>Nombre : {{perfil._02nombre}}</td>
                                <td>Lugar : {{perfil._06lugar}}</td>
                            </tr>
                        </table>
                        <hr>
                        <table class="table table-striped table-hover" id="printMarcado">
                            <thead>
                                <tr>
                                    <th>#</th><th>Detalle</th><th>Lugar</th><th>Turno</th><th>Hora M.</th><th>Min. R.</th><th>Obs.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="value in listaReporte" :key="value.id">
                                    <td>{{value.id}}</td>
                                    <td>{{value.dia}} {{value.day}} <br>{{value.fecha}}<br></td>
                                    <td>
                                        {{value.lugar[0]}}<br>{{value.lugar[1]}}<br>{{value.lugar[2]}}<br>{{value.lugar[3]}}
                                    </td>
                                    <td>
                                        {{value.turno[0]}}<br>{{value.turno[1]}}<br>{{value.turno[2]}}<br>{{value.turno[3]}}
                                    </td>
                                    <td>
                                        {{value.hora[0]}}<br>{{value.hora[1]}}<br>{{value.hora[2]}}<br>{{value.hora[3]}}
                                    </td>
                                    <td>
                                        {{value.retraso[0]}}<br>{{value.retraso[1]}}<br>{{value.retraso[2]}}<br>{{value.retraso[3]}}
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th><th></th><th></th><th></th><th>Total Retraso</th><th>{{sumaRetraso}} min.</th><th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>
        </div>

    </div>
    <ComponenteFooterVue/>

</template>

<script>
import ComponenteMenuVue from '@/components/ComponenteMenu.vue';
import ComponenteFooterVue from '@/components/ComponenteFooter.vue';
import PersonaService from '@/services/personaService';
import BiometricoService from '@/services/biometricoService';
export default {
    name:'ReportePerfilUsuarioView',
    components:{
        ComponenteMenuVue,
        ComponenteFooterVue
    },
    data(){
        return {
            personaService:null,
            biometricoService:null,
            cifCiudadano:'',
            listaReporte:[],
            getPB:true,
            totalretraso:0,
            mes:'',
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                menu:[]
            },
            reporte:{
                id_horario:'',
                cif:'',
                gestion:'',
                mes:'',
                di:'',
                df:''
            },
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
        }
    },
    mounted(){
        this.reporte=JSON.parse(this.$route.params.reporte);
        this.cifCiudadano=this.reporte.cif;
        console.log("este es el cif "+this.reporte.cif);
        console.log(this.reporte);
        this.getDatos();
    },
    created(){
        this.personaService = new PersonaService();
        this.biometricoService= new BiometricoService();
    },
    beforeCreate(){        
        if(this.$cookies.get('cif')==null){
            this.$router.push('/');
        }
    },
    updated(){
        if(this.reporte.cif>0 && this.getPB)
        {
            this.getMes();
            if(this.reporte.di>0 && this.reporte.df>0)
                this.getReporteMesDia();
            else
                this.getReporteMes();
            this.getPB=false;
        }
    },
    methods:{
      getDatos(){
        if(this.$cookies.get('cif')!=null){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.menu=this.$cookies.get('menu');
            
            this.personaService.headersUsuario(this.usuario.token);
            this.personaService.getPersona(this.cifCiudadano).then((response) =>{
                this.persona=response.data;
            });
        }
      },
      getReporteMes(){
            this.biometricoService.getReporteMes(this.reporte).then((result) => {
                this.listaReporte=result.data;
                console.log("esto retorna positibo");
                console.log(this.listaReporte);
                this.sumaRetraso();
            }).catch((err) => {
                console.log("retorna negativo");
                console.log(err);
            });
        },
        getReporteMesDia(){
            this.biometricoService.getReporteMesDia(this.reporte).then((result) => {
                this.listaReporte=result.data;
                console.log("esto retorna positibo");
                console.log(this.listaReporte);
                this.sumaRetraso();
            }).catch((err) => {
                console.log("retorna negativo");
                console.log(err);
            });
        },
        sumaRetraso(){
            let sum = 0;
            this.listaReporte.forEach(element => {
                for (let i = 0; i < element.retraso.length; i++) {
                    sum +=parseInt(element.retraso[i],10);
                }
            });
            this.sumaRetraso=sum;
            console.log("La suma es "+this.sumaRetraso);
        },
        getMes(){
            if(this.reporte.mes==1){this.mes='Enero';}
            if(this.reporte.mes==2){this.mes='Febrero';}
            if(this.reporte.mes==3){this.mes='Marzo';}
            if(this.reporte.mes==4){this.mes='Abril';}
            if(this.reporte.mes==5){this.mes='Mayo';}
            if(this.reporte.mes==6){this.mes='Junio';}
            if(this.reporte.mes==7){this.mes='Julio';}
            if(this.reporte.mes==8){this.mes='Agosto';}
            if(this.reporte.mes==9){this.mes='Septiembre';}
            if(this.reporte.mes==10){this.mes='Octubre';}
            if(this.reporte.mes==11){this.mes='Noviembre';}
            if(this.reporte.mes==12){this.mes='Diciembre';}
        }
    }
}
</script>

<style scoped>
.margen{
    margin-top: 100px;
}
</style>