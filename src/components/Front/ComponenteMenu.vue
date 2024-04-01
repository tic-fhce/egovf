<template>
    <nav class="navbar fixed-top navbar-expand-lg menucolor">
        <div class="container justify-content-evenly">
            <router-link to="/" class="nav-link"><span class="material-icons-round"><CIcon icon="cil-home"/></span></router-link>
            <router-link to="/sesion" class="nav-link"><span class="material-icons-round"><CIcon icon="cil-calendar"/></span></router-link>
            <router-link to="/sesion" class="nav-link"><span class="material-icons-round"><CIcon icon="cil-exit-to-app"/></span></router-link>
        </div>
    </nav>
</template>

<script>


export default {
    name:'ComponenteMenu',
    data(){
        return{
            
            
        }
    },
    updated(){
        location.reload();
    }
    
}
</script>

<style scoped>
.menucolor{
    background-color: #015D82;
}
.navbar{
    padding-bottom:15px;
    padding-top:15px ;
}
.nav-link{
    padding:0.2rem 1rem;
}

.material-icons-round{
    color: white;
    background-color: rgba(150, 148, 148, 0.664);
    border-radius: 50%;
    padding: 0.6em;
    margin: 0.5em;
}
.active .material-icons-round{
    color: white;
    background-color: rgba(133,128,128, 0.158);
    border: 1px solid rgba(248, 244, 244, 0.342);
}
</style>