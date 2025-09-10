<template>
  <CBreadcrumb class="d-md-down-none me-auto mb-0">
    <CBreadcrumbItem  
      v-for="(item, index) in breadcrumbs" 
      :key="index" 
      :href="index === breadcrumbs.length - 1 ? null : item.fullPath"
      :active="index === breadcrumbs.length - 1"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ComponenteBreadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routesMap = ref({})
    const breadcrumbs = ref([])

    // Construir el mapa de rutas
    onMounted(() => {
      buildRoutesMap()
      updateBreadcrumbs()
    })

    // Observar cambios en la ruta
    watch(() => route.fullPath, () => {
      updateBreadcrumbs()
    })

    function buildRoutesMap() {
      router.options.routes.forEach(route => {
        if (route.name) {
          routesMap.value[route.name] = route
        }
        // También procesar rutas anidadas (children)
        if (route.children) {
          route.children.forEach(childRoute => {
            if (childRoute.name) {
              routesMap.value[childRoute.name] = childRoute
            }
          })
        }
      })
    }

    function updateBreadcrumbs() {
      if (Object.keys(routesMap.value).length === 0) {
        buildRoutesMap()
      }
      
      breadcrumbs.value = buildBreadcrumbs(route.name, routesMap.value, route.params)
    }

    function buildBreadcrumbs(routeName, routesMap, currentParams) {
      const breadcrumbs = []
      let currentRoute = routesMap[routeName]
      
      if (!currentRoute) {
        console.warn(`Ruta no encontrada en el mapa: ${routeName}`)
        return []
      }

      // Construir el breadcrumb desde la ruta actual hacia arriba
      while (currentRoute) {
        // Reemplazar parámetros en la ruta
        let fullPath = replaceParamsInPath(currentRoute.path, currentParams)
        
        breadcrumbs.unshift({
          name: getRouteTitle(currentRoute, currentParams),
          path: currentRoute.path, // Path original con placeholders
          fullPath: fullPath, // Path con parámetros reemplazados
          active: false,
        })
        
        // Si no tiene parent, terminamos
        if (!currentRoute.meta?.parent) break
        
        const parentRouteName = currentRoute.meta.parent
        
        // Verificar si la ruta padre existe
        if (!routesMap[parentRouteName]) {
          console.warn(`Ruta padre no encontrada: ${parentRouteName}`)
          break
        }
        
        currentRoute = routesMap[parentRouteName]
      }

      // Marcar el último breadcrumb como activo y quitar el path
      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].active = true
        breadcrumbs[breadcrumbs.length - 1].fullPath = null
      }

      return breadcrumbs
    }

    function replaceParamsInPath(path, params) {
      let replacedPath = path
      Object.keys(params).forEach(key => {
        replacedPath = replacedPath.replace(`:${key}`, params[key])
      })
      return replacedPath
    }

    function getRouteTitle(route, params) {
      let title = route.meta?.title || route.name
      
      // Reemplazar parámetros en el título dinámico
      if (title && typeof title === 'string') {
        Object.keys(params).forEach(key => {
          if (title.includes(key)) {
            title = title.replace(`:${key}`, params[key])
          }
        })
      }
      
      return title
    }

    return {
      breadcrumbs
    }
  }
}
</script>
<style scoped>

</style>