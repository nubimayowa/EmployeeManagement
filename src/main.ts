import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

import * as VeeValidate from 'vee-validate';
import Loading from 'vue-loading-overlay';
import VueyeTable from 'vueye-datatable';
// import DataTable from 'vue-datatable';


// typins and

import './components/css/demo.css';
import './components/css/demo.min.css';
import './components/css/spur.min.css';
import './components/css/spur.min.css';
import './components/js/spur.js';

import './components/firebaseInit.js';

// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';

import '../node_modules/izitoast/dist/css/iziToast.css';
import '../node_modules/izitoast/dist/css/iziToast.min.css';

import 'popper.js';

import 'vue-loading-overlay/dist/vue-loading';


import 'bootstrap';
import * as $ from 'jquery';


// import './assets/css/theme.css';  use this to import your custom css file

Vue.use(Loading);
Vue.use(VeeValidate);
Vue.use(VueyeTable);
// Vue.use(DataTable)


Vue.config.productionTip = false;




new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount('#app');



// firebase.auth().onAuthStateChanged(user =>{
//   if(user){
//     store.commit('setCurrentUser', user)

//   }
//   else {
//     store.commit('setCurrentUser', null)

//   }

// })


