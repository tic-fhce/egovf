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
          <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
            <CAvatar :src="'https://fhcevirtual.umsa.bo/egovf-img/imagenes/200/' + foto" size="md" />
          </CDropdownToggle>
          <CDropdownMenu class="pt-0">
            <CDropdownItem></CDropdownItem>
            <CDropdownItem>
              <CButton @click="perfil()" size="sm">
                <CIcon icon="cil-user" /> Perfil
              </CButton>
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem>
              <CIcon icon="cil-settings" /> configuracion
            </CDropdownItem>

            <CDropdownDivider />

            <CDropdownItem>
              <CButton @click="salir()" size="sm">
                <CIcon icon="cil-lock-locked" /> Salir
              </CButton>
            </CDropdownItem>

          </CDropdownMenu>
        </CDropdown>

      </CHeaderNav>

    </CContainer>
    <CContainer class="breacum">
      <ComponenteBreadcrumb />
    </CContainer>

  </CHeader>
</template>

<script>

import ComponenteBreadcrumb from '@/components/Escritorio/ComponenteBreadcrumb.vue';
export default {
  name: 'ComponenteHeader',
  props: ['cif', 'foto'],
  components: {
    ComponenteBreadcrumb,
  },
  data() {
    return {
      titulo: ''
    }
  },
  updated() {
    this.titulo = this.$cookies.get('titulo');
  },
  beforeCreate() {
    if (this.$cookies.get('cif') == null) {
      this.$router.push('/home');
    }
  },
  methods: {
    async salir() {
      const result = await this.$swal.fire({
        title: '¿Desea salir del sistema?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        this.limpiarCookies();
        window.location.href = '/';
      } else if (result.isDenied) {
        this.$router.push('/escritorio');
      }

    },
    perfil() {
      this.$router.push('/perfil');
    },
    limpiarCookies() {
      ['token', 'cif', 'correo', 'celular', 'pass'].forEach(cookie => this.$cookies.remove(cookie));
    }
  }

}
</script>
<style scoped>
.menustyleheader {
  background-color: var(--color-primary);
  color: white;
}

.breacum {
  background-color: white;
  margin-left: -10px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: -8px;
  border-top-right-radius: 100%;

}
</style>