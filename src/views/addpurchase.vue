<template>
  <div>
    <main class="dash-content">
     <loading :active.sync="isLoading" :can-cancel="true" :color="loadingIconColor"></loading>
      <div class="container-fluid">
        
        <div class="row">
          <div class="col-xl-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fas fa-store"></i>
                </div>
                <div class="spur-card-title">Purchase Item</div>
              </div>
              <div class="card-body ">
                  <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent= "">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="item">Item</label>
                       <validation-provider rules="required" v-slot="{errors}">
                      <input type="text" class="form-control"  name="item"   v-model="item" placeholder="item" />
                      <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                     
                    </div>
                    <div class="form-group col-md-6">
                      <label for="dept">Department</label>
                       <validation-provider rules="required" v-slot="{errors}">
                      <select id="dept" class="form-control" v-model="dept">
                        <option value="" selected disabled>
                          Please Select...</option
                        >
                        <option
                          v-for="(departments , index) in  department"
                      :key="index"
                          >{{ departments.dept }}</option
                        >
                      </select>
                       <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="dop">Date of Purchase</label>
                      <validation-provider rules="required" v-slot="{errors}">
                      <input
                        type="date"
                        class="form-control"
                        v-model="dop"
                       name="dop"
                        placeholder="Date of Purchase"
                      />
                       <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-md-6">
                      <label class="control-label" for="amount">Amount</label>
                      <validation-provider rules="required" v-slot="{errors}">
                      <input
                        type="number"
                        class="form-control"
                        v-model="amount"
                        name="amount"
                        placeholder="Enter Amount"
                      />
                        <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                    </div>               
                  </div>

                  &nbsp; &nbsp;
                  <div class="row">
                    <div class="col-xl-6" style="text-align: right">
                      <button 
                        :disabled="invalid"
                         v-on:click="onSubmit()"
                       
                        type="button"
                        class="btn btn-outline-success mb-1"
                      >
                        Add Item
                      </button>
                      &nbsp;
                        <button
                        v-on:click="takemebacktoemp"
                      
                        type="button"
                        class="btn btn-outline-danger mb-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                  </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import { Vue, Component } from "vue-property-decorator";
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

 
     
export default  {
  name:"addpurchase",
     components: {
    Loading ,
    ValidationProvider,
    ValidationObserver
  },
  
  
  data() {
    return {
      department: [], 
       dop : "",
  amount : "",
    dept: "",
    item: "",
  
      loadingIconColor: "#00b8d0",
      isLoading: false,
     
      
    };
  },
methods:{
     onSubmit(){
   this.isLoading= true
    db.collection('purchase').add({
        
         dop: this.dop,
     
         amount:this.amount,
         dept: this.dept,
         item: this.item
   
      })
      .then(docRef =>{
        this.$router.push("/app/purchaselist")
         toast.success("Purchase created", "Success", 3000)
        this.isLoading= false;
        
      })
       .catch((err) => {

          console.error (err)
         
          alert('Invalid username or Password')
       })
    },
     takemebacktoemp() {
    this.$router.push("/app/purchaselist");
  }

},
    




  created() {
    this.isLoading = true;
    db.collection("department")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            dept: doc.data().dept
          };
          this.department.push(data);
          this.isLoading = false;
        });
      });
   
  }

 
}
</script>
<style scoped></style>
