<template>
<body>
    <div class="form-screen">
        <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="loadingIconColor"
      ></loading>
        <a href="index.html" class="spur-logo"><i class="fas fa-bolt"></i> <span>Spur</span></a>
        <div class="card account-dialog">
            <div class="card-header bg-primary text-white"> Create an account </div>
            <div class="card-body">
                 <div v-if="error" class="alert alert-danger">{{error}}</div>
                <form action="#!">
              
                    <div class="form-group">
                        <input type="email"  size="40"  required autofocus class="form-control" v-model="email" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                        <input type="password"  size="40" required autofocus  class="form-control" v-model="password"  placeholder="Password">
                    </div>
                    <div class="account-dialog-actions">
                        <button  v-on:click="register" class="btn btn-primary">Sign up</button>
                          <router-link :to="{ name: 'login' }">Already have an account?</router-link>
                       
                    </div>
        </form>
  
            </div>
   
            
        </div>
    </div>

</body>
</template>




<script>
import firebase from 'firebase'
import firebaseInit from "../components/firebaseInit"
import db from "../components/firebaseInit";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';

components: {

  Loading
}

export default {
  name: "signup",
  data() {
    return {
      email: null,
      password: null,
      error: ""
     

    };
  },


 
  methods: {
      register: function(e){
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.email , this.password)
          .then(
              user=>{
                   this.$router.push("/login")
                    toast.success("Employee Created Successfully, Redirecting to login...", "Success", 3000)
                   

              })

              .catch(err => {
          this.error = err.message;
        });

        
      }

  }
}

</script>
<style scoped >
    
    
  
    
</style>