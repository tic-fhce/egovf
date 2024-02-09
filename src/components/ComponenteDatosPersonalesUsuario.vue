<template>
<div class="row">
    <div class="card col col-sm-12 col-md-12">
        <div class="row">
            <div class="card-header headercolor">
                <h3>Datos Personales</h3>
            </div>
            <div class="col col-sm-4 col-md-4">
                <br>
                <img :src="egovf.foto" class="img-fluid rounded-start" alt="...">
                <br>
            </div>
            <div class="col col-sm-8 col-md-8">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title">CIF : {{egovf.cif}}</h4>
                            <h4 class="card-title">Unidad : {{egovf.sigla}}</h4>
                            <label for="nombre" class="col-md-6">Nombre : </label>
                            <label for="nombre" class="col-md-6">{{egovf.nombre}}</label>
                            <label for="apellido" class="col-md-6">Apellidos : </label>
                            <label for="nombre" class="col-md-6">{{egovf.paterno}} {{egovf.materno}}</label>
                        </div>
                        <div class="col">
                            <ul>
                                <li>ID app : {{egovf.idUsuario}}</li>
                                <li>CIF : {{egovf.cif}}</li>
                                <li>C.I. : {{egovf.ci}} </li>
                                <li>Correo : {{egovf.correo}}</li>
                                <li>Celular : {{egovf.celular}}</li>
                                <li>Fecha N : {{egovf.fecha}}</li>
                                <li v-if = "egovf.sexo == 1">Sexo : Femenino</li>
                                <li v-else >Sexo : Masculino</li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name:'ComponenteDatosPersonalesUsuarioVue',
    props:['cifCiudadano','egovfp'],
    data(){
        return{
            getPB:true,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                menu:[],
                unidad:'',
                sigla:''
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
            }
        }
    },
    mounted(){
        //this.getDatosComponenteDatosPersona();
    },
    created(){
    },
    updated(){
        this.egovf = this.egovfp;
        if(this.cifCiudadano >0 && this.getPB)
        {
            this.getDatosComponenteDatosPersonaUsuario();
            this.getPB=false;
        }
    },
    methods:{
        getDatosComponenteDatosPersonaUsuario(){
            this.usuario.token=this.$cookies.get('token');
            this.usuario.cif=this.$cookies.get('cif');
            this.usuario.correo=this.$cookies.get('correo');
            this.usuario.celular=this.$cookies.get('celular');
            this.usuario.pass=this.$cookies.get('pass');
            this.usuario.menu=this.$cookies.get('menu');
            this.usuario.unidad = this.$cookies.get('unidad');
            this.usuario.sigla = this.$cookies.get('sigla');
        }
        
    }
}
</script>