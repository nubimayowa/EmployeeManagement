<template>

 <main class="dash-content">
                <div class="container-fluid">
                  
                    <div class="row">
                        <div class="col-xl-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fa fa-plane"></i>
                </div>
                <div class="spur-card-title">Leave Information</div>
              </div>
                 <div class="card-body ">
                   <ValidationObserver v-slot="{ invalid }">
                                     <form @submit.prevent= "">
                                        <div class="form-row">
                                             <div class="form-group col-md-4" >
                         <label for="fullname">Employee</label>
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
                                            <div class="form-group col-md-3">
                                                <label for="sdate">Start Date</label>
                                                <validation-provider rules="required" v-slot="{errors}">
                                                 <input type="date" class="form-control" id="sdate" v-model="sdate" name="sdate">
  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                                             </div>
                                            <div class="form-group col-md-3">
                                                <label for="edate">End Date</label>
                                                 <validation-provider rules="required" v-slot="{errors}">
                                             <input type="date" class="form-control" id="edate" v-model="edate" name="edate">
  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                              
                                            </div>
                                            
                                        </div>
                                    
                                <div class="form-row">
                                            <div class="form-group col-md-4">
                                             <label for="ltype">Type</label>
                                               <validation-provider rules="required" v-slot="{errors}">
                                                 <select class="form-control" id="ltype" v-model="ltype" >
                                                <option  value="" disabled >Select Leave Type</option>
                                                <option>Annual</option>
                                                  <option>Sick</option>
                                                    <option>Compassionate</option>
                                                      <option>Examination</option>
                                                
                                            </select>
                                  <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="comment">Comment</label>
                                              <validation-provider rules="required" v-slot="{errors}">
                                            <textarea class="form-control" id="comment" rows="4" placeholder="Enter Note" v-model="comment"></textarea>
                      <span style="color: red;">{{errors[0]}}</span>
                      </validation-provider> 
                                        </div>
                                        <div class="form-group col-md-2">
                                                                   
            <button type="button" :disabled="invalid"
                         @click="submit" class="btn btn-outline-success mb-1" style="margin-top:40px">Submit Request</button>
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
  name: "leavesettiing",
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
    ltype: "",
    comment: ""
    

    };
  },
  

  methods:{
   submit(){
      
      // console.log(`login details =username= ${this.employee_id} and password= ${this.fullname}`)
      this.isLoading= true
     

      db.collection('leaverequest').add({

         sdate: this.sdate,
          edate: this.edate,
         fullname:this.fullname,
         ltype: this.ltype,
         comment: this.comment
     
      })
      .then(docRef =>{
        this.$router.push("/app/leavelist")
         toast.success("Leave submitted Successfully", "Success", 3000)
        this.isLoading= false;
        
      })
       .catch((err) => {

          console.error (err)
         
          alert('Invalid details, please try again')
       })
    },
    

     takemebacktoemp(){
      this.$router.push('/app/employeelist')
    }
     

  },

      created() {
    this.isLoading= true;
    db.collection("employees")
     .orderBy('fullname')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            fullname: doc.data().fullname
          };
          this.employees.push(data);
          this.isLoading = false
        });
      });
      }
}

</script>
<style scoped >

</style>















