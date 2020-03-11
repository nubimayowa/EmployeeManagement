<template>
  <div>
    <main class="dash-content">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="loadingIconColor"
      ></loading>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fas fa-user"></i>
                </div>
                <div class="spur-card-title">Create Employee</div>
              </div>
              <div class="card-body ">
                
  <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent= "">
                  <div class="form-row">
                    <div class="form-group col-md-6" >
                      <label  class="control-label" for="employee_id"> Employee ID</label>
                       <validation-provider rules="required" v-slot="{errors}">
                      <input
                        type="text"
                        name="employee_id"
                        id="employee_id"
                        class="form-control"
                        v-model="employee_id"
                 
                   
                        placeholder="Employee ID"
                      
                      />
                        <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                      
                    </div>
                    <div class="form-group col-md-6">
                      <label class="control-label" for="fullname">Fullname</label>
                      <validation-provider rules="required" v-slot="{errors}">
                      <input
                        type="text"
                        class="form-control"
                        v-model="fullname"
                        required
                        placeholder="Fullname"
                        

                      />
                         <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                      
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label class="control-panel" for="dept">Department</label>
                       <validation-provider rules="required" v-slot="{errors}">
                      <select id="dept" class="form-control" v-model="dept">
                        <option value="" selected disabled>
                          Please Select...</option
                        >
                        <option
                          v-for="department in department"
                          v-bind:key="department"
                          >{{ department.dept }}</option
                        >
                      </select>
                       <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                    </div>
                    <div  class="form-group col-md-6">
                      <label class="control-panel" for="position">Position </label>
                      <validation-provider rules="required" v-slot="{errors}">
                      <select
                        id="position"
                        class="form-control"
                        v-model="position"
                      >
                        <option value="" selected disabled>
                          Please Select...</option
                        >
                        <option
                          v-for="collectionposition in collectionposition"
                          v-bind:key="collectionposition"
                          >{{ collectionposition.position }}</option
                        >
                      </select>
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
                        Create
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
extend('required', {
  ...required,
  message: 'This field is required'
});

    
export default  {
  name: "user",
   components: {
    Loading ,
    ValidationProvider,
    ValidationObserver
  },
  
  data() {
    return {
      department: [],
      collectionposition: [],
     

      employees: [],

      loadingIconColor: "#00b8d0",
      isLoading: false,
      employee_id: "",
      fullname: "",
      dept: "",
      position: ""
      
    };
  },

  methods:{

  onSubmit() {

  
    console.log(
      `login details =username= ${this.employee_id} and password= ${this.fullname}`
    );
    this.isLoading = true;

    db.collection("employees")
      .add({
        employee_id: this.employee_id,
        fullname: this.fullname,
        dept: this.dept,
        position: this.position
      })
      .then(docRef => {
        this.$router.push("/app/employeelist");
        toast.success("Employee created Successfully", "Success", 3000);
        this.isLoading = false;
      })
    
      .catch(err => {
        console.error(err);

        alert("Invalid details, please try again ");
      });
  },
  
  takemebacktoemp() {
    this.$router.push("/app/employeelist");
  }



  },
  created() {
    // this.isLoading = true;
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
    db.collection("collectionposition")
      .orderBy("position")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            position: doc.data().position
          };
          this.collectionposition.push(data);
          this.isLoading = false;
        });
      });
  },

}
</script>
<style scoped></style>
