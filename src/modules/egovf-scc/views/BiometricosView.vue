<template>
    <CRow>
        <CCol :lg="4" v-for="perfil in listaPerfil" :key="perfil.id">
            <br>
            <CCard>
                <CCardHeader class="headercolor"> <CIcon icon="cil-monitor"></CIcon> - UID : {{perfil.user_id}} </CCardHeader>
                <CCardBody class="datos">
                    <CRow class="mb-2">
                        <CCol><strong>ID-Biometrico:</strong></CCol>
                        <CCol>{{ perfil.id }}</CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol><strong>UID:</strong></CCol>
                        <CCol>{{ perfil.user_id }}</CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol><strong>Estado:</strong></CCol>
                        <CCol>
                            <CBadge :color="perfil.estado == 0 ? 'warning' : 'success'">
                                {{ perfil.estado == 0 ? 'Inactivo' : 'Activo' }}
                            </CBadge>
                        </CCol>
                    </CRow>

                    <CRow class="mb-2">
                        <CCol><strong>Sigla:</strong></CCol>
                        <CCol>{{ perfil.lugar }}</CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol><strong>Horario:</strong></CCol>
                        <CCol>
                            <CBadge :color="perfil.horario_id == 0 ? 'danger' : 'success'">
                                {{ perfil.horario_id == 0 ? 'Sin Horario' : 'Horario Registrado' }}
                            </CBadge>
                        </CCol>
                    </CRow>
                    <CRow><br><hr></CRow>
                    <CRow class="mb-2 text-center">
                        <CCol>{{ perfil.nombre }}<br>nombre registrado</CCol>
                    </CRow> 
                </CCardBody>
                <CCardFooter>
                    <CCol class="text-center"><strong>{{perfil.detalle}}</strong></CCol> <!-- Aquí puedes agregar más detalles si lo deseas -->
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

</template>
<script>
//Importamos Servicios
import SccService from '@/modules/egovf-scc/services/sccService';
export default {
    name:'BiometricosView',
    data(){
        return {
            titulo:'Biometricos Aprobados',
            listaPerfil:[],
            sccService:null,
            usuario:{
                token:'',
                cif:'',
                correo:'',
                celular:'',
                pass:'',
                unidad:'',
                sigla:''
            }

        }
    },
    mounted(){
        this.cifCiudadano = this.$cookies.get('cif');
        this.getDatos();
        this.getPerfilBiometrico();

    },
    created(){
        //Creamos los Sercicios
        this.sccService = new SccService();
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
        async getPerfilBiometrico(){ // funcion que debuelve una lista del Usuario registrado en los biometricos 
            await this.sccService.getPerfil(this.usuario.cif).then(response=>{
                this.listaPerfil = response.data;
            });
        }

    }
}
</script>

<style scoped>

CBadge {
  padding: 6px 10px;
  font-size: 0.9rem;
}
.datos{
    font-size: 12px;
}
</style>