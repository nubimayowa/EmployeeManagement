import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import login from './views/login.vue';
import home from './views/home.vue';
import signup from './views/signup.vue';
import user from './views/user.vue';
import employeelist from './views/employeelist.vue';
import viewemployee from './views/viewemployee.vue';
import Navbar from './views/Navbar.vue';
import addpurchase from './views/addpurchase.vue';
import purchaselist from './views/purchaselist.vue';
import editpurchase  from './views/editpurchase.vue';
import mainApp from './views/mainApp.vue';
import viewpurchase from './views/viewpurchase.vue';
import dashboard from './views/dashboard.vue';
import leavesetting from './views/leavesetting.vue';
import editemployee from './views/editemployee.vue';
import leavelist from './views/leavelist.vue';
import viewleave from './views/viewleave.vue';

import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/app',
    },

    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        auth: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: {
        auth: true,
      },

    },

    {
      path: '/app',
      name: 'MainApp',
      component: mainApp,
      meta: {
       auth: false,

      },
      children: [
        {
          path: '/app',
          name: 'home',
          component: home,
        },
        {
          path: '/app/user',
          name: 'user',
          component: user,
        },



        {
          path: '/app/leavesetting',
          name: 'leavesetting',
          component: leavesetting,
        },
        {
          path: '/app/leavelist',
          name: 'leavelist',
          component: leavelist,
        },
        {
          path: '/app/employeelist',
          name: 'employeelist',
          component: employeelist,
        },
        {
          path: '/app/purchaselist',
          name: 'purchaselist',
          component: purchaselist,
        },
        {
          path: '/app/addpurchase',
          name: 'addpurchase',
          component: addpurchase,
        },
        {
          path: '/app/:dop',
          name: 'viewpurchase',
          component: viewpurchase,

        },

        {
          path: '/app/editpurchase',
          name: 'editpurchase',
          component: editpurchase,

        },

        {
          path: '/app/:employee_id',
          name: 'viewemployee',
          component: viewemployee,
        },
        {
          path: '/app/:fullname',
          name: 'viewleave',
          component: viewleave,
        },
        {

          path: '/app/editemployee',
          name: 'editemployee',
          component: editemployee,

        },

      ],
    },






  ],
});



// router.beforeEach ((to, from ,next) => {
//   if (next.meta.auth && !store.state.currentUser){

//     next({
//       path: "/login"
//     })
//   }
//   else{
//     next()
//   }


// })

export default  router;
