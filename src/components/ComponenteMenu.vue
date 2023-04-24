<template>
    <nav v-if="cif == 0" class="navbar fixed-top navbar-expand-lg bg-primary">
        <div class="container justify-content-evenly">
            <router-link to="/" class="nav-link"><span class="material-icons-round">&#xe88a;</span></router-link>
            <router-link to="/about" class="nav-link"><span class="material-icons-round">&#xe80c;</span></router-link>
            <router-link to="/sesion" class="nav-link"><span class="material-icons-round">&#xea77;</span></router-link>
        </div>
    </nav>

    <nav v-if="cif>0" class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/escritorio" class="navbar-brand">e-FHCE</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/escritorio" class="nav-link active">Inicio</router-link>
                    </li>
                    <li class="nav-item dropdown" v-for="m in menu" :key="m.id">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ m.titulo }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                            
                            <li><a v-for="sub in m.subModel" :key="sub.id" class="dropdown-item"><router-link :to="sub.ruta" class="dropdown-item">{{sub.titulo}}</router-link></a></li>
                        </ul>
                    </li>
                </ul>

                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Menu
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/perfil" class="dropdown-item">Mi Perfil</router-link></li>
                            <li><hr class="dropdown-divider"></li>

                            <li><a class="dropdown-item" href="#" @click="salir()">Salir</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
</template>
<script>

export default {
    name:'ComponenteMenuVue',
    props:['cif','menu'],
    data(){
        return{
            
        }
    },
    methods:{
        salir(){
            this.$swal.fire({
                title: 'Desea Salir del Sistema ',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$cookies.remove('cif')
                    this.$router.push('/');
                    location.reload();
                } else if (result.isDenied) {
                    this.$router.push('/escritorio');
                }
            });
            
        }
    },
    created(){
        
    },
    updated(){
        if(this.cif>0 )
        {
            console.log("cif en Update Menu"+this.cif);
        }
    }
}
</script>
<style scoped>
.material-icons{
    color: white;
    font-size: 1.4em;
    background-color: rgba(218, 218, 218, 0.158);
    padding: 0.3em;
    border-radius: 50%;
    margin: 0.1em;
}
.navbar{
    padding-bottom:0;
    padding-top:0 ;
}
.nav-link{
    padding:0.2rem 1rem;
}

.material-icons-round{
    color: white;
    font-size: 1.4em;
    background-color: rgba(218, 218, 218, 0.158);
    padding: 0.3em;
    border-radius: 50%;
    margin: 0.1em;
}
.active .material-icons-round{
    color: white;
    background-color: rgba(133,128,128, 0.158);
    border: 1px solid rgba(248, 244, 244, 0.342);
}
</style>