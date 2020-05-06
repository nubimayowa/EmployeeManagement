<template>
  <div>

    <main class="dash-content">
<loading :active.sync="isLoading" :can-cancel="true" :color="loadingIconColor"></loading>

      
      <div class="container-fluid">

        <div class="row">
          <div class="col-lg-12">
            <div class="card spur-card">
             
              <div class="card-body ">
                         <div class="input-group">
      <input type="text" id="myInput" class="form-control" size="40" placeholder="Filter">
       </div>
               <br/>
     <table class="table table-bordered "  >

    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Department</th>
        <th>Name</th>
        <th> Position</th>


      </tr>
    </thead>
    <tbody id="myTable">
      <tr v-for="employee in employees"
                    v-bind:key="employee.id">
      <td>
          {{ employee.employee_id }}

      </td>

        <td>{{ employee.dept }}</td>



        <td>{{employee.fullname}}</td>
        
        <td><span class="badge badge-pill badge-default">{{
                      employee.position
                    }}</span>
         <router-link
                    class="float-right"

                      v-bind:to="{
                        name: 'viewemployee',
                        params:{employee_id: employee.employee_id}

                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                   </td>
      </tr>

    </tbody>
    </table>
   
  

<!-- 
                <ul class="list-group">
                  <li
                    v-for="employee in employees"
                    v-bind:key="employee.id"
                    class="list-group-item"
                  >
                    <span class="badge badge-pill badge-primary">{{
                      employee.position
                    }}</span>

                    {{ employee.employee_id }}:{{ employee.fullname }}: {{employee.dept}}


                  </li>
                </ul> -->
               <br/>
                <!-- <button type="submit" @click="moveto()" class="btn btn-primary">Add Employee</button> -->

                <button type="button" @click="moveto()" class="btn btn-outline-success float-right"><i class="fas fa-plus"></i>Add Employee</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import db from "../components/firebaseInit";
import  {required, minLength, maxLength, between} from 'vuelidate/lib/validators'
import { Vue, Component } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';
import VueyeTable from "vueye-datatable";

import $ from 'jquery';

export default {
  name: "employeelist",
 
   components: {
    Loading ,
    
    VueyeTable
  },
  
  data() {
    return {
      employees: [],
  
     
       loadingIconColor:"#00b8d0",
       isLoading: false,
       theme3: {
            backgroundColor: "#fff",
            color: "#000",
            rows:{
                borderBottom: "1px solid #eee"
        },
       
      rowClick: {
                backgroundColor: "#fff"
            }
            }
    };
  },
  methods:{
    
  moveto(){
    this.$router.push('/app/user');
  }
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


  mounted() {
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    

    if (employees.dept == "Sales"){
      this.badgecolor = "Primary"
    }



    }
  



}
</script>

<style lang="css" scoped>
body{
font-family: Gill Sans Extrabold, sans-serif;
}


</style>
