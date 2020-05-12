<template>

    <div class="form-screen" >
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="loadingIconColor"
      ></loading>
       
        <a  class="spur-logo"><i class="fab fa-freebsd"></i> <span>Spur</span></a>
    
        <div class="card account-dialog">
            <div class="card-header bg-primary text-white"> Sign in to your account </div>
            <div class="card-body">
               <ValidationObserver v-slot="{ invalid }">
               <div v-if="error" class="alert alert-danger">{{error}}</div>
                <form @submit.prevent="onLogin">
              
                    <div class="form-group">
                   <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
  <input type="text" v-model="email" size="40" placeholder="Email"  class="form-control" >
   <span  style="color: red;">{{ errors[0] }}</span>
</ValidationProvider>
                    </div>
                    <div class="form-group">
                             <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
      <input type="password" v-model="confirmpassword" size="40" placeholder="Password"  class="form-control"  />
      <span style="color: red;">{{ errors[0] }}</span>
    </ValidationProvider>
                    </div>
                     
                      
                   

                   
                   <div class="form-group" style= 'text-align: center;' >
                     <button  :disabled="invalid"  class="btn btn-outline-success mb-1">Login</button>
                          
                      </div>
                        <div class="form-group" style= 'text-align: center;'>
                   <router-link :to="{ name: 'signup' }">Dont have an account? Signup </router-link>
                    </div>
                     
                    
                    
     
                </form>
               </ValidationObserver>
            </div>
        </div>
    </div>


</template>




<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { ValidationObserver } from 'vee-validate';
import db from "../components/firebaseInit";
import Loading from "vue-loading-overlay";
import * as VeeValidate from "vee-validate"
import toast from "@/store/modules/toast";

// import { Validate } from "vuelidate-property-decorators";
// import { required } from "vuelidate/lib/validators";
extend('required',{
  ...required,
  message: 'This field is required'
});

 


export default {
  name: "login",
   components: {
    Loading ,
    ValidationProvider,
    ValidationObserver,
   
  },
  
  data() {
    return {
      email: "",
      password: "",
      confirmpassword:"",
        error: null,
      loadingIconColor:"#00b8d0",
       isLoading: false


    };
  },


   methods: {
    onLogin() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signInAction', user)
    }


     
  }


 
}

</script>
<style scoped >
    
    
  
    
</style>