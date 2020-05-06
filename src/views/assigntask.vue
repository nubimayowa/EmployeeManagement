<template>

 <main class="dash-content">
                <div class="container-fluid">
                  
                    <div class="row">
                        <div class="col-xl-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fa fa-tasks"></i>
                </div>
                <div class="spur-card-title">Add Task </div>
              </div>
                 <div class="card-body ">
                   <ValidationObserver v-slot="{ invalid }">
                                     <form @submit.prevent= "">
                                        <div class="form-row">
                                             <div class="form-group col-md-4" >
                         <label for="fullname">Task Owner</label>
                          <validation-provider rules="required" v-slot="{errors}">
                          <select id="fullname" class="form-control" v-model="fullname"  >
                                                  <option  value= "" selected disabled > Please Select...</option>
                                                    <option v-for="employees in employees"
                    v-bind:key="employees" >{{employees.fullname
                    }}</option>
                                                    
                                                </select>
                                               <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider>
                                             </div>
                                                    <div class="form-group col-md-5">
                                            <label for="comment">Task Description</label>
                                              <validation-provider rules="required" v-slot="{errors}">
                                            <textarea class="form-control" id="comment" rows="4" placeholder="Enter Description" v-model="comment"></textarea>
                      <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                        </div>
                                                            <div class="form-group col-md-3">
                                            <label for="comment">Priority</label>
                                              <validation-provider rules="required" v-slot="{errors}">
                                         <select id="priority" class="form-control" v-model="priority"  >
                                                  <option  value= "" selected disabled > Please Select...</option>
                     
                                                  <option>Low</option>
                                                    <option>Medium</option>
                                                      <option>High</option>
                                                
                                                </select>
                      <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                        </div>
                                  
                                            
                                        </div>
                                    
                                <div class="form-row">
                                            <div class="form-group col-md-3">
                                             <label for="tsup">Task Supervisor</label>
                                               <validation-provider rules="required" v-slot="{errors}">
                                                 <select class="form-control" id="tsup" v-model="tsup" >
                                                <option  value="" disabled >Select Supervisor</option>
                                                                                 <option v-for="employees in employees"
                    v-bind:key="employees" >{{employees.fullname
                    }}</option>
                                                
                                            </select>
                                  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                        </div>
                                                  <div class="form-group col-md-4">
                                                <label for="sdate">Start Date/Time</label>
                                                <validation-provider rules="required" v-slot="{errors}">
                                                          <input type="datetime-local" class="form-control" id="sdate" name="sdate" v-model="sdate">
                                                 <!-- <input type="date" class="form-control" id="sdate" v-model="sdate" name="sdate"> -->
  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                                             </div>
                                            <div class="form-group col-md-4">
                                                <label for="edate">End Date/Time</label>
                                                 <validation-provider rules="required" v-slot="{errors}">
                                                    <input type="datetime-local" class="form-control" id="edate" name="edate" v-model="edate">
                                             <!-- <input type="date" class="form-control" id="edate" v-model="edate" name="edate"> -->
  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                              
                                            </div>
                                 
                                                         
                                        </div>
                                         <div class="form-row">
                                                                 <div class="form-group col-md-3">
                                                                   
                  <label for="comment">Status</label>
                                              <validation-provider rules="required" v-slot="{errors}">
                                         <select id="stats" class="form-control" v-model="stats"  >
                                                  <option  value= "" selected disabled > Please Select...</option>
                     
                                                  <option>Not Started</option>
                                                    <option>In Progress</option>
                                                      <option>On Hold</option>
                                                          <option>Abandoned</option>
                                                      <option>Completed</option>
                                                
                                                </select> 
                      <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
          </div>
                
                             
                                         
                                         
                                 
                                        <div class="form-group col-md-3">
                                                                   
            <button type="button" :disabled="invalid"
                         @click="submit" class="btn btn-outline-success mb-1" style="margin-top:30px">Assign Task</button>
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

</template>

<script >

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



export default {
  name: "assigntask",
   components: {
    Loading ,
    ValidationProvider,
    ValidationObserver
  },
  

  data() {
    return {
   
      
       employees: [],
      
     
      loadingIconColor:"#00b8d0",
       isLoading: false,
      
  fullname :"",
    sdate: "",
    edate :"",
    tsup: "",
    comment: "",
    priority:"",
    stats:""
    

    };
  },
   created() {
    this.isLoading= true;
    db.collection("employees")
     .orderBy('employee_id')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            fullname: doc.data().fullname,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
          this.isLoading = false
        });
      });
  },
  

  methods:{
   submit(){
      
      // console.log(`login details =username= ${this.employee_id} and password= ${this.fullname}`)
      this.isLoading= true
     

      db.collection('assigntask').add({

         sdate: this.sdate,
          edate: this.edate,
         fullname:this.fullname,
         tsup: this.tsup,
         comment: this.comment,
         stats:this.stats,
         priority: this.priority
        
     
      })
      .then(docRef =>{
        this.$router.push("/app/taskllist")
         toast.success("Task Assigned Successfully", "Success", 3000)
        //  this.edate="";
        //  this.fullname="";
        //  this.tsup="";
        //  this.comment="";
        //  this.stats="";
        //  this.priority=null;
        this.isLoading= false;
        
      })
       .catch((err) => {

          console.error (err)
         
          alert('An error occured, please try again')
       })
    },
    

     takemebacktoemp(){
      this.$router.push('/app/employeelist')
    }
     

  },

     
}

</script>
<style scoped >

</style>















