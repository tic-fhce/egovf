import { createApp } from 'vue';
import Fhce from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import jsPDF from 'jspdf';

import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@/assets/style.css';
import 'material-icons/iconfont/material-icons.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(Fhce).use(store).use(router).use(VueAxios,axios).use(VueCookies,{expires:'1d'}).use(VueSweetalert2).use(jsPDF).mount('#fhce')
