
---

# Rutas SBF (Sistema Bibliotecario de Facultad)

Este proyecto es una implementación del sistema de rutas para el módulo **SBF (Sistema Bibliotecario de Facultad)**, desarrollado con **Vue.js** y **Vue Router**. La estructura de rutas gestiona varias vistas relacionadas con la biblioteca, préstamos, facultades, unidades, usuarios y más.

## Descripción

Este archivo contiene la configuración de las rutas para el módulo SBF de la aplicación. Estas rutas incluyen componentes que permiten la interacción con diversas secciones de la aplicación, como:

* **Biblioteca**
* **Libros**
* **Préstamos**
* **Facultad y Unidad**
* **Usuarios y Lectores**

Algunas rutas tienen guardias de acceso (`beforeEnter`) para asegurar que solo los usuarios con los permisos adecuados puedan acceder a ciertas vistas.

## Estructura de Rutas

```typescript
export const sbfRoutes = {
  path: '/sbf',
  name: 'sbf',
  component: () => import('../layouts/SbfLayout.vue'),
  children: [
    // Rutas Hijas
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../layouts/DashBoard.vue')
    },
    {
      path: '/biblioteca',
      name: 'biblioteca',
      component: () => import('../modules/Biblioteca/views/BibliotecaView.vue'),
      // beforeEnter: [ isSuperAdminGuard, isAdminGuard],
    },
    {
      path: '/biblioteca/detalles/:idBiblioteca',
      name: 'DetallesBiblioteca',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idBiblioteca: Number(route.params.idBiblioteca),
      }),
      component: () => import('../modules/Biblioteca/views/DetailsBiblioteca.vue'),
    },
    { 
      path: '/libros',
      name: 'libros',
      component: () => import('../modules/Biblioteca/views/LibrosView.vue')
    },
    { 
      path: '/libros/:idLibro', // add or updated libro
      name: 'libro',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idLibro: Number(route.params.idLibro),
      }),
      component: () => import('../modules/Biblioteca/views/LibroView.vue'),
      beforeEnter: [ isAdminGuard],
    },
    {
      path: '/libro/detalles/:idLibro',
      name: 'DetallesLibro',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idLibro: Number(route.params.idLibro),
      }),
      component: () => import('../modules/Biblioteca/views/DetailsLibro.vue'),
    },
    {
      path: '/prestamos',
      name: 'prestamos',
      component: () => import('../modules/Prestamo/views/PrestamosView.vue')
    },
    {
      path: '/prestamo/:idPrestamo',
      name: 'prestamo',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idPrestamo: Number(route.params.idPrestamo),
      }),
      component: () => import('../modules/Prestamo/views/PrestamoView.vue')
    },
    {
      path: '/prestamo/detalles/:idPrestamo',
      name: 'DetallesPrestamo',
      props: (route: RouteLocationNormalizedLoaded) => ({
        idPrestamo: Number(route.params.idPrestamo),
      }),
      component: () => import('../modules/Prestamo/views/DetailsPrestamo.vue'),
    },
    {
      path: '/facultad',
      name: 'facultad',
      component: () => import('../modules/Facultad/views/FacultadView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/unidad',
      name: 'unidad',
      component: () => import('../modules/Unidad/view/UnidadView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../modules/users/views/UserView.vue'),
      beforeEnter: [ isSuperAdminGuard],
    },
    {
      path: '/lectores',
      name: 'lectores',
      component: () => import('../modules/users/views/LectorView.vue'),
      beforeEnter: [ isAdminGuard],
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404
      name: 'NotFound',
      component: () => import('../layouts/NotFound404.vue'),
    }
  ],
};
```

## Rutas Importantes

### `/sbf/dashboard`

* **Nombre:** `dashboard`
* **Descripción:** Vista principal del panel de administración.
* **Componente:** `DashBoard.vue`

### `/sbf/biblioteca`

* **Nombre:** `biblioteca`
* **Descripción:** Página principal de la biblioteca.
* **Componente:** `BibliotecaView.vue`

### `/sbf/biblioteca/detalles/:idBiblioteca`

* **Nombre:** `DetallesBiblioteca`
* **Descripción:** Vista detallada de una biblioteca específica.
* **Componente:** `DetailsBiblioteca.vue`

### `/sbf/libros`

* **Nombre:** `libros`
* **Descripción:** Vista que lista todos los libros disponibles en la biblioteca.
* **Componente:** `LibrosView.vue`

### `/sbf/libros/:idLibro`

* **Nombre:** `libro`
* **Descripción:** Vista para agregar o editar un libro.
* **Componente:** `LibroView.vue`
* **Guardia:** `isAdminGuard` (solo administradores pueden acceder)

### `/sbf/prestamos`

* **Nombre:** `prestamos`
* **Descripción:** Vista que muestra todos los préstamos registrados.
* **Componente:** `PrestamosView.vue`

### `/sbf/prestamo/:idPrestamo`

* **Nombre:** `prestamo`
* **Descripción:** Vista detallada de un préstamo específico.
* **Componente:** `PrestamoView.vue`

### `/sbf/facultad`

* **Nombre:** `facultad`
* **Descripción:** Vista de administración de facultades.
* **Componente:** `FacultadView.vue`
* **Guardia:** `isSuperAdminGuard` (solo superadministradores pueden acceder)

### `/sbf/usuarios`

* **Nombre:** `usuarios`
* **Descripción:** Vista para la gestión de usuarios.
* **Componente:** `UserView.vue`
* **Guardia:** `isSuperAdminGuard`

### Rutas de 404

* **Ruta:** `/:pathMatch(.*)*`
* **Descripción:** Ruta de error 404 (No encontrada).
* **Componente:** `NotFound404.vue`

## Guardias de Ruta

* **`isAdminGuard`**: Limita el acceso a administradores.
* **`isSuperAdminGuard`**: Limita el acceso a superadministradores.

## Instalación

1. Asegúrate de tener **Vue.js** y **Vue Router** instalados.
2. Agrega este archivo en tu configuración de rutas dentro de tu aplicación Vue.
3. Asegúrate de que las vistas y componentes estén correctamente configurados en las rutas correspondientes.

## Notas

* Algunas rutas tienen protección de acceso mediante guardias, lo que asegura que solo los usuarios con permisos adecuados puedan acceder a ciertas páginas.
* Asegúrate de que las vistas sean accesibles a través de las rutas definidas en este archivo.

---
