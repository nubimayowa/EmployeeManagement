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
                <div class="spur-card-title">Update Task </div>
              </div>
                 <div class="card-body ">
                   <ValidationObserver v-slot="{ invalid }">
                                     <form @submit.prevent= "">
                                        <div class="form-row">
                                             <div class="form-group col-md-4" >
                         <label for="fullname">Task Owner</label>
                            <input type="text" class="form-control"   disabled  v-model="fullname" placeholder="Task Owner" />
                          <!-- <validation-provider rules="required" v-slot="{errors}"> -->
                          <!-- <select id="fullname" class="form-control" v-model="fullname"  >
                                                  <option  value= "" selected disabled > Please Select...</option>
                                                    <option v-for="employees in employees"
                    v-bind:key="employees" >{{employees.fullname
                    }}</option>
                                                    
                                                </select> -->
                                               <!-- <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> -->
                                             </div>
                                                    <div class="form-group col-md-5">
                                            <label for="comment">Task Description</label>
                                              <validation-provider rules="required" v-slot="{errors}">
                                            <textarea class="form-control" disabled id="comment" rows="4" placeholder="Enter Description" v-model="comment"></textarea>
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
                                 <input type="text" class="form-control"   disabled  v-model="tsup" placeholder="Task Supervisor" />
                                        </div>
                                                  <div class="form-group col-md-4">
                                                <label for="sdate">Start Date/Time</label>
                                                <validation-provider rules="required" v-slot="{errors}">
                                                          <input type="datetime-local" disabled class="form-control" id="sdate" name="sdate" v-model="sdate">
                                                 <!-- <input type="date" class="form-control" id="sdate" v-model="sdate" name="sdate"> -->
  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                                             </div>
                                            <div class="form-group col-md-4">
                                                <label for="edate">End Date/Time</label>
                                                 <validation-provider rules="required" v-slot="{errors}">
                                                    <input type="datetime-local" disabled class="form-control" id="edate" name="edate" v-model="edate">
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
                         @click="updateTask()" class="btn btn-outline-success mb-1" style="margin-top:30px">Update Task</button>
          </div>
                                  
                                        <div class="form-group col-md-3">
                                                                   
            <button type="button"
                         @click="takemebacktotask()" class="btn btn-outline-danger mb-1" style="margin-top:30px">Cancel</button>
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
  name: "updatetask",
   components: {
    Loading ,
    ValidationProvider,
    ValidationObserver
  },
  

  data() {
    return {
   
      assigntask:[],
     
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
    beforeRouteEnter(to, from, next) {
       
    db.collection("assigntask")
      .where("fullname", "==", to.params.fullname)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
           vm.comment = doc.data().comment;
              vm.edate = doc.data().edate;
            vm.fullname = doc.data().fullname;
            vm.priority = doc.data().priority;
            vm.sdate = doc.data().sdate;
            vm.tsup = doc.data().tsup;
            vm.stats = doc.data().stats;
          });
        });
      });
  },

   watch: {
    $route: "fetchData"
  },
  
    //   created() {
    // this.isLoading= true;
    // db.collection("assigntask")
    
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
           
    //          comment: doc.data().comment,
    //           edate: doc.data().edate,
    //           fullname: doc.data().fullname,
    //            priority: doc.data().priority,
    //           sdate: doc.data().sdate,
    //         tsup:doc.data().tsup,
    //           stats:doc.data().stats
            

    //       };
    //       this.assigntask.push(data);
    //       this.isLoading = false
    //     });
    //   });
    //   },

 
  methods: {
    // fetchData() {
     

    //   db.collection("employees")
    //     .where("employee_id", "==", this.$route.params.employee_id)
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         this.employee_id = doc.data().employee_id;
    //         (this.fullname = doc.data().fullname),
    //           (this.dept = doc.data().dept),
    //           (this.position = doc.data().position);
    //       });
    //     });
    // },
    updateTask(){
        this.isLoading= true;
        db.collection("assigntask")
        .where("fullname", "==", this.$route.params.fullname)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            

            doc.ref.update({
                 sdate: this.sdate,
          edate: this.edate,
         fullname:this.fullname,
         tsup: this.tsup,
         comment: this.comment,
         stats:this.stats,
         priority: this.priority
            })
            .then (()=>{
                 toast.success("Task Update Successfully", "Success", 3000);
                this.$router.push({fullname: "/app/tasklist",
                params:{fullname: this.fullname}})
            })
          });
        });

    
    },
    takemebacktotask(){
      this.$router.push("/app/tasklist")
    }
  },

}

</script>
<style scoped >

</style>















