<template>
<body>
    <div class="form-screen">
         <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="loadingIconColor"
      ></loading>
        <a href="index.html" class="spur-logo"><i class="fab fa-grunt"></i> <span>Spur</span></a>
        <div class="card account-dialog">
            <div class="card-header bg-primary text-white"> Create an account </div>
            <div class="card-body">
              <ValidationObserver v-slot="{ invalid }">
                 <div v-if="error" class="alert alert-danger">{{error}}</div>

                <form @submit.prevent="onSignup">
              
                    <div class="form-group">

                   <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
  <input type="text" v-model="email" size="40" placeholder="Email"  class="form-control" >
   <span  style="color: red;">{{ errors[0] }}</span>
</ValidationProvider>
                    
                    </div>
              <div class="form-group">
                       <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }">
      <input type="password" v-model="password" size="40" placeholder="Password"  class="form-control"  />
      <span style="color: red;">{{ errors[0] }}</span>
    </ValidationProvider>
                    </div>
                    <div class="form-group">
                       <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
      <input type="password" v-model="confirmation" size="40" placeholder="Confirm Password"  class="form-control"  />
      <span style="color: red;">{{ errors[0] }}</span>
    </ValidationProvider>
                    </div>
                     
                    <!-- <div class="form-group">
                        <input type="confirmPassword" id="confirmPassword" size="40" required autofocus  class="form-control" v-model="confirmPassword"  placeholder="Confirm Password">
                    </div> -->
                    <div class="form-row">
                    <div class="form-group col-md-6" >
                      
                          <button  :disabled="invalid"   class="btn btn-outline-success mb-1">Sign up</button>
                          </div>
                           <div class="form-group col-md-6" >
                          <button    @click="reset"  class="btn btn-outline-danger mb-1">Reset Form</button>
                          </div>
                          

                    </div>
                    <div class="form-group" style="text-align:center;">
                       <router-link :to="{ name: 'login' }">Already have an account?</router-link>
                      
                      
                       
                    </div>
                   
        </form>
       </ValidationObserver> 
            </div>
    
   
            
        </div>
    </div>

</body>
</template>




<script>

import { ValidationProvider, extend } from 'vee-validate';

import { ValidationObserver } from 'vee-validate';
import db from "../components/firebaseInit";
import Loading from "vue-loading-overlay";
import * as VeeValidate from "vee-validate"

import { required, email } from 'vee-validate/dist/rules';
import toast from "@/store/modules/toast";




extend('password',{
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
extend('email', email);



export default {
  name: "signup",
    components: {
    Loading ,
    ValidationProvider,
    ValidationObserver,
   
  },
  
  data() {
    return {
      email: "",
      password: "",
      confirmation:"",
      error: "",
  loadingIconColor:"#00b8d0",
       isLoading: false

     

     

    }
  },
 

 
  methods: {

    
    onSignup(){
      this.isLoading= true;
            const user = {
        email: this.email,
        password: this.password
      }
      
      this.$store.dispatch('signUpAction', user)
      

    
          
      



    },
  
    reset () {
      this.$refs.form.reset()
    }
  }
     

  
}

</script>
<style scoped >
    
    
  
    
</style>