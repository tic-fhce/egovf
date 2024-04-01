<template>
  <CHeader position="sticky" class="mb-4 headercolor">
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
    salir(){
      this.$swal.fire({
        title: 'Desea Salir del Sistema ',
        showDenyButton: true,
        icon:'info',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$cookies.remove('cif');
            this.$router.push('/home');
          } else if (result.isDenied) {
            this.$router.push('/escritorio');
          }
          location.reload();
      });
            
    },
    perfil(){
      this.$router.push('/perfil');      
    }
  }

}
</script>
