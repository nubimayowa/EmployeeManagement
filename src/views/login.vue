<template>
<body backk>
    <div class="form-screen">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="loadingIconColor"
      ></loading>
       
        <a href="index.html" class="spur-logo"><i class="fab fa-freebsd"></i> <span>Spur</span></a>
    
        <div class="card account-dialog">
            <div class="card-header bg-primary text-white"> Sign in to your account </div>
            <div class="card-body">
               <div v-if="error" class="alert alert-danger">{{error}}</div>
                <form >
              
                    <div class="form-group">
                        

  <input type="email" name="email" required autofocus id="email" size="40"  class="form-control" v-model="email" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" required autofocus id="password" size="40"  class="form-control" v-model="password"  placeholder="Password">
                    </div>
                    <div class="account-dialog-actions">
                        <button  v-on:click="login" class="btn btn-primary">Sign in</button>
                          <router-link :to="{ name: 'signup' }">Dont have an account?</router-link>
                       
                    </div>
     
                </form>
            </div>
        </div>
    </div>

</body>
</template>




<script>
import firebase from 'firebase'
import db from "../components/firebaseInit";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';

components: {

  Loading
}

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
        error: null,
      loadingIconColor:"#00b8d0",
       isLoading: false


    };
  },
   methods: {
    login() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.isLoading= false
        
          this.$router.replace("/app")
            toast.success("Login Successfully", "Success", 3000);  
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