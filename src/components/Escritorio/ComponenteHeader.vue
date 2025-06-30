<template>
  <CHeader position="sticky" class="mb-4 menustyleheader">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" class="font" />
      </CHeaderToggler>

      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          {{ titulo }}
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav>

        <CDropdown>
          <CDropdownToggle placement="bottom-end" class="py-0" :caret="false" >
            <CAvatar :src="foto" size="md"/>
          </CDropdownToggle>
          <CDropdownMenu class="pt-0">
            <CDropdownItem></CDropdownItem>
            <CDropdownItem> 
              <CButton @click="perfil()" size="sm"><CIcon icon="cil-user" /> Perfil </CButton>
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem> <CIcon icon="cil-settings" /> configuracion </CDropdownItem>
            
            <CDropdownDivider />
          
            <CDropdownItem >
              <CButton @click="salir()" size="sm"><CIcon icon="cil-lock-locked"/> Salir</CButton>  
            </CDropdownItem>
          
          </CDropdownMenu>
        </CDropdown>

      </CHeaderNav>
    </CContainer>
    
  </CHeader>
</template>

<script>

export default {
  name: 'ComponenteHeader',
  props:['cif','foto'],
  components: {
    //ComponenteBreadcrumb,
  },
  data() {
    return {
      titulo:''
    }
  },
  updated(){
    this.titulo = this.$cookies.get('titulo');
  },
  beforeCreate(){        
    if(this.$cookies.get('cif')==null){
      this.$router.push('/home');
    }
  },
  methods:{
    async salir(){
      const result = await this.$swal.fire({
        title: '¿Desea salir del sistema?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        this.limpiarCookies();
        this.$router.push('/');
      } else if (result.isDenied) {
        this.$router.push('/escritorio');
      }
      /*this.$swal.fire({
        title: 'Desea Salir del Sistema ',
        showDenyButton: true,
        icon:'info',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$cookies.remove('token');
            this.$cookies.remove('cif');
            this.$cookies.remove('correo');
            this.$cookies.remove('celular');
            this.$cookies.remove('pass');
            this.$router.push('/');
            location.reload();
          } else if (result.isDenied) {
            this.$router.push('/escritorio');
          }
          
      });*/
            
    },
    perfil(){
      this.$router.push('/perfil');      
    },
    limpiarCookies() {
      ['token', 'cif', 'correo', 'celular', 'pass'].forEach(cookie => this.$cookies.remove(cookie));
    }
  }

}
</script>
<style scoped>
  .menustyleheader{
    background-color: var(--color-primary);  
    color: white;
  }
</style>