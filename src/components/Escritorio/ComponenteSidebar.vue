<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand class="brant">
      <img :src="logo" width="20%"/>
    </CSidebarBrand>
    
    <CSidebarNav class="brant">
      <CNavItem>
        <router-link to="/escritorio" class="nav-link">
          <CIcon customClassName="nav-icon" icon="cil-home"/> Escritorio
        </router-link>
      </CNavItem>
      
      <!--Menu-->
      <CNavGroup v-for="item in modulo" :key="item.id">
        <template #togglerContent>
          <CIcon customClassName="nav-icon" :icon="item.icono"/> {{ item.titulo }}
        </template>
        <CNavItem v-for="subitem in item.menuDtoObj" :key="subitem.id">
          <router-link :to="subitem.ruta" class="nav-link menustyle" >{{ subitem.titulo }}</router-link>
        </CNavItem>
      </CNavGroup>
      
      <!--End Modulo-->
      
    </CSidebarNav>
  </CSidebar>
</template>

<script>

//Importamos Herramienta 
import { computed } from 'vue'
import { useStore } from 'vuex'
import logo  from '@/assets/img/logobtic.png'
import { CNavGroup} from '@coreui/vue'
export default {
  name: 'ComponenteSidebar',
  props:['modulo'],
  components: {
    CNavGroup
  },
  setup() {
    const store = useStore()
    return {
      logo,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>

<style scoped>
  .menustyle{
    background-color: var(--color-primary);  
    font-size: small;
    margin-top: -5px;
    margin-bottom: -5px;
  }

  .brant{
    background-color: var(--color-primary); 
  }
</style>
