import { createApp } from 'vue'
import Fhce from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import jsPDF from 'jspdf'
import '@/assets/estilos/estilo.css'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(Fhce) 
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueAxios,axios)
app.use(VueCookies,{expires:'1d'})
app.use(VueSweetalert2)
app.use(jsPDF)

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')